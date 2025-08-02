import React from 'react';
import { CodeViewer } from './CodeViewer';

const WebsitePreview = ({  data , handleOpenDesignChat,handleFormatSelect ,onClose , setPreviewWebsite }) => {
  console.log(data)
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50/95 via-amber-50/95 to-yellow-50/95 backdrop-blur-lg z-50 flex flex-col">
       {/* Paper texture overlay */}
       <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
       }}></div>
       
       {/* Hand-drawn decorative elements */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-20 left-10 w-16 h-16 border-2 border-amber-400 opacity-30 transform rotate-12" style={{
           borderStyle: 'dashed',
           borderRadius: '60% 40% 70% 30%'
         }}></div>
         <div className="absolute top-40 right-20 w-12 h-12 border-2 border-orange-400 opacity-25 transform -rotate-12" style={{
           borderStyle: 'dotted',
           borderRadius: '40% 60% 30% 70%'
         }}></div>
         <div className="absolute bottom-32 left-1/4 w-20 h-20 border-3 border-yellow-400 opacity-20 transform rotate-45" style={{
           borderRadius: '50% 30% 60% 40%',
           borderStyle: 'dashed'
         }}></div>
       </div>
       
       <CodeViewer id={data?.uuid} website={data} handleOpenDesignChat={handleOpenDesignChat} setPreviewWebsite={setPreviewWebsite} handleFormatSelect={handleFormatSelect} multiDesign={data.multiDesign} multiDesignlist={data.multiDesignlist}  onClose={onClose} />
    </div>
  );
};

export default WebsitePreview;