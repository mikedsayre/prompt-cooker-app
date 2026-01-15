import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { ColorPicker } from './ui/ColorPicker';
import { HistoryIcon, QuestionMarkIcon } from './ui/Icons';
import { LOGO_PATH } from '../constants';

interface HeaderProps {
    onToggleHistory: () => void;
    onToggleHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleHistory, onToggleHelp }) => {
    return (
        <header className="py-4 px-4 md:px-8 shadow-md bg-brand-surface/70 backdrop-blur-sm border-b border-brand-border sticky top-0 z-20">
            <div className="container mx-auto flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                            Prompt Cooker
                        </h1>
                        <img 
                            src={LOGO_PATH}
                            alt="Prompt Cooker Mascot"
                            className="w-10 h-10 icon-spin-hover"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <ColorPicker />
                    <button
                        onClick={onToggleHistory}
                        className="p-2 rounded-full bg-brand-surface hover:bg-brand-border text-brand-subtle hover:text-brand-text transition-colors duration-200 flex items-center justify-center"
                        aria-label="View prompt history"
                        title="View Recipe Book"
                    >
                        <HistoryIcon className="text-xl" />
                    </button>
                    <button
                        onClick={onToggleHelp}
                        className="p-2 rounded-full bg-brand-surface hover:bg-brand-border text-brand-subtle hover:text-brand-text transition-colors duration-200 flex items-center justify-center"
                        aria-label="Open help guide"
                        title="Open Guide"
                    >
                        <QuestionMarkIcon className="text-xl text-brand-primary" />
                    </button>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};