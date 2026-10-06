import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = [...document.querySelectorAll<HTMLElement>('.section-heading, .project-main, .project-story, .method, .experience-grid > div, .tech-intro, .tech-list > div, .contact-inner > div')];
    let observer: IntersectionObserver | undefined;
    const reset = () => {
      observer?.disconnect();
      elements.forEach(element => element.classList.remove('reveal-pending'));
      if (motion.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
      elements.forEach(element => {
        element.classList.add('reveal');
        // Content already on screen is never hidden on load or when navigating to an anchor.
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add('reveal-pending');
          observer?.observe(element);
        }
      });
    };
    const revealFocused = (event: FocusEvent) => {
      const target = event.target instanceof Element ? event.target.closest('.reveal-pending') : null;
      if (target) { target.classList.remove('reveal-pending'); observer?.unobserve(target); }
    };
    reset();
    motion.addEventListener('change', reset);
    document.addEventListener('focusin', revealFocused);
    return () => {
      observer?.disconnect();
      elements.forEach(element => element.classList.remove('reveal', 'reveal-pending'));
      motion.removeEventListener('change', reset);
      document.removeEventListener('focusin', revealFocused);
    };
  }, []);
}
