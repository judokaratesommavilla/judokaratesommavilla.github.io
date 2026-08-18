import type { ContactReferent } from './types';

/**
 * Contatti centralizzati.
 * I numeri sono in formato E.164 (per i link tel: e WhatsApp).
 */
export const contacts = {
  email: 'info@asdsommavilla.it',
  /** Numero WhatsApp della società (dalla comunicazione ufficiale precedente). */
  whatsappNumber: '+393490066875',
  whatsappDisplay: '+349 006 6875',
  /** Formulazione da usare quando non esiste un orario di segreteria ufficiale. */
  presenceNote:
    'Siamo presenti in palestra durante gli orari dei corsi: trovi sempre un tecnico o un referente con cui parlare.',
  referents: [
    {
      name: 'Renzo Faccioli',
      role: 'Segreteria',
      courses: ['judo', 'karate', 'difesa-personale', 'psicomotricita'],
      phone: '+393490066875',
      phoneDisplay: '349 006 6875',
    },
    {
      name: 'Giorgio Malesani',
      role: 'Insegnante tecnico',
      courses: ['karate'],
      phone: '+393402592713',
      phoneDisplay: '340 259 2713',
    },
    {
      name: 'Doriano Cordioli',
      role: 'Insegnante tecnico',
      courses: ['judo'],
      phone: '+393491220173',
      phoneDisplay: '349 122 0173',
    },
    {
      name: 'Paolo Menini',
      role: 'Insegnante tecnico',
      courses: ['psicomotricita', 'judo'],
      phone: '+393495544506',
      phoneDisplay: '349 554 4506',
    },
    {
      name: 'Dario Vuerich',
      role: 'Insegnante tecnico',
      courses: ['difesa-personale', 'judo'],
      phone: '+393402480508',
      phoneDisplay: '340 248 0508',
    },
  ] satisfies ContactReferent[],
} as const;

export type ContactReferentInfo = (typeof contacts.referents)[number];
