import { projects } from '../data/projects';
import { ProjectSection } from './ProjectSection';

export function Projects() {
  return (
    <section className="projects-section container section" id="proyectos" aria-labelledby="projects-title">
      <div className="section-heading"><div><p className="eyebrow section-eyebrow"><span>01</span> PROYECTOS DESTACADOS</p><h2 id="projects-title">Del problema al producto<span className="accent">.</span></h2></div></div>
      {projects.map((project, index) => <ProjectSection key={project.id} project={project} index={index} />)}
    </section>
  );
}
