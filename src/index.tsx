import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './features.scss';
import './language.scss';
import App from './App';
import { LanguageProvider } from './i18n';

const container = document.getElementById('root') as HTMLElement;
const application = (
  <React.StrictMode>
    <LanguageProvider language={document.documentElement.lang === 'en' ? 'en' : 'es'}><App /></LanguageProvider>
  </React.StrictMode>
);
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, application);
} else {
  ReactDOM.createRoot(container).render(application);
}
