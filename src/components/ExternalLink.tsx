import type { ComponentProps } from 'react';
import { useLanguage } from '../i18n';

export function ExternalLink({ children, ...props }: ComponentProps<'a'>) {
  const { t } = useLanguage();
  return <a {...props} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> {t('(se abre en una pestaña nueva)', '(opens in a new tab)')}</span></a>;
}
