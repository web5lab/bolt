class WebsiteAIExtension {
    constructor() {
        this.currentMode = 'redesign';
        this.currentUrl = '';
        this.capturedData = null;
        this.isAuthenticated = false;
        this.user = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.getCurrentUrl();
        this.loadSavedData();
        this.checkAuthentication();
    }

    async checkAuthentication() {
        console.log('Checking authentication status...');
        try {
            // First check local storage directly
            const result = await chrome.storage.local.get(['authToken', 'user']);
            console.log('Local storage check:', result);
            
            if (result.authToken && result.user) {
                this.isAuthenticated = true;
                this.user = result.user;
                console.log('Found stored auth - setting authenticated state');
                
                // Verify token is still valid
                try {
                    const response = await fetch('http://localhost:5008/auth/me', {
                        headers: {
                            'Authorization': `Bearer ${result.authToken}`
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        this.user = data.user; // Update with fresh user data
                        console.log('Authentication verified:', this.user);
                    } else {
                        console.log('Token verification failed');
                        await chrome.storage.local.remove(['authToken', 'user']);
                        this.isAuthenticated = false;
                        this.user = null;
                    }
                } catch (error) {
                    console.error('Token verification error:', error);
                    // Keep local auth if server is unreachable
                    console.log('Server unreachable, keeping local auth');
                }
            } else {
                console.log('No stored authentication found');
                this.isAuthenticated = false;
                this.user = null;
            }
            
            // Also check via background script as fallback
            const bgResponse = await new Promise((resolve) => {
                chrome.runtime.sendMessage({ type: 'AUTH_CHECK' }, (response) => {
                    resolve(response || { isAuthenticated: false, user: null });
                });
            });
            
            console.log('Background script response:', bgResponse);
            
            // Use background script result if local check failed
            if (!this.isAuthenticated && bgResponse.isAuthenticated) {
                this.isAuthenticated = bgResponse.isAuthenticated;
                this.user = bgResponse.user;
            }
            
            this.updateUI();
        } catch (error) {
            console.error('Auth check failed:', error);
            this.isAuthenticated = false;
            this.user = null;
            this.updateUI();
        }
    }

    updateUI() {
        const authSection = document.getElementById('auth-section');
        const mainContent = document.getElementById('main-content');
        
        console.log('Updating UI - isAuthenticated:', this.isAuthenticated, 'user:', this.user);
        
        if (this.isAuthenticated) {
            console.log('User is authenticated, showing main content');
            authSection.style.display = 'none';
            mainContent.style.display = 'block';
            this.updateUserInfo();
        } else {
            console.log('User is not authenticated, showing auth section');
            authSection.style.display = 'block';
            mainContent.style.display = 'none';
        }
    }

    updateUserInfo() {
        const userInfo = document.getElementById('user-info');
        if (userInfo && this.user) {
            userInfo.innerHTML = `
                <div class="user-profile">
                    <img src="${this.user.avatar || 'https://via.placeholder.com/32'}" alt="${this.user.name}" class="user-avatar">
                    <div class="user-details">
                        <div class="user-name">${this.user.name}</div>
                        <div class="user-email">${this.user.email}</div>
                    </div>
                    <button class="logout-btn" id="logout-btn">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16,17 21,12 16,7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                    </button>
                </div>
            `;
            
            document.getElementById('logout-btn').addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }

    setupEventListeners() {
        // Listen for auth success messages
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log('Popup received message:', request);
            if (request.type === 'AUTH_SUCCESS') {
                console.log('Received auth success message:', request.user);
                this.isAuthenticated = true;
                this.user = request.user;
                console.log('Setting authenticated state and updating UI');
                this.updateUI();
                this.showSuccess('Authentication successful!');
                sendResponse({ success: true });
            } else if (request.type === 'AUTH_TOKEN_RECEIVED') {
                console.log('Received auth token message:', request);
                this.handleAuthTokenReceived(request.token, request.user);
                sendResponse({ success: true });
            }
        });
        
        // Auth buttons
        document.getElementById('redesignr-auth-btn').addEventListener('click', () => {
            this.handleRedesignrAuth();
        });

        document.getElementById('jwt-exchange-btn').addEventListener('click', () => {
            this.showJWTInput();
        });

        document.getElementById('jwt-submit-btn').addEventListener('click', () => {
            this.handleJWTSubmit();
        });

        document.getElementById('jwt-cancel-btn').addEventListener('click', () => {
            this.hideJWTInput();
        });

        // Tab switching
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const mode = tab.dataset.mode;
                this.switchMode(mode);
            });
        });

        // Submit buttons
        document.getElementById('redesign-submit').addEventListener('click', () => {
            this.handleRedesignSubmit();
        });

        document.getElementById('docs-submit').addEventListener('click', () => {
            this.handleDocsSubmit();
        });

        document.getElementById('create-submit').addEventListener('click', () => {
            this.handleCreateSubmit();
        });

        // Auto-save form data
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', () => {
                this.saveFormData();
            });
        });
    }

    async handleRedesignrAuth() {
        try {
            console.log('Starting redesignr.ai authentication');
            this.showLoading('Authenticating...');
            
            // Send message to background script to handle authentication
            chrome.runtime.sendMessage({ type: 'START_AUTH' }, (response) => {
                if (response && response.success) {
                    console.log('Auth started successfully');
                } else {
                    throw new Error('Failed to start authentication');
                }
            });
            
            this.hideLoading();
            
        } catch (error) {
            console.error('Authentication failed:', error);
            this.showError('Authentication failed. Please try again.');
            this.isAuthenticated = false;
            this.user = null;
            this.updateUI();
            this.hideLoading();
        }
    }

    showJWTInput() {
        document.getElementById('jwt-input-section').style.display = 'block';
        document.getElementById('jwt-token-input').focus();
    }

    hideJWTInput() {
        document.getElementById('jwt-input-section').style.display = 'none';
        document.getElementById('jwt-token-input').value = '';
    }

    async handleJWTSubmit() {
        const jwtToken = document.getElementById('jwt-token-input').value.trim();
        
        if (!jwtToken) {
            this.showError('Please enter a JWT token');
            return;
        }

        try {
            this.showLoading('Validating JWT token...');
            
            // Send JWT to background script for exchange
            const result = await new Promise((resolve) => {
                chrome.runtime.sendMessage({ 
                    type: 'JWT_EXCHANGE', 
                    token: jwtToken 
                }, resolve);
            });
            
            if (result.success) {
                this.isAuthenticated = true;
                this.user = result.user;
                this.updateUI();
                this.hideJWTInput();
                this.showSuccess('Authentication successful!');
            } else {
                throw new Error(result.error || 'JWT exchange failed');
            }
            
        } catch (error) {
            console.error('JWT authentication failed:', error);
            this.showError('Invalid JWT token. Please check your token and try again.');
        } finally {
            this.hideLoading();
        }
    }

    // Handle JWT token received from redesignr.ai website
    async handleJWTTokenReceived(token) {
        try {
            console.log('Handling JWT token from website');
            this.showLoading('Processing authentication...');
            
            const result = await this.authManager.exchangeJWT(token);
            
            if (result.success) {
                this.isAuthenticated = true;
                this.user = result.user;
                this.updateUI();
                this.showSuccess('Authentication successful!');
            }
        } catch (error) {
            console.error('JWT token processing failed:', error);
            this.showError('Authentication failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async handleLogout() {
        try {
            this.showLoading('Logging out...');
            
            // Send logout message to background script
            await new Promise((resolve) => {
                chrome.runtime.sendMessage({ type: 'AUTH_LOGOUT' }, resolve);
            });
            
            this.isAuthenticated = false;
            this.user = null;
            
            this.updateUI();
            this.showSuccess('Logged out successfully!');
            this.hideLoading();
            
        } catch (error) {
            console.error('Logout failed:', error);
            this.showError('Logout failed. Please try again.');
            this.hideLoading();
        }
    }

    switchMode(mode) {
        if (!this.isAuthenticated) {
            this.showError('Please authenticate first');
            return;
        }
        
        this.currentMode = mode;
        
        // Update tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.mode-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelector(`.mode-content[data-mode="${mode}"]`).classList.add('active');

        // Save current mode
        chrome.storage.local.set({ currentMode: mode });
    }

    async getCurrentUrl() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            this.currentUrl = tab.url;
            document.getElementById('current-url').textContent = this.currentUrl;
        } catch (error) {
            console.error('Error getting current URL:', error);
            document.getElementById('current-url').textContent = 'Unable to detect URL';
        }
    }

    async handleRedesignSubmit() {
        if (!this.isAuthenticated) {
            this.showError('Please authenticate first');
            return;
        }
        
        const instructions = document.getElementById('redesign-instructions').value;
        
        try {
            this.showLoading();
            
            // Update status
            this.updateStatus('Capturing page content...', 'pending');
            
            // Capture HTML and additional data
            const capturedData = await this.capturePageData();
            
            this.updateStatus('Content captured successfully!', 'success');
            
            // Prepare data for main application
            const formData = {
                url: this.currentUrl,
                instructions: instructions,
                capturedHtml: capturedData.html,
                capturedCss: capturedData.css,
                capturedJs: capturedData.js,
                screenshots: capturedData.screenshots,
                mode: 'redesign'
            };

            // Send to main application
            await this.sendToServer(formData, 'redesign-website');
            
        } catch (error) {
            console.error('Error in redesign process:', error);
            this.updateStatus('Error capturing content', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async handleDocsSubmit() {
        if (!this.isAuthenticated) {
            this.showError('Please authenticate first');
            return;
        }
        
        const instructions = document.getElementById('docs-instructions').value;
        const focus = document.getElementById('docs-focus').value;
        
        if (!instructions.trim()) {
            this.showError('Please provide documentation requirements');
            return;
        }

        try {
            this.showLoading();
            
            const formData = {
                instructions: instructions,
                focus: focus,
                url: this.currentUrl,
                mode: 'docs'
            };

            await this.sendToServer(formData, 'generate-docs');
            
        } catch (error) {
            console.error('Error in docs process:', error);
            this.showError('Error processing documentation request');
        } finally {
            this.hideLoading();
        }
    }

    async handleCreateSubmit() {
        if (!this.isAuthenticated) {
            this.showError('Please authenticate first');
            return;
        }
        
        const instructions = document.getElementById('create-instructions').value;
        const style = document.getElementById('create-style').value;
        
        if (!instructions.trim()) {
            this.showError('Please describe your website');
            return;
        }

        try {
            this.showLoading();
            
            const formData = {
                instructions: instructions,
                style: style,
                mode: 'create'
            };

            await this.sendToServer(formData, 'create-website');
            
        } catch (error) {
            console.error('Error in create process:', error);
            this.showError('Error processing creation request');
        } finally {
            this.hideLoading();
        }
    }

    async capturePageData() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length === 0) {
                    reject(new Error('No active tab found'));
                    return;
                }

                // Inject content script to capture data
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
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
        });
    }

    // Function to be injected into the page
    capturePageContent() {
        try {
            // Get HTML content
            const htmlContent = document.documentElement.outerHTML;
            
            // Get CSS content
            const cssContent = Array.from(document.styleSheets)
                .map(sheet => {
                    try {
                        return Array.from(sheet.cssRules)
                            .map(rule => rule.cssText)
                            .join('\n');
                    } catch (e) {
                        return '';
                    }
                })
                .join('\n');

            // Get JavaScript content (basic capture)
            const jsContent = Array.from(document.scripts)
                .map(script => script.innerHTML)
                .join('\n');

            // Get basic page info
            const pageInfo = {
                title: document.title,
                description: document.querySelector('meta[name="description"]')?.content || '',
                keywords: document.querySelector('meta[name="keywords"]')?.content || '',
                viewport: document.querySelector('meta[name="viewport"]')?.content || '',
                charset: document.characterSet || 'UTF-8'
            };

            return {
                html: htmlContent,
                css: cssContent,
                js: jsContent,
                pageInfo: pageInfo,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            throw new Error('Failed to capture page content: ' + error.message);
        }
    }

    async sendToServer(formData, endpoint) {
        try {
            // Send request through background script
            const result = await new Promise((resolve) => {
                chrome.runtime.sendMessage({
                    type: 'AUTHENTICATED_REQUEST',
                    url: `https://redesignr.ai/api/${endpoint}`,
                    options: {
                        method: 'POST',
                        body: JSON.stringify(formData)
                    }
                }, resolve);
            });

            if (result.success) {
                this.showSuccess('Request sent successfully!');
                console.log('Server response:', result.data);
            } else {
                throw new Error(result.error || 'Server request failed');
            }
        } catch (error) {
            if (error.message === 'Authentication expired') {
                this.isAuthenticated = false;
                this.user = null;
                this.updateUI();
                this.showError('Session expired. Please login again.');
            } else {
                throw error;
            }
        }
    }

    async sendToMainApp(formData) {
        // Store data locally first
        await chrome.storage.local.set({
            lastSubmission: {
                data: formData,
                timestamp: new Date().toISOString()
            }
        });

        // Try to open the main application
        const appUrl = 'https://yourdomain.com'; // Replace with your actual domain
        
        try {
            // Check if app is already open
            const tabs = await chrome.tabs.query({ url: `${appUrl}/*` });
            
            if (tabs.length > 0) {
                // App is open, focus on it and send data
                chrome.tabs.update(tabs[0].id, { active: true });
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'EXTENSION_DATA',
                    data: formData
                });
            } else {
                // Open new tab with app
                chrome.tabs.create({
                    url: `${appUrl}?source=extension`,
                    active: true
                });
            }

            this.showSuccess('Data sent to Website AI successfully!');
            
        } catch (error) {
            console.error('Error sending to main app:', error);
            this.showError('Please open the Website AI app manually to access your data');
        }
    }

    updateStatus(message, type) {
        const statusElement = document.querySelector('.status-item span:last-child');
        const dotElement = document.querySelector('.status-dot');
        
        if (statusElement && dotElement) {
            statusElement.textContent = message;
            dotElement.className = `status-dot ${type}`;
        }
    }

    showLoading(message = 'Processing with AI...') {
        document.getElementById('loading-overlay').classList.add('active');
        document.querySelector('.loading-text').textContent = message;
    }

    hideLoading() {
        document.getElementById('loading-overlay').classList.remove('active');
    }

    showError(message) {
        console.error('Error:', message);
        // Create a simple error toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10000;
            font-size: 14px;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    showSuccess(message) {
        console.log('Success:', message);
        // Create a simple toast notification instead of alert
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10000;
            font-size: 14px;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    saveFormData() {
        const formData = {
            redesignInstructions: document.getElementById('redesign-instructions').value,
            docsInstructions: document.getElementById('docs-instructions').value,
            docsFocus: document.getElementById('docs-focus').value,
            createInstructions: document.getElementById('create-instructions').value,
            createStyle: document.getElementById('create-style').value
        };

        chrome.storage.local.set({ formData });
    }

    async loadSavedData() {
        try {
            const result = await chrome.storage.local.get(['formData', 'currentMode']);
            
            if (result.formData) {
                document.getElementById('redesign-instructions').value = result.formData.redesignInstructions || '';
                document.getElementById('docs-instructions').value = result.formData.docsInstructions || '';
                document.getElementById('docs-focus').value = result.formData.docsFocus || '';
                document.getElementById('create-instructions').value = result.formData.createInstructions || '';
                document.getElementById('create-style').value = result.formData.createStyle || '';
            }

            if (result.currentMode) {
                this.switchMode(result.currentMode);
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Initialize the extension when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WebsiteAIExtension();
});