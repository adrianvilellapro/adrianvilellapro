import { projects, type Project, type ProjectImage } from './projects';
import type { Language } from '../i18n';

type Translation = Pick<Project, 'category' | 'badge' | 'subtitle' | 'description' | 'role' | 'problem' | 'contribution' | 'decisions' | 'learning' | 'result' | 'note'>;
const descriptions: Record<string, Translation> = {
  nutrivisor: {
    category: 'Browser extension', badge: 'Final-year project · 10/10',
    subtitle: 'Nutritional information, right where you shop online.',
    description: 'A Chrome extension that enhances Mercadona’s online store with Open Food Facts data: indicators, filters and notices while shopping.',
    role: 'Individual project · Design, research and development',
    problem: 'How can useful nutritional information be displayed without making shoppers leave the store they are browsing?',
    contribution: 'I researched how to identify products, connect external sources and integrate information into a website I did not control.',
    decisions: [
      { title: 'Connect the data', text: 'Product identification and Open Food Facts integration, accounting for incomplete information.' },
      { title: 'Make it useful', text: 'Nutri-Score, NOVA, allergens, additives and filters available inside the store itself.' },
      { title: 'Fit into the shopping experience', text: 'Chrome Manifest V3 extension and local-storage caching to reuse previously retrieved information.' },
    ],
    learning: 'Working with external data that is not always complete, designing fault-tolerant solutions and turning complex information into something useful.',
    result: 'Final-year degree project awarded 10/10, with the extension published on the Chrome Web Store.',
  },
  mappleo: {
    category: 'Web and desktop application', badge: 'Personal project · Beta',
    subtitle: 'Your job search, connected. Even when you are offline.',
    description: 'An application that brings companies, job offers, applications, contacts and networking together, with a Kanban board, calendar and statistics. Available on the web and as a Windows application.',
    role: 'Personal project · Design, full-stack development and desktop application',
    problem: 'Keeping a job search from becoming scattered across spreadsheets, notes and emails, with no clear record of applications or next steps.',
    contribution: 'I designed and developed the complete product: data model, responsive interface, API, authentication, application tracking, board and statistics. I extended it to Windows with local storage and optional synchronisation.',
    decisions: [
      { title: 'Work offline', text: 'Electron and encrypted local SQLite storage allow the app to work without Internet access. Linking a web account is optional; changes sync when connectivity returns, and conflicts requiring a decision are presented to the user.' },
      { title: 'Separate records from files', text: 'Shared rules and validation across web and desktop. CVs and cover letters stay exclusively on the computer, with previews and links to job offers, without being uploaded to the web.' },
      { title: 'Protect and test', text: 'Server-side permissions and validation, password hashing, personal-field encryption and tests with Vitest and Playwright. Docker for local development, GitHub Actions for CI and a public demo independent of production services.' },
    ],
    learning: 'Designing one product for browser and desktop, sharing business rules and resolving synchronisation between local and remote data while preserving offline work and file privacy.',
    result: 'Functional beta with a deployed web app, Windows installer, offline use, optional synchronisation and an interactive web demo without registration.',
    note: 'Web screenshots use the fictional John Miller profile and are in Spanish. The static demo lets visitors try workflows with temporary changes in the browser; it does not connect to real accounts. The beta Windows installer is not digitally signed yet.',
  },
  wikicodex: {
    category: 'Full-stack application', badge: 'Personal project',
    subtitle: 'Organise complex information. Decide who can see it.',
    description: 'A platform for managing tabletop role-playing campaigns, characters, places, items and narrative content within private wikis.',
    role: 'Personal project · Full-stack development',
    problem: 'Organising campaign content and controlling what each user can access while keeping wikis private.',
    contribution: 'I designed the architecture and developed the frontend and backend: authentication, data model, permissions, content, media resources and deployment.',
    decisions: [
      { title: 'Privacy enforced by the server', text: 'Authentication, users and permissions to control access to each campaign’s content.' },
      { title: 'A connected model', text: 'Database, API and frontend working together to manage content and media resources.' },
      { title: 'An independent demo', text: 'A static public demo to showcase the product without exposing private production services.' },
    ],
    learning: 'Thinking beyond individual screens: modelling data, enforcing permissions on the server and keeping the frontend, backend and database consistent.',
    result: 'A functional full-stack application with a public demo independent of private production services.',
  },
  crowdcompass: {
    category: 'Web application · 3D visualisation', badge: 'Team project',
    subtitle: 'Digital navigation and management for large events.',
    description: 'A team-based university project at the University of Alicante to help people navigate large venues using tickets, indoor routes and 3D visualisation.',
    role: 'Full-stack development and team coordination',
    problem: 'Helping attendees check their tickets, find their seats and navigate a large venue.',
    contribution: 'I contributed to frontend–backend integration, management tools and venue visualisation, as well as task allocation and the team’s technical decisions.',
    decisions: [
      { title: 'Manage the event', text: 'Users, events, tickets with QR codes and administration panels.' },
      { title: 'Navigate the venue', text: 'Venues, zones, seats, indoor routes and 3D visualisation.' },
      { title: 'Build as a team', text: 'Coordination meetings, feature integration and shared planning.' },
    ],
    learning: 'Organising work, making decisions together, integrating contributions from different people and adapting plans when problems arose.',
    result: 'A complete application developed as a project-based learning assignment and deployed publicly.',
    note: 'We also worked on publishing, SEO and social media: my first experience with a web product’s visibility and communication.',
  },
};

const images: Record<string, Pick<ProjectImage, 'label' | 'alt'>> = {
  'nutrivisor-captura': { label: 'Filters and preferences', alt: 'Nutrivisor filters and preferences alongside Mercadona products.' },
  'collage-nutrivisor-2': { label: 'Nutritional indicators', alt: 'Nutrivisor nutritional indicators with Nutri-Score and NOVA in the cereal category.' },
  'collage-nutrivisor-1': { label: 'Information inside the store', alt: 'Nutritional information integrated into Mercadona’s product catalogue.' },
  'mappleo-dashboard': { label: 'Today: overview', alt: 'Mappleo dashboard with metrics, pending tasks and the fictional John Miller profile’s agenda.' },
  'mappleo-kanban': { label: 'Kanban board', alt: 'Mappleo Kanban board with columns, linked tasks and completed cards.' },
  'mappleo-ofertas-1': { label: 'Saved job offers', alt: 'Mappleo job offers with companies, interest ratings and application tracking.' },
  'mappleo-ofertas-2': { label: 'Job offer details', alt: 'Job offer side panel with company, technologies, salary and description.' },
  'mappleo-candidaturas-1': { label: 'Application tracking', alt: 'Mappleo applications organised by status and linked to job offers.' },
  'mappleo-candidaturas-2': { label: 'Application details', alt: 'Application side panel with status, dates, CV version and notes.' },
  'mappleo-empresas-1': { label: 'Companies on the radar', alt: 'Mappleo company directory with locations and interest ratings.' },
  'mappleo-empresas-2': { label: 'Company details', alt: 'Side panel for the fictional Northstar Labs company with information and notes.' },
  'mappleo-contactos-1': { label: 'Professional contacts', alt: 'Mappleo contacts linked to companies and professional roles.' },
  'mappleo-contactos-2': { label: 'Contact details', alt: 'Fictional contact side panel with company, role and notes.' },
  'mappleo-networking-1': { label: 'Networking events', alt: 'Mappleo networking agenda with dates, locations and event types.' },
  'mappleo-networking-2': { label: 'Companies and people at an event', alt: 'Event details with participating companies and related contacts.' },
  'mappleo-estadisticas-1': { label: 'Job search statistics', alt: 'Application, response and interview statistics with filters and charts by period.' },
  'mappleo-estadisticas-2': { label: 'Networking and completed tasks', alt: 'Mappleo activity charts for contacts, events and completed tasks.' },
  'mappleo-informe-pdf': { label: 'PDF reports', alt: 'Mappleo PDF statistics report with networking and technology tables.' },
  'mappleo-windows': { label: 'Windows application', alt: 'Mappleo desktop application running on Windows with locally stored data.' },
  'wikicodex-home': { label: 'Character library', alt: 'WikiCodex character library with cards, sidebar navigation and campaign panel.' },
  'collage-wikicodex-ficha': { label: 'Character sheet', alt: 'WikiCodex character sheet with attributes, image and organised content.' },
  'collage-wikicodex-lugares': { label: 'Campaign locations', alt: 'Visual library of locations in a WikiCodex campaign.' },
  'collage-wikicodex-combate': { label: 'Combat management', alt: 'WikiCodex tool for organising characters taking part in combat.' },
  'crowdcompass-landing': { label: 'Venue overview', alt: 'CrowdCompass home page with a three-dimensional venue representation.' },
  'collage-crowdcompass-recorrido': { label: 'Indoor routes', alt: 'CrowdCompass mobile view showing a navigation route inside a 3D venue.' },
  'collage-crowdcompass-asiento': { label: 'Seat location', alt: 'Mobile venue view with zones, seats and points of interest.' },
  'collage-crowdcompass-entradas': { label: 'Tickets and QR codes', alt: 'CrowdCompass mobile ticket panel with QR codes.' },
};

export function getProjects(language: Language): Project[] {
  if (language === 'es') return projects;
  return projects.map(project => {
    const translated = descriptions[project.id];
    if (!translated) throw new Error(`Missing English project: ${project.id}`);
    return {
      ...project, ...translated,
      links: project.links.map(link => ({
        ...link,
        label: ({ 'Ver demo': 'View demo', 'Ver proyecto': 'View project', 'Descargar para Windows': 'Download for Windows' } as Record<string, string>)[link.label] || link.label,
        href: project.id === 'mappleo' ? link.href.replace('/es/index.html', '/en/index.html') : link.href,
      })),
      images: project.images.map(image => {
        if (!images[image.file]) throw new Error(`Missing English image: ${image.file}`);
        return { ...image, ...images[image.file] };
      }),
    };
  });
}
