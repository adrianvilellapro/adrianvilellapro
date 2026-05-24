import React from 'react';
import '../assets/styles/Contact.scss';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Contact() {
  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contacto</h1>
          <p>Estoy abierto a colaborar en desarrollo web, herramientas interactivas, aplicaciones fullstack y proyectos multimedia.</p>
          <div className="contact-grid">
            <a className="contact-card" href="mailto:adrian.vilella.pro@gmail.com">
              <EmailIcon />
              <span>Email</span>
              <strong>adrian.vilella.pro@gmail.com</strong>
            </a>
            <a className="contact-card" href="https://www.linkedin.com/in/adri%C3%A1n-vilella-espony-40a046410" target="_blank" rel="noreferrer">
              <LinkedInIcon />
              <span>LinkedIn</span>
              <strong>Adrián Vilella Espony</strong>
            </a>
            <a className="contact-card" href="https://github.com/adrianvilellapro" target="_blank" rel="noreferrer">
              <GitHubIcon />
              <span>GitHub</span>
              <strong>@adrianvilellapro</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
