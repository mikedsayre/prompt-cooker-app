import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files, including Vercel-specific ones
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Define `process.env.API_KEY` to be injected into the client-side bundle
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    // Ensure Vite processes index.tsx as the entry point
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
        },
      },
    },
  };
});