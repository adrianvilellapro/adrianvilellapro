import { renderToString } from 'react-dom/server';
import App from './App';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { technologyGroups } from './data/technologies';
import icons from './data/technology-icons.json';

export const siteUrl = 'https://adrianvilellapro.github.io/adrianvilellapro/';

export function render() {
  const brands: Record<string, { label: string }> = icons;
  const personId = `${siteUrl}#persona`;
  return {
    html: renderToString(<App />),
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage', '@id': `${siteUrl}#perfil`, url: siteUrl,
          name: 'Adrián Vilella | Desarrollador de Software', inLanguage: 'es',
          mainEntity: { '@id': personId },
          hasPart: projects.map(project => ({ '@id': `${siteUrl}#${project.id}` })),
        },
        {
          '@type': 'Person', '@id': personId, name: profile.fullName,
          alternateName: profile.name, url: siteUrl, email: profile.email,
          jobTitle: 'Desarrollador de software junior',
          description: 'Graduado en Ingeniería Multimedia, con experiencia en proyectos full stack, aplicaciones web, APIs, bases de datos y herramientas digitales.',
          image: `${siteUrl}portfolio-assets/optimized/fotoperfil.webp`,
          sameAs: [profile.github, profile.linkedin],
          alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Alicante' },
          knowsAbout: technologyGroups.flatMap(group => group.items.map(name => brands[name]?.label || name)),
        },
        ...projects.map(project => ({
          '@type': 'SoftwareSourceCode', '@id': `${siteUrl}#${project.id}`,
          name: project.name, description: project.description,
          url: `${siteUrl}#${project.id}`,
          codeRepository: project.links.find(link => link.label === 'GitHub')?.href,
          keywords: project.technologies.map(name => brands[name]?.label || name),
          inLanguage: 'es',
        })),
      ],
    },
  };
}
