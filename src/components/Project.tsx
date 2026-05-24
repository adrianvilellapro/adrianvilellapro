import React from "react";
import '../assets/styles/Project.scss';

const publicAsset = (fileName: string) => `${process.env.PUBLIC_URL}/portfolio-assets/${fileName}`;
const wikicodexHome = publicAsset('wikicodex-home.jpg');
const wikicodexLogo = publicAsset('wikicodex-logo.png');
const nutrivisorScreenshot = publicAsset('nutrivisor-captura.png');
const nutrivisorLogo = publicAsset('nutrivisor-logo.png');
const crowdCompassScreenshot = publicAsset('crowdcompass-landing.jpg');
const crowdCompassLogo = publicAsset('crowdcompass-logo.png');

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Proyectos destacados</h1>
        <div className="projects-grid">
            <div className="project">
                <a href="https://adrianvilellapro.github.io/WikiCodex-App/" target="_blank" rel="noreferrer"><img src={wikicodexHome} className="zoom" alt="Captura de WikiCodex" width="100%"/></a>
                <div className="project-heading">
                    <img src={wikicodexLogo} alt="Logo de WikiCodex"/>
                    <a href="https://github.com/adrianvilellapro/WikiCodex-App" target="_blank" rel="noreferrer"><h2>WikiCodex</h2></a>
                </div>
                <p>Aplicación web para organizar campañas, personajes, objetos, lugares, poderes, hechizos y contenido narrativo de partidas de rol. Incluye privacidad granular, permisos, versiones, recursos multimedia y una demo estática pública.</p>
                <div className="project-links">
                    <a href="https://github.com/adrianvilellapro/WikiCodex-App" target="_blank" rel="noreferrer">Repositorio</a>
                    <a href="https://adrianvilellapro.github.io/WikiCodex-App/" target="_blank" rel="noreferrer">Demo</a>
                </div>
            </div>
            <div className="project">
                <a href="https://github.com/adrianvilellapro/Nutrivisor" target="_blank" rel="noreferrer"><img src={nutrivisorScreenshot} className="zoom" alt="Captura de Nutrivisor" width="100%"/></a>
                <div className="project-heading">
                    <img src={nutrivisorLogo} alt="Logo de Nutrivisor"/>
                    <a href="https://github.com/adrianvilellapro/Nutrivisor" target="_blank" rel="noreferrer"><h2>Nutrivisor</h2></a>
                </div>
                <p>Proyecto académico de web aumentada para enriquecer la compra online con información nutricional, indicadores visuales y filtros automáticos sobre productos de Mercadona, integrando Open Food Facts.</p>
                <div className="project-links">
                    <a href="https://github.com/adrianvilellapro/Nutrivisor" target="_blank" rel="noreferrer">Repositorio</a>
                    <a href="https://chromewebstore.google.com/detail/niobahhmkhhjpdafnnmcdfpkbkjipiie?utm_source=item-share-cb" target="_blank" rel="noreferrer">Chrome Web Store</a>
                </div>
            </div>
            <div className="project">
                <a href="https://github.com/adrianvilellapro/CrowdCompass" target="_blank" rel="noreferrer"><img src={crowdCompassScreenshot} className="zoom" alt="Captura de CrowdCompass" width="100%"/></a>
                <div className="project-heading">
                    <img src={crowdCompassLogo} alt="Logo de CrowdCompass"/>
                    <a href="https://github.com/adrianvilellapro/CrowdCompass" target="_blank" rel="noreferrer"><h2>CrowdCompass</h2></a>
                </div>
                <p>Aplicación web universitaria para eventos multitudinarios, con orientación 3D interactiva, rutas interiores, gestión de entradas, recintos, asientos y asistencia digital para usuarios.</p>
                <div className="project-links">
                    <a href="https://github.com/adrianvilellapro/CrowdCompass" target="_blank" rel="noreferrer">Repositorio</a>
                    <a href="https://crowdcompass.ovh/" target="_blank" rel="noreferrer">Proyecto desplegado</a>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Project;
