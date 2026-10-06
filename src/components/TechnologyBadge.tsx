import type { CSSProperties } from 'react';
import { PlugsConnectedIcon, ShieldCheckIcon, BrowserIcon } from '@phosphor-icons/react';
import icons from '../data/technology-icons.json';
import { publicAsset } from '../data/profile';

type Brand = { file: string; color: string; label: string };

export function TechnologyBadge({ name }: { name: string }) {
  const brand: Brand | undefined = (icons as Record<string, Brand>)[name];
  const GenericIcon = name === 'OAuth' ? ShieldCheckIcon : name === 'Web Augmentation' ? BrowserIcon : PlugsConnectedIcon;
  return <span className="technology-badge" style={{ '--brand-color': brand?.color || '#5471aa' } as CSSProperties}>
    <span className="technology-icon" aria-hidden="true">{brand ? <img src={publicAsset(`technology-icons/${brand.file}`)} width="22" height="22" alt="" loading="lazy" decoding="async" /> : <GenericIcon size={22} />}</span>
    <span>{brand?.label || name}</span>
  </span>;
}
