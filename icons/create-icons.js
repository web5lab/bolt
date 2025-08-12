// Simple script to create basic icons for the extension
// Run this in Node.js to generate base64 icons

const fs = require('fs');

// Create a simple SVG icon
const createIcon = (size) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7L12 2z" fill="#8b5cf6"/>
            <path d="M12 22s-3-1-3-4V7l3-2 3 2v11c0 3-3 4-3 4z" fill="#a855f7"/>
        </svg>
    `;
    
    return svg;
};

// Create icons for different sizes
const sizes = [16, 32, 48, 128];

sizes.forEach(size => {
    const icon = createIcon(size);
    fs.writeFileSync(`icon${size}.svg`, icon);
});

console.log('Icons created! Convert SVG to PNG using an online converter or design tool.');