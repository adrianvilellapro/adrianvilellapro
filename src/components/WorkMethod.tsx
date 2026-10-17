import { MagnifyingGlassIcon, StackSimpleIcon, PathIcon } from '@phosphor-icons/react';
import { useLanguage } from '../i18n';

const methods = [
  { title: 'Entender antes de construir', enTitle: 'Understand before building', text: 'Intento convertir las necesidades del proyecto en funcionalidades concretas antes de empezar a implementar.', enText: 'I aim to turn project needs into concrete features before starting implementation.', Icon: MagnifyingGlassIcon },
  { title: 'Resolver sin quedarse bloqueado', enTitle: 'Find a way forward', text: 'Cuando no conozco una solución, investigo documentación, comparo alternativas, pruebo y pido ayuda con contexto si es necesario.', enText: 'When I do not know a solution, I research documentation, compare alternatives, experiment and ask for help with context when needed.', Icon: PathIcon },
  { title: 'Mirar el sistema completo', enTitle: 'See the whole system', text: 'Me interesa entender los datos, la API, los permisos, el despliegue y cómo encaja cada parte con la pantalla que estoy desarrollando.', enText: 'I want to understand the data, API, permissions and deployment, and how each part connects to the screen I am developing.', Icon: StackSimpleIcon },
];

export function WorkMethod() {
  const { t } = useLanguage();
  return (
    <section className="method-section" id="sobre-mi" aria-labelledby="method-title"><div className="container section">
      <div className="section-heading"><div><p className="eyebrow section-eyebrow"><span>02</span> {t('SOBRE MÍ', 'ABOUT ME')}</p><h2 id="method-title">{t('Cómo trabajo', 'How I work')}<span className="accent">.</span></h2></div><p>{t('Mi punto de partida: entender qué hace falta.', 'My starting point: understand what is needed.')}<br />{t('Mi siguiente paso: aprender a resolverlo.', 'My next step: learn how to solve it.')}</p></div>
      <div className="method-grid">{methods.map(({ title, enTitle, text, enText, Icon }, index) => <div className="method" key={title}><div className="method-top"><Icon size={27} weight="light" /><span className="mono">0{index + 1}</span></div><h3>{t(title, enTitle)}</h3><p>{t(text, enText)}</p></div>)}</div>
    </div></section>
  );
}
