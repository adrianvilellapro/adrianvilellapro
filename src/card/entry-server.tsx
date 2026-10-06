import { renderToString } from 'react-dom/server';
import { DigitalCard } from './DigitalCard';

export const render = () => renderToString(<DigitalCard />);
