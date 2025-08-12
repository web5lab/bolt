# Testing Your Chrome Extension

## Step 1: Create Icon Files
Since we can't create binary PNG files here, you'll need to create icon files manually:

1. Create 4 PNG files in the `icons/` folder:
   - `icon16.png` (16x16 pixels)
   - `icon32.png` (32x32 pixels) 
   - `icon48.png` (48x48 pixels)
   - `icon128.png` (128x128 pixels)

You can:
- Use any image editor (Photoshop, GIMP, Canva, etc.)
- Create simple colored squares with your brand colors
- Use online icon generators
- Download free icons from sites like Flaticon or Icons8

## Step 2: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in the address bar
   - OR go to Chrome Menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load Your Extension**
   - Click "Load unpacked" button
   - Select the folder containing your extension files
   - The extension should appear in your extensions list

## Step 3: Test the Extension

1. **Check Installation**
   - Look for the extension icon in your Chrome toolbar
   - If not visible, click the puzzle piece icon and pin your extension

2. **Test Basic Functionality**
   - Click the extension icon to open the popup
   - Try switching between the three modes (Redesign, Docs, Create)
   - Test form inputs and validation

3. **Test Redesign Mode**
   - Navigate to any website (e.g., google.com)
   - Open the extension popup
   - Select "Redesign" mode
   - Add optional instructions
   - Click "Capture & Redesign"

4. **Test Other Modes**
   - Try "Docs" mode with documentation requirements
   - Try "Create" mode with website description

## Step 4: Debug Issues

1. **Check Console Errors**
   - Right-click the extension icon → "Inspect popup"
   - Check the Console tab for JavaScript errors

2. **Check Background Script**
   - Go to `chrome://extensions/`
   - Click "Details" on your extension
   - Click "Inspect views: background page"

3. **Check Permissions**
   - Ensure the extension has the required permissions
   - Try refreshing the page if content script injection fails

## Step 5: Update App URL

Before full testing, update these files with your actual domain:

**In `background.js` and `popup.js`:**
```javascript
const appUrl = 'https://yourdomain.com'; // Replace with your actual domain
```

## Common Issues & Solutions

**Extension won't load:**
- Check manifest.json syntax
- Ensure all referenced files exist
- Check file permissions

**Popup doesn't open:**
- Check popup.html syntax
- Verify CSS and JS files are linked correctly
- Check browser console for errors

**Content capture fails:**
- Check if content.js is properly injected
- Verify site permissions
- Some sites block content scripts

**Icons not showing:**
- Ensure PNG files exist in icons/ folder
- Check file names match manifest.json exactly
- Icons should be actual PNG files, not placeholders

## Testing Checklist

- [ ] Extension loads without errors
- [ ] Popup opens and displays correctly
- [ ] All three tabs work (Redesign, Docs, Create)
- [ ] Form validation works
- [ ] Current URL displays in redesign mode
- [ ] Form data persists between sessions
- [ ] Loading states work
- [ ] Error handling works
- [ ] Context menu appears (right-click on pages)
- [ ] Data capture works on different websites

## Next Steps

Once basic testing works:
1. Test on various websites
2. Test form persistence
3. Test error scenarios
4. Optimize performance
5. Prepare for Chrome Web Store submission