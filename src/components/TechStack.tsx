import { TechnologyBadge } from './TechnologyBadge';

import { technologyGroups as groups } from '../data/technologies';

export function TechStack() {
  return <section className="container section tech-section" aria-labelledby="tech-title"><div className="tech-intro"><p className="eyebrow section-eyebrow"><span>04</span> HERRAMIENTAS</p><h2 id="tech-title">Tecnologías con las que he trabajado<span className="accent">.</span></h2><p>Las herramientas cambian según el proyecto. Estas son algunas de las que he utilizado hasta ahora.</p></div><dl className="tech-list">{groups.map((group) => <div key={group.name}><dt>{group.name}</dt><dd><ul className="technology-badges">{group.items.map(name => <li key={name}><TechnologyBadge name={name} /></li>)}</ul></dd></div>)}</dl></section>;
}
