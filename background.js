// Background script for the Website AI Chrome Extension

// Inline AuthManager class for background script
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

    async handleJWTExchange(jwtToken) {
        try {
            const result = await this.exchangeJWT(jwtToken);
            return result;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async authenticate() {
        console.log('Opening redesignr.ai for authentication');
        
        return new Promise((resolve, reject) => {
            try {
                const state = this.generateState();
                this.authState = { state, resolve, reject };
                
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
                    this.setupAuthTabListener();
                });
                
            } catch (error) {
                console.error('Error starting authentication:', error);
                reject(error);
            }
        });
    }

    setupAuthTabListener() {
        const tabUpdateListener = (tabId, changeInfo, tab) => {
            if (tabId !== this.authTabId) return;
            
            if (changeInfo.url && changeInfo.url.includes('/auth/extension/success')) {
                console.log('Auth success detected in tab:', changeInfo.url);
                
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
                
                chrome.tabs.onUpdated.removeListener(tabUpdateListener);
                chrome.tabs.remove(tabId);
                this.authTabId = null;
            }
        };
        
        chrome.tabs.onUpdated.addListener(tabUpdateListener);
        
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
            
            await chrome.storage.local.set({
                authToken: token,
                user: this.user
            });
            
            console.log('Auth success - user stored:', this.user);
            
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

class BackgroundService {
    constructor() {
        this.init();
    }

    init() {
        this.authManager = new AuthManager();
        this.setupEventListeners();
        this.setupContextMenu();
    }

    setupEventListeners() {
        // Handle extension installation
        chrome.runtime.onInstalled.addListener((details) => {
            if (details.reason === 'install') {
                this.handleInstall();
            } else if (details.reason === 'update') {
                this.handleUpdate();
            }
        });

        // Handle messages from content scripts and popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            this.handleMessage(request, sender, sendResponse);
            return true; // Keep message channel open for async responses
        });

        // Handle external messages (from redesignr.ai website)
        chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
            this.handleExternalMessage(request, sender, sendResponse);
            return true;
        });

        // Handle tab updates
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.status === 'complete' && tab.url) {
                this.handleTabUpdate(tabId, tab);
            }
        });
    }

    setupContextMenu() {
        // Create context menu items
        chrome.contextMenus.create({
            id: 'redesign-page',
            title: 'Redesign this page with AI',
            contexts: ['page']
        });

        chrome.contextMenus.create({
            id: 'create-from-selection',
            title: 'Create website from selection',
            contexts: ['selection']
        });

        // Handle context menu clicks
        chrome.contextMenus.onClicked.addListener((info, tab) => {
            this.handleContextMenuClick(info, tab);
        });
    }

    handleInstall() {
        // Set default settings
        chrome.storage.local.set({
            settings: {
                autoCapture: true,
                captureImages: false,
                captureScripts: false,
                theme: 'dark'
            },
            extensionVersion: chrome.runtime.getManifest().version
        });

        // Open welcome page
        chrome.tabs.create({
            url: 'https://yourdomain.com/welcome?source=extension'
        });
    }

    handleUpdate() {
        // Handle extension updates
        console.log('Extension updated');
    }

    async handleMessage(request, sender, sendResponse) {
        try {
            switch (request.type) {
                case 'CAPTURE_PAGE':
                    const capturedData = await this.capturePageData(sender.tab.id);
                    sendResponse({ success: true, data: capturedData });
                    break;

                case 'OPEN_MAIN_APP':
                    await this.openMainApp(request.data);
                    sendResponse({ success: true });
                    break;

                case 'GET_TAB_INFO':
                    const tabInfo = await this.getTabInfo(sender.tab.id);
                    sendResponse({ success: true, data: tabInfo });
                    break;

                case 'SAVE_CAPTURED_DATA':
                    await this.saveCapturedData(request.data);
                    sendResponse({ success: true });
                    break;

                case 'JWT_EXCHANGE':
                    const jwtResult = await this.handleJWTExchange(request.token);
                    sendResponse(jwtResult);
                    break;

                case 'START_AUTH':
                    const authResult = await this.startAuthentication();
                    sendResponse(authResult);
                    break;

                case 'AUTHENTICATED_REQUEST':
                    const requestResult = await this.makeAuthenticatedRequest(request.url, request.options);
                    sendResponse(requestResult);
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown message type' });
            }
        } catch (error) {
            console.error('Error handling message:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    async handleExternalMessage(request, sender, sendResponse) {
        try {
            // Only accept messages from redesignr.ai domain
            const allowedOrigins = ['https://redesignr.ai', 'http://localhost:3000', 'http://localhost:5008'];
            const senderOrigin = new URL(sender.url).origin;
            
            if (!allowedOrigins.includes(senderOrigin)) {
                sendResponse({ success: false, error: 'Unauthorized origin' });
                return;
            }

            switch (request.type) {
                case 'JWT_TOKEN':
                    // Handle JWT token from website
                    await this.handleJWTFromWebsite(request.token);
                    sendResponse({ success: true });
                    break;

                case 'AUTH_SUCCESS':
                    // Handle auth success from website
                    await this.handleAuthSuccessFromWebsite(request.data);
                    sendResponse({ success: true });
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown external message type' });
            }
        } catch (error) {
            console.error('Error handling external message:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    async startAuthentication() {
        try {
            const user = await this.authManager.authenticate();
            return { success: true, user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async makeAuthenticatedRequest(url, options) {
        try {
            const response = await this.authManager.makeAuthenticatedRequest(url, options);
            
            if (response.ok) {
                const data = await response.json();
                return { success: true, data };
            } else {
                const error = await response.json();
                return { success: false, error: error.message || 'Request failed' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async handleJWTExchange(token) {
        try {
            const result = await this.authManager.exchangeJWT(token);
            return result;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async handleJWTFromWebsite(token) {
        try {
            // Forward JWT token to popup if it's open
            chrome.runtime.sendMessage({
                type: 'JWT_TOKEN_RECEIVED',
                token: token
            });

            // Also try to exchange it directly
            const result = await this.authManager.exchangeJWT(token);
            
            if (result.success) {
                chrome.runtime.sendMessage({
                    type: 'AUTH_SUCCESS',
                    user: result.user
                });
            }
        } catch (error) {
            console.error('Error handling JWT from website:', error);
        }
    }

    async handleAuthSuccessFromWebsite(data) {
        try {
            // Forward auth success to popup
            chrome.runtime.sendMessage({
                type: 'AUTH_SUCCESS',
                user: data.user
            });
        } catch (error) {
            console.error('Error handling auth success from website:', error);
        }
    }

    async handleContextMenuClick(info, tab) {
        try {
            if (info.menuItemId === 'redesign-page') {
                // Open popup or directly start redesign process
                chrome.action.openPopup();
            } else if (info.menuItemId === 'create-from-selection') {
                // Create website from selected text
                const data = {
                    selectedText: info.selectionText,
                    url: tab.url,
                    mode: 'create'
                };
                await this.openMainApp(data);
            }
        } catch (error) {
            console.error('Error handling context menu click:', error);
        }
    }

    async capturePageData(tabId) {
        return new Promise((resolve, reject) => {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: this.capturePageContent
            }, (results) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                    return;
                }
                
                if (results && results[0] && results[0].result) {
                    resolve(results[0].result);
                } else {
                    reject(new Error('Failed to capture page content'));
                }
            });
        });
    }

    // Function to be injected into the page for capturing content
    capturePageContent() {
        try {
            // Helper function to clean HTML
            const cleanHtml = (html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Remove script tags
                const scripts = doc.querySelectorAll('script');
                scripts.forEach(script => script.remove());
                
                // Remove problematic attributes
                const allElements = doc.querySelectorAll('*');
                allElements.forEach(el => {
                    el.removeAttribute('data-reactid');
                    el.removeAttribute('data-react-checksum');
                });
                
                return doc.documentElement.outerHTML;
            };

            // Get page content
            const htmlContent = cleanHtml(document.documentElement.outerHTML);
            
            // Get computed styles for main elements
            const getComputedCSS = () => {
                const styles = [];
                const elements = document.querySelectorAll('*');
                
                elements.forEach(el => {
                    const computed = window.getComputedStyle(el);
                    const selector = el.tagName.toLowerCase() + 
                        (el.id ? `#${el.id}` : '') + 
                        (el.className ? `.${el.className.split(' ').join('.')}` : '');
                    
                    styles.push({
                        selector: selector,
                        styles: {
                            display: computed.display,
                            position: computed.position,
                            width: computed.width,
                            height: computed.height,
                            margin: computed.margin,
                            padding: computed.padding,
                            backgroundColor: computed.backgroundColor,
                            color: computed.color,
                            fontSize: computed.fontSize,
                            fontFamily: computed.fontFamily
                        }
                    });
                });
                
                return styles;
            };

            // Get page metadata
            const metadata = {
                title: document.title,
                description: document.querySelector('meta[name="description"]')?.content || '',
                keywords: document.querySelector('meta[name="keywords"]')?.content || '',
                viewport: document.querySelector('meta[name="viewport"]')?.content || '',
                charset: document.characterSet || 'UTF-8',
                lang: document.documentElement.lang || 'en',
                url: window.location.href,
                domain: window.location.hostname
            };

            // Get images
            const images = Array.from(document.images).map(img => ({
                src: img.src,
                alt: img.alt,
                width: img.width,
                height: img.height
            }));

            // Get links
            const links = Array.from(document.links).map(link => ({
                href: link.href,
                text: link.textContent,
                title: link.title
            }));

            return {
                html: htmlContent,
                css: getComputedCSS(),
                metadata: metadata,
                images: images,
                links: links,
                timestamp: new Date().toISOString(),
                windowSize: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            };
        } catch (error) {
            throw new Error('Failed to capture page content: ' + error.message);
        }
    }

    async openMainApp(data) {
        const appUrl = 'https://redesignr.ai';
        
        try {
            // Check if app is already open
            const tabs = await chrome.tabs.query({ url: `${appUrl}/*` });
            
            if (tabs.length > 0) {
                // App is open, focus on it and send data
                chrome.tabs.update(tabs[0].id, { active: true });
                
                // Send data to the app
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'EXTENSION_DATA',
                    data: data
                });
            } else {
                // Store data temporarily
                await chrome.storage.local.set({
                    pendingData: data,
                    pendingTimestamp: Date.now()
                });
                
                // Open new tab with app
                chrome.tabs.create({
                    url: `${appUrl}?source=extension`,
                    active: true
                });
            }
        } catch (error) {
            console.error('Error opening main app:', error);
            throw error;
        }
    }

    async getTabInfo(tabId) {
        const tab = await chrome.tabs.get(tabId);
        return {
            url: tab.url,
            title: tab.title,
            favIconUrl: tab.favIconUrl
        };
    }

    async saveCapturedData(data) {
        const timestamp = new Date().toISOString();
        const key = `captured_${timestamp}`;
        
        await chrome.storage.local.set({
            [key]: data,
            lastCaptured: timestamp
        });
    }

    handleTabUpdate(tabId, tab) {
        // Handle tab updates if needed
        // This can be used to track page changes or auto-capture
    }
}

// Initialize the background service
new BackgroundService();