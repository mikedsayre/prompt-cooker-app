import React from 'react';
import type { TuningOptions } from '../types';
import { TONES, FORMATS } from '../constants';
import { Tooltip } from './ui/Tooltip';
import { SpiceRackIcon } from './ui/Icons';
import { Slider } from './ui/Slider';

interface TuningPanelProps {
    options: TuningOptions;
    setOptions: (options: TuningOptions) => void;
    isDisabled: boolean;
}

const LabelWithTooltip: React.FC<{htmlFor: string; label: string; tooltip: string;}> = ({htmlFor, label, tooltip}) => (
    <div className="flex items-center space-x-1.5 mb-2">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-brand-subtle">
            {label}
        </label>
        <Tooltip text={tooltip} />
    </div>
);


export const TuningPanel: React.FC<TuningPanelProps> = ({ options, setOptions, isDisabled }) => {
    const handleOptionChange = <K extends keyof TuningOptions,>(key: K, value: TuningOptions[K]) => {
        setOptions({ ...options, [key]: value });
    };

    const commonInputClass = "w-full p-2 bg-brand-input-bg border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition duration-200 disabled:opacity-50";

    return (
        <div>
            <div className="border border-brand-border rounded-lg p-4 bg-brand-bg/50 mb-6">
                <div className="flex items-center gap-3">
                    <SpiceRackIcon className="w-8 h-8 text-brand-primary" />
                    <div>
                        <h3 className="text-xl font-semibold text-brand-text">The Spice Rack</h3>
                        <p className="text-sm text-brand-subtle mt-1">
                            Flavor your prompt to perfection. Add a little kick to your creation.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                {/* Persona */}
                <div className="md:col-span-1">
                    <LabelWithTooltip htmlFor="persona" label="Chef's Persona" tooltip="Sets the persona or role the final AI should adopt. Who is the AI chef? A grumpy short-order cook? A fancy French pâtissier?" />
                    <input
                        id="persona"
                        type="text"
                        placeholder="e.g., A witty BBQ pitmaster"
                        value={options.persona}
                        onChange={(e) => handleOptionChange('persona', e.target.value)}
                        disabled={isDisabled}
                        className={commonInputClass}
                    />
                </div>

                {/* Tone */}
                <div className="md:col-span-1">
                    <LabelWithTooltip htmlFor="tone" label="Flavor Profile" tooltip="Controls the 'Tone' of the output. What's the taste of the final dish? 'Spicy' (Humorous), 'Savory' (Professional), 'Sweet' (Empathetic)?" />
                    <select
                        id="tone"
                        value={options.tone}
                        onChange={(e) => handleOptionChange('tone', e.target.value as TuningOptions['tone'])}
                        disabled={isDisabled}
                        className={commonInputClass}
                    >
                        {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                {/* Format */}
                <div className="md:col-span-1">
                    <div className="flex items-center space-x-1.5 mb-2">
                        <label htmlFor="format" className="block text-sm font-medium text-brand-subtle">
                            Plating Style
                        </label>
                        <Tooltip text="Controls the 'Format' of the output. How should the final dish be presented? A neat list (Bullet Points), a structured file (JSON), or a classic paragraph?" />
                    </div>
                    <select
                        id="format"
                        value={options.format}
                        onChange={(e) => handleOptionChange('format', e.target.value as TuningOptions['format'])}
                        disabled={isDisabled}
                        className={commonInputClass}
                    >
                        {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>
                {/* Negative Prompt */}
                <div className="md:col-span-1">
                    <LabelWithTooltip htmlFor="negativePrompt" label="Allergies / Avoid" tooltip="Controls the 'Negative Prompt'. What ingredients should the chef absolutely NOT use? List any topics, words, or ideas to keep out of the recipe." />
                    <input
                        id="negativePrompt"
                        type="text"
                        placeholder="e.g., Avoid clichés, don't mention winter"
                        value={options.negativePrompt}
                        onChange={(e) => handleOptionChange('negativePrompt', e.target.value)}
                        disabled={isDisabled}
                        className={commonInputClass}
                    />
                </div>
            
                {/* Complexity */}
                <Slider
                    id="complexity"
                    className="md:col-span-2"
                    label="Heat Level"
                    tooltip="Controls the 'Complexity' of the output. How spicy should it be? From 'Mild' (simple) for beginners to 'Scorching' (expert) for pros."
                    min={1}
                    max={5}
                    step={1}
                    value={options.complexity}
                    onChange={(val) => handleOptionChange('complexity', val)}
                    disabled={isDisabled}
                    thumbIcon="heat"
                    startLabel="Mild"
                    endLabel="Scorching"
                />

                {/* Verbosity */}
                <Slider
                    id="verbosity"
                    className="md:col-span-2"
                    label="Portion Size"
                    tooltip="Controls the 'Verbosity' of the output. How big is the serving? From a small 'Appetizer' (concise) to a massive 'Feast' (detailed)."
                    min={1}
                    max={5}
                    step={1}
                    value={options.verbosity}
                    onChange={(val) => handleOptionChange('verbosity', val)}
                    disabled={isDisabled}
                    thumbIcon="portion"
                    startLabel="Appetizer"
                    endLabel="Feast"
                />
            </div>
        </div>
    );
};