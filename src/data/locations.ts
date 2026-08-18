import type { Location } from './types';

/**
 * Le due sedi operative della società.
 * `mapsQuery` viene usato per generare i link Google Maps (mappa e indicazioni).
 */
export const locations: Location[] = [
  {
    slug: 'villafranca-di-verona',
    name: 'Villafranca di Verona',
    shortName: 'Villafranca',
    facility: 'Palazzetto dello Sport',
    address: 'Via della Speranza',
    zip: '37069',
    city: 'Villafranca di Verona',
    province: 'VR',
    image: 'locations/villafranca',
    imageAlt: 'Palazzetto dello Sport di Villafranca di Verona, sede della ASD Judo Karate Sommavilla',
    imageAspectRatio: '16 / 10',
    mapsQuery: 'Palazzetto dello Sport, Via della Speranza, Villafranca di Verona VR',
    courseSlugs: ['judo', 'difesa-personale'],
  },
  {
    slug: 'sommacampagna',
    name: 'Sommacampagna',
    shortName: 'Sommacampagna',
    facility: 'Scuola Secondaria Dante Alighieri',
    address: 'Via Campagnol, 18',
    zip: '37066',
    city: 'Sommacampagna',
    province: 'VR',
    image: 'locations/sommacampagna',
    imageAlt: 'Scuola Secondaria Dante Alighieri di Sommacampagna, sede della ASD Judo e Karate Sommavilla',
    imageAspectRatio: '16 / 10',
    mapsQuery: 'Scuola Secondaria Dante Alighieri, Via Campagnol 18, Sommacampagna VR',
    courseSlugs: ['judo', 'karate', 'psicomotricita'],
  },
];

export const locationMap = Object.fromEntries(
  locations.map((location) => [location.slug, location]),
) as Record<Location['slug'], Location>;

/** Link Google Maps "mappa" per una sede. */
export function mapsLink(location: Location): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapsQuery)}`;
}

/** Link Google Maps "come arrivare" (directions) per una sede. */
export function directionsLink(location: Location): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.mapsQuery)}`;
}
