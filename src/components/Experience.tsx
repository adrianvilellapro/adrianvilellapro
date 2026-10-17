import { BriefcaseIcon, GraduationCapIcon } from '@phosphor-icons/react';
import { useLanguage } from '../i18n';

export function Experience() {
  const { t } = useLanguage();
  return (
    <section className="container section experience-section" id="experiencia" aria-labelledby="experience-title">
      <div className="section-heading"><div><p className="eyebrow section-eyebrow"><span>03</span> {t('RECORRIDO', 'BACKGROUND')}</p><h2 id="experience-title">{t('Experiencia y formación', 'Experience and education')}<span className="accent">.</span></h2></div></div>
      <div className="experience-grid">
        <div><h3 className="column-heading"><BriefcaseIcon size={20} /> {t('Experiencia', 'Experience')}</h3><div className="timeline">
          <article className="timeline-item"><div className="timeline-heading"><h4>NTT DATA</h4><span className="mono">11/2024 — 02/2025</span></div><p className="timeline-role">{t('Becario', 'Intern')}</p><p>{t('Primera experiencia dentro de una gran consultora tecnológica. Conocí la organización de equipos profesionales, metodologías de trabajo y procesos utilizados en proyectos IT.', 'My first experience at a large technology consultancy. I learned about professional team structures, working methods and processes used in IT projects.')}</p><p className="secondary-copy">{t('Contacto con Microsoft Power Platform, UiPath y herramientas colaborativas del ecosistema Microsoft.', 'Exposure to Microsoft Power Platform, UiPath and collaboration tools within the Microsoft ecosystem.')}</p></article>
          <article className="timeline-item"><div className="timeline-heading"><h4>GESPROMOS / HP</h4><span className="mono">12/2025 — 01/2026</span></div><p className="timeline-role">{t('Promotor tecnológico', 'Technology sales promoter')}</p><p>{t('Asesoramiento sobre productos tecnológicos en una campaña de HP en MediaMarkt. Aprendí a explicar tecnología de forma sencilla y adaptar la comunicación a distintos usuarios.', 'Advised customers on technology products during an HP campaign at MediaMarkt. I learned to explain technology simply and adapt my communication to different users.')}</p></article>
        </div></div>
        <div><h3 className="column-heading"><GraduationCapIcon size={22} /> {t('Formación', 'Education')}</h3><div className="education-list">
          <article><span className="small-label">{t('UNIVERSIDAD DE ALICANTE', 'UNIVERSITY OF ALICANTE')}</span><h4>{t('Grado en Ingeniería Multimedia', 'Bachelor’s Degree in Multimedia Engineering')}</h4><p>{t('Especialización en Gestión de Contenidos', 'Specialisation in Content Management')}</p><span className="education-note">{t('TFG: Nutrivisor · Calificación 10/10', 'Final-year project: Nutrivisor · Grade 10/10')}</span></article>
          <div className="language"><span className="language-badge">B2</span><div><strong>{t('Inglés', 'English')}</strong><span>{t('Certificación Cambridge', 'Cambridge certification')}</span></div></div>
        </div></div>
      </div>
    </section>
  );
}
