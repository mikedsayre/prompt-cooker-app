import React, { useState, useEffect } from 'react';
import { AnimatedThemeIcon } from './ui/AnimatedThemeIcon';

export const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.theme === 'light') {
                return 'light';
            }
            if (localStorage.theme === 'dark') {
                return 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        return 'dark'; // Default for SSR or other environments
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'light') {
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            root.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-brand-surface hover:bg-brand-border text-brand-subtle hover:text-brand-text transition-colors duration-200"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <AnimatedThemeIcon theme={theme} className="w-5 h-5" />
        </button>
    );
};