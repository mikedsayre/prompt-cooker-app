

export type Tone = 'Professional' | 'Casual' | 'Formal' | 'Humorous' | 'Empathetic';
export type Format = 'Auto' | 'Paragraph' | 'Bullet Points' | 'JSON' | 'Markdown Table';

export interface TuningOptions {
    tone: Tone;
    format: Format;
    verbosity: number; // 1 to 5 scale
    complexity: number; // 1 to 5 scale
    persona: string;
    negativePrompt: string;
}

export interface HistoryItem {
    id: number;
    timestamp: string;
    userInput: string;
    tuningOptions: TuningOptions;
    generatedPrompt: string;
}

export interface SharedRecipe {
    userInput: string;
    tuningOptions: TuningOptions;
}