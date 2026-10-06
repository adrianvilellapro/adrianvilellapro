import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './features.scss';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const application = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, application);
} else {
  ReactDOM.createRoot(container).render(application);
}
