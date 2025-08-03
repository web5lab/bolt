@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { useEditor } from '../../context/EditorContext'; // Assuming this path is correct
-import { updateElementContent } from '../../utils/domUtils'; // Assuming this path is correct
+import { useEditor } from '../../context/EditorContext';
+import { updateElementContent } from '../../utils/domUtils';
 import { Type } from 'lucide-react';

 const TextEditor = () => {
   const { selectedElement, html, setHtml, iframeRef, addToHistory } = useEditor();
   const [text, setText] = useState('');

   useEffect(() => {
     if (selectedElement) {
-      // Ensure we handle cases where textContent might be null
       setText(selectedElement.textContent || '');
     }
   }, [selectedElement]);

@@ .. @@
   const handleApplyText = () => {
     if (!selectedElement || !iframeRef.current) return;
     
-    // Assuming updateElementContent handles the selected element being part of iframeRef.current.document
     const newHtml = updateElementContent(
       selectedElement, 
       text, 
-      iframeRef.current, // Pass the iframe ref directly
-      html // Pass the current full HTML string
+      iframeRef.current,
+      html
     );
     
-    if (newHtml !== null && newHtml !== undefined) { // Check if newHtml is actually returned
+    if (newHtml !== null && newHtml !== undefined) {
       setHtml(newHtml);
-      addToHistory(newHtml); // Add the new state to history
+      addToHistory(newHtml);
     }
   };

-  // If no element is selected, this component (or its content) shouldn't render.
-  // This check is good, but the parent (PropertiesPanel) might already handle this.
   if (!selectedElement) return null;

   return (
-    <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4">
-      <h3 className="flex items-center text-sm font-medium text-slate-200 mb-3">
-        <Type className="w-4 h-4 mr-2 text-indigo-400" />
-        Text Content
+    <div className="bg-white/90 backdrop-blur-sm border-3 border-amber-300 p-6 mb-6 relative" style={{
+      borderRadius: '25px 15px 30px 20px',
+      boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.3)'
+    }}>
+      {/* Decorative corner elements */}
+      <div className="absolute top-2 left-2 w-3 h-3 bg-amber-400 opacity-40 rounded-full"></div>
+      <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 opacity-50 transform rotate-45"></div>
+      <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-yellow-400 opacity-30 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>
+      
+      <h3 className="flex items-center text-lg font-bold text-slate-800 mb-4 relative">
+        <div className="p-2 bg-gradient-to-r from-amber-200 to-orange-200 mr-3" style={{borderRadius: '12px 8px 15px 10px'}}>
+          <Type className="w-5 h-5 text-amber-600" />
+        </div>
+        <span className="relative">
+          📝 Text Content
+          <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 4" fill="none">
+            <path d="M2 2 Q50 1 98 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
+          </svg>
+        </span>
       </h3>
+      
       <textarea
         value={text}
         onChange={handleTextChange}
-        className="w-full p-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md mb-3 min-h-24 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
-        placeholder="Enter text content..."
+        className="w-full p-4 border-2 border-amber-300 bg-white text-slate-800 mb-4 min-h-32 focus:ring-2 focus:ring-amber-500 focus:border-orange-400 placeholder-slate-500 font-medium transition-all duration-300"
+        style={{borderRadius: '20px 15px 25px 10px'}}
+        placeholder="✏️ Enter your text content here..."
       />
+      
       <button
         onClick={handleApplyText}
-        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
+        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-6 py-3 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
+        style={{
+          borderRadius: '20px 15px 25px 10px',
+          boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
+        }}
       >
-        Apply Changes
+        ✨ Apply Changes
       </button>
     </div>
   );
 };