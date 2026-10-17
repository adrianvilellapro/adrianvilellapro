import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useLanguage } from '../i18n';

export function ThemeToggle() {
  const { t } = useLanguage();
  // The first render matches the static HTML; CSS already uses the preloaded theme.
  const [dark, setDark] = useState(false);

  const applyTheme = (next: boolean) => {
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next ? '#121722' : '#f8f9fb');
  };

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem('portfolio-theme'); } catch { /* Storage can be unavailable in private contexts. */ }
      applyTheme(saved === 'dark' || (saved !== 'light' && systemTheme.matches));
    };
    setDark(document.documentElement.dataset.theme === 'dark');
    systemTheme.addEventListener('change', sync);
    window.addEventListener('storage', sync);
    return () => { systemTheme.removeEventListener('change', sync); window.removeEventListener('storage', sync); };
  }, []);

  const toggle = () => {
    const next = !dark;
    applyTheme(next);
    try { localStorage.setItem('portfolio-theme', next ? 'dark' : 'light'); } catch { /* The toggle still works without persistence. */ }
  };

  const label = dark ? t('Activar modo claro', 'Switch to light mode') : t('Activar modo oscuro', 'Switch to dark mode');
  return <button className="theme-toggle icon-button" onClick={toggle} aria-label={label} title={label}>{dark ? <SunIcon size={22} /> : <MoonIcon size={22} />}</button>;
}
