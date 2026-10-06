import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowSquareOutIcon, DownloadSimpleIcon, FileTextIcon, XIcon } from '@phosphor-icons/react';
import { ExternalLink } from '../components/ExternalLink';
import './cv-viewer.scss';

export default function CvViewer({ url, onClose }: { url: string | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const frameDocument = useRef<Document | null>(null);
  const close = useRef(onClose);
  close.current = onClose;
  const [failed, setFailed] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const viewerUrl = url && (url.includes('#') ? url : `${url}#view=FitH&navpanes=0`);

  const closeOnEscape = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    close.current();
  }, []);

  const registerFrameKeyboard = () => {
    frameDocument.current?.removeEventListener('keydown', closeOnEscape, true);
    try {
      frameDocument.current = frame.current?.contentDocument ?? null;
      frameDocument.current?.addEventListener('keydown', closeOnEscape, true);
    } catch {
      // Some native readers have an isolated origin; the visible close button remains available.
      frameDocument.current = null;
    }
  };

  useEffect(() => {
    const element = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    document.addEventListener('keydown', closeOnEscape, true);
    return () => {
      document.removeEventListener('keydown', closeOnEscape, true);
      frameDocument.current?.removeEventListener('keydown', closeOnEscape, true);
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [closeOnEscape]);

  // Blob URLs also enforce a real download where a browser ignores the download attribute.
  const download = async () => {
    if (!url || downloading) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('PDF unavailable');
      const blob = await response.blob();
      if (!blob.type.includes('pdf')) throw new Error('Expected PDF');
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Adrian-Vilella-CV.pdf';
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    } catch { setDownloadError(true); }
    finally { setDownloading(false); }
  };

  return <dialog ref={dialog} className="cv-viewer" aria-labelledby="cv-title" aria-describedby="cv-help"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === dialog.current) {
      const box = dialog.current.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose();
    } }}>
    <div className="cv-viewer-content">
      <div className="cv-toolbar">
        <h2 id="cv-title">Currículum</h2>
        <button type="button" className="cv-action cv-close" autoFocus onClick={onClose}><XIcon size={21} aria-hidden="true" />Cerrar</button>
      </div>
      <div className="cv-document">
        {viewerUrl && !failed ? <iframe ref={frame} title="CV de Adrián Vilella Espony" src={viewerUrl} onLoad={registerFrameKeyboard} onError={() => setFailed(true)} /> :
          <div className="cv-unavailable"><FileTextIcon size={40} aria-hidden="true" /><p>{url ? 'No se ha podido mostrar el PDF aquí.' : 'El CV estará disponible próximamente.'}</p></div>}
      </div>
      <div className="cv-bottom-bar">
        <p id="cv-help">{url ? 'Si tu navegador no muestra el PDF completo, ábrelo en otra pestaña.' : 'Puedes consultar mi perfil en el portfolio o escribirme por email.'}</p>
        <div className="cv-actions">
          <button type="button" className="cv-action cv-download" disabled={!url || downloading} onClick={download}>
            <DownloadSimpleIcon size={20} aria-hidden="true" />{downloading ? 'Descargando…' : 'Descargar CV'}
          </button>
          {url && <ExternalLink href={url} className="cv-action"><ArrowSquareOutIcon size={20} aria-hidden="true" />Abrir en otra pestaña</ExternalLink>}
        </div>
        {downloadError && <p role="alert">No se ha podido descargar el CV. Puedes abrirlo en otra pestaña.</p>}
      </div>
    </div>
  </dialog>;
}
