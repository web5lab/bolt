// Enhanced Authentication manager for Chrome Extension with JWT exchange
class AuthManager {
    constructor() {
        this.serverUrl = 'https://redesignr.ai';
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
            } else if (request.type === 'JWT_EXCHANGE') {
                this.handleJWTExchange(request.token).then((result) => {
                    sendResponse(result);
                }).catch((error) => {
                    sendResponse({ success: false, error: error.message });
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
            const response = await fetch(`${this.serverUrl}/api/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
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

    // JWT Exchange method - main authentication flow
    async exchangeJWT(jwtToken) {
        console.log('Starting JWT exchange with token:', jwtToken ? 'present' : 'missing');
        
        try {
            const response = await fetch(`${this.serverUrl}/api/auth/exchange`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    source: 'chrome_extension',
                    timestamp: Date.now()
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'JWT exchange failed');
            }

            const data = await response.json();
            console.log('JWT exchange successful:', data);

            await this.handleAuthSuccess(data.token, data.user);
            return { success: true, user: data.user };

        } catch (error) {
            console.error('JWT exchange failed:', error);
            throw error;
        }
    }

    // Handle JWT exchange from message
    async handleJWTExchange(jwtToken) {
        try {
            const result = await this.exchangeJWT(jwtToken);
            return result;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Open redesignr.ai for authentication
    async authenticate() {
        console.log('Opening redesignr.ai for authentication');
        
        return new Promise((resolve, reject) => {
            try {
                // Generate a unique state parameter for security
                const state = this.generateState();
                
                // Store the state and resolve/reject functions
                this.authState = { state, resolve, reject };
                
                // Open redesignr.ai auth page
                const authUrl = `${this.serverUrl}/auth/extension?state=${state}&source=chrome_extension`;
                console.log('Opening auth URL:', authUrl);
                
                chrome.tabs.create({
                    url: authUrl,
                    active: true
                }, (tab) => {
                    if (chrome.runtime.lastError) {
                        reject(new Error(chrome.runtime.lastError.message));
                        return;
                    }
                    
                    console.log('Auth tab created:', tab.id);
                    this.authTabId = tab.id;
                    
                    // Set up tab listener for auth completion
                    this.setupAuthTabListener();
                });
                
            } catch (error) {
                console.error('Error starting authentication:', error);
                reject(error);
            }
        });
    }

    setupAuthTabListener() {
        // Listen for tab updates to detect auth completion
        const tabUpdateListener = (tabId, changeInfo, tab) => {
            if (tabId !== this.authTabId) return;
            
            if (changeInfo.url && changeInfo.url.includes('/auth/extension/success')) {
                console.log('Auth success detected in tab:', changeInfo.url);
                
                // Extract token from URL
                try {
                    const url = new URL(changeInfo.url);
                    const token = url.searchParams.get('token');
                    const state = url.searchParams.get('state');
                    
                    if (state !== this.authState?.state) {
                        throw new Error('Invalid state parameter');
                    }
                    
                    if (token) {
                        this.handleAuthTokenReceived(token);
                    } else {
                        throw new Error('No token received');
                    }
                } catch (error) {
                    console.error('Error processing auth success:', error);
                    this.authState?.reject(error);
                }
                
                // Clean up
                chrome.tabs.onUpdated.removeListener(tabUpdateListener);
                chrome.tabs.remove(tabId);
                this.authTabId = null;
            }
        };
        
        chrome.tabs.onUpdated.addListener(tabUpdateListener);
        
        // Set up tab removal listener
        const tabRemovedListener = (tabId) => {
            if (tabId === this.authTabId) {
                console.log('Auth tab was closed');
                chrome.tabs.onUpdated.removeListener(tabUpdateListener);
                chrome.tabs.onRemoved.removeListener(tabRemovedListener);
                
                if (this.authState && !this.isAuthenticated()) {
                    this.authState.reject(new Error('Authentication cancelled'));
                }
                
                this.authTabId = null;
                this.authState = null;
            }
        };
        
        chrome.tabs.onRemoved.addListener(tabRemovedListener);
    }

    async handleAuthTokenReceived(token) {
        try {
            console.log('Handling received auth token');
            
            // Exchange the token for user data
            const result = await this.exchangeJWT(token);
            
            if (result.success) {
                this.authState?.resolve(result.user);
            } else {
                throw new Error(result.error || 'Token exchange failed');
            }
            
        } catch (error) {
            console.error('Error handling auth token:', error);
            this.authState?.reject(error);
        } finally {
            this.authState = null;
        }
    }

    async handleAuthSuccess(token, user) {
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
                await fetch(`${this.serverUrl}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });
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
        await chrome.storage.local.remove(['authToken', 'user']);
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

    generateState() {
        return Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
} else {
    window.AuthManager = AuthManager;
}