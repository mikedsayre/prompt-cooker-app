import React, { useState, useEffect, useRef } from 'react';
import type { TuningOptions } from '../types';
import { TuningPanel } from '../components/TuningPanel';
import { Card } from './ui/Card';
import { FlameIcon, InfoIcon, MicrophoneIcon } from './ui/Icons';

// Type declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface InputPanelProps {
    userInput: string;
    setUserInput: React.Dispatch<React.SetStateAction<string>>;
    tuningOptions: TuningOptions;
    setTuningOptions: (options: TuningOptions) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isSpeechRecognitionSupported: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
    userInput,
    setUserInput,
    tuningOptions,
    setTuningOptions,
    onGenerate,
    isLoading,
    isSpeechRecognitionSupported
}) => {
    const [isListening, setIsListening] = useState(false);
    const [isTipsVisible, setIsTipsVisible] = useState(false);
    const recognitionRef = useRef<any>(null);
    const tipsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isSpeechRecognitionSupported) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            // Append final transcript to the user input
            if (finalTranscript) {
                 setUserInput(prev => (prev.trim() ? prev + ' ' : '') + finalTranscript.trim());
            }
        };

        return () => {
             if (recognition) {
                recognition.stop();
            }
        };

    }, [isSpeechRecognitionSupported, setUserInput]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (tipsRef.current && !tipsRef.current.contains(event.target as Node)) {
                setIsTipsVisible(false);
            }
        }
        if (isTipsVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isTipsVisible]);
    
    const handleToggleListening = () => {
        if (isLoading || !isSpeechRecognitionSupported) return;
        
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    return (
        <Card>
            <div className="p-6">
                 <div className="space-y-4 mb-4">
                    {/* Wrapper for relative positioning and click-outside detection */}
                    <div className="relative" ref={tipsRef}>
                        {/* Box 1: The Grill Station */}
                        <div className="border border-brand-border rounded-lg p-4 bg-brand-bg">
                            <div className="flex items-start gap-3">
                                <FlameIcon className="w-8 h-8 text-brand-primary opacity-70 flex-shrink-0 mt-1" />
                                <div className="flex-grow">
                                     <div className="flex justify-between items-start">
                                        <h2 className="text-xl font-semibold text-brand-text">The Grill Station</h2>
                                        <button
                                            onClick={() => setIsTipsVisible(prev => !prev)}
                                            className={`p-1 rounded-full transition-colors ${isTipsVisible ? 'bg-brand-primary/20' : ''} text-brand-primary hover:bg-brand-primary/10 -mr-2 -mt-1`}
                                            aria-label="Toggle Chef's Tips"
                                            title="Toggle Chef's Tips"
                                        >
                                            <InfoIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-brand-subtle mt-1">
                                        Throw your raw idea on the grill. The better the ingredients, the better the final dish.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Box 2: Chef's Tips Popout */}
                        {isTipsVisible && (
                            <div className="absolute top-full mt-2 w-full z-10 animate-fade-in-down">
                                <div className="border border-brand-border rounded-lg p-4 bg-brand-surface shadow-lg">
                                    <div className="flex items-start gap-3">
                                        <InfoIcon className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold text-brand-text">Chef's Tips for Best Results</h3>
                                            <p className="text-sm text-brand-subtle mt-1">
                                                This app is your AI prompt *chef*, not an AI *answering* questions. It helps you write a better "prompt" (a recipe of instructions) for *another* AI. Instead of a simple question like "How to grill steak?", try giving a role and a detailed task: <strong className="text-brand-text/90">"You are a world-class BBQ pitmaster. Write a guide for grilling the perfect medium-rare ribeye, including tips on seasoning and resting time."</strong> The better the ingredients, the better the meal!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="relative">
                    <textarea
                        id="userInput" // Added id
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="e.g., 'A three-month marketing plan for a new coffee shop', 'A funny tweet about AI', 'A formal email to my boss'."
                        className="w-full h-48 p-3 pr-12 border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition duration-200 resize-none grill-bg text-brand-code-text"
                        disabled={isLoading}
                        aria-label="Raw idea input"
                    />
                     {isSpeechRecognitionSupported && (
                        <button
                            onClick={handleToggleListening}
                            disabled={isLoading}
                            title={isListening ? "Stop listening" : "Start listening"}
                            className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                isListening
                                ? 'bg-brand-primary/20 text-brand-primary animate-pulse'
                                : 'bg-transparent text-brand-subtle hover:text-brand-text'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            aria-label={isListening ? "Stop voice input" : "Start voice input"}
                        >
                            <MicrophoneIcon className="text-xl" />
                        </button>
                    )}
                </div>
                <div className="mt-4">
                     <button
                        onClick={onGenerate}
                        disabled={isLoading || !userInput}
                        className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-lg shadow-lg hover:shadow-glow-primary transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none animate-gradient-x"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white leading-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="leading-none">Cooking...</span>
                            </>
                        ) : (
                        <>
                            <FlameIcon className="w-5 mr-2 text-base leading-none" />
                            <span className="font-bold leading-none">Cook My Prompt</span>
                        </>
                        )}
                    </button>
                </div>
            </div>
            <div className="p-6 border-t border-brand-border">
                <TuningPanel 
                    options={tuningOptions} 
                    setOptions={setTuningOptions} 
                    isDisabled={isLoading} 
                />
            </div>
        </Card>
    );
};