import React from 'react';
import { useEditor } from '../context/EditorContext'; // Assuming this path is correct
import { findElementType } from '../utils/elementUtils'; // Assuming this path is correct

const viewportSizes = {
  mobile: { width: '375px', height: '667px' },
  tablet: { width: '768px', height: '1024px' },
  desktop: { width: '100%', height: '100%' }
};

const Preview = ({viewport}) => {
  const {
    html,
    setSelectedElement,
    setSelectedElementType,
    iframeRef
  } = useEditor();

  const handleIframeLoad = () => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDoc) return;

    if (iframeDoc.body && !iframeDoc.body.style.backgroundColor) {
        iframeDoc.body.style.backgroundColor = '#FFFFFF';
    }

    iframeDoc.body.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const allElements = iframeDoc.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.classList) {
          el.classList.remove('sb-element-selected');
        }
      });

      if (e.target === iframeDoc.body || e.target === iframeDoc.documentElement) {
        setSelectedElement(null);
        setSelectedElementType(null);
        return;
      }

      const target = e.target;
      if (target && target.classList) {
        target.classList.add('sb-element-selected');
      }

      setSelectedElement(target);
      setSelectedElementType(findElementType(target));
    }, true);

    const style = iframeDoc.createElement('style');
    style.textContent = `
      .sb-element-selected {
        outline: 3px solid #f59e0b !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3) !important;
      }

      * {
        cursor: pointer !important;
      }

      *:hover {
        outline: 2px dashed #fb923c !important;
        outline-offset: 1px !important;
        transition: all 0.2s ease !important;
      }

      body {
        min-height: 100vh;
        margin: 0;
      }
      html {
        height: 100%;
      }
    `;
    iframeDoc.head.appendChild(style);
  };

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 border-2 border-amber-400 opacity-30 transform rotate-12" style={{
          borderRadius: '60% 40% 70% 30%',
          borderStyle: 'dashed'
        }}></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 border-2 border-orange-400 opacity-25 transform -rotate-12" style={{
          borderRadius: '40% 60% 30% 70%',
          borderStyle: 'dotted'
        }}></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-yellow-400/40 opacity-60 transform rotate-45" style={{borderRadius: '30% 70%'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 border-2 border-amber-300 opacity-40 rounded-full"></div>
      </div>

      <div
        className={`mx-auto transition-all duration-300 ease-in-out bg-white overflow-hidden relative z-10
                    ${viewport !== 'desktop' ? 'border-3 border-amber-400 shadow-2xl':'' }
                    ${viewport === 'mobile' ? 'max-w-[375px] max-h-[667px]' : ''}
                    ${viewport === 'tablet' ? 'max-w-[768px] max-h-[1024px]' : ''}
                    ${viewport === 'desktop' ? 'w-full h-full' : 'aspect-[var(--aspect-ratio)]'}`}
        style={{
          width: viewportSizes[viewport].width,
          height: viewportSizes[viewport].height,
          '--aspect-ratio': viewport === 'mobile' ? '375 / 667' : (viewport === 'tablet' ? '768 / 1024' : '16 / 9'),
          borderRadius: viewport !== 'desktop' ? '25px 15px 30px 20px' : '0',
          boxShadow: viewport !== 'desktop' ? '6px 6px 0px rgba(245, 158, 11, 0.3)' : 'none'
        }}
      >
        {/* Decorative corner elements for non-desktop viewports */}
        {viewport !== 'desktop' && (
          <>
            <div className="absolute top-2 left-2 w-3 h-3 bg-amber-400 opacity-40 rounded-full z-20"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 opacity-50 transform rotate-45 z-20"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-yellow-400 opacity-30 transform rotate-12 z-20" style={{borderRadius: '40% 60%'}}></div>
          </>
        )}
        
        <iframe
          ref={iframeRef}
          srcDoc={html}
          title="HTML Preview"
          className={`w-full h-full border-0 ${viewport !== 'desktop' ? 'rounded-[22px_12px_27px_17px]' : ''}`}
          onLoad={handleIframeLoad}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default Preview;