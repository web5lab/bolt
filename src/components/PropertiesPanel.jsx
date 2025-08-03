import React from 'react';
import { useEditor } from '../context/EditorContext';
import TextEditor from './editors/TextEditor';
import StyleEditor from './editors/StyleEditor';
import ElementInspector from './ElementInspector';
import ElementReplacer from './ElementReplacer';
import BlockInserter from './BlockInserter';
import DeleteButton from './DeleteButton';
import { ElementType } from '../types/editor';
import { PenTool } from 'lucide-react';

const PropertiesPanel= () => {
  const { selectedElement, selectedElementType } = useEditor();

  if (!selectedElement) return null;

  return (
    <div className="p-6 space-y-6 relative">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-2 mb-3 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300" style={{
          borderRadius: '20px 15px 25px 10px'
        }}>
          <span className="text-amber-700 text-sm font-bold flex items-center gap-2">
            <PenTool className="h-4 w-4" />
            ✨ Element Editor
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 relative">
          Edit Properties
          <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-2" viewBox="0 0 96 8" fill="none">
            <path d="M2 6 Q48 2 94 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
          </svg>
        </h3>
      </div>
      
      <DeleteButton />
      
      {selectedElementType && (
        <>
          {(selectedElementType === ElementType.Heading || 
            selectedElementType === ElementType.Paragraph || 
            selectedElementType === ElementType.Link ||
            selectedElementType === ElementType.Button) && (
            <TextEditor />
          )}
        </>
      )}
    </div>
  );
};

export default PropertiesPanel;