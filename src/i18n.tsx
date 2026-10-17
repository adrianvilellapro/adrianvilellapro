import { createContext, useContext, type ReactNode } from 'react';

export type Language = 'es' | 'en';
const LanguageContext = createContext<Language>('es');

export function LanguageProvider({ language, children }: { language: Language; children: ReactNode }) {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const language = useContext(LanguageContext);
  return { language, t: (es: string, en: string) => language === 'en' ? en : es };
}
