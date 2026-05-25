import React, { useState } from "react";
import {
  ArrowUpRightIcon,
  BrowserIcon,
  CheckIcon,
  CodeBlockIcon,
  CompassIcon,
  CopySimpleIcon,
  DatabaseIcon,
  DeviceMobileIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  GlobeHemisphereWestIcon,
  LinkedinLogoIcon,
  MoonIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparkleIcon,
  StorefrontIcon,
  SunIcon,
  ToolboxIcon,
} from "@phosphor-icons/react";
import "./index.scss";

const asset = (fileName: string) => `${process.env.PUBLIC_URL}/portfolio-assets/${fileName}`;
const email = "adrian.vilella.pro@gmail.com";

const collageImages = [
  "wikicodex-home.jpg",
  "collage-wikicodex-ficha.jpg",
  "collage-wikicodex-combate.jpg",
  "collage-wikicodex-lugares.jpg",
  "crowdcompass-landing.jpg",
  "collage-crowdcompass-recorrido.png",
  "collage-crowdcompass-asiento.png",
  "collage-crowdcompass-entradas.jpg",
  "nutrivisor-captura.png",
  "collage-nutrivisor-1.png",
  "collage-nutrivisor-2.png",
];

const projectBackgroundImages = [
  ...collageImages,
  ...collageImages,
  "wikicodex-home.jpg",
  "crowdcompass-landing.jpg",
  "nutrivisor-captura.png",
  "collage-wikicodex-ficha.jpg",
  "collage-crowdcompass-recorrido.png",
  "collage-nutrivisor-2.png",
];

const competencies = [
  {
    title: "Frontend y experiencia de usuario",
    text: "Interfaces responsive, claras y cuidadas, con foco en componentes, jerarquía visual y experiencia real de uso.",
    icon: <CodeBlockIcon weight="duotone" />,
    items: ["React", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend, APIs y datos",
    text: "Aplicaciones completas conectando lógica de servidor, autenticación, permisos y bases de datos relacionales.",
    icon: <DatabaseIcon weight="duotone" />,
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MySQL", "Prisma", "JWT"],
  },
  {
    title: "Producto digital y herramientas",
    text: "Proyectos presentables, documentados y fáciles de mantener, con atención a estructura, diseño y evolución técnica.",
    icon: <ToolboxIcon weight="duotone" />,
    items: ["Git", "GitHub", "Vercel", "Render", "Supabase", "Cloudinary", "Figma", "WebGL"],
  },
];

const highlights = [
  { label: "Frontend", value: "React · Angular", icon: <BrowserIcon weight="duotone" /> },
  { label: "Backend", value: "Node · APIs · BD", icon: <ShieldCheckIcon weight="duotone" /> },
  { label: "Experiencias", value: "Producto · UX", icon: <SparkleIcon weight="duotone" /> },
];

const projects = [
  {
    name: "WikiCodex",
    eyebrow: "Aplicación fullstack privada con demo pública",
    image: asset("wikicodex-home.jpg"),
    logo: asset("wikicodex-logo.png"),
    icon: <GlobeHemisphereWestIcon weight="duotone" />,
    description:
      "Herramienta para organizar campañas, personajes, objetos, lugares, poderes, hechizos y contenido narrativo de partidas de rol. Incluye privacidad granular, versiones, recursos multimedia y una demo estática pública.",
    tags: ["React", "Node.js", "Express", "Prisma", "PostgreSQL", "Vercel", "Render", "Supabase"],
    links: [
      { label: "Repositorio", href: "https://github.com/adrianvilellapro/WikiCodex-App" },
      { label: "Demo estática", href: "https://adrianvilellapro.github.io/WikiCodex-App/" },
    ],
  },
  {
    name: "CrowdCompass",
    eyebrow: "Orientación 3D para eventos multitudinarios",
    image: asset("crowdcompass-landing.jpg"),
    logo: asset("crowdcompass-logo.png"),
    icon: <CompassIcon weight="duotone" />,
    description:
      "Proyecto universitario ABP para mejorar la orientación en recintos de eventos. Integra visualización 3D, rutas interiores, gestión de entradas, recintos, asientos y asistencia digital.",
    tags: ["Angular", "TypeScript", "Node.js", "Express", "MySQL", "Three.js", "WebGL"],
    links: [
      { label: "Repositorio", href: "https://github.com/adrianvilellapro/CrowdCompass" },
      { label: "Página desplegada", href: "https://crowdcompass.ovh/" },
    ],
  },
  {
    name: "Nutrivisor",
    eyebrow: "Web aumentada y extensión de navegador",
    image: asset("nutrivisor-captura.png"),
    logo: asset("nutrivisor-logo.png"),
    icon: <StorefrontIcon weight="duotone" />,
    description:
      "Proyecto aplicado a la compra online para enriquecer productos con información nutricional, indicadores visuales y filtros automáticos usando datos de Open Food Facts.",
    tags: ["JavaScript", "Vite", "Chrome Extension", "Tampermonkey", "Open Food Facts"],
    links: [
      { label: "Repositorio", href: "https://github.com/adrianvilellapro/Nutrivisor" },
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/niobahhmkhhjpdafnnmcdfpkbkjipiie?utm_source=item-share-cb",
      },
    ],
  },
];

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [emailCopied, setEmailCopied] = useState(false);
  const isDark = theme === "dark";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <main className={`site-shell ${theme}`}>
      <div className="intro-background" aria-hidden="true">
        <img src={asset("fotoperfil.jpg")} alt="" />
      </div>

      <nav className="topbar" aria-label="Navegación principal">
        <div className="topbar-left">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {isDark ? <SunIcon weight="duotone" /> : <MoonIcon weight="duotone" />}
          </button>
          <strong className="identity-name">Adrián Vilella Espony</strong>
        </div>
        <div className="nav-links">
          <a href="#perfil">Perfil</a>
          <a href="#competencias">Competencias</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><RocketLaunchIcon weight="duotone" /> Ingeniero Multimedia · Desarrollo Web</p>
          <h1>Aplicaciones web con estructura, criterio visual y experiencia cuidada.</h1>
          <p>
            Desarrollo herramientas interactivas y productos digitales con lógica fullstack, bases de datos y una presentación
            clara, mantenible y profesional.
          </p>
          <div className="hero-actions">
            <a href="#proyectos">Ver proyectos <ArrowUpRightIcon weight="bold" /></a>
            <a href="#contacto" className="secondary">Contactar</a>
          </div>
          <div className="hero-metrics" aria-label="Áreas principales">
            {highlights.map((item) => (
              <article key={item.label}>
                {item.icon}
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <aside className="hero-visual" aria-label="Presentación visual">
          <div className="profile-frame">
            <img src={asset("fotoperfil.jpg")} alt="Adrián Vilella Espony" />
          </div>
        </aside>
      </section>

      <section className="section profile-section" id="perfil">
        <div className="section-marker">
          <DeviceMobileIcon weight="duotone" />
        </div>
        <div className="section-heading">
          <p className="eyebrow">Perfil profesional</p>
          <h2>Aplicaciones claras, robustas y fáciles de entender.</h2>
        </div>
        <div className="profile-text">
          <p>
            Soy Ingeniero Multimedia graduado en la Universidad de Alicante, especializado en desarrollo de software y tecnologías web.
            Mi perfil está orientado al frontend, área en la que más disfruto trabajando con React, Angular, JavaScript,
            TypeScript, HTML y CSS.
          </p>
          <p>
            También cuento con experiencia fullstack usando Node.js, Express, bases de datos relacionales, ORMs y APIs REST.
            Esto me permite participar en el desarrollo completo de una aplicación, desde la interfaz hasta la lógica de servidor,
            la persistencia y la organización técnica del proyecto.
          </p>
        </div>
      </section>

      <section className="section" id="competencias">
        <div className="section-heading wide">
          <p className="eyebrow">Tecnologías y competencias</p>
          <h2>Un stack web moderno, acompañado por criterio de diseño, organización y aprendizaje continuo.</h2>
        </div>
        <div className="competency-grid">
          {competencies.map((group) => (
            <article className="competency-card" key={group.title}>
              <div className="competency-icon">{group.icon}</div>
              <h3>{group.title}</h3>
              <p>{group.text}</p>
              <div className="chips">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects-section" id="proyectos">
        <div className="projects-background" aria-hidden="true">
          {projectBackgroundImages.map((imageName, index) => (
            <img src={asset(imageName)} alt="" key={`${imageName}-${index}`} />
          ))}
        </div>

        <div className="projects-intro">
          <div>
            <p className="eyebrow">Proyectos destacados</p>
            <h2>Últimos proyectos.</h2>
          </div>
          <p>
            Cada proyecto combina una necesidad concreta con una solución técnica distinta: gestión de contenido,
            orientación 3D, web aumentada, datos externos y experiencia visual.
          </p>
        </div>

        <div className="project-showcase-list">
          {projects.map((project, index) => (
            <article className={`project-showcase ${index % 2 ? "reverse" : ""}`} key={project.name}>
              <a href={project.links[1]?.href ?? project.links[0].href} target="_blank" rel="noreferrer" className="project-media">
                <img src={project.image} alt={`Captura de ${project.name}`} />
                <span>Ver {project.links[1]?.label ?? "proyecto"} <ArrowUpRightIcon weight="bold" /></span>
              </a>
              <div className="project-panel">
                <div className="project-heading">
                  <div className="project-logo">
                    <img src={project.logo} alt={`Logo de ${project.name}`} />
                  </div>
                  <div>
                    <p>{project.eyebrow}</p>
                    <h3>{project.name}</h3>
                  </div>
                  <div className="project-big-icon">{project.icon}</div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="chips compact">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.links.map((link) => (
                    <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                      {link.label} <ArrowUpRightIcon weight="bold" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contacto">
        <div>
          <p className="eyebrow">Contacto</p>
          <h2>Abierto a proyectos de desarrollo web, software interactivo y herramientas digitales.</h2>
        </div>
        <div className="contact-grid">
          <article className="email-contact-card">
            <EnvelopeSimpleIcon weight="duotone" />
            <div>
              <span>Email</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <button type="button" onClick={copyEmail} className="copy-email" aria-label="Copiar email">
              {emailCopied ? <CheckIcon weight="bold" /> : <CopySimpleIcon weight="bold" />}
              <span>{emailCopied ? "Copiado" : "Copiar"}</span>
            </button>
          </article>
          <a href="https://www.linkedin.com/in/adri%C3%A1n-vilella-espony-40a046410" target="_blank" rel="noreferrer">
            <LinkedinLogoIcon weight="duotone" />
            <span>LinkedIn</span>
            <strong>Adrián Vilella Espony</strong>
          </a>
          <a href="https://github.com/adrianvilellapro" target="_blank" rel="noreferrer">
            <GithubLogoIcon weight="duotone" />
            <span>GitHub</span>
            <strong>@adrianvilellapro</strong>
          </a>
        </div>
      </section>

      <footer>
        <p>© 2026 Adrián Vilella Espony. Portfolio estático personal.</p>
      </footer>
    </main>
  );
}

export default App;
