import { useEffect, useRef, useState } from 'react';
import { ArrowUpRightIcon, GithubLogoIcon, ListIcon, XIcon } from '@phosphor-icons/react';
import { profile } from '../data/profile';
import { ExternalLink } from './ExternalLink';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../i18n';

const navigation = [
  { id: 'proyectos', label: 'Proyectos', en: 'Projects' },
  { id: 'sobre-mi', label: 'Sobre mí', en: 'About me' },
  { id: 'experiencia', label: 'Experiencia', en: 'Experience' },
  { id: 'contacto', label: 'Contacto', en: 'Contact' },
];

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id === 'inicio' ? '' : entry.target.id);
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    ['inicio', ...navigation.map(({ id }) => id)].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
    };
    const media = window.matchMedia('(min-width: 961px)');
    const reset = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', close);
    media.addEventListener('change', reset);
    return () => { document.removeEventListener('keydown', close); media.removeEventListener('change', reset); };
  }, [open]);

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-identity">
          <a className="brand" href="#inicio" aria-label={t('Adrián Vilella, inicio', 'Adrián Vilella, home')} onClick={() => setOpen(false)}>
            <span className="brand-mark" aria-hidden="true">av<span>.</span></span>
            <span>Adrián Vilella</span>
          </a>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        <nav id="main-navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label={t('Navegación principal', 'Main navigation')}>
          <div className="nav-sections">
            {navigation.map(({ id, label, en }) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{t(label, en)}</a>)}
          </div>
          <div className="nav-social">
            <ExternalLink href={profile.github} className="icon-button" aria-label="GitHub"><GithubLogoIcon size={20} /></ExternalLink>
            <ExternalLink href={profile.linkedin}>LinkedIn <ArrowUpRightIcon size={14} /></ExternalLink>
          </div>
        </nav>
        <div className="header-controls">
          <button ref={toggle} className="menu-toggle icon-button" aria-label={open ? t('Cerrar menú', 'Close menu') : t('Abrir menú', 'Open menu')} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
            {open ? <XIcon size={23} /> : <ListIcon size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}
