import type { CourseSlug } from './types';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/**
 * Navigazione principale (navbar + footer).
 * La voce "Sport" è un dropdown; le voci con `children` generano il menu.
 */
export const mainNavigation: NavItem[] = [
  {
    label: 'Sport',
    href: '/sport/',
    children: [
      { label: 'Judo', href: '/sport/judo/' },
      { label: 'Karate', href: '/sport/karate/' },
      { label: 'Difesa Personale', href: '/sport/difesa-personale/' },
      { label: 'Psicomotricità', href: '/sport/psicomotricita/' },
    ],
  },
  { label: 'Sedi', href: '/sedi/' },
  { label: 'Chi siamo', href: '/chi-siamo/' },
  { label: 'Galleria', href: '/galleria/' },
  { label: 'Contatti', href: '/contatti/' },
];

/** Percorsi per il breadcrumb delle pagine sport. */
export const sportBreadcrumbRoot = {
  label: 'Sport',
  href: '/sport/',
};

/** Mappa slug corso → label per la navigazione. */
export const courseNavLabels: Record<CourseSlug, string> = {
  judo: 'Judo',
  karate: 'Karate',
  'difesa-personale': 'Difesa Personale',
  psicomotricita: 'Psicomotricità',
};
