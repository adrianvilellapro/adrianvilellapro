import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';

const profilePhoto = `${process.env.PUBLIC_URL}/portfolio-assets/fotoperfil.jpg`;

function Main() {
  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profilePhoto} alt="Adrián Vilella Espony" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/adrianvilellapro" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/adri%C3%A1n-vilella-espony-40a046410" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
          </div>
          <p className="eyebrow">Ingeniero Multimedia · Desarrollador de Software</p>
          <h1>Adrián Vilella Espony</h1>
          <p>Fullstack web developer especializado en frontend, aplicaciones interactivas y productos digitales bien estructurados.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#projects">Ver proyectos</a>
            <a className="secondary-action" href="mailto:adrian.vilella.pro@gmail.com">Contactar</a>
          </div>

          <div className="mobile_social_icons">
            <a href="https://github.com/adrianvilellapro" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/adri%C3%A1n-vilella-espony-40a046410" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
