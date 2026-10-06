import { ArrowDownIcon, ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { optimized, profile } from '../data/profile';
import { ExternalLink } from './ExternalLink';

export function Hero() {
  return (
    <section className="hero container" id="inicio" aria-labelledby="hero-title">
      <div className="hero-topline"><p className="eyebrow"><span className="status-dot" /> Desarrollador de software junior <span className="eyebrow-location">· Alicante</span></p><span className="mono hero-edition">PORTFOLIO / 2026</span></div>
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">Entiendo el problema. <br /><span>Construyo la solución.</span></h1>
          <div className="hero-description">
            <p>Graduado en Ingeniería Multimedia, con experiencia en proyectos full stack, aplicaciones web, APIs, bases de datos y herramientas digitales. Busco incorporarme a un equipo donde seguir creciendo como desarrollador.</p>
            <div className="actions">
              <a className="button button-primary" href="#proyectos">Ver proyectos <ArrowDownIcon size={17} /></a>
              <ExternalLink className="button button-secondary" href={profile.github}><GithubLogoIcon size={19} /> GitHub</ExternalLink>
              <ExternalLink className="text-link" href={profile.linkedin}>LinkedIn <ArrowUpRightIcon size={16} /></ExternalLink>
            </div>
          </div>
        </div>
        <figure className="hero-portrait"><img src={optimized('fotoperfil.webp')} alt="Adrián Vilella Espony" width="1050" height="700" {...{ fetchpriority: 'high' }} /><figcaption>Adrián Vilella <span>Ingeniero Multimedia</span></figcaption></figure>
      </div>
      <div className="hero-footnote"><a href="#proyectos">Ver mi trabajo <ArrowDownIcon size={18} /></a></div>
    </section>
  );
}
