import React, { useRef, useEffect } from 'react';
import { Tooltip } from './Tooltip';

interface SliderProps {
    id: string;
    label: string;
    tooltip: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
    thumbIcon: 'heat' | 'portion';
    startLabel: string;
    endLabel: string;
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({
    id,
    label,
    tooltip,
    min,
    max,
    step,
    value,
    onChange,
    disabled,
    thumbIcon,
    startLabel,
    endLabel,
    className,
}) => {
    const rangeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Set the icon as a CSS variable for the thumb's background
        const root = document.documentElement;
        const iconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'>${
            thumbIcon === 'heat' 
                ? '<path d="M19.5,10.22A4.23,4.23,0,0,0,16,8.5A4.5,4.5,0,0,0,11.5,4C9.42,4,8.13,5,7.74,5.32C7.3,5.69,7,6.25,7,7A1,1,0,0,0,8,8C8,8,9.25,8.5,10.63,7.82C10.88,8.78,11.5,9.6,12.28,10.13C11.13,10.8,10.4,12.06,10.26,13.43C9.05,13.15,8.13,12.24,8,11A1,1,0,0,0,7,10C6.91,10,6.2,12.35,8.18,14.54C9.5,15.96,11.16,17,13,17A5,5,0,0,0,18,12C18,11.23,17.82,10.5,17.5,9.84C18.5,10.28,19.5,10.22,19.5,10.22Z"/>'
                : '<path d="M10.3,6.8L8.8,5.3C9.5,3.9,11.1,3,13,3A5,5,0,0,1,18,8C18,9.9,17.1,11.5,15.7,12.2L11.8,8.3C12.5,7.7,11.8,7.3,10.3,6.8M7,11C4.2,11,2,13.2,2,16S4.2,21,7,21A5,5,0,0,0,12,16C12,14.2,11.1,12.6,9.8,11.8L16,5.5C17.9,6.4,19.2,8.3,19.7,10.5L22,12L20,14L18,12.7C17.7,14.9,16.4,16.8,14.5,17.9L12,20L10,22L8,18.8C5.2,18.1,4.5,15.8,4.1,14.6C3.1,15.5,2.8,17,3.2,18.2C3.5,19.2,4.8,20,6,20C8,20,9,18.5,9,18.5C9.6,19.3,10.7,19.6,11.6,19.3L16.2,14.7C16.5,14,16,13.2,15.2,13.2C13.5,13.1,13,14,13,14C13,14,12,12,10,12H9C7.9,12,7,11,7,11Z"/>'
            }</svg>`;
        const iconDataUri = `url("data:image/svg+xml,${encodeURIComponent(iconSvg)}")`;
        root.style.setProperty(`--thumb-${thumbIcon}-icon`, iconDataUri);
    }, [thumbIcon]);
    

    return (
        <div className={`w-full ${className || ''}`}>
            <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center space-x-1.5">
                    <label htmlFor={id} className="block text-sm font-medium text-brand-subtle">
                        {label}
                    </label>
                    <Tooltip text={tooltip} />
                </div>
                <div className="bg-brand-code-bg text-brand-primary font-mono font-bold text-lg rounded-md px-3 py-1 tabular-nums border border-brand-border shadow-inner">
                    {value}
                </div>
            </div>
            <div className="relative">
                <input
                    ref={rangeRef}
                    id={id}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value, 10))}
                    disabled={disabled}
                    className={`custom-slider slider-thumb-${thumbIcon}`}
                />
                 <div className="flex justify-between items-center text-xs text-brand-subtle mt-1 px-1">
                    <span>{startLabel}</span>
                    <span>{endLabel}</span>
                </div>
            </div>
        </div>
    );
};