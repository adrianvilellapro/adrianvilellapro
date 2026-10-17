import { ArrowDownIcon, ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { optimized, profile } from '../data/profile';
import { ExternalLink } from './ExternalLink';
import { useLanguage } from '../i18n';

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero container" id="inicio" aria-labelledby="hero-title">
      <div className="hero-topline"><p className="eyebrow"><span className="status-dot" /> {t('Desarrollador de software junior', 'Junior software developer')} <span className="eyebrow-location">· Alicante</span></p><span className="mono hero-edition">PORTFOLIO / 2026</span></div>
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">{t('Entiendo el problema.', 'Understand the problem.')} <br /><span>{t('Construyo la solución.', 'Build the solution.')}</span></h1>
          <div className="hero-description">
            <p>{t('Graduado en Ingeniería Multimedia, con experiencia en proyectos full stack, aplicaciones web, APIs, bases de datos y herramientas digitales. Busco incorporarme a un equipo donde seguir creciendo como desarrollador.', 'Multimedia Engineering graduate with experience in full-stack projects, web applications, APIs, databases and digital tools. I am looking to join a team where I can continue growing as a developer.')}</p>
            <div className="actions">
              <a className="button button-primary" href="#proyectos">{t('Ver proyectos', 'View projects')} <ArrowDownIcon size={17} /></a>
              <ExternalLink className="button button-secondary" href={profile.github}><GithubLogoIcon size={19} /> GitHub</ExternalLink>
              <ExternalLink className="text-link" href={profile.linkedin}>LinkedIn <ArrowUpRightIcon size={16} /></ExternalLink>
            </div>
          </div>
        </div>
        <figure className="hero-portrait"><img src={optimized('fotoperfil.webp')} alt="Adrián Vilella Espony" width="1050" height="700" {...{ fetchpriority: 'high' }} /><figcaption>Adrián Vilella <span>{t('Ingeniero Multimedia', 'Multimedia Engineer')}</span></figcaption></figure>
      </div>
      <div className="hero-footnote"><a href="#proyectos">{t('Ver mi trabajo', 'Explore my work')} <ArrowDownIcon size={18} /></a></div>
    </section>
  );
}
