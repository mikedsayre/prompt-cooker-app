import { GoogleGenAI } from "@google/genai";
import type { TuningOptions } from '../types';

// Lazily initialize to avoid crashing the app on load if the API key is missing.
let ai: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI client.
 * Throws an error if the API key is not configured.
 */
function getAiClient(): GoogleGenAI {
    if (ai) {
        return ai;
    }
    // Access process.env.API_KEY, which is shimmed by index.html for client-side
    if (!process.env.API_KEY) {
        // This error is caught by generateOptimizedPrompt and displayed gracefully in the UI.
        throw new Error("API_KEY_MISSING: The API_KEY environment variable is not set.");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai;
}


function constructSystemPrompt(options: TuningOptions): string {
    const verbosityMap: { [key: number]: string } = {
        1: 'Extremely concise',
        2: 'Brief and summary-level',
        3: 'Moderately detailed',
        4: 'Comprehensive and thorough',
        5: 'Extremely detailed, covering all aspects',
    };

    const complexityMap: { [key: number]: string } = {
        1: 'Very simple, for a complete beginner (ELI5)',
        2: 'Simplified, using basic terminology',
        3: 'Standard complexity, assuming some base knowledge',
        4: 'Advanced, using nuanced and technical language',
        5: 'Expert-level, highly technical and in-depth',
    };

    // Common instructions for the "Prompt Cooker AI" (the master prompt chef)
    // The final output will ALWAYS be a prompt for another AI.
    let baseInstructions = `You are a master prompt chef, skilled at crafting perfect "recipes" (prompts) for other AI systems. Your goal is to take a user's raw idea and a set of culinary-themed tuning options, and synthesize them into a single, clean, and highly effective prompt for another AI.`;

    // Always generate a prompt for another AI. The specific format (including Markdown Table)
    // will be incorporated into the generated prompt.
    const highlightInstruction = `\n- **Highlighting:** To emphasize key concepts or instructions in the prompt you generate, wrap them in double curly braces, like this: \`{{important keyword}}\`. This is a special instruction for our display formatter.`;

    return `${baseInstructions}

    Your task is to analyze the user's raw input and weave the following parameters into a new, cohesive, natural-language prompt. This prompt will be given to a *different* AI.

    ---
    Parameters to incorporate into the PROMPT you are creating:
    - **Desired AI Persona:** The AI receiving *your* generated prompt should adopt this persona: "${options.persona || 'An expert assistant'}".
    - **Desired AI Tone:** The AI receiving *your* generated prompt should have a "${options.tone}" tone.
    - **Desired AI Format:** The AI receiving *your* generated prompt should output in "${options.format}". If 'Auto', the AI should infer the best format.
    - **Desired AI Verbosity (Detail Level):** The required level of detail for the AI's output is ${options.verbosity}/5, which means: "${verbosityMap[options.verbosity]}".
    - **Desired AI Complexity (Technical Depth):</label> The required technical depth for the AI's output is ${options.complexity}/5, which means: "${complexityMap[options.complexity]}".
    ${options.negativePrompt ? `- **Desired AI Constraints (Crucial):** The AI receiving *your* generated prompt must strictly avoid the following: "${options.negativePrompt}".` : ''}
    ${highlightInstruction}
    ---

    CRITICAL RULES FOR YOUR OUTPUT (the prompt you generate):
    1.  **DO NOT** mention the parameter names (e.g., 'Desired AI Persona', 'Desired AI Tone') in the prompt you generate. It should be a natural, flowing instruction to the *other* AI.
    2.  **ONLY** output the final, refined prompt itself. Do not include any preambles, apologies, or post-prompt commentary like "Here is the prompt:". Just the prompt.`;
}


export async function generateOptimizedPrompt(userInput: string, options: TuningOptions): Promise<string> {
    try {
        const client = getAiClient(); // Can throw if API key is missing

        // The app's core purpose is to create a high-quality prompt (a "recipe").
        // It does not execute the prompt itself, as previously specified.
        const systemInstruction = constructSystemPrompt(options);
        const recipeConfig = {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            topP: 0.95,
            topK: 64
        };

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: userInput,
            config: recipeConfig,
        });
        
        const cookedPrompt = response.text.trim();
        if (!cookedPrompt) {
            throw new Error("The AI failed to create a recipe. Try different ingredients.");
        }
        
        return cookedPrompt;

    } catch (error) {
        console.error("Gemini API Error in generateOptimizedPrompt:", error);
        if (error instanceof Error && (error.message.includes('API key') || error.message.includes('API_KEY_MISSING'))) {
             throw new Error("Invalid or missing API Key. Please check your kitchen's gas line (API key setup).");
        }
        throw new Error("The AI service had a kitchen fire. Please check your ingredients and try again.");
    }
}