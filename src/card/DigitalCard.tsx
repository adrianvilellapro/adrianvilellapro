import { lazy, Suspense, useRef, useState } from 'react';
import { ArrowUpRightIcon, FileTextIcon, GithubLogoIcon, GlobeIcon, LinkedinLogoIcon, PhoneIcon } from '@phosphor-icons/react';
import { ExternalLink } from '../components/ExternalLink';
import { ThemeToggle } from '../components/ThemeToggle';
import { ContactLink } from './ContactLink';
import { EmailCopy } from './EmailCopy';
import { contact, CV_URL } from './config';

const CvViewer = lazy(() => import('./CvViewer'));

export function DigitalCard() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const cvButton = useRef<HTMLButtonElement>(null);
  const closeViewer = () => {
    setViewerOpen(false);
    requestAnimationFrame(() => cvButton.current?.focus());
  };

  return <main className="digital-card-page">
    <article className="digital-card" aria-labelledby="card-name">
      <div className="card-identity">
        <div className="card-portrait"><div className="card-portrait-image"><img src={contact.photo} alt={contact.name} width="1050" height="700" decoding="async" /></div></div>
        <div className="card-identity-copy">
          <div className="card-topline">
            <span className="card-monogram" aria-hidden="true">av<span>.</span></span>
            <ThemeToggle />
          </div>
          <h1 id="card-name">{contact.name}</h1>
          <p className="card-role">{contact.role}</p>
        </div>
      </div>
      <button ref={cvButton} className="card-cv-button" aria-haspopup="dialog" onClick={() => setViewerOpen(true)}>
        <FileTextIcon size={23} aria-hidden="true" /><span>Ver CV</span><ArrowUpRightIcon size={20} aria-hidden="true" />
      </button>
      <div className="card-professional-links" aria-label="Enlaces profesionales">
        <ExternalLink href={contact.portfolio}><GlobeIcon size={21} aria-hidden="true" />Portfolio</ExternalLink>
        <ExternalLink href={contact.linkedin}><LinkedinLogoIcon size={21} aria-hidden="true" />LinkedIn</ExternalLink>
        <ExternalLink href={contact.github}><GithubLogoIcon size={21} aria-hidden="true" />GitHub</ExternalLink>
      </div>
      <address className="card-contact">
        <EmailCopy email={contact.email} />
        <ContactLink href={`tel:${contact.phone}`} icon={<PhoneIcon size={21} aria-hidden="true" />}>{contact.phoneLabel}</ContactLink>
      </address>
      <noscript><p className="card-noscript">Activa JavaScript para abrir el visor del CV o copiar el email. También puedes <a href={`mailto:${contact.email}`}>escribirme por email</a>.</p></noscript>
    </article>
    {viewerOpen && <Suspense fallback={<p className="card-loading" role="status">Abriendo visor…</p>}>
      <CvViewer url={CV_URL} onClose={closeViewer} />
    </Suspense>}
  </main>;
}
