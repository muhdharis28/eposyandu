// main.js (or MyApp.js depending on your project structure)
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Tailwind and global styles
import App from './App';

const rootElement = document.getElementById('root'); // Ensure this matches your HTML
const root = createRoot(rootElement); // Initialize createRoot correctly

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
