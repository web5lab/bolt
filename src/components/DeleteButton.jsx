import React from 'react';
import { Trash2 } from 'lucide-react';
import { useEditor } from '../context/EditorContext';
import { removeElement } from '../utils/domUtils';

const DeleteButton = () => {
  const { selectedElement, html, setHtml, iframeRef, addToHistory, setSelectedElement } = useEditor();

  const handleDelete = () => {
    if (!selectedElement || !iframeRef.current) return;

    // Don't allow deleting the body or html elements
    if (selectedElement.tagName.toLowerCase() === 'body' || 
        selectedElement.tagName.toLowerCase() === 'html') {
      console.warn("Cannot delete <body> or <html> elements.");
      return;
    }

    const newHtml = removeElement(
      selectedElement,
      iframeRef.current,
      html
    );

    if (newHtml) {
      setHtml(newHtml);
      addToHistory(newHtml);
      setSelectedElement(null); // Deselect after deletion
    }
  };

  // Only render the button if an element is selected and it's not the body/html
  if (!selectedElement || 
      selectedElement.tagName.toLowerCase() === 'body' || 
      selectedElement.tagName.toLowerCase() === 'html') {
    return null;
  }

  return (
    <button
      onClick={handleDelete}
      aria-label="Delete selected element"
      className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all duration-300 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transform hover:scale-105 shadow-lg"
      style={{
        borderRadius: '20px 15px 25px 10px',
        boxShadow: '3px 3px 0px rgba(239, 68, 68, 0.3)'
      }}
    >
      <Trash2 className="w-4 h-4 mr-2 flex-shrink-0" />
      🗑️ Delete Element
    </button>
  );
};

export default DeleteButton;