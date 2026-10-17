import { renderToString } from 'react-dom/server';
import App from './App';
import { profile } from './data/profile';
import { getProjects } from './data/projects.en';
import { technologyGroups } from './data/technologies';
import icons from './data/technology-icons.json';
import { LanguageProvider, type Language } from './i18n';

export const siteUrl = 'https://adrianvilellapro.github.io/adrianvilellapro/';

export function render(language: Language = 'es') {
  const t = (es: string, en: string) => language === 'en' ? en : es;
  const projects = getProjects(language);
  const pageUrl = language === 'en' ? `${siteUrl}index.en.html` : siteUrl;
  const brands: Record<string, { label: string }> = icons;
  const personId = `${siteUrl}#persona`;
  return {
    html: renderToString(<LanguageProvider language={language}><App /></LanguageProvider>),
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage', '@id': `${pageUrl}#perfil`, url: pageUrl,
          name: t('Adrián Vilella | Desarrollador de Software', 'Adrián Vilella | Software Developer'), inLanguage: language,
          mainEntity: { '@id': personId },
          hasPart: projects.map(project => ({ '@id': `${pageUrl}#${project.id}` })),
        },
        {
          '@type': 'Person', '@id': personId, name: profile.fullName,
          alternateName: profile.name, url: siteUrl, email: profile.email,
          jobTitle: t('Desarrollador de software junior', 'Junior software developer'),
          description: t('Graduado en Ingeniería Multimedia, con experiencia en proyectos full stack, aplicaciones web, APIs, bases de datos y herramientas digitales.', 'Multimedia Engineering graduate with experience in full-stack projects, web applications, APIs, databases and digital tools.'),
          image: `${siteUrl}portfolio-assets/optimized/fotoperfil.webp`,
          sameAs: [profile.github, profile.linkedin],
          alumniOf: { '@type': 'CollegeOrUniversity', name: t('Universidad de Alicante', 'University of Alicante') },
          knowsAbout: technologyGroups.flatMap(group => group.items.map(name => brands[name]?.label || name)),
        },
        ...projects.map(project => ({
          '@type': 'SoftwareSourceCode', '@id': `${pageUrl}#${project.id}`,
          name: project.name, description: project.description,
          url: `${pageUrl}#${project.id}`,
          codeRepository: project.links.find(link => link.label === 'GitHub')?.href,
          keywords: project.technologies.map(name => brands[name]?.label || name),
          inLanguage: language,
        })),
      ],
    },
  };
}
