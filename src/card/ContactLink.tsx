import type { ReactNode } from 'react';

export function ContactLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return <a className="card-contact-link" href={href}>{icon}<span>{children}</span></a>;
}
