@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { ExternalLink, Star, Zap, Crown, Rocket, PenTool } from 'lucide-react';
 import { useSelector } from 'react-redux';
 import { templatesSelector } from '../store/global.Selctor';
+import { useTheme } from '../context/ThemeContext';

 const TemplateCard = ({ template, onRemix, index }) => {
+  const { isDarkMode } = useTheme();
   const [isHovered, setIsHovered] = useState(false);
   
   return (
     <div
-      className={`group relative bg-white/90 backdrop-blur-sm border-3 border-amber-300 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
+      className={`group relative backdrop-blur-sm border-3 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
+        isDarkMode 
+          ? 'bg-slate-800/90 border-amber-600' 
+          : 'bg-white/90 border-amber-300'
+      }`}
       style={{
         borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px',
-        boxShadow: '6px 6px 0px rgba(245, 158, 11, 0.3)'
+        boxShadow: isDarkMode 
+          ? '6px 6px 0px rgba(245, 158, 11, 0.4)' 
+          : '6px 6px 0px rgba(245, 158, 11, 0.3)'
       }}
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => setIsHovered(false)}
@@ .. @@
         <div className="p-6">
           <div className="flex items-center justify-between mb-3">
-            <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-700 transition-colors duration-300">
+            <h3 className={`text-xl font-bold group-hover:text-amber-700 transition-colors duration-300 ${
+              isDarkMode ? 'text-slate-200' : 'text-slate-800'
+            }`}>
               {template.name}
             </h3>
             <div className="flex items-center gap-1">
@@ .. @@
             </div>
           </div>
           
-          <p className="text-slate-600 mb-4 group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">
+          <p className={`mb-4 group-hover:transition-colors duration-300 leading-relaxed ${
+            isDarkMode 
+              ? 'text-slate-400 group-hover:text-slate-300' 
+              : 'text-slate-600 group-hover:text-slate-700'
+          }`}>
             {template.description}
           </p>

@@ .. @@
           <div className="flex flex-wrap gap-2 mb-4">
             {template.tags?.map((tag, tagIndex) => (
               <span
                 key={tagIndex}
-                className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium"
+                className={`px-3 py-1 text-sm font-medium ${
+                  isDarkMode 
+                    ? 'bg-amber-900/50 text-amber-300' 
+                    : 'bg-amber-100 text-amber-700'
+                }`}
                 style={{borderRadius: '15px 10px 15px 10px'}}
               >
                 {tag}
@@ .. @@
           <div className="flex gap-3">
             <button
               onClick={() => onRemix(template)}
-              className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 font-bold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
+              className={`flex-1 text-white px-4 py-2 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
+                isDarkMode
+                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700'
+                  : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600'
+              }`}
               style={{
                 borderRadius: '20px 15px 25px 10px',
                 boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
@@ .. @@
             <a
               href={template.liveUrl}
               target="_blank"
               rel="noopener noreferrer"
-              className="p-2 bg-white border-2 border-amber-300 hover:border-orange-400 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 transform hover:scale-105"
+              className={`p-2 border-2 transition-all duration-300 transform hover:scale-105 ${
+                isDarkMode
+                  ? 'bg-slate-700 border-amber-600 hover:border-orange-500 text-slate-300 hover:text-amber-400 hover:bg-slate-600'
+                  : 'bg-white border-amber-300 hover:border-orange-400 text-slate-700 hover:text-amber-700 hover:bg-amber-50'
+              }`}
               style={{borderRadius: '15px 25px 15px 25px'}}
             >
               <ExternalLink className="h-4 w-4" />
@@ .. @@

 const TemplateShowcase = () => {
+  const { isDarkMode } = useTheme();
   const templates = useSelector(templatesSelector);
   const [currentPage, setCurrentPage] = useState(1);
   const templatesPerPage = 6;
@@ .. @@

   return (
-    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
+    <section className={`py-20 relative overflow-hidden transition-colors duration-300 ${
+      isDarkMode 
+        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
+        : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'
+    }`}>
       {/* Paper texture overlay */}
       <div className="absolute inset-0 opacity-20" style={{
-        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
+        backgroundImage: isDarkMode
+          ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
+          : `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
       }}></div>

       {/* Hand-drawn decorative elements */}
-      <div className="absolute top-1/4 right-1/4 w-32 h-32 border-3 border-amber-300 opacity-30 transform rotate-12" style={{
+      <div className={`absolute top-1/4 right-1/4 w-32 h-32 border-3 opacity-30 transform rotate-12 ${
+        isDarkMode ? 'border-amber-600' : 'border-amber-300'
+      }`} style={{
         borderRadius: '60% 40% 70% 30%',
         borderStyle: 'dashed'
       }}></div>
-      <div className="absolute bottom-1/2 left-1/4 w-24 h-24 border-2 border-orange-400 opacity-25 transform -rotate-12" style={{
+      <div className={`absolute bottom-1/2 left-1/4 w-24 h-24 border-2 opacity-25 transform -rotate-12 ${
+        isDarkMode ? 'border-orange-500' : 'border-orange-400'
+      }`} style={{
         borderRadius: '40% 60% 30% 70%',
         borderStyle: 'dotted'
       }}></div>
@@ .. @@
         <div className="max-w-6xl mx-auto">
           {/* Header */}
           <div className="text-center mb-16">
-            <div className="inline-block px-6 py-2 mb-6 bg-white/80 backdrop-blur-sm border-2 border-amber-300 shadow-lg" style={{
+            <div className={`inline-block px-6 py-2 mb-6 backdrop-blur-sm border-2 shadow-lg ${
+              isDarkMode 
+                ? 'bg-slate-800/80 border-amber-600' 
+                : 'bg-white/80 border-amber-300'
+            }`} style={{
               borderRadius: '25px 15px 30px 20px'
             }}>
-              <span className="text-amber-700 text-sm font-semibold flex items-center gap-2">
+              <span className={`text-sm font-semibold flex items-center gap-2 ${
+                isDarkMode ? 'text-amber-400' : 'text-amber-700'
+              }`}>
                 <PenTool className="h-4 w-4" />
                 ✨ Professional Templates
               </span>
             </div>
             
-            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-800">
+            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight ${
+              isDarkMode ? 'text-slate-200' : 'text-slate-800'
+            }`}>
               Choose from{' '}
               <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent relative">
                 1600+
@@ .. @@
               </span>{' '}
               Templates
             </h2>
-            <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
+            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${
+              isDarkMode ? 'text-slate-400' : 'text-slate-600'
+            }`}>
               Hand-picked, professionally designed templates ready to customize with your content.
               Each template is fully responsive and optimized for conversion. ✨
             </p>
@@ .. @@