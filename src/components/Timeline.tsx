import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap, faRocket, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Trayectoria</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="Actualidad"
            iconStyle={{ background: '#0A66C2', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faRocket} />}
          >
            <h3 className="vertical-timeline-element-title">Desarrollo de proyectos propios</h3>
            <h4 className="vertical-timeline-element-subtitle">Aplicaciones web y software interactivo</h4>
            <p>
              Creación y mejora de proyectos como WikiCodex, CrowdCompass y Nutrivisor, con foco en frontend, arquitectura fullstack, despliegue y experiencia de usuario.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Trabajo de Fin de Grado"
            iconStyle={{ background: '#0A66C2', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faPuzzlePiece} />}
          >
            <h3 className="vertical-timeline-element-title">Nutrivisor</h3>
            <h4 className="vertical-timeline-element-subtitle">Web aumentada y extensión de navegador</h4>
            <p>
              Proyecto aplicado al supermercado online con integración de datos nutricionales, Open Food Facts, filtros visuales y evolución hacia extensión Chrome Manifest V3.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Formación universitaria"
            iconStyle={{ background: '#0A66C2', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Ingeniería Multimedia</h3>
            <h4 className="vertical-timeline-element-subtitle">Universidad de Alicante</h4>
            <p>
              Formación en desarrollo de software, tecnologías web, experiencia de usuario, diseño multimedia y creación de aplicaciones interactivas.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Base técnica"
            iconStyle={{ background: '#0A66C2', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Frontend, fullstack y despliegue</h3>
            <h4 className="vertical-timeline-element-subtitle">React, Angular, Node.js, bases de datos y APIs</h4>
            <p>
              Experiencia construyendo aplicaciones con autenticación, persistencia, permisos, consumo de APIs, despliegue online y documentación de proyecto.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
