import { ArrowUpIcon } from '@phosphor-icons/react';
import { profile } from '../data/profile';

export function Footer() {
  return <footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} {profile.fullName}</span><span className="footer-location">Desarrollo de software · Alicante</span><a href="#inicio">Volver arriba <ArrowUpIcon size={16} /></a></div></footer>;
}
