import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AppWithGSAP from './AppWithGSAP.tsx';
import './index.css';

// Choose which version to render
const USE_GSAP = true; // Set to false to use original Framer Motion version

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {USE_GSAP ? <AppWithGSAP /> : <App />}
  </StrictMode>
);
