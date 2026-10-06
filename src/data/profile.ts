export const profile = {
  name: 'Adrián Vilella',
  fullName: 'Adrián Vilella Espony',
  email: 'adrian.vilella.pro@gmail.com',
  github: 'https://github.com/adrianvilellapro',
  linkedin: 'https://www.linkedin.com/in/adri%C3%A1n-vilella-espony-40a046410',
};

// Static prerendering uses the same relative paths as the client build (including GitHub Pages).
export const publicAsset = (filename: string) => `${import.meta.env.SSR ? './' : import.meta.env.BASE_URL}${filename}`;
export const asset = (filename: string) => publicAsset(`portfolio-assets/${filename}`);
export const optimized = (filename: string) => publicAsset(`portfolio-assets/optimized/${filename}`);
