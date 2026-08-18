/**
 * Dati generali della società.
 * Modifica qui e le informazioni si aggiornano in tutto il sito.
 */
export const site = {
  name: 'ASD Judo Karate Sommavilla',
  shortName: 'Judo Karate Sommavilla',
  legalName: 'ASD Judo Karate Sommavilla',
  url: 'https://asdsommavilla.it',
  email: 'info@asdsommavilla.it',
  lang: 'it',
  locale: 'it-IT',
  description:
    'ASD Judo Karate Sommavilla: corsi di Judo, Karate, Difesa Personale e Psicomotricità a Villafranca di Verona e Sommacampagna. Percorsi di crescita dentro e fuori dal tatami.',
  /** Indirizzo della sede legale indicata nel modulo societario. */
  legalAddress: 'Via Aldo Moro 3/7, 37066 Sommacampagna VR',
  /** Codice fiscale indicato nel modulo societario. */
  fiscalCode: '93042000',
  /** TODO da configurare: anno di fondazione, se disponibile. */
  foundedYear: undefined as number | undefined,
  /** Testo breve mostrato nel footer. */
  footerDescription:
    'Associazione Sportiva Dilettantistica di Judo e Karate. Percorsi di crescita, disciplina e movimento a Villafranca di Verona e Sommacampagna.',
} as const;

/** Coppie chiave/valore usate per i link rapidi del footer. */
export const siteLinks = {
  home: '/',
  sport: '/sport/',
  sedi: '/sedi/',
  chiSiamo: '/chi-siamo/',
  contatti: '/contatti/',
  privacy: '/privacy-policy/',
  cookie: '/cookie-policy/',
  galleria: '/galleria/',
} as const;
