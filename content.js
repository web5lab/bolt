// Content script for the Website AI Chrome Extension

class ContentScriptManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMessageListener();
        this.setupPageMonitoring();
    }

    setupMessageListener() {
        // Listen for messages from popup and background script
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            this.handleMessage(request, sender, sendResponse);
            return true; // Keep message channel open for async responses
        });
    }

    setupPageMonitoring() {
        // Monitor page changes for dynamic content
        const observer = new MutationObserver((mutations) => {
            // Handle DOM changes if needed
            this.handleDOMChanges(mutations);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeOldValue: true
        });
    }

    async handleMessage(request, sender, sendResponse) {
        try {
            switch (request.type) {
                case 'CAPTURE_PAGE_CONTENT':
                    const content = await this.capturePageContent();
                    sendResponse({ success: true, data: content });
                    break;

                case 'HIGHLIGHT_ELEMENTS':
                    this.highlightElements(request.selectors);
                    sendResponse({ success: true });
                    break;

                case 'INJECT_STYLES':
                    this.injectStyles(request.styles);
                    sendResponse({ success: true });
                    break;

                case 'EXTRACT_TEXT':
                    const text = this.extractText(request.selector);
                    sendResponse({ success: true, data: text });
                    break;

                case 'EXTENSION_DATA':
                    // Handle data from main app
                    this.handleExtensionData(request.data);
                    sendResponse({ success: true });
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown message type' });
            }
        } catch (error) {
            console.error('Content script error:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    async capturePageContent() {
        try {
            // Enhanced content capture with better error handling
            const content = {
                html: this.getCleanHTML(),
                css: this.getPageStyles(),
                metadata: this.getPageMetadata(),
                images: this.getPageImages(),
                links: this.getPageLinks(),
                forms: this.getPageForms(),
                structure: this.getPageStructure(),
                performance: this.getPerformanceData(),
                accessibility: this.getAccessibilityData(),
                timestamp: new Date().toISOString()
            };

            return content;
        } catch (error) {
            throw new Error('Failed to capture page content: ' + error.message);
        }
    }

    getCleanHTML() {
        // Clone the document to avoid modifying the original
        const clonedDoc = document.cloneNode(true);
        
        // Remove scripts and other problematic elements
        const scripts = clonedDoc.querySelectorAll('script, noscript, style');
        scripts.forEach(el => el.remove());
        
        // Remove event handlers and data attributes
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach(el => {
            // Remove event handler attributes
            Array.from(el.attributes).forEach(attr => {
                if (attr.name.startsWith('on') || attr.name.startsWith('data-')) {
                    el.removeAttribute(attr.name);
                }
            });
        });
        
        return clonedDoc.documentElement.outerHTML;
    }

    getPageStyles() {
        const styles = [];
        
        try {
            // Get all stylesheets
            Array.from(document.styleSheets).forEach(sheet => {
                try {
                    const rules = Array.from(sheet.cssRules || sheet.rules || []);
                    rules.forEach(rule => {
                        if (rule.cssText) {
                            styles.push({
                                selector: rule.selectorText,
                                css: rule.cssText,
                                href: sheet.href
                            });
                        }
                    });
                } catch (e) {
                    // Cross-origin stylesheets might not be accessible
                    console.warn('Could not access stylesheet:', sheet.href);
                }
            });

            // Get inline styles
            const elementsWithStyles = document.querySelectorAll('[style]');
            elementsWithStyles.forEach(el => {
                styles.push({
                    selector: this.getElementSelector(el),
                    css: `${this.getElementSelector(el)} { ${el.style.cssText} }`,
                    inline: true
                });
            });

        } catch (error) {
            console.error('Error getting page styles:', error);
        }

        return styles;
    }

    getPageMetadata() {
        const meta = {};
        
        // Basic metadata
        meta.title = document.title;
        meta.url = window.location.href;
        meta.domain = window.location.hostname;
        meta.protocol = window.location.protocol;
        meta.pathname = window.location.pathname;
        meta.search = window.location.search;
        meta.hash = window.location.hash;
        meta.charset = document.characterSet;
        meta.lang = document.documentElement.lang;
        meta.dir = document.documentElement.dir;

        // Meta tags
        const metaTags = document.querySelectorAll('meta');
        metaTags.forEach(tag => {
            const name = tag.getAttribute('name') || tag.getAttribute('property');
            const content = tag.getAttribute('content');
            if (name && content) {
                meta[name] = content;
            }
        });

        // Link tags
        const linkTags = document.querySelectorAll('link[rel]');
        meta.links = {};
        linkTags.forEach(link => {
            const rel = link.getAttribute('rel');
            const href = link.getAttribute('href');
            if (rel && href) {
                meta.links[rel] = href;
            }
        });

        return meta;
    }

    getPageImages() {
        const images = [];
        
        document.querySelectorAll('img').forEach(img => {
            images.push({
                src: img.src,
                alt: img.alt,
                title: img.title,
                width: img.naturalWidth,
                height: img.naturalHeight,
                displayWidth: img.width,
                displayHeight: img.height,
                loading: img.loading,
                selector: this.getElementSelector(img)
            });
        });

        return images;
    }

    getPageLinks() {
        const links = [];
        
        document.querySelectorAll('a[href]').forEach(link => {
            links.push({
                href: link.href,
                text: link.textContent.trim(),
                title: link.title,
                target: link.target,
                rel: link.rel,
                selector: this.getElementSelector(link)
            });
        });

        return links;
    }

    getPageForms() {
        const forms = [];
        
        document.querySelectorAll('form').forEach(form => {
            const inputs = [];
            form.querySelectorAll('input, textarea, select').forEach(input => {
                inputs.push({
                    type: input.type,
                    name: input.name,
                    id: input.id,
                    placeholder: input.placeholder,
                    required: input.required,
                    value: input.value
                });
            });

            forms.push({
                action: form.action,
                method: form.method,
                inputs: inputs,
                selector: this.getElementSelector(form)
            });
        });

        return forms;
    }

    getPageStructure() {
        const structure = {
            headings: [],
            sections: [],
            navigation: [],
            footer: []
        };

        // Get headings
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            structure.headings.push({
                level: parseInt(heading.tagName.charAt(1)),
                text: heading.textContent.trim(),
                id: heading.id,
                selector: this.getElementSelector(heading)
            });
        });

        // Get sections
        document.querySelectorAll('section, article, aside, main').forEach(section => {
            structure.sections.push({
                type: section.tagName.toLowerCase(),
                id: section.id,
                classes: section.className,
                selector: this.getElementSelector(section)
            });
        });

        // Get navigation
        document.querySelectorAll('nav, [role="navigation"]').forEach(nav => {
            structure.navigation.push({
                selector: this.getElementSelector(nav),
                links: Array.from(nav.querySelectorAll('a')).map(link => ({
                    href: link.href,
                    text: link.textContent.trim()
                }))
            });
        });

        // Get footer
        document.querySelectorAll('footer').forEach(footer => {
            structure.footer.push({
                selector: this.getElementSelector(footer),
                text: footer.textContent.trim()
            });
        });

        return structure;
    }

    getPerformanceData() {
        const performance = {};
        
        if (window.performance) {
            const timing = window.performance.timing;
            performance.loadTime = timing.loadEventEnd - timing.navigationStart;
            performance.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
            performance.firstPaint = timing.responseStart - timing.navigationStart;
        }

        return performance;
    }

    getAccessibilityData() {
        const accessibility = {
            hasAltText: true,
            hasHeadingStructure: true,
            hasLabels: true,
            issues: []
        };

        // Check for images without alt text
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
            accessibility.hasAltText = false;
            accessibility.issues.push(`${imagesWithoutAlt.length} images without alt text`);
        }

        // Check for proper heading structure
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length === 0) {
            accessibility.hasHeadingStructure = false;
            accessibility.issues.push('No headings found');
        }

        // Check for form inputs without labels
        const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([id])');
        if (inputsWithoutLabels.length > 0) {
            accessibility.hasLabels = false;
            accessibility.issues.push(`${inputsWithoutLabels.length} inputs without labels`);
        }

        return accessibility;
    }

    getElementSelector(element) {
        if (element.id) {
            return `#${element.id}`;
        }
        
        if (element.className) {
            return `.${element.className.split(' ').join('.')}`;
        }
        
        return element.tagName.toLowerCase();
    }

    highlightElements(selectors) {
        // Remove existing highlights
        document.querySelectorAll('.websiteai-highlight').forEach(el => {
            el.classList.remove('websiteai-highlight');
        });

        // Add new highlights
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.classList.add('websiteai-highlight');
                });
            } catch (e) {
                console.warn('Invalid selector:', selector);
            }
        });

        // Inject highlight styles
        this.injectHighlightStyles();
    }

    injectHighlightStyles() {
        const existingStyle = document.getElementById('websiteai-highlight-styles');
        if (existingStyle) return;

        const style = document.createElement('style');
        style.id = 'websiteai-highlight-styles';
        style.textContent = `
            .websiteai-highlight {
                outline: 2px solid #8b5cf6 !important;
                outline-offset: 2px !important;
                background-color: rgba(139, 92, 246, 0.1) !important;
                animation: websiteai-pulse 2s infinite;
            }
            
            @keyframes websiteai-pulse {
                0% { outline-color: #8b5cf6; }
                50% { outline-color: #a855f7; }
                100% { outline-color: #8b5cf6; }
            }
        `;
        document.head.appendChild(style);
    }

    injectStyles(styles) {
        const style = document.createElement('style');
        style.textContent = styles;
        document.head.appendChild(style);
    }

    extractText(selector) {
        try {
            const element = document.querySelector(selector);
            return element ? element.textContent.trim() : '';
        } catch (e) {
            console.warn('Invalid selector:', selector);
            return '';
        }
    }

    handleExtensionData(data) {
        // Handle data sent from the main application
        console.log('Received data from main app:', data);
        
        // You can process this data as needed
        // For example, highlight elements, show notifications, etc.
    }

    handleDOMChanges(mutations) {
        // Handle DOM changes for dynamic content
        // This can be used to re-capture content when the page changes
    }
}

// Initialize the content script manager
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ContentScriptManager();
    });
} else {
    new ContentScriptManager();
}