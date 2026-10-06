import { MagnifyingGlassIcon, StackSimpleIcon, PathIcon } from '@phosphor-icons/react';

const methods = [
  { title: 'Entender antes de construir', text: 'Intento convertir las necesidades del proyecto en funcionalidades concretas antes de empezar a implementar.', Icon: MagnifyingGlassIcon },
  { title: 'Resolver sin quedarse bloqueado', text: 'Cuando no conozco una solución, investigo documentación, comparo alternativas, pruebo y pido ayuda con contexto si es necesario.', Icon: PathIcon },
  { title: 'Mirar el sistema completo', text: 'Me interesa entender los datos, la API, los permisos, el despliegue y cómo encaja cada parte con la pantalla que estoy desarrollando.', Icon: StackSimpleIcon },
];

export function WorkMethod() {
  return (
    <section className="method-section" id="sobre-mi" aria-labelledby="method-title"><div className="container section">
      <div className="section-heading"><div><p className="eyebrow section-eyebrow"><span>02</span> SOBRE MÍ</p><h2 id="method-title">Cómo trabajo<span className="accent">.</span></h2></div><p>Mi punto de partida: entender qué hace falta.<br />Mi siguiente paso: aprender a resolverlo.</p></div>
      <div className="method-grid">{methods.map(({ title, text, Icon }, index) => <div className="method" key={title}><div className="method-top"><Icon size={27} weight="light" /><span className="mono">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></div>)}</div>
    </div></section>
  );
}
