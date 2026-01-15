import React from 'react';
import { CloseIcon } from './ui/Icons';
import { LOGO_PATH } from '../constants'; // Import LOGO_PATH

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-lg font-bold text-brand-primary mb-2 border-b border-brand-border pb-1">{title}</h3>
        <div className="space-y-2 text-sm text-brand-text leading-relaxed">
            {children}
        </div>
    </div>
);

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/60 z-40 transition-opacity animate-[fade-in_0.2s_ease-out]"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div 
                    className="bg-brand-surface border border-brand-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-transform animate-[scale-up_0.2s_ease-out]"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="help-modal-title"
                >
                    <header className="p-4 flex items-center justify-between border-b border-brand-border flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <img 
                                src={LOGO_PATH}
                                alt="Prompt Cooker Logo"
                                className="w-8 h-8"
                            />
                            <h2 id="help-modal-title" className="text-xl font-semibold text-brand-text">Prompt Cooker Guide</h2>
                        </div>
                        <button onClick={onClose} className="p-1 rounded-full text-brand-subtle hover:bg-brand-border hover:text-brand-text transition-colors" aria-label="Close guide">
                            <CloseIcon />
                        </button>
                    </header>
                    <div className="flex-grow p-6 overflow-y-auto">
                        <Section title="What is Prompt Cooker?">
                            <p>Prompt Cooker is your personal AI prompt *chef*. It does **not** answer your questions directly. Instead, its job is to help you write a five-star <strong>prompt recipe</strong>—a powerful set of instructions that you can take to *any other AI system* to get better, more predictable results.</p>
                            <p>The "Cooked Prompt" you receive is your final recipe, meticulously crafted and ready for you to copy and use in your favorite AI tool (e.g., Gemini, ChatGPT, etc.).</p>
                        </Section>
                        
                        <Section title="How to Cook a Prompt">
                            <ol className="list-decimal list-inside space-y-2">
                                <li><strong>Start at the Grill Station:</strong> Enter your raw idea or core task in the first panel. Don't worry if it's messy!</li>
                                <li><strong>Or, Use Your Voice:</strong> Click the microphone icon in the text box for hands-free cooking. Just speak your core task!</li>
                                <li><strong>Season the Recipe:</strong> Use "The Spice Rack" to add detail and constraints, telling the chef exactly how you want your prompt cooked.</li>
                                <li><strong>Cook It:</strong> Click the "Cook My Prompt" button and let the chef work their magic.</li>
                                <li><strong>Serve & Enjoy:</strong> Your final **prompt recipe** is served in the right panel. You can make final tweaks, then click "Copy" to use it anywhere.</li>
                            </ol>
                        </Section>

                        <Section title="The Spice Rack Explained">
                             <ul className="space-y-4">
                                <li>
                                    <strong className="text-brand-text">Chef's Persona:</strong> Tell the AI chef who to be. "A world-class BBQ pitmaster," "A sarcastic food critic," or "A patient baker." This sets the entire mood.
                                </li>
                                <li>
                                    <strong className="text-brand-text">Flavor Profile (Tone):</strong> How should the response taste? 'Professional' is great for formal dishes, while 'Humorous' is perfect for a fun, creative meal.
                                </li>
                                <li>
                                    <strong className="text-brand-text">Plating Style (Format):</strong> How do you want the final dish presented? 'Bullet Points' for a quick snack, 'JSON' for a data-rich meal, or a 'Paragraph' for a classic dish.
                                </li>
                                 <li>
                                    <strong className="text-brand-text">Allergies / Avoid:</strong> What ingredients should be left out? Use this to prevent jargon, specific topics, or anything else you don't want in the final recipe.
                                </li>
                                <li>
                                    <strong className="text-brand-text">Heat Level (Complexity):</strong> Controls the technical difficulty. Level 1 ('Mild') is simple enough for a new cook. Level 5 ('Scorching') is for a seasoned professional.
                                </li>
                                <li>
                                    <strong className="text-brand-text">Portion Size (Verbosity):</strong> Controls the length. Level 1 ('Appetizer') gives a short, bite-sized answer. Level 5 ('Feast') provides a detailed, multi-course explanation.
                                </li>
                            </ul>
                        </Section>
                    </div>
                </div>
            </div>
        </>
    );
};