# Prompt Cooker - The AI Prompt Chef

**Tagline:** Your Recipe for Perfect Prompts.

Prompt Cooker is a web-based tool designed to turn your raw ideas into perfectly cooked, highly effective prompts for AI systems. It transforms your simple questions or goals into a five-star recipe—a structured, detailed, and clear set of instructions that helps you get the best possible results from generative AI.

![Prompt Cooker Screenshot](https://i.imgur.com/gANmB4j.png)

---

## Table of Contents

- [How It Works](#how-it-works)
- [How to Use](#how-to-use)
  - [1. The Grill Station](#1-the-grill-station)
  - [2. The Spice Rack](#2-the-spice-rack)
  - [3. The Output Panel](#3-the-output-panel)
- [Setup and Installation](#setup-and-installation)
- [Technology Stack](#technology-stack)

---

## How It Works

Human communication is often filled with ambiguity. When we talk to an AI, this can lead to bland or unappetizing results. Prompt Cooker acts as an expert "prompt chef."

It doesn't answer your questions directly; instead, it takes your raw idea and "cooks" it into a powerful **prompt recipe**. This recipe—a structured, detailed, and clear set of instructions—is designed for you to take to any other AI system (like Gemini, ChatGPT, etc.) to get the best possible results.

## How to Use

The interface is split into two main sections: the input panel on the left and the output panel on the right.

### 1. The Grill Station

This is where you start cooking.

-   **Raw Idea:** Enter your raw idea—the main goal or task you want another AI to perform—into the main text area. Don't worry about phrasing it perfectly. Good examples include "Summarize a long article" or "Brainstorm names for a new coffee shop."
-   **The Spice Rack:** Fine-tune the prompt recipe.
-   **Cook My Prompt Button:** Once you're ready, click this button to have the chef work their magic.

### 2. The Spice Rack

This is where you give the chef specific instructions on how to prepare your dish. Hover over the `(?)` icons for fun and helpful tips!

-   **Chef's Persona:** Define the personality or role you want the target AI to adopt (e.g., "A skeptical food critic," "An enthusiastic BBQ pitmaster").
-   **Flavor Profile:** Choose the emotional style of the desired response (e.g., Professional, Casual, Humorous).
-   **Plating Style:** Specify the structure for the final output (e.g., Bullet Points, JSON, a Markdown Table).
-   **Heat Level:** A slider to control the technical complexity of the response, from "Mild" to "Scorching."
-   **Portion Size:** A slider to control the length and detail of the response, from "Appetizer" to "Feast."
-   **Allergies / Avoid:** List any topics, words, or concepts the AI should strictly avoid in its recipe.

### 3. The Output Panel

This panel displays the delicious results of the chef's labor.

-   **Cooked Prompt:** The final, generated **prompt recipe** appears here. This is the set of instructions you will use in another AI system. For example, if your raw idea was "I want to grill the perfect ribeye steak," and you chose a "BBQ Pitmaster" persona, the Cooked Prompt might be: "As a witty, seasoned BBQ pitmaster from Texas, write a humorous, moderately detailed (3/5), standard complexity (3/5) guide on how to grill a perfect medium-rare ribeye steak. Ensure the guide is formatted as a paragraph and strictly avoid boring, flavorless, corporate jargon. Focus on selecting the right cut, seasoning, the high-heat searing process, indirect heat cooking for a red center, and resting the steak. Make it sound so delicious and straightforward that even a rookie can feel like a grilling champion."
-   **Status Indicator:** A flame icon next to the title glows to let you know when your prompt is ready.
-   **Editable Field:** You can click into the text area and make manual edits before you use it.
-   **Share & Copy Buttons:** Easily share a link to your recipe or copy the final prompt text to your clipboard.

## Setup and Installation

This project is a React application built with Vite and TypeScript, designed to be run in a web environment where the Google Gemini API key is available.

1.  **Get an API Key:** Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

2.  **Local Development:**
    *   **Install Dependencies:** Run `npm install` in your project root.
    *   **Environment Variable:** Create a `.env` file in your project root and add your Gemini API key:
        ```
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
        ```
    *   **Run Development Server:** `npm run dev`
    *   **Build for Production:** `npm run build`
    *   **Preview Build:** `npm run preview`

3.  **Vercel Deployment:**
    *   **Environment Variable:** Add your Gemini API key to your Vercel project's environment variables. Name the variable `GEMINI_API_KEY`.
    *   **Build Command:** Vercel should automatically detect the Vite project. The default build command (`npm run build`) is usually sufficient. Our `vite.config.ts` handles the injection of `process.env.API_KEY` using the `GEMINI_API_KEY` from Vercel's environment.
    *   **Deployment:** Push your changes to your Git repository, and Vercel will automatically deploy the application.

## Technology Stack

-   **Framework:** React 19
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS (v3) via PostCSS
-   **AI:** Google Gemini API (`@google/genai`)
-   **Build Tool:** Vite
-   **Icons:** Material Design Icons and custom SVGs.
-   **Voice Recognition:** Web Speech API.
-   **Hosting:** Designed for static file hosting (e.g., Vercel, Netlify).