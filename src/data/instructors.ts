import type { Instructor } from './types';

/**
 * Tecnici della società.
 * I gradi Judo provengono dalla comunicazione ufficiale (FIJLKAM).
 */
export const instructors: Instructor[] = [
  {
    slug: 'doriano-cordioli',
    name: 'Doriano Cordioli',
    role: 'Maestro Judo',
    grade: ['7° DAN'],
    courses: ['judo', 'psicomotricita'],
    image: 'instructors/doriano-cordioli',
    bio: '',
  },
  {
    slug: 'giancarlo-zocca',
    name: 'Giancarlo Zocca',
    role: 'Maestro Judo',
    grade: ['6° DAN'],
    courses: ['judo'],
    image: 'instructors/giancarlo-zocca',
    bio: '',
  },
  {
    slug: 'dario-vuerich',
    name: 'Dario Vuerich',
    role: 'Istruttore Judo',
    grade: ['5° DAN JUDO', '1° DAN JU-JITSU'],
    courses: ['judo', 'difesa-personale'],
    image: 'instructors/dario-vuerich',
    bio: '',
  },
  {
    slug: 'paolo-menini',
    name: 'Paolo Menini',
    role: 'Allenatore Judo e Istruttore Brazilian Jiu Jitsu',
    grade: ['3° DAN JUDO'],
    courses: ['judo', 'psicomotricita'],
    image: 'instructors/paolo-menini',
    bio: '',
  },
  {
    slug: 'ales-spazian',
    name: 'Ales Spazian',
    role: 'Allenatore Judo e Istruttore Difesa Personale',
    grade: ['3° DAN JUDO', 'MGA 2° LIVELLO'],
    courses: ['judo', 'difesa-personale'],
    image: 'instructors/ales-spazian',
    bio: '',
  },
  {
    slug: 'luca-bonizzoni',
    name: 'Luca Bonizzoni',
    role: 'Allenatore Judo',
    grade: ['2° DAN'],
    courses: ['judo', 'difesa-personale'],
    image: 'instructors/luca-bonizzoni',
    bio: '',
  },
  {
    slug: 'mirco-de-marchi',
    name: 'Mirco De Marchi',
    role: 'Allenatore Judo',
    grade: ['2° DAN'],
    courses: ['judo'],
    image: 'instructors/mirco-de-marchi',
    bio: '',
  },
  {
    slug: 'enrico-felizzi',
    name: 'Enrico Felizzi',
    role: 'Allenatore Base Judo',
    grade: ['3° DAN'],
    courses: ['judo', 'difesa-personale'],
    image: 'instructors/enrico-felizzi',
    bio: '',
  },
  {
    slug: 'giorgio-malesani',
    name: 'Giorgio Malesani',
    role: 'Maestro Karate',
    grade: ['6° DAN'],
    courses: ['karate'],
    image: 'instructors/giorgio-malesani',
    bio: '',
  },
  {
    slug: 'psicomotricista',
    name: 'Psicomotricista',
    role: 'Psicomotricista',
    courses: ['psicomotricita'],
    image: 'instructors/placeholder',
    bio: 'Il percorso è seguito da un/una psicomotricista nominato/a ogni stagione.',
  },
];

export const instructorMap = Object.fromEntries(
  instructors.map((instructor) => [instructor.slug, instructor]),
) as Record<string, Instructor>;
