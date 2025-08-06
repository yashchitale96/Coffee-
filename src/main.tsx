import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AppWithGSAP from './AppWithGSAP.tsx';
import RajasthaniApp from './RajasthaniApp.tsx';
import './index.css';

// Choose which version to render
const APP_VERSION: 'standard' | 'gsap' | 'rajasthani' = 'rajasthani';

const renderApp = () => {
  switch (APP_VERSION) {
    case 'standard':
      return <App />;
    case 'gsap':
      return <AppWithGSAP />;
    case 'rajasthani':
      return <RajasthaniApp />;
    default:
      return <RajasthaniApp />;
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {renderApp()}
  </StrictMode>
);
