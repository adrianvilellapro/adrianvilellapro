import { useEffect, useRef, useState } from 'react';
import { ArrowUpRightIcon, CheckIcon, CopySimpleIcon, EnvelopeSimpleIcon, XIcon } from '@phosphor-icons/react';
import { profile } from '../data/profile';
import { ExternalLink } from './ExternalLink';

export function Contact() {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; trigger.current?.focus(); };
  }, [open]);
  const copyEmail = async () => {
    clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(profile.email); setMessage('Correo copiado'); }
    catch { setMessage('No se pudo copiar. Selecciona la dirección o abre Gmail u Outlook desde Escríbeme.'); }
    timer.current = setTimeout(() => setMessage(''), 5000);
  };
  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div>
          <p className="eyebrow section-eyebrow"><span>05</span> CONTACTO</p>
          <h2 id="contact-title">¿Hablamos<span>?</span></h2>
          <p className="contact-description">Actualmente busco una oportunidad junior donde pueda trabajar en proyectos reales, seguir creciendo como desarrollador y aportar desde la base técnica que ya he construido.</p>
          <button ref={trigger} className="button button-primary" aria-haspopup="dialog" onClick={() => setOpen(true)}><EnvelopeSimpleIcon size={20} /> Escríbeme <ArrowUpRightIcon size={18} /></button>
        </div>
        <div className="contact-links">
          <span className="small-label">PUEDES ENCONTRARME AQUÍ</span>
          <div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="icon-button" onClick={copyEmail} aria-label="Copiar correo electrónico">{message === 'Correo copiado' ? <CheckIcon size={19} /> : <CopySimpleIcon size={19} />}</button></div>
          {!open && <p className="copy-feedback" role="status">{message}</p>}
          <ExternalLink href={profile.linkedin}>LinkedIn <ArrowUpRightIcon size={21} /></ExternalLink>
          <ExternalLink href={profile.github}>GitHub <ArrowUpRightIcon size={21} /></ExternalLink>
        </div>
      </div>
      {open && <dialog ref={dialog} className="contact-dialog" aria-labelledby="write-title" aria-describedby="write-description" onCancel={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }} onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }}>
        <div className="contact-dialog-inner">
          <button className="icon-button dialog-close" aria-label="Cerrar opciones de contacto" onClick={() => setOpen(false)} autoFocus><XIcon size={24} /></button>
          <EnvelopeSimpleIcon size={32} className="accent" />
          <h3 id="write-title">Escríbeme</h3>
          <p id="write-description">Elige dónde quieres redactar tu mensaje.</p>
          <div className="email-address">{profile.email}</div>
          <div className="mail-options">
            <ExternalLink href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}><span>Abrir Gmail</span><ArrowUpRightIcon size={20} /></ExternalLink>
            <ExternalLink href={`https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(profile.email)}`}><span>Abrir Outlook</span><ArrowUpRightIcon size={20} /></ExternalLink>
            <button onClick={copyEmail}><span>Copiar dirección</span><CopySimpleIcon size={20} /></button>
          </div>
          <p className="dialog-copy-feedback" role="status">{message}</p>
          <p className="mail-help">Gmail y Outlook se abren en una pestaña nueva. También puedes copiar la dirección y utilizar tu servicio de correo habitual.</p>
        </div>
      </dialog>}
    </section>
  );
}
