
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-brand-surface border border-brand-border rounded-xl shadow-lg overflow-hidden ${className}`}>
            {children}
        </div>
    );
};