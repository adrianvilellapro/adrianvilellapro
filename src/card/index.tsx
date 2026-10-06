import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { DigitalCard } from './DigitalCard';
import './card.scss';

const root = document.getElementById('root')!;
const card = <StrictMode><DigitalCard /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, card);
else createRoot(root).render(card);
