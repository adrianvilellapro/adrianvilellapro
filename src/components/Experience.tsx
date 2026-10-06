import { BriefcaseIcon, GraduationCapIcon } from '@phosphor-icons/react';

export function Experience() {
  return (
    <section className="container section experience-section" id="experiencia" aria-labelledby="experience-title">
      <div className="section-heading"><div><p className="eyebrow section-eyebrow"><span>03</span> RECORRIDO</p><h2 id="experience-title">Experiencia y formación<span className="accent">.</span></h2></div></div>
      <div className="experience-grid">
        <div><h3 className="column-heading"><BriefcaseIcon size={20} /> Experiencia</h3><div className="timeline">
          <article className="timeline-item"><div className="timeline-heading"><h4>NTT DATA</h4><span className="mono">11/2024 — 02/2025</span></div><p className="timeline-role">Becario</p><p>Primera experiencia dentro de una gran consultora tecnológica. Conocí la organización de equipos profesionales, metodologías de trabajo y procesos utilizados en proyectos IT.</p><p className="secondary-copy">Contacto con Microsoft Power Platform, UiPath y herramientas colaborativas del ecosistema Microsoft.</p></article>
          <article className="timeline-item"><div className="timeline-heading"><h4>GESPROMOS / HP</h4><span className="mono">12/2025 — 01/2026</span></div><p className="timeline-role">Promotor tecnológico</p><p>Asesoramiento sobre productos tecnológicos en una campaña de HP en MediaMarkt. Aprendí a explicar tecnología de forma sencilla y adaptar la comunicación a distintos usuarios.</p></article>
        </div></div>
        <div><h3 className="column-heading"><GraduationCapIcon size={22} /> Formación</h3><div className="education-list">
          <article><span className="small-label">UNIVERSIDAD DE ALICANTE</span><h4>Grado en Ingeniería Multimedia</h4><p>Especialización en Gestión de Contenidos</p><span className="education-note">TFG: Nutrivisor · Calificación 10/10</span></article>
          <div className="language"><span className="language-badge">B2</span><div><strong>Inglés</strong><span>Certificación Cambridge</span></div></div>
        </div></div>
      </div>
    </section>
  );
}
