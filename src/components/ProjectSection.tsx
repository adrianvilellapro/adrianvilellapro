import { ArrowUpRightIcon, CheckCircleIcon, PlusIcon } from '@phosphor-icons/react';
import type { Project } from '../data/projects';
import { optimized } from '../data/profile';
import { ExternalLink } from './ExternalLink';
import { ProjectGallery } from './ProjectGallery';
import { TechnologyBadge } from './TechnologyBadge';
import { useLanguage } from '../i18n';

export function ProjectSection({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguage();
  return (
    <article className="project" id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="project-topline"><span className="mono">0{index + 1} <span className="separator">/</span> {project.category}</span><span className="project-badge">{project.badge}</span></div>
      <div className="project-main">
        <ProjectGallery project={project} />
        <div className="project-overview">
          <div className="project-name"><img src={optimized(`${project.logo}.webp`)} alt="" width="42" height="42" loading="lazy" /><h3 id={`${project.id}-title`}>{project.name}</h3></div>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-description">{project.description}</p>
          <div className="project-role"><span className="small-label">{t('MI PAPEL', 'MY ROLE')}</span><p>{project.role}</p></div>
          <div className="project-result"><CheckCircleIcon size={20} /><div><span className="small-label">{t('RESULTADO', 'OUTCOME')}</span><p>{project.result}</p></div></div>
          <div className="actions project-actions">{project.links.map((link, index) => <ExternalLink key={link.href} href={link.href} className={index === 0 ? 'button button-primary' : 'text-link'}>{link.label}<ArrowUpRightIcon size={17} /></ExternalLink>)}</div>
        </div>
      </div>
      <div className="project-story">
        <div><h4><span className="story-marker" /> {t('El problema', 'The problem')}</h4><p>{project.problem}</p></div>
        <div><h4><span className="story-marker" /> {t('Qué hice', 'What I did')}</h4><p>{project.contribution}</p></div>
        <div><h4><span className="story-marker" /> {t('Qué aprendí', 'What I learned')}</h4><p>{project.learning}</p></div>
      </div>
      <details className="project-details"><summary>{t('Decisiones y detalles del desarrollo', 'Development decisions and details')} <PlusIcon size={19} /></summary><div className="decisions-grid">{project.decisions.map((decision) => <div key={decision.title}><h4>{decision.title}</h4><p>{decision.text}</p></div>)}</div>{project.note && <p className="project-note">{project.note}</p>}</details>
      <div className="project-tech"><span className="small-label">{t('TECNOLOGÍAS', 'TECHNOLOGIES')}</span><ul className="technology-badges" aria-label={`${t('Tecnologías de', 'Technologies used in')} ${project.name}`}>{project.technologies.map((technology) => <li key={technology}><TechnologyBadge name={technology} /></li>)}</ul></div>
    </article>
  );
}
