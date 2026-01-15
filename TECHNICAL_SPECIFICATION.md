# Prompt Cooker - Technical Specification

This document provides a comprehensive technical overview of the Prompt Cooker web application. It is intended for developers (human or AI) to understand the project's architecture, technology stack, and core components.

---

## 1. Project Overview

-   **Application Name:** Prompt Cooker
-   **Tagline:** Your Recipe for Perfect Prompts.
-   **Description:** An AI-powered assistant that refines raw user ideas into perfectly structured and "cooked" prompts for any AI system.

---

## 2. Technology Stack

-   **Frontend Framework:** React 19
-   **Language:** TypeScript
-   **Module Resolution:** ES Modules via `importmap` in `index.html`, sourcing packages from `esm.sh`. This creates a buildless development environment that runs directly in the browser.
-   **AI Service:** Google Gemini API via the `@google/genai` SDK (`gemini-2.5-flash-preview-04-17` model).
-   **Voice Recognition:** Web Speech API.
-   **Styling:** Tailwind CSS (v3) via the CDN script. Configuration is done in a `<script>` tag in `index.html`.
-   **Hosting:** Designed for static file hosting (e.g., Firebase Hosting, Vercel, Netlify).

---

## 3. Core Features

-   **Dynamic Prompt Generation:** Core feature using the Gemini API to transform user input.
-   **Voice Input ("Voice-to-Ingredients"):** Integrates the Web Speech API to allow users to dictate their raw ideas into the input field.
-   **Advanced Tuning Panel ("The Spice Rack"):** Allows users to control the AI's persona, tone ("Flavor Profile"), output format ("Plating Style"), complexity ("Heat Level"), verbosity ("Portion Size"), and negative constraints ("Allergies").
-   **Dynamic Output Panel:** The generated prompt is displayed in an editable textarea. The panel header provides status (idle, loading, error) and success feedback with a glowing icon and message.
-   **Copy to Clipboard & Share:** One-click functionality to copy the final prompt or a shareable link to the recipe.
-   **Responsive Design:** A two-column layout on large screens that collapses to a single column on mobile devices.
-   **Theming:**
    -   **Light/Dark Mode:** A toggle that adds/removes a `.light` class to the `<html>` element. Theme preferences are persisted in `localStorage`.
    -   **Custom Accent Color:** A color picker that dynamically sets CSS variables (`--color-primary`, etc.) for app-wide accent colors. This is also persisted in `localStorage`.
-   **Client-Side History ("Recipe Book"):** Saves all generations to `localStorage` for retrieval.

---

## 4. Architecture & File Structure

The project follows a standard component-based architecture.

-   `index.html`: The single HTML entry point. Loads fonts, the Tailwind CSS CDN, the `importmap`, and sets up root CSS variables for theming.
-   `index.tsx`: The React application entry point. Renders the `App` component into the DOM.
-   `App.tsx`: The main component. Manages the application's top-level state and orchestrates the interaction between the other components.
-   `/components`: Contains all React components.
    -   `/ui`: Contains generic, reusable UI components like `Card.tsx`, `Tooltip.tsx`, `ColorPicker.tsx`, and `Icons.tsx`.
    -   `Header.tsx`: Top navigation bar.
    -   `InputPanel.tsx`: The left-side "Grill Station".
    -   `OutputPanel.tsx`: The right-side panel for displaying the "Cooked Prompt". Its header includes a permanent flame icon that animates on success, along with Share/Copy buttons. The output area is an editable textarea with a `div` overlay to simulate highlighting.
    -   `TuningPanel.tsx`: "The Spice Rack" - controls for adjusting prompt parameters.
    -   `HistoryPanel.tsx`: The "Recipe Book" slide-out panel.
    -   `HelpModal.tsx`: The pop-up guide.
-   `/services`: Houses the logic for communicating with external APIs.
    -   `geminiService.ts`: Contains all logic for interacting with the Google Gemini API.
-   `/types.ts`: Defines shared TypeScript types.
-   `/constants.ts`: Stores shared, static data.

---

## 5. State Management

-   **Strategy:** Unidirectional data flow, managed in the top-level `App.tsx` component using `React.useState`.
-   **Persistence:**
    -   `theme` and `themeColor` are stored in `localStorage`.
    -   `promptCookerHistory` is stored in `localStorage`.
-   **Flow:** State and state-setting functions are passed down as props to child components.

---

## 6. API Integration (`geminiService.ts`)

-   **Authentication:** Expects the Gemini API key as `process.env.API_KEY`.
-   **`constructSystemPrompt`:** This function dynamically builds a detailed system instruction prompt based on the user's "Spice Rack" settings. This is the core of the "recipe writing" process.
-   **`generateOptimizedPrompt`:** This function takes the user's input and tuning options and makes a single call to the Gemini API. It uses `constructSystemPrompt` to build a detailed set of meta-instructions that guide the AI to generate a single, high-quality, optimized prompt (the "prompt recipe"). It then returns this final prompt to be displayed to the user. The application's purpose is to *create* prompts, not execute them.
---

## 7. Theming and Styling

-   **Engine:** Tailwind CSS.
-   **CSS Variables:** The core color palette is defined using CSS variables in `index.html`, allowing for easy theme switching (Light/Dark and custom accent colors). The theme is inspired by a "BBQ" aesthetic (charcoal, orange).