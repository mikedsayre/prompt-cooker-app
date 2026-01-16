import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Corrected import path

console.log('index.tsx started'); // Debugging log

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

console.log('Root element found, attempting to create React root.'); // Debugging log
const root = ReactDOM.createRoot(rootElement);
console.log('React root created, attempting to render App.'); // Debugging log
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('App render initiated.'); // Debugging log