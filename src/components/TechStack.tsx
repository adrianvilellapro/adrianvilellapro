import { TechnologyBadge } from './TechnologyBadge';

import { technologyGroups as groups } from '../data/technologies';
import { useLanguage } from '../i18n';

const englishGroups: Record<string, string> = { 'Frontend': 'Frontend', 'Backend y APIs': 'Backend and APIs', 'Datos': 'Data', 'Herramientas y despliegue': 'Tools and deployment', 'Escritorio y pruebas': 'Desktop and testing', 'Otros': 'Other' };

export function TechStack() {
  const { t } = useLanguage();
  return <section className="container section tech-section" aria-labelledby="tech-title"><div className="tech-intro"><p className="eyebrow section-eyebrow"><span>04</span> {t('HERRAMIENTAS', 'TOOLS')}</p><h2 id="tech-title">{t('Tecnologías con las que he trabajado', 'Technologies I have worked with')}<span className="accent">.</span></h2><p>{t('Las herramientas cambian según el proyecto. Estas son algunas de las que he utilizado hasta ahora.', 'The tools depend on the project. These are some of the technologies I have used so far.')}</p></div><dl className="tech-list">{groups.map((group) => <div key={group.name}><dt>{t(group.name, englishGroups[group.name])}</dt><dd><ul className="technology-badges">{group.items.map(name => <li key={name}><TechnologyBadge name={name} /></li>)}</ul></dd></div>)}</dl></section>;
}
