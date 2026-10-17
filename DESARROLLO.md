# Portfolio: desarrollo local

React 18, TypeScript, SCSS y Vite. Las fuentes y las imágenes se sirven desde el propio proyecto. No necesita cuentas, claves ni servicios externos para funcionar.

## Ver el portfolio

Desde PowerShell:

```powershell
cd C:\Users\adria\Desktop\Portfolio\adrianvilellapro
npm.cmd install
npm.cmd start
```

Abrir **http://127.0.0.1:5173/**. Si las dependencias ya están instaladas, basta con `npm.cmd start`. Se utiliza `npm.cmd` porque PowerShell puede bloquear el script `npm.ps1` en este equipo. Para detenerlo, pulsar Ctrl+C en la terminal que lo ejecuta.

## Compilación y comprobaciones

```powershell
npm.cmd run build
npm.cmd test
```

`build` comprueba TypeScript y genera `dist/`. Las pruebas de Playwright sirven la compilación en `http://127.0.0.1:4173/adrianvilellapro/`. Cubren Chrome y Edge instalados en el equipo, además de Firefox y WebKit. Para instalar estos dos motores en otro equipo: `npx.cmd playwright install firefox webkit`.

Se comprueban escritorio, tablet, móvil y 320 px, imágenes, navegación, galerías, foco de teclado, movimiento reducido, copia del correo, opciones de contacto, persistencia del tema y accesibilidad con axe en modo claro y oscuro. También se prueban los casos en los que el almacenamiento o el portapapeles no están disponibles. Las capturas y los informes temporales quedan en `test-results/`, ignorado por Git. Las pruebas móviles emulan tamaños y entrada táctil; no sustituyen una prueba en cada dispositivo físico.

Para inspeccionar manualmente la compilación con la ruta de GitHub Pages:

```powershell
node scripts/serve-build.mjs
```

## GitHub Pages

```powershell
npm.cmd run build:pages
```

Este comando genera la versión estática en `docs/`, como en el proyecto anterior. **No hace commits, no sube cambios y no publica nada.** Las rutas relativas (`base: './'`) permiten servir el portfolio bajo `/adrianvilellapro/`. El despliegue existente desde la carpeta `docs/` puede seguir utilizando esa carpeta cuando se decida publicar.

Referencia técnica: [despliegues estáticos con Vite](https://vite.dev/guide/static-deploy.html).

## Lectura por buscadores y herramientas automáticas

Ambos comandos de compilación generan todo el contenido de React en el HTML inicial mediante `scripts/prerender.mjs`. El navegador reutiliza ese HTML con hidratación, conservando el diseño y las interacciones. Los textos de proyectos, experiencia, formación, tecnologías y contacto se pueden leer sin ejecutar JavaScript; los detalles desplegables usan HTML nativo. No hay una versión diferente ni contenido oculto exclusivo para bots.

Se generan datos estructurados JSON-LD de `ProfilePage`, `Person` y los proyectos a partir de los mismos datos de la web, además de `sitemap.xml`. Se conservan la URL canónica, los metadatos sociales, los encabezados semánticos y los nombres completos de tecnologías. `robots.txt` permite el rastreo y referencia el sitemap; en GitHub Pages su aplicación a todo el dominio depende del archivo situado en la raíz del dominio.

Las pruebas verifican la lectura sin JavaScript y la equivalencia del contenido con la versión interactiva. Esto facilita la extracción por buscadores y herramientas de selección que admitan páginas web; no garantiza la indexación ni la compatibilidad con todos los ATS (algunos solo aceptan archivos de CV). Estas mejoras se aplican a `dist/` y `docs/`; el servidor de desarrollo sigue usando el flujo habitual de Vite.

Referencias: [HTML estático con Vite](https://vite.dev/guide/ssr#pre-rendering-ssg), [renderToString de React](https://react.dev/reference/react-dom/server/renderToString) y [datos estructurados de perfiles](https://developers.google.com/search/docs/appearance/structured-data/profile-page).

## Organización del código

- `src/components/`: cabecera, presentación, proyectos, galerías, método, experiencia, tecnologías, contacto y pie.
- `src/data/projects.ts`: textos, capturas, tecnologías y enlaces de los casos de estudio.
- `src/data/profile.ts`: datos de contacto y rutas de imágenes.
- `src/index.scss`: sistema visual y adaptación a diferentes tamaños de pantalla.
- `src/features.scss`: presentación con foto, tecnologías, opciones de correo y animaciones.
- `src/hooks/useScrollReveal.ts`: apariciones progresivas con IntersectionObserver y soporte de movimiento reducido.
- `public/technology-icons/`: logos SVG locales y atribuciones; los datos asociados están en `src/data/technology-icons.json`.
- `public/portfolio-assets/`: archivos originales conservados.
- `public/portfolio-assets/optimized/`: versiones WebP y miniaturas utilizadas por la web.
- `index.html`: título, descripción y Open Graph.

Para regenerar las imágenes optimizadas y la tarjeta social: `npm.cmd run optimize:images`. Este proceso conserva los archivos originales. No hay un botón de CV porque el repositorio no contiene un PDF.

Las capturas principales son las vistas de filtros de Nutrivisor, la biblioteca de personajes de WikiCodex y la página de CrowdCompass. Las galerías incluyen también los indicadores nutricionales, las fichas, los lugares, los combates, las rutas interiores, los asientos y las entradas. La fotografía personal se sirve como WebP en la presentación; su original y los distintivos de idioma se conservan.

## Tema, contacto y logos

En escritorio, los proyectos mantienen la galería a la izquierda y el texto a la derecha. Hasta 960 px se apilan en el mismo orden, con la galería a todo el ancho y sin posición fija durante el scroll. Las capturas admiten gestos horizontales táctiles tanto en la página como en el visor; se conserva el desplazamiento vertical, el zoom del navegador, las miniaturas y la navegación de teclado. Las pruebas incluyen secuencias de puntero en los cuatro motores y gestos táctiles nativos mediante CDP en Chrome móvil.

Mappleo utiliza esta misma estructura de caso de estudio, con 16 capturas de la web, sus informes y la aplicación de Windows. Dashboard es su vista inicial; sus miniaturas se distribuyen en varias filas para evitar desbordamientos. La galería sirve WebP optimizados y miniaturas ligeras, conservando los originales en `public/portfolio-assets/`. Los enlaces llevan a la demo estática, al repositorio público y a la última versión del instalador. El stack general incluye también Electron, SQLite, Neon, Zod, Vitest, Playwright y GitHub Actions; Docker y Next.js ya estaban presentes.

El botón de la cabecera cambia entre claro y oscuro. Se guarda la preferencia en `localStorage`; si todavía no hay una elección, se utiliza el tema del dispositivo. La selección inicial se aplica antes de cargar React para evitar un destello del tema incorrecto.

«Escríbeme» abre un diálogo con Gmail, Outlook y copia de la dirección. No envía ningún mensaje desde el portfolio ni necesita un backend. Gmail y Outlook pueden solicitar iniciar sesión.

Los logos se sirven en local, sin peticiones a un CDN. `node scripts/technology-icons.mjs` regenera los iconos de Simple Icons y sus metadatos; el logo oficial de Open Food Facts ya está incluido. Las categorías genéricas como APIs tienen un pictograma, sin atribuirles una marca inexistente.
