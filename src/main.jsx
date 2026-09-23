import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const base = import.meta.env.BASE_URL;
document.documentElement.style.setProperty('--fondo-jpg', `url(${base}fondo-mcm.jpg)`);
document.documentElement.style.setProperty('--fondo-svg', `url(${base}fondo-mcm.svg)`);

import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
