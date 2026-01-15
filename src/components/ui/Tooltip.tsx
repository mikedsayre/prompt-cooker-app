
import React from 'react';

interface TooltipProps {
    text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text }) => {
    return (
        <div className="group relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-subtle cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full mb-2 w-48 scale-0 transform transition-all group-hover:scale-100 origin-bottom">
                <div className="bg-brand-surface border border-brand-border text-brand-text text-xs rounded-lg py-2 px-3 shadow-lg">
                    {text}
                </div>
                <div className="w-3 h-3 -mt-2 rotate-45 bg-brand-surface border-r border-b border-brand-border mx-auto"></div>
            </div>
        </div>
    );
};