import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { generateOptimizedPrompt } from './services/geminiService';
import type { TuningOptions, HistoryItem, SharedRecipe } from './types';
import { DEFAULT_TUNING_OPTIONS, LOGO_PATH } from './constants';
import { HistoryPanel } from './components/HistoryPanel';
import { HelpModal } from './components/HelpModal';

console.log('App.tsx started'); // Debugging log

const PRELOADED_EXAMPLE: {
    userInput: string;
    tuningOptions: TuningOptions;
    generatedPrompt: string;
} = {
  userInput: `I want to grill the perfect ribeye steak.`,
  tuningOptions: {
    ...DEFAULT_TUNING_OPTIONS,
    persona: 'A witty, seasoned BBQ pitmaster from Texas',
    tone: 'Humorous',
    format: 'Paragraph',
    complexity: 3,
    verbosity: 3,
    negativePrompt: 'boring, flavorless, corporate jargon'
  },
  generatedPrompt: `As a witty, seasoned BBQ pitmaster from Texas, write a {{humorous, moderately detailed (3/5), standard complexity (3/5)}} guide on how to grill a perfect medium-rare ribeye steak. Ensure the guide is formatted as a {{paragraph}} and strictly avoid {{boring, flavorless, corporate jargon}}. Focus on {{selecting the right cut}}, {{seasoning}}, the {{high-heat searing process}}, {{indirect heat cooking for a red center}}, and {{resting the steak}}. Make it sound so delicious and straightforward that even a rookie can feel like a grilling champion.`
};

const App: React.FC = () => {
    const [userInput, setUserInput] = useState<string>(PRELOADED_EXAMPLE.userInput);
    const [tuningOptions, setTuningOptions] = useState<TuningOptions>(PRELOADED_EXAMPLE.tuningOptions);
    const [generatedPrompt, setGeneratedPrompt] = useState<string>(PRELOADED_EXAMPLE.generatedPrompt);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);

    useEffect(() => {
        // --- On mount effects ---
        // 1. Check for speech recognition support
        setIsSpeechRecognitionSupported('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
        
        // 2. Load history from localStorage
        try {
            const storedHistory = localStorage.getItem('promptCookerHistory');
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
        } catch (e) {
            console.error("Failed to load history from localStorage", e);
            setHistory([]);
        }

        // 3. Check for a shared recipe in the URL
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const recipeData = urlParams.get('recipe');
            if (recipeData) {
                const decodedRecipe = atob(recipeData);
                const parsedRecipe: SharedRecipe = JSON.parse(decodedRecipe);
                setUserInput(parsedRecipe.userInput);
                setTuningOptions(parsedRecipe.tuningOptions);
                setGeneratedPrompt(''); // Clear generated prompt when loading a recipe
                setError(null);
                 // Remove the query parameter from the URL for a cleaner address bar
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        } catch (e) {
            console.error("Failed to load recipe from URL", e);
        }
    }, []);

    const saveHistory = (newHistory: HistoryItem[]) => {
        setHistory(newHistory);
        localStorage.setItem('promptCookerHistory', JSON.stringify(newHistory));
    };

    const handleSaveToHistory = (prompt: string) => {
        const newEntry: HistoryItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            userInput,
            tuningOptions,
            generatedPrompt: prompt,
        };
        const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep max 50 items
        saveHistory(updatedHistory);
    };

    const handleLoadFromHistory = (item: HistoryItem) => {
        setUserInput(item.userInput);
        setTuningOptions(item.tuningOptions);
        setGeneratedPrompt(item.generatedPrompt);
        setError(null);
        setIsHistoryPanelOpen(false);
    };

    const handleDeleteFromHistory = (id: number) => {
        const updatedHistory = history.filter(item => item.id !== id);
        saveHistory(updatedHistory);
    };

    const handleClearHistory = () => {
        saveHistory([]);
        setIsHistoryPanelOpen(false);
    };
    
    const handleShare = useCallback(() => {
        const recipe: SharedRecipe = { userInput, tuningOptions };
        const jsonString = JSON.stringify(recipe);
        const base64String = btoa(jsonString);
        const url = `https://promptcooker.app/?recipe=${base64String}`;
        navigator.clipboard.writeText(url);
    }, [userInput, tuningOptions]);

    const handleGenerate = useCallback(async () => {
        if (!userInput.trim()) {
            setError('Please add an idea to the grill first.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedPrompt('');

        try {
            const prompt = await generateOptimizedPrompt(userInput, tuningOptions);
            setGeneratedPrompt(prompt);
            handleSaveToHistory(prompt);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to cook prompt: ${errorMessage}`);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [userInput, tuningOptions, history]);

    return (
        <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
            <Header 
                onToggleHistory={() => setIsHistoryPanelOpen(!isHistoryPanelOpen)}
                onToggleHelp={() => setIsHelpModalOpen(true)}
            />
            <main className="flex-grow container mx-auto max-w-7xl p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative">
                <InputPanel
                    userInput={userInput}
                    setUserInput={setUserInput}
                    tuningOptions={tuningOptions}
                    setTuningOptions={setTuningOptions}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                    isSpeechRecognitionSupported={isSpeechRecognitionSupported}
                />
                <OutputPanel
                    prompt={generatedPrompt}
                    isLoading={isLoading}
                    error={error}
                    title="Cooked Prompt Table"
                    successMessage="Prompt's Ready! Spiced just right and cooked up to perfection."
                    onShare={handleShare}
                />
                <HistoryPanel
                    isOpen={isHistoryPanelOpen}
                    onClose={() => setIsHistoryPanelOpen(false)}
                    history={history}
                    onLoad={handleLoadFromHistory}
                    onDelete={handleDeleteFromHistory}
                    onClear={handleClearHistory}
                />
                <HelpModal 
                    isOpen={isHelpModalOpen}
                    onClose={() => setIsHelpModalOpen(false)}
                />
            </main>
            <footer className="text-center p-6 border-t border-brand-border mt-8">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
                    <img 
                        src={LOGO_PATH}
                        alt="Swan Lake Digital Mascot"
                        className="w-16 h-16"
                    />
                    <div className="text-sm text-brand-subtle max-w-md">
                        <p className="font-semibold text-brand-text">
                            This app was cooked up by <a href="https://swanlakedigital.com" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline font-bold">Swan Lake Digital</a>.
                        </p>
                        <p className="mt-1">We build sizzling-hot web & mobile apps with Gemini AI integration. Let's build something cool together.</p>
                    </div>
                </div>
                 <p className="text-xs text-brand-subtle/80 mt-6">Powered by Google Gemini. Prompt Cooker - Your Recipe for Perfect Prompts.</p>
            </footer>
        </div>
    );
};

export default App;