import { getProjects } from '../data/projects.en';
import { ProjectSection } from './ProjectSection';
import { useLanguage } from '../i18n';

export function Projects() {
  const { language, t } = useLanguage();
  const projects = getProjects(language);
  return (
    <section className="projects-section container section" id="proyectos" aria-labelledby="projects-title">
      <div className="section-heading"><div><p className="eyebrow section-eyebrow"><span>01</span> {t('PROYECTOS DESTACADOS', 'FEATURED PROJECTS')}</p><h2 id="projects-title">{t('Del problema al producto', 'From problem to product')}<span className="accent">.</span></h2></div></div>
      {projects.map((project, index) => <ProjectSection key={project.id} project={project} index={index} />)}
    </section>
  );
}
