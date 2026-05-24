import React from "react";
import Chip from '@mui/material/Chip';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "React",
    "Angular",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Vite"
];

const labelsSecond = [
    "Node.js",
    "Express",
    "REST APIs",
    "PostgreSQL",
    "MySQL",
    "Prisma",
    "Supabase",
    "Render"
];

const labelsThird = [
    "Git",
    "GitHub",
    "Vercel",
    "Cloudinary",
    "Chrome Extensions",
    "WebGL",
    "Figma"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Especialización</h1>
            <div className="skills-grid">
                <div className="skill">
                    <CodeIcon className="skill-icon"/>
                    <h3>Frontend y experiencia de usuario</h3>
                    <p>Desarrollo interfaces web modernas, responsive y cuidadas, con especial interés por la claridad visual, la organización de componentes y la experiencia real de uso.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <StorageIcon className="skill-icon"/>
                    <h3>Fullstack y datos</h3>
                    <p>Construyo aplicaciones completas conectando frontend, APIs, lógica de servidor y bases de datos relacionales, con atención a permisos, autenticación y despliegue.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <AutoAwesomeIcon className="skill-icon"/>
                    <h3>Producto digital y herramientas</h3>
                    <p>Me interesa convertir ideas complejas en herramientas útiles, documentadas y presentables, combinando criterio técnico, diseño y aprendizaje continuo.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Herramientas:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
