

import type { Tone, Format, TuningOptions } from './types';

export const TONES: Tone[] = ['Professional', 'Casual', 'Formal', 'Humorous', 'Empathetic'];
export const FORMATS: Format[] = ['Auto', 'Paragraph', 'Bullet Points', 'JSON', 'Markdown Table'];

export const DEFAULT_TUNING_OPTIONS: TuningOptions = {
    tone: 'Casual',
    format: 'Auto',
    verbosity: 3,
    complexity: 3,
    persona: '',
    negativePrompt: '',
};
