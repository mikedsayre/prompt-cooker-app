# Prompt Cooker - Product Roadmap

This document outlines the strategic vision and planned feature development for Prompt Cooker. Our goal is to evolve from a powerful utility into an indispensable tool for creative and professional work.

---

## Phase 1: Core Experience (Current)

These features form the foundation of the Prompt Cooker experience.

### Voice-to-Ingredients
- **Description:** Integrate the Web Speech API to allow users to speak their raw ideas directly into the app, which will be transcribed into the input field.
- **User Value:** Increases accessibility and provides a faster, more natural way to capture fleeting ideas.
- **Status:** ✅ **Completed**

### Shareable Recipes
- **Description:** Generate a unique, shareable URL that encodes the raw ingredients and all Spice Rack settings. When someone opens the link, Prompt Cooker will load with that exact configuration. A "Share" button copies this link to the clipboard.
- **User Value:** Makes it easy to collaborate with team members, ask for feedback, or share a perfectly cooked prompt with the community.
- **Status:** ✅ **Completed**

### Pre-built Recipe Book
- **Description:** Introduce a library of expert-crafted, pre-built prompt recipes for common tasks (e.g., "Brainstorm blog post titles," "Write a professional follow-up email," "Summarize a technical document").
- **User Value:** Lowers the barrier to entry for new users and provides a great starting point for common use cases, showcasing the power of the Spice Rack.
- **Status:** Planned.

---

## Phase 2: Pro-Tier Features & Monetization

This phase introduces user accounts and a freemium model to support the service and offer advanced functionality for power users.

### 1. User Authentication (Google Sign-In)
- **Description:** Integrate Firebase Authentication to allow users to sign up and log in with their Google account.
- **User Value:** Enables personalization and cross-device data synchronization.
- **Status:** Planned for Pro tier.

### 2. Cloud-Synced Recipe Book
- **Description:** For authenticated Pro users, sync their prompt history and any custom-saved recipes to the cloud using Firebase Firestore.
- **User Value:** Access your entire recipe library from any device. Never lose your work.
- **Status:** Planned for Pro tier.

### 3. Freemium Model
- **Description:** Introduce a "Prompt Cooker Pro" subscription that unlocks unlimited daily prompt cooking, cloud sync, and an ad-free experience. The free tier will remain highly functional but will have usage limits and non-intrusive ads.
- **User Value:** Provides a sustainable business model to ensure the longevity and continuous improvement of the app, while offering a clear value proposition for heavy users.
- **Status:** Planned.

---

## Future Exploration (The Chef's Long-Term Vision)

Ideas to be considered for development after the core roadmap is complete.

### Team Kitchen
- **Description:** Introduce features for teams, such as shared recipe libraries and collaborative prompt editing.

### Advanced AI Kitchen Appliances
- **Description:** Explore direct integration with other services, allowing Prompt Cooker to not only generate a prompt but also send it to another AI (like a document writer or image generator) and display the final result.