import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { WorkMethod } from './components/WorkMethod';
import { Experience } from './components/Experience';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useLanguage } from './i18n';

export default function App() {
  const { t } = useLanguage();
  useScrollReveal();
  return (
    <>
      <a className="skip-link" href="#contenido" tabIndex={0}>{t('Saltar al contenido', 'Skip to content')}</a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Projects />
        <WorkMethod />
        <Experience />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
