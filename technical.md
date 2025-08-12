# Technical Integration Guide

## React Integration for website-integration.js

This guide explains how to integrate the Chrome extension with your React-based redesignr.ai website.

### 1. Installation & Setup

#### Option A: Direct Script Integration
```jsx
// In your React component or index.html
useEffect(() => {
  const script = document.createElement('script');
  script.src = '/website-integration.js';
  script.async = true;
  document.head.appendChild(script);
  
  return () => {
    document.head.removeChild(script);
  };
}, []);
```

#### Option B: ES6 Module Integration
```jsx
// Create a React hook for extension integration
import { useEffect, useState } from 'react';

const useExtensionIntegration = () => {
  const [extensionConnected, setExtensionConnected] = useState(false);
  const [extensionId, setExtensionId] = useState(null);

  useEffect(() => {
    // Initialize extension integration
    const initExtension = async () => {
      try {
        const extensionId = 'your-extension-id'; // Replace with actual ID
        
        // Test connection to extension
        if (typeof chrome !== 'undefined' && chrome.runtime) {
          chrome.runtime.sendMessage(extensionId, { type: 'PING' }, (response) => {
            if (chrome.runtime.lastError) {
              console.log('Extension not detected');
              setExtensionConnected(false);
            } else {
              console.log('Extension detected');
              setExtensionId(extensionId);
              setExtensionConnected(true);
            }
          });
        }
      } catch (error) {
        console.log('Extension detection failed:', error);
        setExtensionConnected(false);
      }
    };

    initExtension();
  }, []);

  const sendJWTToExtension = async (token) => {
    if (!extensionId) return false;

    try {
      chrome.runtime.sendMessage(extensionId, {
        type: 'JWT_TOKEN',
        token: token
      });
      return true;
    } catch (error) {
      console.error('Failed to send JWT to extension:', error);
      return false;
    }
  };

  const sendAuthSuccess = async (token, user) => {
    if (!extensionId) return false;

    try {
      chrome.runtime.sendMessage(extensionId, {
        type: 'AUTH_SUCCESS',
        data: { token, user }
      });
      return true;
    } catch (error) {
      console.error('Failed to send auth success to extension:', error);
      return false;
    }
  };

  return {
    extensionConnected,
    sendJWTToExtension,
    sendAuthSuccess
  };
};

export default useExtensionIntegration;
```

### 2. Authentication Integration

#### Login Component Example
```jsx
import React, { useState } from 'react';
import useExtensionIntegration from './hooks/useExtensionIntegration';

const LoginComponent = () => {
  const [user, setUser] = useState(null);
  const { extensionConnected, sendAuthSuccess } = useExtensionIntegration();

  const handleLogin = async (credentials) => {
    try {
      // Your existing login logic
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const { token, user } = await response.json();
      
      // Store user data
      setUser(user);
      localStorage.setItem('authToken', token);

      // Send to extension if connected
      if (extensionConnected) {
        await sendAuthSuccess(token, user);
        showNotification('Authentication synced with extension!');
      }

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      {extensionConnected && (
        <div className="extension-status">
          ✅ Chrome Extension Connected
        </div>
      )}
      
      {/* Your login form */}
      <form onSubmit={handleLogin}>
        {/* Login fields */}
      </form>
    </div>
  );
};
```

#### JWT Token Generation Component
```jsx
import React, { useState } from 'react';
import useExtensionIntegration from './hooks/useExtensionIntegration';

const ExtensionAuthComponent = () => {
  const [jwtToken, setJwtToken] = useState('');
  const { extensionConnected, sendJWTToExtension } = useExtensionIntegration();

  const generateJWT = async () => {
    try {
      const response = await fetch('/api/auth/generate-jwt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const { jwt } = await response.json();
      setJwtToken(jwt);

      // Automatically send to extension if connected
      if (extensionConnected) {
        const success = await sendJWTToExtension(jwt);
        if (success) {
          showNotification('JWT sent to extension successfully!');
        }
      }

    } catch (error) {
      console.error('JWT generation failed:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jwtToken);
    showNotification('JWT copied to clipboard!');
  };

  return (
    <div className="extension-auth">
      <h3>Chrome Extension Authentication</h3>
      
      {extensionConnected ? (
        <div className="connected-state">
          <div className="status-indicator">
            <span className="status-dot"></span>
            Extension Connected
          </div>
          <button onClick={generateJWT} className="generate-btn">
            Send JWT to Extension
          </button>
        </div>
      ) : (
        <div className="disconnected-state">
          <p>Chrome extension not detected.</p>
          <button onClick={generateJWT} className="generate-btn">
            Generate JWT Token
          </button>
          
          {jwtToken && (
            <div className="jwt-display">
              <textarea 
                value={jwtToken} 
                readOnly 
                className="jwt-textarea"
              />
              <button onClick={copyToClipboard} className="copy-btn">
                Copy JWT
              </button>
              <p className="instructions">
                Copy this JWT and paste it in the Chrome extension popup.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

### 3. Context Provider Pattern

#### Extension Context
```jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ExtensionContext = createContext();

export const ExtensionProvider = ({ children }) => {
  const [extensionConnected, setExtensionConnected] = useState(false);
  const [extensionId, setExtensionId] = useState(null);

  useEffect(() => {
    const detectExtension = async () => {
      const extensionId = process.env.REACT_APP_EXTENSION_ID || 'your-extension-id';
      
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        try {
          chrome.runtime.sendMessage(extensionId, { type: 'PING' }, (response) => {
            if (!chrome.runtime.lastError) {
              setExtensionId(extensionId);
              setExtensionConnected(true);
            }
          });
        } catch (error) {
          console.log('Extension not available');
        }
      }
    };

    detectExtension();
  }, []);

  const sendToExtension = async (type, data) => {
    if (!extensionId) return false;

    try {
      chrome.runtime.sendMessage(extensionId, { type, ...data });
      return true;
    } catch (error) {
      console.error('Failed to send message to extension:', error);
      return false;
    }
  };

  const value = {
    extensionConnected,
    sendToExtension,
    sendJWT: (token) => sendToExtension('JWT_TOKEN', { token }),
    sendAuthSuccess: (token, user) => sendToExtension('AUTH_SUCCESS', { data: { token, user } })
  };

  return (
    <ExtensionContext.Provider value={value}>
      {children}
    </ExtensionContext.Provider>
  );
};

export const useExtension = () => {
  const context = useContext(ExtensionContext);
  if (!context) {
    throw new Error('useExtension must be used within ExtensionProvider');
  }
  return context;
};
```

### 4. App.js Integration

```jsx
import React from 'react';
import { ExtensionProvider } from './contexts/ExtensionContext';
import { AuthProvider } from './contexts/AuthContext';
import ExtensionStatusBar from './components/ExtensionStatusBar';

function App() {
  return (
    <ExtensionProvider>
      <AuthProvider>
        <div className="App">
          <ExtensionStatusBar />
          {/* Your app components */}
        </div>
      </AuthProvider>
    </ExtensionProvider>
  );
}

export default App;
```

### 5. Extension Status Component

```jsx
import React from 'react';
import { useExtension } from '../contexts/ExtensionContext';
import './ExtensionStatusBar.css';

const ExtensionStatusBar = () => {
  const { extensionConnected } = useExtension();

  if (!extensionConnected) {
    return (
      <div className="extension-prompt">
        <div className="extension-prompt-content">
          <span className="extension-icon">🔌</span>
          <div className="extension-text">
            <strong>Install Redesignr AI Extension</strong>
            <p>Get seamless website redesigning capabilities</p>
          </div>
          <button 
            onClick={() => window.open('chrome://extensions/', '_blank')}
            className="install-extension-btn"
          >
            Install Extension
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="extension-connected">
      <span className="status-dot"></span>
      <span>Extension Connected</span>
    </div>
  );
};

export default ExtensionStatusBar;
```

### 6. Backend API Implementation

#### JWT Exchange Endpoint
```javascript
// Express.js example
app.post('/api/auth/exchange', authenticateJWT, async (req, res) => {
  try {
    const { source, timestamp } = req.body;
    
    // Validate the request
    if (source !== 'chrome_extension') {
      return res.status(400).json({ message: 'Invalid source' });
    }

    // Generate extension-specific token
    const extensionToken = jwt.sign(
      { 
        userId: req.user.id,
        email: req.user.email,
        source: 'extension',
        timestamp 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token: extensionToken,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'JWT exchange failed' });
  }
});

// JWT Generation for manual entry
app.post('/api/auth/generate-jwt', authenticateJWT, async (req, res) => {
  try {
    const extensionJWT = jwt.sign(
      {
        userId: req.user.id,
        email: req.user.email,
        name: req.user.name,
        source: 'manual_entry',
        timestamp: Date.now()
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Shorter expiry for manual tokens
    );

    res.json({ jwt: extensionJWT });
  } catch (error) {
    res.status(500).json({ message: 'JWT generation failed' });
  }
});
```

### 7. Environment Variables

```bash
# .env file
REACT_APP_EXTENSION_ID=your-actual-extension-id
REACT_APP_API_URL=https://redesignr.ai/api
```

### 8. CSS Styles

```css
/* ExtensionStatusBar.css */
.extension-prompt {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  margin: 16px;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.extension-prompt-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.extension-icon {
  font-size: 24px;
}

.extension-text strong {
  display: block;
  font-size: 16px;
  margin-bottom: 4px;
}

.extension-text p {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

.install-extension-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.install-extension-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.extension-connected {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin: 16px;
  width: fit-content;
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
```

### 9. Testing Integration

```jsx
// Test component for development
const ExtensionTest = () => {
  const { extensionConnected, sendJWT, sendAuthSuccess } = useExtension();

  const testJWT = () => {
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Test JWT
    sendJWT(testToken);
  };

  const testAuth = () => {
    const testUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    const testToken = 'test-token';
    sendAuthSuccess(testToken, testUser);
  };

  return (
    <div className="extension-test">
      <h3>Extension Testing</h3>
      <p>Status: {extensionConnected ? '✅ Connected' : '❌ Not Connected'}</p>
      <button onClick={testJWT}>Test JWT Send</button>
      <button onClick={testAuth}>Test Auth Success</button>
    </div>
  );
};
```

### 10. Production Checklist

- [ ] Replace `'your-extension-id'` with actual extension ID
- [ ] Set up environment variables
- [ ] Implement backend JWT endpoints
- [ ] Test authentication flow
- [ ] Add error handling and loading states
- [ ] Implement proper security measures
- [ ] Test on different browsers
- [ ] Add analytics tracking
- [ ] Set up monitoring and logging

### 11. Security Considerations

1. **JWT Validation**: Always validate JWT tokens on the backend
2. **CORS Configuration**: Properly configure CORS for extension communication
3. **Token Expiry**: Use appropriate expiry times for different token types
4. **Rate Limiting**: Implement rate limiting on JWT generation endpoints
5. **Error Handling**: Don't expose sensitive information in error messages

### 12. Troubleshooting

**Extension not detected:**
- Check if extension is installed and enabled
- Verify extension ID is correct
- Check browser console for errors

**JWT exchange fails:**
- Verify backend endpoints are working
- Check JWT token format and expiry
- Ensure proper CORS configuration

**Authentication not syncing:**
- Check message passing between website and extension
- Verify extension permissions
- Test with browser developer tools

This integration provides a seamless experience where users can authenticate on your React website and automatically sync with the Chrome extension, or manually generate JWT tokens for extension authentication.