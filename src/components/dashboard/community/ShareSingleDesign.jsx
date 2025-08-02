import React, { useState } from 'react';
import { X } from 'lucide-react';
import { sendMessageApi } from '../../../store/global.Action';
import toast from 'react-hot-toast';

const ShareSingleDesign = ({ website, isOpen, onClose }) => {
    const [description, setDescription] = useState('');
    const handleSubmit = async () => {
        await sendMessageApi({
            data: {
                content: description,
                website: website._id
            }
        })

        toast.success('Design shared with the community!');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-amber-900/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-sm max-w-lg w-full border-3 border-amber-400 shadow-2xl animate-fadeInScaleUp relative" style={{
                borderRadius: '30px 20px 35px 25px',
                boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
            }}>
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 opacity-60 rounded-full"></div>
                <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
                <div className="absolute bottom-4 right-6 w-2 h-2 bg-amber-400 opacity-70 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>

                <div className="p-6 relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-800 relative">
                            Share Design with Community
                            <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
                                <path d="M2 6 Q100 2 198 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
                            </svg>
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-slate-600 hover:text-slate-800 p-2 hover:bg-amber-200 border-2 border-amber-300 hover:border-orange-400 transition-colors" style={{borderRadius: '12px 8px 15px 10px'}}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div >
                        <div className="mb-6">
                          
                            <div
                                key={website._id}
                                className={`relative overflow-hidden cursor-pointer border-2 border-amber-400 transition-all shadow-lg`}
                                style={{borderRadius: '15px 10px 20px 15px'}}
                            >
                                <div className="aspect-video">
                                    <img
                                        src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website?.uuid}/screenshot-cropped.png`}
                                        alt={website.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="mb-6">
                            <label htmlFor="design-description" className="block text-slate-800 font-bold mb-2">
                                Text Message (Optional)
                            </label>
                            <textarea
                                id="design-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell the community about your design..."
                                rows={3}
                                className="w-full bg-white border-2 border-amber-300 px-4 py-2 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" style={{borderRadius: '15px 20px 15px 20px'}}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-white border-2 border-amber-300 hover:border-orange-400 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 font-bold" style={{borderRadius: '15px 20px 15px 20px'}}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleSubmit()
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white transition-all duration-300 font-bold transform hover:scale-105 shadow-lg" style={{
                                    borderRadius: '20px 15px 25px 10px',
                                    boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
                                }}
                            >
                                Share with Community
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareSingleDesign;