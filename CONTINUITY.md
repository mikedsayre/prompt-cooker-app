# Continuity Instructions for Future AI Assistants

This document provides a handover guide to ensure the seamless continued development of the **Prompt Cooker** application.

---

## 1. Project State Summary

*   **App Name:** Prompt Cooker
*   **Purpose:** An AI-powered tool that helps users transform raw ideas into high-quality, effective prompts for other AI systems. The core concept is built around a fun, intuitive "BBQ/cooking" metaphor.
*   **Current Status:** The application is considered "launch-ready." The UI is polished, core features are stable, branding is consistent, and documentation is up-to-date. The app loads with a pre-filled example to immediately demonstrate its value to new users.
*   **Structure:** The project has been consolidated to a flat file structure. All `src/` subdirectories for core application code have been removed, with files now residing directly at the project root or within top-level `components/` and `services/` directories.

---

## 2. Design Gold Standard

The user has provided reference screenshots that represent the definitive "gold standard" for the application's visual appearance and default state.

*   **Reference:** See user-provided images from the conversation on [Date of conversation].
*   **Key Elements:**
    *   **Desktop:** A clean two-column layout. "Grill Station" and "Spice Rack" on the left; "Cooked Prompt Table" on the right, featuring a permanent flame icon next to the title that glows on success.
    *   **Mobile:** A responsive single-column layout with the panels stacked vertically in a logical order.
    *   **Default State:** The application should load with the pre-filled "ribeye" example. The "Heat Level" (Complexity) and "Portion Size" (Verbosity) sliders must default to `3`.
    *   **Aesthetics:** The visual theme is a dark "BBQ" style with a fiery orange accent. The output panel uses a custom wood grain background.

**All future development, bug fixes, or UI changes must align with this established visual standard.**

---

## 3. Key Architectural Principles

Adherence to these principles is critical for maintaining the project's integrity.

*   **Buildless Environment:** The project runs directly in the browser without a build step. All dependencies are loaded via ES Modules using an `importmap` in `index.html` that points to the `esm.sh` CDN. Do not introduce a build system (like Vite or Webpack) unless absolutely necessary.
*   **Component-Based Architecture:** The app is built with React 19 and TypeScript. Follow the existing pattern of creating well-defined, single-purpose components in the `/components` directory.
*   **Centralized State Management:** All primary application state is managed in `App.tsx` using `React.useState` and passed down to child components via props. This maintains a clear, unidirectional data flow.
*   **Dynamic Theming Engine:**
    *   **Colors:** All colors are controlled by CSS variables defined in `:root` in `index.html`.
    *   **Light/Dark Mode:** Managed by adding/removing a `.light` class on the `<html>` element. Logic is in `ThemeToggle.tsx`.
    *   **Accent Color:** The primary brand color can be changed by the user via `ColorPicker.tsx`, which dynamically updates the `--color-primary` CSS variable.
*   **Service Abstraction:** All interactions with the Google Gemini API are contained within `services/geminiService.ts`. Do not make API calls directly from components.
*   **Thematic Consistency:** The "Prompt Cooker" brand identity is paramount. All user-facing text, icons, and design elements should align with the cooking metaphor (e.g., "Grill Station," "Spice Rack," "Flavor Profile"). Visually, this means prioritizing warm, fiery colors, charcoal-like dark tones, and icons that feel custom and thematic. For example, the theme toggle should be a stylized sun/moon and the color picker a vibrant palette, not just standard monochrome system icons. Avoid generic corporate styles.

---

## 4. Standard Development Workflow

When a user requests a change, follow these steps:

1.  **Understand the Goal:** First, fully grasp the user's intent. Is it a new feature, a bug fix, or a UI/UX improvement?
2.  **Adhere to Theme & Gold Standard:** Ensure your proposed solution respects and enhances the "Prompt Cooker" theme and matches the established Design Gold Standard.
3.  **Implement Cleanly:** Write clean, readable, and well-organized code that follows existing patterns.
4.  **Update Documentation:**
    *   For any significant change, add an entry to **`PROGRESS.md`**.
    *   If a new feature is added or an existing one is modified, update the user-facing guides in **`HelpModal.tsx`** and the technical details in **`README.md`** and **`TECHNICAL_SPECIFICATION.md`**.
5.  **Test Thoroughly:** Ensure the application remains responsive, accessible, and free of visual regressions.

---

## 5. Launch Readiness Polish (v2.5.x)

As the project reached a stable, "go-live" state, a final series of polish passes were completed. This serves as a record of the state of the app at launch.
- **Icon Refactoring:** All SVG icon components were consolidated into `components/ui/Icons.tsx` for maintainability.
- **UX Safeguards:** A confirmation dialog was added for the "Clear History" action.
- **UI Refinement:** The "Cooked Prompt Table" header was redesigned for a cleaner aesthetic, with the flame icon becoming a permanent status indicator.
- **Theme Fixes:** Corrected text visibility issues in light mode to ensure full accessibility.
- **Content:** The default state was set to the thematic "ribeye" example to perfect the out-of-the-box experience.
- **Documentation Sync:** All project documentation was reviewed and synced with the final state of the application.

Continue to uphold this standard of proactive code maintenance and documentation hygiene.