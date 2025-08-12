// Website Integration Script for redesignr.ai
// This script should be included on your redesignr.ai website to enable JWT exchange

class ExtensionIntegration {
    constructor() {
        this.extensionId = null; // Will be set when extension is detected
        this.init();
    }

    init() {
        this.detectExtension();
        this.setupAuthHandlers();
    }

    async detectExtension() {
        try {
            // Try to detect the extension by attempting to send a message
            // You'll need to replace 'your-extension-id' with the actual extension ID
            const extensionId = 'your-extension-id'; // Replace with actual extension ID
            
            chrome.runtime.sendMessage(extensionId, { type: 'PING' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.log('Extension not detected');
                    this.showExtensionPrompt();
                } else {
                    console.log('Extension detected');
                    this.extensionId = extensionId;
                    this.showExtensionIntegration();
                }
            });
        } catch (error) {
            console.log('Extension detection failed:', error);
            this.showExtensionPrompt();
        }
    }

    setupAuthHandlers() {
        // Listen for successful authentication
        document.addEventListener('auth:success', (event) => {
            const { token, user } = event.detail;
            this.handleAuthSuccess(token, user);
        });

        // Listen for JWT token generation
        document.addEventListener('jwt:generated', (event) => {
            const { token } = event.detail;
            this.sendJWTToExtension(token);
        });
    }

    async handleAuthSuccess(token, user) {
        if (!this.extensionId) return;

        try {
            // Send auth success to extension
            chrome.runtime.sendMessage(this.extensionId, {
                type: 'AUTH_SUCCESS',
                data: { token, user }
            });

            this.showSuccessMessage('Authentication synced with extension!');
        } catch (error) {
            console.error('Failed to sync auth with extension:', error);
        }
    }

    async sendJWTToExtension(token) {
        if (!this.extensionId) return;

        try {
            chrome.runtime.sendMessage(this.extensionId, {
                type: 'JWT_TOKEN',
                token: token
            });

            this.showSuccessMessage('JWT token sent to extension!');
        } catch (error) {
            console.error('Failed to send JWT to extension:', error);
        }
    }

    showExtensionPrompt() {
        // Show a prompt to install the extension
        const prompt = document.createElement('div');
        prompt.className = 'extension-prompt';
        prompt.innerHTML = `
            <div class="extension-prompt-content">
                <h3>Install Redesignr AI Extension</h3>
                <p>Get the Chrome extension for seamless website redesigning and creation.</p>
                <button onclick="window.open('chrome://extensions/', '_blank')" class="install-btn">
                    Install Extension
                </button>
                <button onclick="this.parentElement.parentElement.remove()" class="close-btn">
                    ×
                </button>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .extension-prompt {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                color: white;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                z-index: 10000;
                max-width: 300px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .extension-prompt-content h3 {
                margin: 0 0 10px 0;
                font-size: 16px;
            }
            .extension-prompt-content p {
                margin: 0 0 15px 0;
                font-size: 14px;
                opacity: 0.9;
            }
            .install-btn {
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                margin-right: 10px;
            }
            .install-btn:hover {
                background: rgba(255,255,255,0.3);
            }
            .close-btn {
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                opacity: 0.7;
            }
            .close-btn:hover {
                opacity: 1;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(prompt);
    }

    showExtensionIntegration() {
        // Show extension integration UI
        const integration = document.createElement('div');
        integration.className = 'extension-integration';
        integration.innerHTML = `
            <div class="extension-status">
                <span class="status-dot"></span>
                Extension Connected
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .extension-integration {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
            }
            .extension-status {
                display: flex;
                align-items: center;
                gap: 8px;
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.3);
                color: #10b981;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
                backdrop-filter: blur(10px);
            }
            .status-dot {
                width: 8px;
                height: 8px;
                background: #10b981;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(integration);
    }

    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'extension-toast';
        toast.textContent = message;
        
        const style = document.createElement('style');
        style.textContent = `
            .extension-toast {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #10b981;
                color: white;
                padding: 12px 20px;
                border-radius: 6px;
                z-index: 10000;
                font-size: 14px;
                animation: slideDown 0.3s ease;
            }
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); }
                to { transform: translateX(-50%) translateY(0); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Method to generate and send JWT token
    generateAndSendJWT(userToken) {
        if (this.extensionId) {
            this.sendJWTToExtension(userToken);
        }
    }

    // Method to trigger auth success
    triggerAuthSuccess(token, user) {
        document.dispatchEvent(new CustomEvent('auth:success', {
            detail: { token, user }
        }));
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.extensionIntegration = new ExtensionIntegration();
    });
} else {
    window.extensionIntegration = new ExtensionIntegration();
}

// Export for use in other scripts
window.ExtensionIntegration = ExtensionIntegration;