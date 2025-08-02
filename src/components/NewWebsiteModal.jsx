import React, { useState, useEffect } from 'react';
import {
    Wand2,
    X,
    Sun,
    Moon,
    BrainCircuit,
    ArrowRight,
    PlusCircle,
    Images,
    Layout,
    Code,
    Zap,
    Palette,
    Newspaper,
    BookText,
    Github,
    UploadCloud,
    FileText,
    Globe,
    Grid3x3,
    CheckCircle,
    Copy,
    PenTool
} from 'lucide-react';

const createSuggestions = [
    "SaaS Landing Page: Hero, Pricing, Testimonials",
    "Startup Landing: Product Demo, Features, CTA",
    "Agency Landing: Portfolio, Team, Contact",
    "App Landing: Download, Screenshots, Features",
    "E-commerce Landing: Product Gallery, Reviews",
    "Consulting Page: Services, Case Studies, Lead Form",
];

const blogTopicSuggestions = [
    "Latest AI advancements & trends",
    "Beginner's guide to quantum computing",
    "Healthy vegan recipes for athletes",
    "Personal finance tips for Gen Z",
    "Exploring sustainable travel destinations",
    "Startup scaling: challenges & solutions",
];

const blogThemeOptionsData = [
    { name: 'Indigo', value: 'indigo', colorClass: 'bg-indigo-500' },
    { name: 'Teal', value: 'teal', colorClass: 'bg-teal-500' },
    { name: 'Rose', value: 'rose', colorClass: 'bg-rose-500' },
    { name: 'Amber', value: 'amber', colorClass: 'bg-amber-500' },
    { name: 'Sky', value: 'sky', colorClass: 'bg-sky-500' },
    { name: 'Emerald', value: 'emerald', colorClass: 'bg-emerald-500' },
];

const SuggestionChip = ({ text, onClick }) => (
    <button
        onClick={onClick}
        className="px-3 py-2 bg-white/80 border-2 border-amber-300 hover:border-orange-400 hover:bg-amber-50 text-xs text-slate-700 hover:text-amber-700 transition-all duration-200 whitespace-nowrap max-w-[180px] sm:max-w-[220px] font-medium"
        style={{borderRadius: '15px 10px 20px 15px'}}
    >
        <div className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
            <Zap className="h-3 w-3 text-amber-500 shrink-0" />
            <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                {text}
            </span>
        </div>
    </button>
);

const DesignOption = ({ icon, title, description, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-start p-4 border-2 transition-all duration-300 w-full transform hover:scale-105 ${
            isSelected
                ? 'bg-amber-100 border-amber-400 shadow-lg'
                : 'bg-white border-slate-300 hover:bg-amber-50 hover:border-amber-400'
        }`}
        style={{
            borderRadius: '20px 15px 25px 10px',
            boxShadow: isSelected ? '3px 3px 0px rgba(245, 158, 11, 0.3)' : '2px 2px 0px rgba(148, 163, 184, 0.2)'
        }}
    >
        <div className={`p-2 mr-3 shrink-0 ${
            isSelected 
                ? 'bg-amber-400 text-white' 
                : 'bg-slate-200 text-slate-600'
        }`} style={{borderRadius: '12px 8px 15px 10px'}}>
            {icon}
        </div>
        <div className="text-left">
            <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
            <p className="text-sm text-slate-600">{description}</p>
        </div>
    </button>
);

const NewWebsiteModal = ({ isOpen, onClose, onSubmit, showAnimation, allTemplatesFromStore = [] }) => {
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [mode, setMode] = useState('create');
    
    // Create Mode
    const [customInstructions, setCustomInstructions] = useState('');
    
    // Redesign Mode
    const [redesignMode, setRedesignMode] = useState('multi');
    const [selectedRedesignThemeIndex, setSelectedRedesignThemeIndex] = useState(0);

    // Create Blog Mode
    const [blogTopic, setBlogTopic] = useState('');
    const [selectedBlogTheme, setSelectedBlogTheme] = useState(blogThemeOptionsData[0]?.value || 'indigo');

    // Create Doc Mode
    const [docContentSourceTab, setDocContentSourceTab] = useState('url');
    const [selectedMarkdownFile, setSelectedMarkdownFile] = useState(null);
    const [readmeText, setreadmeText] = useState('')

    // Remix Mode
    const [selectedTemplateForRemix, setSelectedTemplateForRemix] = useState(null);
    const [remixActiveTab, setRemixActiveTab] = useState('url');

    // Theme options for Redesign (manual)
    const redesignThemeOptions = [
        { icon: <Sun className="h-5 w-5 text-yellow-400" />, title: "Light", value: "light", description: "Bright and clean interface" },
        { icon: <Moon className="h-5 w-5 text-blue-300" />, title: "Dark", value: "dark", description: "Sleek and easy on eyes" },
        { icon: <BrainCircuit className="h-5 w-5 text-purple-400" />, title: "AI Choose", value: "auto", description: "Let AI decide the theme" }
    ];
    
    useEffect(() => {
        if (isOpen) {
            handleModeToggle('create', true);
        }
    }, [isOpen]);

    const handleModeToggle = (newMode, initialOpen = false) => {
        setMode(newMode);
        if (!initialOpen) {
            setCustomInstructions('');
            setWebsiteUrl('');
            setSelectedRedesignThemeIndex(0);
            setRedesignMode('multi');
            setBlogTopic('');
            setSelectedBlogTheme(blogThemeOptionsData[0]?.value || 'indigo');
            setDocContentSourceTab('url');
            setSelectedMarkdownFile(null);
            setSelectedTemplateForRemix(null);
            setRemixActiveTab('url');
        }
    };

    const handleInstructionsChange = (value) => {
        setCustomInstructions(value);
    };
    
    const handleBlogTopicChange = (value) => {
        setBlogTopic(value);
    };

    const handleSuggestionClick = (suggestion, target = 'instructions') => {
        if (target === 'blogTopic') {
            setBlogTopic(suggestion);
        } else {
            setCustomInstructions(suggestion);
        }
    };

    const handleMarkdownUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === "text/markdown" || file.name.endsWith('.md') || file.name.endsWith('.MD')) {
                setSelectedMarkdownFile(file);
                console.log(`Selected file: ${file.name}`);
            } else {
                alert('Please upload a valid .md file.');
                setSelectedMarkdownFile(null);
                if (event.target) event.target.value = null;
            }
        }
    };

    const handleFormSubmit = () => {
        let payload = {
            mode: mode,
            customInstructions: customInstructions.trim(),
        };

        if (mode === 'create') {

        } else if (mode === 'redesign') {
            payload.url = websiteUrl.trim();
            payload.redesignMode = redesignMode;
            payload.theme = redesignMode === 'manual' ? redesignThemeOptions[selectedRedesignThemeIndex].value : 'auto';
            payload.multiDesign = redesignMode !== 'manual';
        } else if (mode === 'createBlog') {
            payload.topic = blogTopic.trim();
            if (websiteUrl.trim()) {
                payload.url = websiteUrl.trim();
            }
        } else if (mode === 'createDoc') {
            if (docContentSourceTab === 'url') {
                payload.url = websiteUrl.trim();
            }
            payload.readMe = readmeText.trim();
        } else if (mode === 'remix') {
            payload.selectedTemplate = selectedTemplateForRemix;
            payload.remixMode = remixActiveTab;
            if (remixActiveTab === 'url') {
                payload.url = websiteUrl.trim();
            }
        }
        
        onSubmit(payload);
        onClose();
        handleModeToggle('create'); 
    };

    const getModalTitle = () => {
        switch (mode) {
            case 'create': return 'Create New Landing Page';
            case 'createBlog': return 'Create New Blog';
            case 'createDoc': return 'Create New Documentation';
            case 'redesign': return 'Redesign from URL';
            case 'remix': return 'Remix with Template';
            default: return 'New Project';
        }
    };

    const getSubmitButtonText = () => {
        switch (mode) {
            case 'create': return 'Create';
            case 'createBlog': return 'Generate Blog';
            case 'createDoc': return 'Create Documentation';
            case 'redesign': return 'Redesign';
            case 'remix': return 'Remix Template';
            default: return 'Submit';
        }
    };

    const isSubmitDisabled = () => {
        if (showAnimation) return true;
        switch (mode) {
            case 'create':
                return !customInstructions.trim();
            case 'redesign':
                return !websiteUrl.trim() || !/^https?:\/\/.+\..+/.test(websiteUrl.trim());
            case 'createBlog':
                return !blogTopic.trim() || (websiteUrl.trim() && !/^https?:\/\/.+\..+/.test(websiteUrl.trim()));
            case 'createDoc':
                return (docContentSourceTab === 'url' && !websiteUrl.trim() && !customInstructions.trim()) ||
                       (docContentSourceTab === 'file' && !selectedMarkdownFile && !customInstructions.trim()) ||
                       (docContentSourceTab === 'url' && websiteUrl.trim() && !/^https?:\/\/(?:www\.)?github\.com\/[^/]+\/[^/]+(?:\.git)?$/.test(websiteUrl.trim()))
            case 'remix':
                const isRemixUrlInvalid = remixActiveTab === 'url' && (!websiteUrl.trim() || !/^https?:\/\/.+\..+/.test(websiteUrl.trim()));
                const isRemixInstructionsInvalid = remixActiveTab === 'instructions' && !customInstructions.trim();
                return !selectedTemplateForRemix || isRemixUrlInvalid || isRemixInstructionsInvalid;
            default:
                return true;
        }
    };

    if (!isOpen) return null;

    const modeButtons = [
        { key: 'create', label: 'New Page', icon: PlusCircle },
        { key: 'createDoc', label: 'New Docs', icon: BookText },
        { key: 'redesign', label: 'Redesign', icon: Wand2 },
    ];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-3 border-amber-400 p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-100 relative" style={{
                borderRadius: '30px 20px 35px 25px',
                boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
            }}>
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                {/* Hand-drawn decorative elements */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 opacity-50 rounded-full"></div>
                <div className="absolute top-6 left-6 w-3 h-3 border-2 border-orange-400 opacity-40 transform rotate-45"></div>
                <div className="absolute bottom-6 right-8 w-2 h-2 bg-amber-400 opacity-60 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-r from-amber-200 to-orange-200 border-2 border-amber-400" style={{borderRadius: '15px 10px 20px 15px'}}>
                                <PenTool className="h-6 w-6 text-amber-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 relative">
                                {getModalTitle()} ✨
                                <svg className="absolute -bottom-1 left-0 w-48 h-2 mt-1" viewBox="0 0 192 8" fill="none">
                                    <path d="M2 6 Q96 2 190 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                                </svg>
                            </h2>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-2 hover:bg-amber-100 border-2 border-amber-300 hover:border-orange-400 transition-colors text-slate-600 hover:text-slate-800"
                            style={{borderRadius: '12px 8px 15px 10px'}}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Mode Toggle Buttons */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex flex-wrap justify-center bg-white/80 backdrop-blur-sm border-2 border-amber-300 p-1 gap-1" style={{borderRadius: '20px 15px 25px 10px'}}>
                            {modeButtons.map(item => (
                                <button
                                    key={item.key}
                                    onClick={() => handleModeToggle(item.key)}
                                    className={`flex items-center gap-2 px-3 py-2 transition-all text-xs sm:text-sm font-medium
                                                ${mode === item.key 
                                                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg' 
                                                    : 'text-slate-700 hover:bg-amber-100 hover:text-amber-700'}`}
                                    style={{borderRadius: '15px 10px 20px 15px'}}
                                >
                                    <item.icon className="h-4 w-4" /> {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content based on selected mode */}
                    {mode === 'create' && (
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="createInstructions" className="block text-slate-800 font-bold mb-2">
                                    What kind of landing page do you want to build? 🎨
                                </label>
                                <textarea
                                    id="createInstructions"
                                    value={customInstructions}
                                    onChange={(e) => handleInstructionsChange(e.target.value)}
                                    placeholder="Describe your landing page (e.g., 'SaaS page for project management software with pricing, testimonials, free trial signup')"
                                    rows={4}
                                    className="w-full bg-white/80 border-2 border-amber-300 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    style={{borderRadius: '20px 15px 25px 10px'}}
                                />
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 mb-3 font-medium">Quick suggestions: ⚡</p>
                                <div className="flex flex-wrap gap-2">
                                    {createSuggestions.map((suggestion, index) => (
                                        <SuggestionChip key={index} text={suggestion} onClick={() => handleSuggestionClick(suggestion)} />
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-white/80 border-2 border-amber-300" style={{
                                borderRadius: '20px 15px 25px 10px',
                                borderStyle: 'dashed'
                            }}>
                                <div className="flex items-start">
                                    <Code className="h-5 w-5 text-amber-600 mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-sm text-slate-700">
                                        <span className="font-bold text-slate-800">Export Options:</span> After creating your website, you can download the full source code in React.js or HTML/CSS format. ✨
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === 'redesign' && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1">
                                    <label htmlFor="websiteUrlRedesign" className="block text-slate-800 font-bold mb-2">
                                        Paste a link to redesign <span className="text-red-500">*</span> 🔗
                                    </label>
                                    <input
                                        type="url"
                                        id="websiteUrlRedesign"
                                        value={websiteUrl}
                                        onChange={(e) => setWebsiteUrl(e.target.value)}
                                        placeholder="https://your-landing-page.com"
                                        className="w-full bg-white/80 border-2 border-amber-300 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        style={{borderRadius: '20px 15px 25px 10px'}}
                                    />
                                </div>
                                <div className="w-full md:w-auto mt-4 md:mt-0">
                                    <label className="block text-slate-800 font-bold mb-2 md:text-right">
                                        Page design Mode 🎨
                                    </label>
                                    <div className="flex items-stretch bg-white/80 border-2 border-amber-300 p-1 gap-0" style={{borderRadius: '15px 20px 15px 20px'}}>
                                        <button
                                            onClick={() => setRedesignMode('multi')}
                                            className={`flex items-center justify-center gap-2 px-4 py-2 transition-all font-medium ${
                                                redesignMode === 'multi' 
                                                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' 
                                                    : 'text-slate-700 hover:bg-amber-100'
                                            }`}
                                            style={{borderRadius: '12px 8px 15px 10px'}}
                                        > 
                                            <Images className="h-4 w-4" /> Multi 
                                        </button>
                                        <button
                                            onClick={() => setRedesignMode('manual')}
                                            className={`flex items-center justify-center gap-2 px-4 py-2 transition-all font-medium border-l-2 border-amber-300 ${
                                                redesignMode === 'manual' 
                                                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' 
                                                    : 'text-slate-700 hover:bg-amber-100'
                                            }`}
                                            style={{borderRadius: '8px 12px 10px 15px'}}
                                        > 
                                            <Layout className="h-4 w-4" /> Manual 
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {redesignMode === 'manual' && (
                                <div className="p-3 bg-amber-100 border-2 border-amber-400 text-sm text-amber-800 font-medium" style={{
                                    borderRadius: '15px 20px 15px 20px',
                                    borderStyle: 'dashed'
                                }}>
                                    <Layout className="inline h-4 w-4 mr-2" />
                                    Manual Mode: Choose your theme for a single optimized design. 🎯
                                </div>
                            )}
                            {redesignMode === 'multi' && (
                                <div className="p-3 bg-amber-100 border-2 border-amber-400 text-sm text-amber-800 font-medium" style={{
                                    borderRadius: '15px 20px 15px 20px',
                                    borderStyle: 'dashed'
                                }}>
                                    <Images className="inline h-4 w-4 mr-2" />
                                    Multi-Design Mode: Generate three unique landing page variations. ✨
                                </div>
                            )}
                            <div>
                                <label htmlFor="redesignInstructions" className="block text-slate-800 font-bold mb-2">
                                    Instructions (Optional) 📝
                                </label>
                                <textarea
                                    id="redesignInstructions"
                                    value={customInstructions}
                                    onChange={(e) => handleInstructionsChange(e.target.value)}
                                    placeholder="Specific improvements (e.g., 'Improve CTAs', 'Make it mobile-first')"
                                    rows={3}
                                    className="w-full bg-white/80 border-2 border-amber-300 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    style={{borderRadius: '20px 15px 25px 10px'}}
                                />
                            </div>
                            {redesignMode === 'manual' && (
                                <div>
                                    <label className="block text-slate-800 font-bold mb-4">Choose your theme 🎨</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {redesignThemeOptions.map((option, index) => (
                                            <DesignOption
                                                key={index}
                                                icon={option.icon}
                                                title={option.title}
                                                description={option.description}
                                                isSelected={selectedRedesignThemeIndex === index}
                                                onClick={() => setSelectedRedesignThemeIndex(index)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {mode === 'createDoc' && (
                        <div className="space-y-6">
                            <div className="border-b-2 border-amber-300" style={{borderStyle: 'dashed'}}>
                                <nav className="flex space-x-4 sm:space-x-6 -mb-px">
                                    <button onClick={() => setDocContentSourceTab('url')}
                                        className={`py-2 px-1 border-b-2 font-bold text-xs sm:text-sm transition-colors ${
                                            docContentSourceTab === 'url' 
                                                ? 'border-amber-500 text-amber-600' 
                                                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-500'
                                        }`}>
                                        <div className="flex items-center gap-2"><Github className="h-4 w-4" /> From Repository URL</div>
                                    </button>
                                    <button onClick={() => setDocContentSourceTab('file')}
                                        className={`py-2 px-1 border-b-2 font-bold text-xs sm:text-sm transition-colors ${
                                            docContentSourceTab === 'file' 
                                                ? 'border-amber-500 text-amber-600' 
                                                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-500'
                                        }`}>
                                        <div className="flex items-center gap-2"><FileText className="h-4 w-4" /> From README.md Text</div>
                                    </button>
                                </nav>
                            </div>
                            <div className="min-h-[100px] pt-4">
                                {docContentSourceTab === 'url' && (
                                    <div>
                                        <label htmlFor="docRepoUrl" className="block text-slate-800 font-bold mb-2">
                                            GitHub Repository URL <span className="text-red-500">*</span> 📚
                                        </label>
                                        <input 
                                            type="url" 
                                            id="docRepoUrl" 
                                            value={websiteUrl} 
                                            onChange={(e) => setWebsiteUrl(e.target.value)}
                                            placeholder="https://github.com/username/repository"
                                            className="w-full bg-white/80 border-2 border-amber-300 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            style={{borderRadius: '20px 15px 25px 10px'}}
                                        />
                                        <p className="text-slate-600 text-xs mt-2">Provide a public GitHub repository. AI will analyze its content. ✨</p>
                                    </div>
                                )}
                                {docContentSourceTab === 'file' && (
                                    <div>
                                        <label htmlFor="markdownUpload" className="block text-slate-800 font-bold mb-2">
                                            Add your README.md Text <span className="text-red-500">*</span> 📝
                                        </label>
                                        <textarea
                                            id="readmeText"
                                            value={readmeText}
                                            onChange={(e) => setreadmeText(e.target.value)}
                                            placeholder="Paste your README.md content here..."
                                            rows={6}
                                            className="w-full bg-white/80 border-2 border-amber-300 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono text-sm"
                                            style={{borderRadius: '20px 15px 25px 10px'}}
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="docInstructions" className="block text-slate-800 font-bold mb-2">
                                    Additional Instructions (Optional) 📋
                                </label>
                                <textarea 
                                    id="docInstructions" 
                                    value={customInstructions} 
                                    onChange={(e) => handleInstructionsChange(e.target.value)}
                                    placeholder="e.g., 'Organize by sections in README', 'Focus on API endpoints'"
                                    rows={3}
                                    className="w-full bg-white/80 border-2 border-amber-300 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    style={{borderRadius: '20px 15px 25px 10px'}}
                                />
                            </div>
                        </div>
                    )}

                    {mode === 'remix' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-slate-800 font-bold mb-3">
                                    Choose a Template <span className="text-red-500">*</span> 🎨
                                </label>
                                {allTemplatesFromStore && allTemplatesFromStore.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-1 pr-2 scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-100 bg-white/50 border-2 border-amber-300" style={{borderRadius: '20px 15px 25px 10px'}}>
                                        {allTemplatesFromStore.map((template) => (
                                            <button key={template.id} onClick={() => setSelectedTemplateForRemix(template)}
                                                className={`group bg-white/80 overflow-hidden transition-all duration-200 hover:shadow-lg w-full text-left transform hover:scale-105 ${
                                                    selectedTemplateForRemix?.id === template.id 
                                                        ? 'ring-2 ring-amber-500 border-2 border-amber-500' 
                                                        : 'border-2 border-transparent hover:border-amber-400'
                                                }`}
                                                style={{borderRadius: '15px 10px 20px 15px'}}
                                            >
                                                <div className="relative overflow-hidden aspect-video bg-slate-200">
                                                    <img src={template.image} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x168?text=No+Preview')} />
                                                    {selectedTemplateForRemix?.id === template.id && (
                                                        <div className="absolute inset-0 bg-amber-500/40 flex items-center justify-center">
                                                            <CheckCircle className="h-8 w-8 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-2">
                                                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate">{template.name}</h4>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-600 text-center py-4 bg-white/50 border-2 border-amber-300 text-sm font-medium" style={{borderRadius: '20px 15px 25px 10px'}}>
                                        No templates available. 📭
                                    </p>
                                )}
                            </div>
                            <div className="border-b-2 border-amber-300" style={{borderStyle: 'dashed'}}>
                                <nav className="flex space-x-4 sm:space-x-6 -mb-px">
                                    <button onClick={() => setRemixActiveTab('url')}
                                        className={`py-2 px-1 border-b-2 font-bold text-xs sm:text-sm transition-colors ${
                                            remixActiveTab === 'url' 
                                                ? 'border-amber-500 text-amber-600' 
                                                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-500'
                                        }`}>
                                        <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> Apply to Existing Page</div>
                                    </button>
                                    <button onClick={() => setRemixActiveTab('instructions')}
                                        className={`py-2 px-1 border-b-2 font-bold text-xs sm:text-sm transition-colors ${
                                            remixActiveTab === 'instructions' 
                                                ? 'border-amber-500 text-amber-600' 
                                                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-500'
                                        }`}>
                                        <div className="flex items-center gap-2"><FileText className="h-4 w-4" /> Customize Template</div>
                                    </button>
                                </nav>
                            </div>
                            <div className="min-h-[100px] pt-4">
                                {remixActiveTab === 'url' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="remixWebsiteUrl" className="block text-slate-800 font-bold mb-2">
                                                Your website URL <span className="text-red-500">*</span> 🔗
                                            </label>
                                            <input 
                                                type="url" 
                                                id="remixWebsiteUrl" 
                                                value={websiteUrl} 
                                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                                placeholder="https://your-existing-site.com"
                                                className="w-full bg-white/80 border-2 border-amber-300 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                style={{borderRadius: '20px 15px 25px 10px'}}
                                            />
                                            <p className="text-slate-600 text-xs mt-2">
                                                AI will apply "{selectedTemplateForRemix?.name || 'selected template'}" to this site. ✨
                                            </p>
                                        </div>
                                        <div>
                                            <label htmlFor="remixUrlInstructions" className="block text-slate-800 font-bold mb-2">
                                                Instructions (Optional) 📝
                                            </label>
                                            <textarea 
                                                id="remixUrlInstructions" 
                                                value={customInstructions} 
                                                onChange={(e) => handleInstructionsChange(e.target.value)} 
                                                rows={2}
                                                placeholder="e.g., 'Keep current logo', 'Change color palette...'"
                                                className="w-full bg-white/80 border-2 border-amber-300 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                style={{borderRadius: '20px 15px 25px 10px'}}
                                            />
                                        </div>
                                    </div>
                                )}
                                {remixActiveTab === 'instructions' && (
                                    <div>
                                        <label htmlFor="remixOnlyInstructions" className="block text-slate-800 font-bold mb-2">
                                            Customization Instructions <span className="text-red-500">*</span> ✏️
                                        </label>
                                        <textarea 
                                            id="remixOnlyInstructions" 
                                            value={customInstructions} 
                                            onChange={(e) => handleInstructionsChange(e.target.value)} 
                                            rows={4}
                                            placeholder="e.g., 'Change colors to blue/silver', 'Add contact form', 'Make it for a coffee shop'..."
                                            className="w-full bg-white/80 border-2 border-amber-300 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            style={{borderRadius: '20px 15px 25px 10px'}}
                                        />
                                        <p className="text-slate-600 text-xs mt-2">
                                            Describe how you want to customize "{selectedTemplateForRemix?.name || 'selected template'}". ✨
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-white/80 border-2 border-emerald-300 text-sm text-emerald-700 font-medium" style={{
                                borderRadius: '20px 15px 25px 10px',
                                borderStyle: 'dashed'
                            }}>
                                <Grid3x3 className="inline h-4 w-4 mr-2" />
                                <span className="font-bold text-slate-800">{allTemplatesFromStore?.length || '0'}+ AI Templates:</span> Choose from professionally designed, customizable templates. 🎨
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mt-8 pt-6 border-t-2 border-amber-300" style={{borderStyle: 'dashed'}}>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 text-slate-700 hover:bg-amber-100 hover:text-amber-700 transition-colors font-medium border-2 border-slate-300 hover:border-amber-400"
                            style={{borderRadius: '15px 20px 15px 20px'}}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleFormSubmit}
                            disabled={isSubmitDisabled()}
                            className={`flex items-center justify-center gap-2 px-6 py-3 font-bold transition-all duration-300 shadow-lg transform hover:scale-105
                                ${!isSubmitDisabled() 
                                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600' 
                                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                }`}
                            style={{
                                borderRadius: '25px 15px 30px 20px',
                                boxShadow: !isSubmitDisabled() ? '4px 4px 0px rgba(245, 158, 11, 0.4)' : 'none'
                            }}
                        >
                            {getSubmitButtonText()} ✨
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewWebsiteModal;