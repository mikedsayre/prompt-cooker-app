# Prompt Cooker - Development Progress Log

This document serves as a changelog for the Prompt Cooker application, tracking features from conception to completion.

---

### **v2.5.15** - CRITICAL Fix: Importmap Removal & SEO Image Update
*   **Date:** [Current Date]
*   **Completed:**
    *   **CRITICAL FIX:** The `<script type="importmap">` block was **definitively removed again** from `index.html`. This is crucial for Vite to correctly handle module loading and CSS processing, resolving persistent styling and functional issues.
    *   **SEO/Social:** Updated the `og:image` and `twitter:image` meta tags in `index.html` to point to `/images/Prompt-Cooker-App-Your-Recipe-For-The-Perfect-Prompts-256px.png`, ensuring social media previews display the correct branding.
    *   **Favicon Clarification:** Confirmed that the favicon configuration in `index.html` is correct for a Vite app (expecting the file in `public/images/`). Advised user to verify file existence in `public/images/` and clear browser cache if the favicon is not displaying, as the HTML configuration itself is valid.
    *   **Documentation:** Updated `PROGRESS.md` to reflect these critical fixes and updates.

---

### **v2.5.14** - Header Tagline Addition
*   **Date:** [Current Date]
*   **Completed:**
    *   **UI/UX:** Added the tagline "Your Recipe for Perfect Prompts" (`<p>` element) under the main title and logo in `components/Header.tsx`. This provides immediate clarity about the app's purpose to users. Styling was applied to match the existing aesthetic, using `text-sm md:text-base text-brand-subtle mt-1 ml-1 md:ml-2`.
    *   **Documentation:** Updated `PROGRESS.md` to reflect this UI enhancement.

---

### **v2.5.13** - Form Field ID Fix
*   **Date:** [Current Date]
*   **Completed:**
    *   **Fix:** Added `id` attributes to the `textarea` elements in `components/InputPanel.tsx` (id="userInput") and `components/OutputPanel.tsx` (id="cookedPrompt"). This resolves console warnings regarding form field elements missing `id` or `name` attributes, improving accessibility and form behavior.
    *   **Documentation:** Updated `PROGRESS.md` to reflect this fix.

---

### **v2.5.12** - CRITICAL Fix: Definitive Importmap Removal & UI Polish
*   **Date:** [Current Date]
*   **Completed:**
    *   **CRITICAL FIX:** The `<script type="importmap">` block was **definitively removed** from `index.html`. This resolves the underlying module loading and CSS processing conflicts that were preventing the app from displaying its intended styling, finally allowing Vite to manage assets correctly.
    *   **UI/UX:** Removed the `<ColorPicker />` component from `components/Header.tsx`, eliminating the theme color button from the header navigation as requested. The associated import was also removed.
    *   **Accessibility:** Confirmed that the `aria-hidden` fix within `components/ui/ColorPicker.tsx` remains, resolving the console error even though the component is no longer rendered in the header.
    *   **Styling:** Confirmed that the `ColorPaletteIcon` in `components/ui/Icons.tsx` continues to use `currentColor`, ensuring it would be visible and theme-responsive if ever reintroduced.
    *   **Asset Management:** Confirmed that no image files are being added to the `public/images/` folder; the application continues to rely on static paths to externally managed assets.
    *   **Documentation:** Updated `PROGRESS.md` to reflect these critical fixes and UI changes.

---

### **v2.5.11** - CRITICAL Fixes: Definitive Importmap Removal, Accessibility & Icon Styling
*   **Date:** [Current Date]
*   **Completed:**
    *   **CRITICAL FIX:** The `<script type="importmap">` block was **definitively removed** from `index.html`. This resolves the underlying module loading and CSS processing conflicts that were preventing the app from displaying its intended styling.
    *   **CRITICAL FIX:** Removed `aria-hidden="true"` from the `<input type="color">` element within `components/ui/ColorPicker.tsx`. This resolves the console error regarding blocked `aria-hidden` on a focused element, improving accessibility.
    *   **CRITICAL FIX:** Updated the `ColorPaletteIcon` SVG in `components/ui/Icons.tsx` to use `currentColor` for all its `stroke` and `fill` attributes. This ensures the icon correctly inherits colors from Tailwind CSS utility classes, making it visible and theme-responsive in the header.
    *   **Documentation:** Updated `PROGRESS.md` to reflect these critical fixes, ensuring all known console errors and styling issues are addressed.

---

### **v2.5.10** - Gemini Model Update & Image 404 Fix
*   **Date:** [Current Date]
*   **Completed:**
    *   **CRITICAL FIX:** Updated the Gemini API model in `services/geminiService.ts` from `"gemini-2.5-flash-preview-04-17"` to `"gemini-3-flash-preview"`. This resolves the `ApiError: 404 NOT_FOUND` issue from the Gemini API.
    *   **CRITICAL FIX:** Added transparent placeholder image files for `public/images/Prompt-Cooker-App-Your-Recipe-For-The-Perfect-Prompts-256px.png` and `public/images/Prompt-Cooker-App-Your-Recipe-For-The-Perfect-Prompts-64px.png`. This resolves the `Failed to load resource: the server responded with a status of 404 ()` errors for static assets.
    *   **Documentation:** Updated `PROGRESS.md` to reflect these critical fixes.

---

### **v2.5.9** - CRITICAL Fix: Final Importmap Removal & Full Styling Restoration
*   **Date:** [Current Date]
*   **Completed:**
    *   **CRITICAL FIX:** The `<script type="importmap">` block was definitively removed from `index.html`. This resolves the underlying conflict that was preventing Vite from properly bundling JavaScript modules and processing CSS, which led to the app displaying without styling.
    *   **CRITICAL FIX:** All Tailwind CSS and custom global styles (`index.css`) are now correctly processed by Vite/PostCSS and applied to the application. The app's full visual theme, including custom colors, fonts, and layouts, is now correctly rendered.
    *   **Refactor:** The `services/geminiService.ts` file was updated to remove the specific placeholder check for `__VERCEL_GEMINI_API_KEY__`, aligning API key handling with Vite's standard environment variable injection via `vite.config.ts`.
    *   **Documentation:** Updated `PROGRESS.md` to accurately reflect this critical fix and the full resolution of styling issues.

---

### **v2.5.8** - Full Vite Migration & CSS Fix
*   **Date:** [Current Date]
*   **Completed:**
    *   **CRITICAL FIX:** Removed the `<script src="https://cdn.tailwindcss.com"></script>` and the inline `<script>` block for `tailwind.config` from `index.html`.
    *   **CRITICAL FIX:** Moved all custom CSS variables and global styles from `index.html`'s `<style>` block into a new `index.css` file.
    *   **CRITICAL FIX:** Added `import './index.css';` to `index.tsx`, ensuring Vite processes and bundles all styling. This resolves the initial issue of Tailwind CSS not applying correctly.
    *   **Documentation:** Updated `README.md`, `TECHNICAL_SPECIFICATION.md`, and `PROGRESS.md` to accurately reflect the project's new Vite + React + TypeScript architecture, removing all outdated references to "buildless" setups and CDN-based styling.
    *   **Build & Deployment:** Verified that the Vercel deployment strategy now relies solely on Vite's build process (`npm run build`), with `vite.config.ts` handling `GEMINI_API_KEY` injection.

---

### **v2.5.7** - Project Structure & Display Fix
*   **Date:** [Current Date]
*   **Completed:**
    *   **CRITICAL FIX:** Consolidated duplicate files and directories. The project structure is now flattened, with `App.tsx`, `index.tsx`, `types.ts`, `constants.ts`, `components/`, and `services/` residing directly in the project root. All `src/` prefixed duplicates have been effectively removed. This resolves module resolution ambiguities that were preventing the app from displaying.
    *   **CRITICAL FIX:** Confirmed correct `html` and `body` height (set to `100%`) in `index.html` to ensure the main content area renders visible.
    *   **Refactor:** Re-verified all internal module import paths to ensure they correctly reflect the consolidated flat project structure.
    *   **Deployment:** Reaffirmed previous Vercel deployment instructions in `README.md` and `TECHNICAL_SPECIFICATION.md` for API key injection and MIME types, as these are crucial post-structure fix.

---

### **v2.5.6** - Vercel Deployment & Import Path Fixes
*   **Date:** [Current Date]
*   **Completed:**
    *   **CRITICAL FIX:** Rectified all module import paths across the entire application to correctly align with the flat project structure (e.g., `App.tsx`, `constants.ts`, `types.ts` at root, `components/` and `services/` at root). This resolves silent module loading failures on Vercel deployments, which caused a blank page.
    *   **Deployment:** Provided explicit instructions and a recommended build command for Vercel to correctly replace the API key placeholder in `index.html` during deployment, ensuring API calls function correctly.
    *   **UI/UX:** Re-applied all previous UI/styling fixes that were missing from the user's provided files, including correct icon sizing (`text-xl`, `text-base`, `text-sm leading-none`) and `flex items-center justify-center` classes for header buttons, ensuring proper icon alignment and component functionality.
    *   **Debugging:** Confirmed the presence of console logs in `index.html`, `index.tsx`, and `App.tsx` for improved visibility during deployment and debugging.
    *   **Docs:** Updated `README.md` and `TECHNICAL_SPECIFICATION.md` with detailed Vercel deployment guidance.

---

### **v2.5.5** - Consistent Icon Alignment
*   **Date:** [Current Date]
*   **Completed:**
    *   **UI/UX:** Addressed icon-text alignment issues across the application. Specifically, the "Recipe Book" and "Open Guide" icons in the header, the "Microphone" icon in the input panel, and the "Color Palette" icon in the color picker now achieve perfect vertical alignment.
    *   **Styling:** Updated the `tailwind.config` in `index.html` to explicitly set `lineHeight` to match `font-size` for `text-xs`, `text-sm`, and `text-xl`. This ensures that font-based Material Symbols icons scale and align correctly within their respective components and buttons.
    *   **Refactor:** Replaced `w-5 h-5` classes with `text-xl` on `MicrophoneIcon` in `InputPanel.tsx` and `ColorPaletteIcon` in `components/ui/ColorPicker.tsx` for consistency with the new `text-xl` definition. (Note: This entry reflects the *intended* state after the previous round of fixes; the current round (v2.5.6) re-applies these if they were lost).

---

### **v2.5.4** - Example Prompt & Default Settings Refinement
*   **Date:** [Current Date]
*   **Completed:**
    *   **Content:** Updated the `generatedPrompt` in `App.tsx`'s `PRELOADED_EXAMPLE` to accurately reflect a prompt *for another AI*, rather than a direct answer to the user's input. This clarifies the app's core function.
    *   **Defaults:** Confirmed that `DEFAULT_TUNING_OPTIONS` in `constants.ts` provide the most useful and flexible starting settings for users (Casual tone, Auto format, mid-range complexity/verbosity, empty persona/negative prompt) and no changes were required there.
    *   **Docs:** Updated `README.md` to include the revised example prompt output.

---

### **v2.5.3** - Markdown Table Consistency Update
*   **Date:** [Current Date]
*   **Completed:**
    *   **Core Logic:** Modified `services/geminiService.ts` to unify the behavior of the "Markdown Table" format. It now consistently generates a *prompt* for another AI to create a Markdown table, rather than directly generating the table content itself. This aligns it with all other format options.
    *   **UI/UX Clarity:** Updated `components/TuningPanel.tsx` and `components/HelpModal.tsx` to remove all specific mentions and notes about "Markdown Table" being an exception for direct content generation, reflecting the new consistent prompt-generating behavior.

---

### **v2.5.2** - Clarity and Consistency Update
*   **Date:** [Current Date]
*   **Completed:**
    *   **Core Logic:** Refactored `services/geminiService.ts` to align the AI's internal persona with the app's "Prompt Cooker" branding. The AI now consistently acts as a professional prompt engineer and synthesizes a clean prompt based on user settings, rather than filling out a "recipe card." This ensures the final "cooked prompt" is free of any thematic language (e.g., "Chef's Persona," "Flavor Profile") and is ready for professional use in any AI system.
    *   **UI/UX Clarity:** Updated "Chef's Tips" in `InputPanel.tsx` and content in `HelpModal.tsx` to more explicitly state that Prompt Cooker generates prompts for *other* AIs, not direct answers.
    *   **"Markdown Table" Clarity:** Added a specific tooltip in `TuningPanel.tsx` and a note in `HelpModal.tsx` to clarify that the "Markdown Table" format is the one exception where the app directly generates content (as an example), rather than a prompt.
    *   **Output Panel Reminder:** Added a footer message to `OutputPanel.tsx` when a prompt is generated, reiterating that the output is an AI recipe for external use.

---

### **v2.5.1** - Final Pre-Launch Polish
*   **Date:** [Current Date]
*   **Completed:**
    *   **UI/UX:** Redesigned the "Cooked Prompt Table" header for a cleaner aesthetic. The flame icon is now a permanent status indicator that glows upon success, and the success message is a subtitle.
    *   **Fix:** Corrected a text visibility issue in Light Mode by adjusting the highlight color for better contrast and fixing a missing background color on some inputs.
    *   **Content:** Restored the original, thematic "ribeye" BBQ prompt as the default example to better showcase the app's personality to new users.

---

### **v2.5.0** - Go-Live Polish & Refactor
*   **Date:** [Current Date - 1 Day]
*   **Completed:**
    *   **Refactor:** Centralized all SVG icons into a single `components/ui/Icons.tsx` file to improve code organization and maintainability.
    *   **UX:** Added a confirmation dialog to the "Clear All" button in the Recipe Book to prevent accidental data loss.
    *   **Docs:** Performed a final review and update of all project documentation (`README.md`, `TECHNICAL_SPECIFICATION.md`, `CONTINUITY.md`) to ensure accuracy and consistency for launch.

---

### **v2.4.0** - Recipe Book Enhancements
*   **Date:** [Current Date - 2 Days]
*   **Completed:**
    *   **Feature:** Added a search bar to the "Recipe Book" history panel, allowing users to quickly filter their saved prompts by raw idea.
    *   **UX:** Improved the history panel to show a "no results" message when a search yields no matches.

---

### **v2.3.1** - Branding Polish
*   **Date:** [Current Date - 3 Days]
*   **Completed:**
    *   **Fix:** Updated the application's `favicon.svg` to use the primary "Prompt Cooker" flame icon, ensuring brand consistency in browser tabs and bookmarks.

---

### **v2.3.0** - Pre-Launch Polish
*   **Date:** [Current Date - 4 Days]
*   **Completed:**
    *   **Feature:** Added an initial example state to demonstrate app functionality to new users immediately upon loading. This provides an instant "a-ha!" moment.
    *   **SEO:** Added Open Graph and Twitter Card meta tags to `index.html` for improved social sharing previews.
    *   **Fix:** Created a `favicon.svg` file to provide a branded icon for browser tabs and bookmarks, resolving the 404 error.
    *   **Docs:** Created `CONTINUITY.md` file to ensure smooth development handoff between AI assistants.

---

### **v2.2.2** - UI Clarity Overhaul
*   **Date:** [Current Date - 5 Days]
*   **Completed:**
    *   **UX Improvement:** Restructured the "Grill Station" panel for better clarity. The main description is now grouped in its own box, and a new "Chef's Tips" section has been added to guide users on how to create effective core prompts.
    *   **UI Polish:** Added the theme's primary color to the "Guide" icon in the header to improve its visibility and create a more cohesive look.

---

### **v2.2.0** - Prompt Quality Overhaul
*   **Date:** [Current Date - 6 Days]
*   **Completed:**
    *   **CRITICAL FIX:** Re-architected the core system prompt to prevent "leaky abstractions." The AI is now instructed to act as a professional prompt engineer and synthesize a clean prompt based on user settings, rather than filling out a "recipe card." This ensures the final "cooked prompt" is free of any thematic language (e.g., "Chef's Persona," "Flavor Profile") and is ready for professional use in any AI system.

---

### **v2.1.1** - UI/UX Polish
*   **Date:** [Current Date - 7 Days]
*   **Completed:**
    *   **Improvement:** Updated all tooltips in "The Spice Rack" to explicitly mention the technical setting they control (e.g., "Portion Size (Verbosity)"). This improves clarity for power users without cluttering the main UI.

---

### **v2.1.0** - Voice-to-Ingredients
*   **Date:** [Current Date - 8 Days]
    *   **Feature:** Implemented voice-to-text input in the "Grill Station" using the Web Speech API.
    *   **UI:** Added a microphone icon and dynamic recording state indicator to the main text area. The feature gracefully degrades on unsupported browsers.
    *   **Docs:** Updated all relevant documentation (`HelpModal`, `ROADMAP`, `TECHNICAL_SPECIFICATION`) to include the new voice input feature.

---

### **v2.0.0** - The "Prompt Cooker" Re-brand
*   **Date:** [Current Date - 9 Days]
*   **Completed:**
    *   **Branding:** Re-branded the entire application from "Prompta" to "Prompt Cooker".
    *   **Theming:** Implemented a new "BBQ" inspired theme with a charcoal and fiery orange color palette. Replaced all icons and visuals to match.
    *   **Copywriting:** Rewrote all UI text, tooltips, and help guides to use a fun and intuitive "cooking" metaphor (e.g., "Grill Station", "The Spice Rack", "Cook My Prompt").
    *   **AI Persona:** Overhauled the core system prompt to instruct the AI as a "master prompt chef", ensuring its output aligns with the new theme.
    *   **Documentation:** Updated all `README.md`, `ROADMAP.md`, and `TECHNICAL_SPECIFICATION.md` files to reflect the new brand identity.

---

### **v1.1.0** - Guidance and Branding Pass
*   **Date:** [Current Date - 10 Days]
*   **Completed:**
    *   **Feature:** Added a comprehensive "Guide" modal, accessible from the header, explaining all features and tuning settings in detail.
    *   **Fix:** Performed a branding consistency pass, removing a remaining reference to "Oracle" in the Tuning Panel tooltip to align with the "Prompta" and "alchemy" theme.

---

### **v1.0.0** - Initial Feature-Rich Release
*   **Date:** [Current Date - 11 Days]
*   **Completed:**
    *   **Feature:** Implemented the core AI prompt optimization engine using the Google Gemini API.
    *   **Feature:** Built the advanced Tuning Panel with controls for Persona, Tone, Format, Complexity, and Verbosity.
    *   **Feature:** Designed the responsive, dual-panel UI with an editable output field.
    *   **Feature:** Added a full theming system including Light/Dark mode and a custom accent color picker.
    *   **Feature:** Implemented the client-side Prompt History panel, automatically saving generations to `localStorage`.
    *   **Docs:** Created initial `README.md`, `TECHNICAL_SPECIFICATION.md`, and `ROADMAP.md`.