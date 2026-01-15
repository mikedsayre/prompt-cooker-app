import React from 'react';

interface AnimatedThemeIconProps {
    theme: 'light' | 'dark';
    className?: string;
}

export const AnimatedThemeIcon: React.FC<AnimatedThemeIconProps> = ({ theme, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`animated-theme-icon ${theme} ${className || ''}`}
            aria-hidden="true"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"
        >
            <mask id="moon-mask-main">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle className="moon-mask-circle" cx="12" cy="4" r="9" fill="black" />
            </mask>
            <circle className="sun-main" cx="12" cy="12" r="5" fill="currentColor" mask="url(#moon-mask-main)" />
            <g className="sun-rays" stroke="currentColor">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
        </svg>
    );
};
