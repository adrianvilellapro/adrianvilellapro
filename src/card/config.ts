import { profile } from '../data/profile';

export const contact = {
  name: profile.fullName,
  role: 'Desarrollador de software junior',
  email: profile.email,
  phone: '+34640652203',
  phoneLabel: '640 652 203',
  portfolio: 'https://adrianvilellapro.github.io/adrianvilellapro/',
  linkedin: `${profile.linkedin}/?isSelfProfile=true`,
  github: profile.github,
  photo: '../portfolio-assets/optimized/fotoperfil.webp',
};

// Relative to /card/, so this also works under the GitHub Pages repository path.
export const CV_URL: string | null = '../CV_Adrian_Vilella_Espony.pdf';
