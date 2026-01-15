import React from 'react';

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
    <span className={`material-symbols-outlined ${className || ''}`} aria-hidden="true">
        {name}
    </span>
);

export const ColorPaletteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 21.999c-5.523 0-10-4.477-10-10 0-5.5228 4.477-10 10-10 4.437 0 8.224 2.8954 9.513 6.8995" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.5 3.00104C10.027 3.44004 8.707 4.24604 7.6 5.39104C4.6 8.39104 4.6 13.208 7.6 16.208C10.6 19.208 15.4 19.208 18.4 16.208C19.754 14.854 20.61 13.111 20.919 11.232" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="8" r="1.5" fill="#ef4444"/>
        <circle cx="12" cy="7" r="1.5" fill="#3b82f6"/>
        <circle cx="16" cy="9" r="1.5" fill="#22c55e"/>
        <circle cx="15" cy="13.5" r="1.5" fill="#f97316"/>
        <circle cx="10.5" cy="12" r="1.5" fill="#eab308"/>
    </svg>
);

export const FlameIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="local_fire_department" className={className} />;
export const SpiceRackIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="local_pharmacy" className={className} />;
export const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="history" className={className} />;
export const QuestionMarkIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="help" className={className} />;
export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="auto_awesome" className={className} />;
export const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="mic" className={className} />;
export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="info" className={className} />;
export const CopyIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="content_copy" className={className} />;
export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="check" className={className} />;
export const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="error" className={className} />;
export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="search" className={className} />;
export const LoadIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="replay" className={className} />;
export const DeleteIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="delete" className={className} />;
export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="close" className={className} />;
export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => <Icon name="share" className={className} />;


// These icons are used for slider thumbs and are still custom SVGs for precise control.
// In a real-world scenario, these could also be Material Symbols if suitable ones are found.
export const HotPepperIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19.5,10.22A4.23,4.23,0,0,0,16,8.5A4.5,4.5,0,0,0,11.5,4C9.42,4,8.13,5,7.74,5.32C7.3,5.69,7,6.25,7,7A1,1,0,0,0,8,8C8,8,9.25,8.5,10.63,7.82C10.88,8.78,11.5,9.6,12.28,10.13C11.13,10.8,10.4,12.06,10.26,13.43C9.05,13.15,8.13,12.24,8,11A1,1,0,0,0,7,10C6.91,10,6.2,12.35,8.18,14.54C9.5,15.96,11.16,17,13,17A5,5,0,0,0,18,12C18,11.23,17.82,10.5,17.5,9.84C18.5,10.28,19.5,10.22,19.5,10.22Z" /></svg>
);
export const SteakIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M10.3,6.8L8.8,5.3C9.5,3.9,11.1,3,13,3A5,5,0,0,1,18,8C18,9.9,17.1,11.5,15.7,12.2L11.8,8.3C12.5,7.7,11.8,7.3,10.3,6.8M7,11C4.2,11,2,13.2,2,16S4.2,21,7,21A5,5,0,0,0,12,16C12,14.2,11.1,12.6,9.8,11.8L16,5.5C17.9,6.4,19.2,8.3,19.7,10.5L22,12L20,14L18,12.7C17.7,14.9,16.4,16.8,14.5,17.9L12,20L10,22L8,18.8C5.2,18.1,4.5,15.8,4.1,14.6C3.1,15.5,2.8,17,3.2,18.2C3.5,19.2,4.8,20,6,20C8,20,9,18.5,9,18.5C9.6,19.3,10.7,19.6,11.6,19.3L16.2,14.7C16.5,14,16,13.2,15.2,13.2C13.5,13.1,13,14,13,14C13,14,12,12,10,12H9C7.9,12,7,11,7,11Z" /></svg>
);