import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopySimpleIcon } from '@phosphor-icons/react';

export function EmailCopy({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const emailText = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  // Legacy clipboard fallback copies only the address and keeps focus on the button.
  const copySelection = () => {
    const selection = window.getSelection();
    if (!selection || !emailText.current) return false;
    const previousFocus = document.activeElement;
    const previousRanges = Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange());
    const range = document.createRange();
    range.selectNodeContents(emailText.current);
    selection.removeAllRanges();
    selection.addRange(range);
    const copied = document.execCommand('copy');
    if (copied) {
      selection.removeAllRanges();
      previousRanges.forEach(previous => selection.addRange(previous));
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    }
    return copied;
  };

  const copy = async () => {
    clearTimeout(timer.current);
    let copied = false;
    try { await navigator.clipboard.writeText(email); copied = true; }
    catch { try { copied = copySelection(); } catch { /* Leave the address available for manual copying. */ } }
    setStatus(copied ? 'copied' : 'error');
    if (copied) timer.current = setTimeout(() => setStatus('idle'), 4000);
  };

  return <button type="button" className="card-contact-link card-email-copy" onClick={copy}
    aria-label={`Copiar email: ${email}`} aria-describedby="card-email-feedback">
    {status === 'copied' ? <CheckIcon size={21} aria-hidden="true" /> : <CopySimpleIcon size={21} aria-hidden="true" />}
    <span className="card-email-content">
      <span ref={emailText} className="card-email-address">{email}</span>
      <span id="card-email-feedback" className="card-email-feedback" role="status">
        {status === 'copied' ? 'Email copiado' : status === 'error' ? 'No se pudo copiar. Selecciona el email para copiarlo.' : 'Pulsa para copiar'}
      </span>
    </span>
  </button>;
}
