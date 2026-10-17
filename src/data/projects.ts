export interface ProjectImage {
  file: string;
  label: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  badge: string;
  subtitle: string;
  description: string;
  role: string;
  problem: string;
  contribution: string;
  decisions: { title: string; text: string }[];
  learning: string;
  result: string;
  note?: string;
  technologies: string[];
  links: { label: string; href: string }[];
  logo: string;
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: 'nutrivisor',
    name: 'Nutrivisor',
    category: 'Extensión de navegador',
    badge: 'TFG · 10/10',
    subtitle: 'Información nutricional integrada directamente en la compra online.',
    description: 'Una extensión de Chrome que amplía la tienda online de Mercadona con datos de Open Food Facts: indicadores, filtros y avisos durante la compra.',
    role: 'Proyecto individual · Diseño, investigación y desarrollo',
    problem: '¿Cómo mostrar información nutricional útil sin obligar al usuario a abandonar la tienda en la que está comprando?',
    contribution: 'Investigué cómo identificar los productos, conectar fuentes externas e integrar la información en una web sobre la que no tenía control.',
    decisions: [
      { title: 'Conectar los datos', text: 'Identificación de productos e integración con Open Food Facts, contemplando información incompleta.' },
      { title: 'Hacerlos útiles', text: 'Nutri-Score, NOVA, alérgenos, aditivos y filtros consultables en la propia tienda.' },
      { title: 'Integrarlos en la compra', text: 'Extensión Chrome Manifest V3 y caché en local storage para reutilizar la información consultada.' },
    ],
    learning: 'Trabajar con datos externos que no siempre llegan completos, diseñar soluciones tolerantes a errores y transformar información compleja en algo útil.',
    result: 'Trabajo de Fin de Grado calificado con 10/10 y extensión publicada en Chrome Web Store.',
    technologies: ['JavaScript', 'Vite', 'Chrome Extensions', 'APIs', 'Open Food Facts', 'Web Augmentation'],
    links: [
      { label: 'Chrome Web Store', href: 'https://chromewebstore.google.com/detail/niobahhmkhhjpdafnnmcdfpkbkjipiie' },
      { label: 'GitHub', href: 'https://github.com/adrianvilellapro/Nutrivisor' },
    ],
    logo: 'nutrivisor-logo',
    images: [
      { file: 'nutrivisor-captura', label: 'Filtros y preferencias', alt: 'Panel de filtros y preferencias de Nutrivisor junto a los productos de Mercadona.', width: 1280, height: 800 },
      { file: 'collage-nutrivisor-2', label: 'Indicadores nutricionales', alt: 'Indicadores nutricionales de Nutrivisor con Nutri-Score y NOVA sobre la categoría de cereales.', width: 1280, height: 800 },
      { file: 'collage-nutrivisor-1', label: 'Información en la tienda', alt: 'Información nutricional integrada en el catálogo de productos de Mercadona.', width: 1280, height: 800 },
    ],
  },
  {
    id: 'mappleo',
    name: 'Mappleo',
    category: 'Aplicación web y escritorio',
    badge: 'Proyecto personal · Beta',
    subtitle: 'Tu búsqueda de empleo, conectada. También sin conexión.',
    description: 'Una aplicación para organizar empresas, ofertas, candidaturas, contactos y networking en un mismo espacio, con Kanban, calendario y estadísticas. Disponible en la web y como aplicación de Windows.',
    role: 'Proyecto personal · Diseño, desarrollo full stack y aplicación de escritorio',
    problem: 'Evitar que la búsqueda de empleo quede repartida entre hojas de cálculo, notas y correos, sin saber qué se ha enviado ni cuál es el siguiente paso.',
    contribution: 'Diseñé y desarrollé el producto completo: modelo de datos, interfaz responsive, API, autenticación, seguimiento de candidaturas, tablero y estadísticas. Amplié la aplicación a Windows con almacenamiento local y sincronización opcional.',
    decisions: [
      { title: 'Trabajar sin conexión', text: 'Electron y SQLite local cifrado para usar la aplicación sin depender de Internet. La vinculación con la cuenta web es opcional; los cambios se sincronizan al reconectar y las discrepancias que necesitan una decisión se muestran al usuario.' },
      { title: 'Separar datos y archivos', text: 'Reglas y validaciones compartidas entre web y escritorio. Los CV y las cartas permanecen exclusivamente en el ordenador, con vista previa y enlaces a ofertas, sin subirse a la web.' },
      { title: 'Proteger y comprobar', text: 'Permisos y validación en servidor, contraseñas con hash, cifrado de campos personales y pruebas con Vitest y Playwright. Entorno local con Docker, CI con GitHub Actions y demo pública independiente de los servicios de producción.' },
    ],
    learning: 'Diseñar un mismo producto para navegador y escritorio, compartir reglas de negocio y resolver la sincronización entre datos locales y remotos sin comprometer el trabajo sin conexión ni la privacidad de los archivos.',
    result: 'Beta funcional con web desplegada, instalador para Windows, uso sin conexión, sincronización opcional y demo web interactiva sin registro.',
    note: 'Las capturas web utilizan el perfil ficticio de John Miller. La demo estática permite probar los flujos con cambios temporales en el navegador; no se conecta a cuentas reales. El instalador beta de Windows todavía no tiene firma digital.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Electron', 'PostgreSQL', 'SQLite', 'Prisma', 'Tailwind', 'Zod', 'Docker', 'Vercel', 'Neon', 'Vitest', 'Playwright', 'GitHub Actions'],
    links: [
      { label: 'Ver demo', href: 'https://adrianvilellapro.github.io/Mappleo_App/es/index.html' },
      { label: 'GitHub', href: 'https://github.com/adrianvilellapro/Mappleo_App' },
      { label: 'Descargar para Windows', href: 'https://github.com/adrianvilellapro/Mappleo_App/releases/latest' },
    ],
    logo: 'mappleo-logo',
    images: [
      { file: 'mappleo-dashboard', label: 'Hoy: visión general', alt: 'Dashboard de Mappleo con métricas, tareas pendientes y agenda del perfil ficticio de John Miller.', width: 1904, height: 918 },
      { file: 'mappleo-kanban', label: 'Tablero Kanban', alt: 'Tablero Kanban de Mappleo con columnas, tareas vinculadas y tarjetas completadas.', width: 1900, height: 919 },
      { file: 'mappleo-ofertas-1', label: 'Ofertas guardadas', alt: 'Lista de ofertas de Mappleo con empresas, interés y seguimiento de candidaturas.', width: 1908, height: 922 },
      { file: 'mappleo-ofertas-2', label: 'Detalle de una oferta', alt: 'Panel lateral de una oferta con empresa, tecnologías, salario y descripción.', width: 1904, height: 916 },
      { file: 'mappleo-candidaturas-1', label: 'Seguimiento de candidaturas', alt: 'Candidaturas de Mappleo organizadas por estado y vinculadas con sus ofertas.', width: 1908, height: 920 },
      { file: 'mappleo-candidaturas-2', label: 'Ficha de candidatura', alt: 'Panel lateral de una candidatura con estado, fechas, CV utilizado y notas.', width: 1906, height: 919 },
      { file: 'mappleo-empresas-1', label: 'Empresas en el radar', alt: 'Directorio de empresas de Mappleo con ubicación y valoración de interés.', width: 1907, height: 920 },
      { file: 'mappleo-empresas-2', label: 'Ficha de empresa', alt: 'Ficha lateral de Northstar Labs, empresa ficticia, con información y notas.', width: 1910, height: 915 },
      { file: 'mappleo-contactos-1', label: 'Contactos profesionales', alt: 'Contactos de Mappleo relacionados con empresas y cargos profesionales.', width: 1906, height: 918 },
      { file: 'mappleo-contactos-2', label: 'Ficha de contacto', alt: 'Panel lateral de un contacto ficticio con empresa, cargo y notas.', width: 1920, height: 917 },
      { file: 'mappleo-networking-1', label: 'Eventos de networking', alt: 'Agenda de eventos de networking de Mappleo con fechas, ubicaciones y tipos.', width: 1905, height: 913 },
      { file: 'mappleo-networking-2', label: 'Empresas y personas en un evento', alt: 'Detalle de un evento con las empresas participantes y los contactos relacionados.', width: 1909, height: 915 },
      { file: 'mappleo-estadisticas-1', label: 'Estadísticas de la búsqueda', alt: 'Estadísticas de candidaturas, respuestas y entrevistas con filtros y gráficas por periodo.', width: 1907, height: 918 },
      { file: 'mappleo-estadisticas-2', label: 'Networking y tareas completadas', alt: 'Gráficas de actividad de contactos, eventos y tareas completadas en Mappleo.', width: 1908, height: 916 },
      { file: 'mappleo-informe-pdf', label: 'Informes en PDF', alt: 'Informe PDF de estadísticas de Mappleo con tablas de networking y tecnologías.', width: 1908, height: 917 },
      { file: 'mappleo-windows', label: 'Aplicación para Windows', alt: 'Aplicación de escritorio de Mappleo abierta en Windows con sus datos locales.', width: 1331, height: 884 },
    ],
  },
  {
    id: 'wikicodex',
    name: 'WikiCodex',
    category: 'Aplicación full stack',
    badge: 'Proyecto personal',
    subtitle: 'Organizar información compleja. Decidir quién puede verla.',
    description: 'Una plataforma para gestionar campañas de rol, personajes, lugares, objetos y contenido narrativo dentro de wikis privadas.',
    role: 'Proyecto personal · Desarrollo full stack',
    problem: 'Organizar el contenido de una campaña y controlar qué información puede consultar cada usuario, manteniendo la privacidad de las wikis.',
    contribution: 'Diseñé la estructura y desarrollé frontend y backend: autenticación, modelo de datos, permisos, contenido, recursos multimedia y despliegue.',
    decisions: [
      { title: 'Privacidad desde el servidor', text: 'Autenticación, usuarios y permisos para controlar el acceso al contenido de cada campaña.' },
      { title: 'Un modelo conectado', text: 'Base de datos, API y frontend coordinados para gestionar contenido y recursos multimedia.' },
      { title: 'Una demo independiente', text: 'Demo pública estática para enseñar el producto sin exponer los servicios privados de producción.' },
    ],
    learning: 'Pensar más allá de cada pantalla: modelar datos, controlar permisos desde servidor y mantener coherencia entre frontend, backend y base de datos.',
    result: 'Una aplicación full stack funcional, con una demo pública independiente de los servicios privados de producción.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'Cloudinary', 'Vercel', 'Render', 'Supabase'],
    links: [
      { label: 'Ver demo', href: 'https://adrianvilellapro.github.io/WikiCodex-App/' },
      { label: 'GitHub', href: 'https://github.com/adrianvilellapro/WikiCodex-App' },
    ],
    logo: 'wikicodex-logo',
    images: [
      { file: 'wikicodex-home', label: 'Biblioteca de personajes', alt: 'WikiCodex: biblioteca de personajes con tarjetas, navegación lateral y panel de campaña.', width: 1920, height: 918 },
      { file: 'collage-wikicodex-ficha', label: 'Ficha de personaje', alt: 'Ficha de personaje en WikiCodex con atributos, imagen y contenido organizado.', width: 1919, height: 915 },
      { file: 'collage-wikicodex-lugares', label: 'Lugares de la campaña', alt: 'Biblioteca visual de lugares de una campaña en WikiCodex.', width: 1920, height: 913 },
      { file: 'collage-wikicodex-combate', label: 'Gestión de combates', alt: 'Herramienta de WikiCodex para organizar los personajes participantes en un combate.', width: 1920, height: 918 },
    ],
  },
  {
    id: 'crowdcompass',
    name: 'CrowdCompass',
    category: 'Aplicación web · Visualización 3D',
    badge: 'Proyecto en equipo',
    subtitle: 'Orientación y gestión digital para eventos multitudinarios.',
    description: 'Proyecto ABP en equipo en la Universidad de Alicante para facilitar la orientación en grandes recintos mediante entradas, rutas interiores y representación 3D.',
    role: 'Desarrollo full stack y organización de equipo',
    problem: 'Facilitar que los asistentes puedan consultar sus entradas, encontrar su asiento y orientarse dentro de un gran recinto.',
    contribution: 'Participé en la conexión entre frontend y backend, las herramientas de gestión y la visualización del recinto, además del reparto de tareas y las decisiones técnicas del equipo.',
    decisions: [
      { title: 'Gestionar el evento', text: 'Usuarios, eventos, entradas con códigos QR y paneles de administración.' },
      { title: 'Orientar en el recinto', text: 'Recintos, zonas, asientos, rutas interiores y visualización 3D.' },
      { title: 'Construir en equipo', text: 'Reuniones de organización, integración de funcionalidades y planificación compartida.' },
    ],
    learning: 'Organizar trabajo, tomar decisiones conjuntamente, integrar partes desarrolladas por distintas personas y adaptar la planificación cuando aparecían problemas.',
    result: 'Aplicación completa desarrollada como proyecto ABP y desplegada públicamente.',
    note: 'También trabajamos publicación, SEO y redes sociales: mi primer contacto con la visibilidad y comunicación de un producto web.',
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'Three.js', 'WebGL', 'JWT', 'OAuth'],
    links: [
      { label: 'Ver proyecto', href: 'https://crowdcompass.ovh/' },
      { label: 'GitHub', href: 'https://github.com/adrianvilellapro/CrowdCompass' },
    ],
    logo: 'crowdcompass-logo',
    images: [
      { file: 'crowdcompass-landing', label: 'Vista del recinto', alt: 'Página principal de CrowdCompass con la representación tridimensional de un recinto.', width: 1904, height: 916 },
      { file: 'collage-crowdcompass-recorrido', label: 'Rutas interiores', alt: 'Vista móvil de CrowdCompass con una ruta de navegación dentro del recinto 3D.', width: 357, height: 772 },
      { file: 'collage-crowdcompass-asiento', label: 'Localización de asientos', alt: 'Vista móvil del recinto con zonas, asientos y puntos de interés.', width: 356, height: 767 },
      { file: 'collage-crowdcompass-entradas', label: 'Entradas y códigos QR', alt: 'Panel móvil de entradas de CrowdCompass con sus códigos QR.', width: 381, height: 831 },
    ],
  },
];
