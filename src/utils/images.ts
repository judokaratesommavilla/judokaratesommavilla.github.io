import type { ImageMetadata } from 'astro';

/**
 * Risolve le immagini ottimizzate con astro:assets.
 *
 * Le fotografie sorgente vivono in `src/assets/images/` e vengono elaborate
 * a build time (WebP/AVIF, srcset, width/height). Le chiavi usate nei dati
 * (`courses/judo-hero`, `instructors/doriano-cordioli`, …) corrispondono ai
 * nomi dei file senza estensione.
 *
 * Per sostituire una foto basta rimpiazzare il file: stessa chiave, stessa resa.
 */
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpeg,jpg,png,webp,avif}',
  { eager: true },
);

export type { ImageMetadata };

export function getImageMetadata(key: string): ImageMetadata | undefined {
  const normalized = key.replace(/^\/+/, '').replace(/\.[a-z0-9]+$/i, '');
  const match = Object.entries(images).find(([path]) => {
    const base = path.replace('/src/assets/images/', '').replace(/\.[a-z0-9]+$/i, '');
    return base === normalized;
  });
  return match ? match[1].default : undefined;
}

/** Percorso del placeholder SVG per i tecnici senza foto disponibile. */
export const INSTRUCTOR_PLACEHOLDER = '/images/placeholders/instructor.svg';
