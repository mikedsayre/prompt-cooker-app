import React, { useState } from 'react';
import type { HistoryItem } from '../types';
import { CloseIcon, DeleteIcon, LoadIcon, SearchIcon } from './ui/Icons';

interface HistoryPanelProps {
    isOpen: boolean;
    onClose: () => void;
    history: HistoryItem[];
    onLoad: (item: HistoryItem) => void;
    onDelete: (id: number) => void;
    onClear: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose, history, onLoad, onDelete, onClear }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) {
        return null;
    }
    
    const filteredHistory = history.filter(item =>
        item.userInput.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClearConfirm = () => {
        if (window.confirm('Are you sure you want to permanently delete your entire recipe book? This cannot be undone.')) {
            onClear();
            setSearchTerm('');
        }
    };
    
    const timeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/50 z-20 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Panel */}
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-bg shadow-2xl z-30 transform transition-transform translate-x-0 flex flex-col">
                <header className="p-4 flex items-center justify-between border-b border-brand-border flex-shrink-0">
                    <h2 className="text-xl font-semibold text-brand-text">Recipe Book</h2>
                    <div className="flex items-center gap-2">
                        {history.length > 0 && (
                             <button onClick={handleClearConfirm} className="text-sm text-brand-subtle hover:text-red-400 transition-colors">Clear All</button>
                        )}
                        <button onClick={onClose} className="p-1 rounded-full text-brand-subtle hover:bg-brand-border hover:text-brand-text transition-colors">
                            <CloseIcon />
                        </button>
                    </div>
                </header>
                
                <div className="flex-grow overflow-y-auto">
                    {history.length === 0 ? (
                        <div className="text-center p-8 text-brand-subtle">
                            <span className="material-symbols-outlined text-6xl opacity-30">menu_book</span>
                            <p className="font-semibold mt-4">Your recipe book is empty.</p>
                            <p className="text-sm">Cooked prompts will be saved here for later.</p>
                        </div>
                    ) : (
                       <>
                            <div className="p-4 border-b border-brand-border">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by raw idea..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full p-2 pl-10 bg-brand-input-bg border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition duration-200"
                                        aria-label="Search history"
                                    />
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-subtle pointer-events-none" />
                                </div>
                            </div>
                            {filteredHistory.length > 0 ? (
                                <ul className="divide-y divide-brand-border">
                                    {filteredHistory.map(item => (
                                        <li key={item.id} className="p-4 hover:bg-brand-surface/50 transition-colors group">
                                            <p className="text-xs text-brand-subtle">{timeAgo(item.timestamp)}</p>
                                            <p className="font-semibold text-brand-text truncate my-1" title={item.userInput}>{item.userInput}</p>
                                            <div className="flex items-center justify-end gap-2 mt-2">
                                                <button onClick={() => onLoad(item)} className="flex items-center text-xs py-1 px-2 rounded bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                                                    <LoadIcon className="mr-1 text-xs leading-none"/> <span className="leading-none">Load</span>
                                                </button>
                                                <button onClick={() => onDelete(item.id)} className="flex items-center text-xs py-1 px-2 rounded bg-brand-border text-brand-subtle hover:bg-red-500 hover:text-white transition-all">
                                                    <DeleteIcon className="mr-1 text-xs leading-none"/> <span className="leading-none">Delete</span>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center p-8 text-brand-subtle">
                                    <p className="font-semibold">No Matching Recipes Found</p>
                                    <p className="text-sm">Try a different search term.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};