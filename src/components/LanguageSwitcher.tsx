import { useLanguage } from '../i18n';

export function LanguageSwitcher() {
  const { language, t } = useLanguage();
  return <div className="language-switcher" role="group" aria-label={t('Idioma del portfolio', 'Portfolio language')}>
    {(['es', 'en'] as const).map(code => <a key={code}
      href={code === 'es' ? './' : './index.en.html'} lang={code} hrefLang={code}
      aria-current={language === code ? 'page' : undefined}
      aria-label={code === 'es' ? 'Leer en español' : 'Read in English'}
      onClick={event => { event.currentTarget.hash = window.location.hash; }}>
      {code.toUpperCase()}
    </a>)}
  </div>;
}
