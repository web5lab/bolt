// Enhanced Authentication manager for Chrome Extension with chrome.identity
class AuthManager {
    constructor() {
        this.serverUrl = 'http://localhost:5008';
        this.token = null;
        this.user = null;
        this.init();
    }

    async init() {
        await this.loadStoredAuth();
        this.setupMessageListener();
        console.log('AuthManager initialized - isAuthenticated:', this.isAuthenticated());
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.type === 'AUTH_CHECK') {
                sendResponse({ 
                    isAuthenticated: this.isAuthenticated(),
                    user: this.user 
                });
            } else if (request.type === 'AUTH_LOGOUT') {
                this.logout().then(() => {
                    sendResponse({ success: true });
                });
                return true;
            }
        });
    }

    async loadStoredAuth() {
        try {
            const result = await chrome.storage.local.get(['authToken', 'user']);
            console.log('Loading stored auth:', result);
            if (result.authToken && result.user) {
                this.token = result.authToken;
                this.user = result.user;
                console.log('Found stored auth - token:', !!this.token, 'user:', this.user);
                
                const isValid = await this.verifyToken();
                console.log('Token verification result:', isValid);
                if (!isValid) {
                    await this.clearAuth();
                }
            } else {
                console.log('No stored auth found');
            }
        } catch (error) {
            console.error('Error loading stored auth:', error);
        }
    }

    async verifyToken() {
        if (!this.token) return false;

        try {
            const response = await fetch(`${this.serverUrl}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.user = data.user;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Token verification failed:', error);
            return false;
        }
    }

    isAuthenticated() {
        return !!(this.token && this.user);
    }

    // Main authenticate method using chrome.identity
    async authenticate(provider = 'google') {
        console.log('Starting Chrome identity authentication with provider:', provider);
        
        return new Promise((resolve, reject) => {
            try {
                // Use chrome.identity.launchWebAuthFlow
                const authUrl = `${this.serverUrl}/auth/${provider}`;
                console.log('Starting web auth flow with URL:', authUrl);
                
                chrome.identity.launchWebAuthFlow({
                    url: authUrl,
                    interactive: true
                }, (responseUrl) => {
                    if (chrome.runtime.lastError) {
                        console.error('Auth flow error:', chrome.runtime.lastError);
                        reject(new Error(chrome.runtime.lastError.message));
                        return;
                    }
                    
                    if (!responseUrl) {
                        reject(new Error('No response URL received'));
                        return;
                    }
                    
                    console.log('Auth flow completed with URL:', responseUrl);
                    this.handleAuthResponse(responseUrl, resolve, reject);
                });
                
            } catch (error) {
                console.error('Error starting authentication:', error);
                reject(error);
            }
        });
    }

    handleAuthResponse(responseUrl, resolve, reject) {
        try {
            const url = new URL(responseUrl);
            const params = new URLSearchParams(url.search);
            
            // Check for success parameters
            const token = params.get('token');
            const userParam = params.get('user');
            
            if (token && userParam) {
                const user = JSON.parse(decodeURIComponent(userParam));
                this.handleAuthSuccess(token, user, resolve);
            } else {
                // Check for error parameters
                const error = params.get('error') || 'Authentication failed';
                reject(new Error(error));
            }
        } catch (error) {
            console.error('Error parsing auth response:', error);
            reject(new Error('Failed to parse authentication response'));
        }
    }

    async handleAuthSuccess(token, user, resolve) {
        console.log('Handling auth success with token and user:', !!token, user);
        
        try {
            this.token = token;
            this.user = user;
            
            // Store in chrome storage
            await chrome.storage.local.set({
                authToken: token,
                user: this.user
            });
            
            console.log('Auth success - user stored:', this.user);
            
            // Resolve the authentication promise
            resolve(this.user);
            
            // Notify popup about auth success
            try {
                console.log('Sending AUTH_SUCCESS message to popup');
                await chrome.runtime.sendMessage({
                    type: 'AUTH_SUCCESS',
                    user: this.user
                });
                
                await chrome.runtime.sendMessage({
                    type: 'AUTH_TOKEN_RECEIVED',
                    token: token,
                    user: this.user
                });
            } catch (e) {
                console.log('Could not send message to popup:', e);
            }
            
        } catch (error) {
            console.error('Error handling auth success:', error);
            throw error;
        }
    }

    async logout() {
        try {
            if (this.token) {
                await fetch(`${this.serverUrl}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
            }
            
            // Clear chrome.identity token if it exists
            if (chrome.identity) {
                chrome.identity.clearAllCachedAuthTokens();
            }
        } catch (error) {
            console.error('Logout request failed:', error);
        } finally {
            await this.clearAuth();
        }
    }

    async clearAuth() {
        this.token = null;
        this.user = null;
        await chrome.storage.local.remove(['authToken', 'user', 'tempAuthToken', 'tempAuthUser']);
    }

    async makeAuthenticatedRequest(url, options = {}) {
        if (!this.isAuthenticated()) {
            throw new Error('Not authenticated');
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            ...options.headers
        };

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 401) {
            await this.clearAuth();
            throw new Error('Authentication expired');
        }

        return response;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
} else {
    window.AuthManager = AuthManager;
}