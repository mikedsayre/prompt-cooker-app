import React, { useState, useEffect, useRef } from 'react';
import { ColorPaletteIcon } from './Icons';

// --- Helper Functions ---
const shadeColor = (col: string, percent: number) => {
    // Ensure hex color is valid
    if (!col || col.length !== 7) return col;
    
    let R = parseInt(col.substring(1, 3), 16);
    let G = parseInt(col.substring(3, 5), 16);
    let B = parseInt(col.substring(5, 7), 16);

    R = parseInt(String(R * (100 + percent) / 100));
    G = parseInt(String(G * (100 + percent) / 100));
    B = parseInt(String(B * (100 + percent) / 100));

    R = (R < 255) ? R : 255;  
    G = (G < 255) ? G : 255;  
    B = (B < 255) ? B : 255;  

    const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16)).slice(0, 2);
    const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16)).slice(0, 2);
    const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16)).slice(0, 2);

    return "#" + RR + GG + BB;
};

const hexToRgba = (hex: string, alpha: number): string => {
    if (!hex || hex.length !== 7) return `rgba(249, 115, 22, ${alpha})`; // Fallback
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const ColorPicker: React.FC = () => {
    const defaultColor = '#f97316'; // Default to orange to match base theme
    const [color, setColor] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('themeColor') || defaultColor;
        }
        return defaultColor;
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const root = document.documentElement;
        // For light theme, we darken the secondary color. For dark, we lighten.
        const isLight = root.classList.contains('light');
        const secondaryColor = shadeColor(color, isLight ? -10 : 20);
        const glowColor = hexToRgba(color, 0.4);

        root.style.setProperty('--color-primary', color);
        root.style.setProperty('--color-secondary', secondaryColor);
        root.style.setProperty('--color-glow', glowColor);
        
        localStorage.setItem('themeColor', color);
    }, [color]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };
    
    // The button itself will trigger the hidden input.
    // The input is positioned to cover the button for better UX.
    return (
        <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="p-2 rounded-full bg-brand-surface hover:bg-brand-border transition-colors duration-200 relative overflow-hidden flex items-center justify-center"
            aria-label="Choose theme color"
            title="Choose theme color"
        >
            <ColorPaletteIcon className="w-5 h-5" />
            <input
                ref={inputRef}
                type="color"
                value={color}
                onChange={handleColorChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // Make input cover button
                aria-hidden="true"
            />
        </button>
    );
};