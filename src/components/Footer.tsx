import { ArrowUpIcon } from '@phosphor-icons/react';
import { profile } from '../data/profile';
import { useLanguage } from '../i18n';

export function Footer() {
  const { t } = useLanguage();
  return <footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} {profile.fullName}</span><span className="footer-location">{t('Desarrollo de software · Alicante', 'Software development · Alicante')}</span><a href="#inicio">{t('Volver arriba', 'Back to top')} <ArrowUpIcon size={16} /></a></div></footer>;
}
