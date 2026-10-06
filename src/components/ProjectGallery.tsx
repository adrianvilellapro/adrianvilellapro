import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, CornersOutIcon, XIcon } from '@phosphor-icons/react';
import type { Project } from '../data/projects';
import { optimized } from '../data/profile';
import { useGallerySwipe } from '../hooks/useGallerySwipe';

export function ProjectGallery({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const current = project.images[selected];
  const navigate = (direction: number) => setSelected((index) => (index + direction + project.images.length) % project.images.length);
  const swipe = useGallerySwipe(navigate);

  useEffect(() => {
    if (!expanded) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; trigger.current?.focus(); };
  }, [expanded]);

  return (
    <div className={`project-gallery gallery-${project.id}`}>
      <figure>
        <button ref={trigger} className="gallery-main" {...swipe} style={{ aspectRatio: current.width < current.height ? '4 / 3' : `${project.images[0].width} / ${project.images[0].height}` }} onClick={() => setExpanded(true)} aria-label={`Ampliar captura de ${project.name}: ${current.label}`}>
          <img src={optimized(`${current.file}.webp`)} alt={current.alt} width={current.width} height={current.height} loading="lazy" decoding="async" draggable={false} />
          <span className="gallery-expand" aria-hidden="true"><CornersOutIcon size={18} /> Ampliar</span>
        </button>
        <figcaption><span aria-live="polite">{current.label}</span><span className="mono">{String(selected + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}</span></figcaption>
      </figure>
      <div className="gallery-thumbnails" aria-label={`Capturas de ${project.name}`}>
        {project.images.map((image, index) => (
          <button key={image.file} className={selected === index ? 'is-selected' : ''} aria-pressed={selected === index} aria-label={`Mostrar ${image.label.toLowerCase()}`} onClick={() => setSelected(index)}>
            <img src={optimized(`${image.file}-thumb.webp`)} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      {expanded && (
        <dialog ref={dialog} className="image-dialog" aria-label={`Capturas de ${project.name}`} onCancel={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }} onKeyDown={(event) => {
          if (event.key === 'Tab') {
            const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button');
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
          }
          if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1); }
          if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1); }
        }}>
          <div className="dialog-inner">
            <div className="dialog-top"><span>{project.name}</span><button className="icon-button" aria-label="Cerrar captura" onClick={() => setExpanded(false)} autoFocus><XIcon size={24} /></button></div>
            <img className="dialog-image" {...swipe} src={optimized(`${current.file}.webp`)} alt={current.alt} width={current.width} height={current.height} draggable={false} />
            <div className="dialog-bottom"><button className="icon-button" aria-label="Captura anterior" onClick={() => navigate(-1)}><ArrowLeftIcon size={23} /></button><span aria-live="polite">{current.label} · {selected + 1}/{project.images.length}</span><button className="icon-button" aria-label="Captura siguiente" onClick={() => navigate(1)}><ArrowRightIcon size={23} /></button></div>
          </div>
        </dialog>
      )}
    </div>
  );
}
