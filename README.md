# Website AI Chrome Extension

A powerful Chrome extension that integrates with your Website AI tool to capture, redesign, and create websites with AI assistance.

## Features

### 🎨 Redesign Website Mode
- Capture complete HTML, CSS, and JavaScript of any webpage
- Extract page metadata, images, and structure
- Send captured data to your AI tool for redesigning
- Optional instructions for specific redesign requirements

### 📚 Create Documentation Mode
- Generate beautiful documentation with AI
- Provide requirements and focus areas
- Perfect for creating user guides, API docs, and tutorials

### ⚡ Create New Website Mode
- Build websites from scratch with AI
- Describe your vision and style preferences
- Generate production-ready code instantly

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will appear in your toolbar

## Setup

1. **Icons**: Create PNG icons for sizes 16x16, 32x32, 48x48, and 128x128 pixels and place them in the `icons/` folder
2. **App URL**: Update the `appUrl` variable in `background.js` and `popup.js` to match your Website AI application URL
3. **Permissions**: The extension requests permissions for:
   - `activeTab`: To capture content from the current tab
   - `storage`: To save user preferences and captured data
   - `scripting`: To inject content scripts for data capture

## Usage

### Redesign Mode
1. Navigate to any webpage you want to redesign
2. Click the extension icon
3. Select "Redesign" mode
4. Add optional instructions for specific requirements
5. Click "Capture & Redesign" to send data to your AI tool

### Documentation Mode
1. Click the extension icon
2. Select "Docs" mode
3. Describe your documentation requirements
4. Add focus areas (optional)
5. Click "Generate Documentation"

### Create Mode
1. Click the extension icon
2. Select "Create" mode
3. Describe your desired website
4. Add style preferences (optional)
5. Click "Create Website"

## Technical Details

### Architecture
- **Manifest V3**: Uses the latest Chrome extension manifest version
- **Content Script**: Injected into web pages for data capture
- **Background Script**: Handles communication and context menus
- **Popup**: Main interface for user interaction

### Data Capture
The extension captures:
- Complete HTML structure (cleaned and sanitized)
- CSS styles (both external and inline)
- Page metadata (title, description, keywords, etc.)
- Images with dimensions and alt text
- Links and navigation structure
- Forms and input fields
- Accessibility information
- Performance metrics

### Security
- All scripts are sanitized before capture
- No sensitive data is stored locally
- Cross-origin requests are handled properly
- Data is encrypted during transmission

## Customization

### Styling
The extension uses a dark theme matching your Website AI tool:
- Primary colors: Purple/Indigo gradients
- Background: Dark slate colors
- Interactive elements: Smooth animations and transitions

### Communication
The extension communicates with your main application through:
- Chrome storage API for local data
- Message passing between scripts
- Tab management for opening your app

## Development

### File Structure
```
├── manifest.json          # Extension configuration
├── popup.html             # Main popup interface
├── popup.css              # Popup styling
├── popup.js               # Popup functionality
├── background.js          # Background service worker
├── content.js             # Content script for data capture
└── icons/                 # Extension icons
```

### Testing
1. Load the extension in developer mode
2. Test on various websites
3. Check console for any errors
4. Verify data capture accuracy

### Building
The extension is ready to use as-is. For production:
1. Create proper PNG icons
2. Update the app URL
3. Test thoroughly
4. Package for Chrome Web Store

## Browser Support

- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)
- Manifest V3 compatible browsers

## License

This extension is part of the Website AI tool ecosystem. Please refer to your main application's license terms.

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify the extension permissions are granted
3. Ensure your main application is accessible
4. Contact your Website AI tool support team

## Version History

### v1.0.0
- Initial release
- Redesign, documentation, and create modes
- Complete page capture functionality
- Modern UI with dark theme
- Context menu integration