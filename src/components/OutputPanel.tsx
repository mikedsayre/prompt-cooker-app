import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { CheckIcon, CopyIcon, ErrorIcon, FlameIcon, ShareIcon } from './ui/Icons';

interface OutputPanelProps {
    prompt: string;
    isLoading: boolean;
    error: string | null;
    title: string;
    successMessage: string;
    onShare: () => void;
}

const SkeletonLoader: React.FC = () => (
    <div className="space-y-4 animate-pulse w-full">
        <div className="h-4 bg-brand-border rounded w-3/4"></div>
        <div className="h-4 bg-brand-border rounded"></div>
        <div className="h-4 bg-brand-border rounded"></div>
        <div className="h-4 bg-brand-border rounded w-5/6"></div>
        <div className="h-4 bg-brand-border rounded w-1/2"></div>
    </div>
);

export const OutputPanel: React.FC<OutputPanelProps> = ({ prompt, isLoading, error, title, successMessage, onShare }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isShareCopied, setIsShareCopied] = useState(false);
    const [editedPrompt, setEditedPrompt] = useState(prompt);

    useEffect(() => {
        setEditedPrompt(prompt);
        if (prompt) {
            setIsCopied(false);
            setIsShareCopied(false);
        }
    }, [prompt]);

    const handleCopy = () => {
        if (!editedPrompt) return;
        navigator.clipboard.writeText(editedPrompt);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleShare = () => {
        onShare();
        setIsShareCopied(true);
        setTimeout(() => setIsShareCopied(false), 2000);
    };

    const renderHighlightedText = (text: string) => {
        // Escape HTML to prevent XSS from the raw text, then apply highlighting.
        const escapedText = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            
        const highlighted = escapedText.replace(
            /\{\{(.*?)\}\}/g,
            '<span class="highlight-glow">$1</span>'
        );
        
        // Add a final newline to ensure the container height matches textarea's scroll height
        return highlighted + '\n';
    };

    const renderContent = () => {
        if (isLoading) {
            return <SkeletonLoader />;
        }
        if (error) {
            return (
                <div className="flex flex-col items-center justify-center text-center text-red-400 font-sans">
                    <ErrorIcon className="w-12 h-12 mb-4"/>
                    <h3 className="font-semibold text-lg">A Kitchen Mishap!</h3>
                    <p className="text-sm">{error}</p>
                </div>
            );
        }
        if (prompt) {
             return (
                <div className="relative w-full h-full font-mono text-brand-code-text text-sm md:text-base leading-relaxed border border-brand-border rounded-md overflow-hidden wood-grain-bg min-h-[300px]">
                    <textarea
                        value={editedPrompt}
                        onChange={(e) => setEditedPrompt(e.target.value)}
                        className="absolute inset-0 w-full h-full p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none caret-brand-primary text-transparent selection:bg-brand-primary/30"
                        aria-label="Cooked prompt text"
                        spellCheck="false"
                    />
                    <div
                        className="absolute inset-0 w-full h-full p-3 overflow-auto pointer-events-none whitespace-pre-wrap"
                        aria-hidden="true"
                        dangerouslySetInnerHTML={{ __html: renderHighlightedText(editedPrompt) }}
                    />
                </div>
            );
        }
        return (
            <div className="flex flex-col items-center justify-center text-center text-brand-subtle font-sans">
                <svg className="w-16 h-16 mb-4 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5-2.5-3C4.5 12 9 17 9 17a8 8 0 018.657 1.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.5 12.5s-2.5 2.5-2.5 4.5c0 1.5 1.5 3 3.5 3s3.5-1.5 3.5-3c0-2-2.5-4.5-2.5-4.5" />
                </svg>
                <h3 className="font-semibold text-lg">The Grill is Ready</h3>
                <p className="text-sm">Your perfectly cooked prompt will appear here.</p>
            </div>
        );
    };

    const showSuccessMessage = !isLoading && !error && prompt;
    const buttonClass = "flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand-surface hover:bg-brand-border text-brand-subtle hover:text-brand-text transition-colors duration-200";

    return (
        <Card className="flex flex-col lg:h-full lg:sticky top-24">
            <header className="p-4 flex items-start justify-between border-b border-brand-border flex-shrink-0 min-h-[70px] gap-4">
                {/* Left side: Title and message */}
                <div className="flex-grow">
                    <div className="flex items-center gap-3">
                        <FlameIcon className={`w-7 h-7 transition-colors duration-300 ${showSuccessMessage ? 'text-brand-primary animate-flicker-glow' : 'text-brand-subtle/50'}`} />
                        <div>
                            <h3 className="text-xl font-semibold text-brand-text">{title}</h3>
                            {showSuccessMessage && (
                                <p className="text-sm text-brand-primary mt-0.5 animate-fade-in">
                                    {successMessage}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side: Buttons */}
                {prompt && !isLoading && !error && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                         <button onClick={handleShare} className={buttonClass}>
                            {isShareCopied ? <CheckIcon className="w-5 text-sm text-green-400 leading-none" /> : <ShareIcon className="w-5 text-sm leading-none" />}
                            <span className="text-sm font-medium leading-none">{isShareCopied ? 'Link Copied!' : 'Share'}</span>
                        </button>
                        <button onClick={handleCopy} className={buttonClass}>
                            {isCopied ? <CheckIcon className="w-5 text-sm text-green-400 leading-none" /> : <CopyIcon className="w-5 text-sm leading-none" />}
                            <span className="text-sm font-medium leading-none">{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                )}
            </header>
            <div className="p-4 md:p-6 flex-grow flex flex-col min-h-[calc(100%-70px)]">
                {renderContent()}
            </div>
            {prompt && !isLoading && !error && (
                <footer className="p-2 border-t border-brand-border text-center text-xs text-brand-subtle/80 flex-shrink-0">
                    This is your AI recipe! Copy it and use it in your favorite AI tool.
                </footer>
            )}
        </Card>
    );
};