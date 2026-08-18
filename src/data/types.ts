export type LocationSlug = 'sommacampagna' | 'villafranca-di-verona';

export type CourseSlug = 'judo' | 'karate' | 'difesa-personale' | 'psicomotricita';

export interface ScheduleEntry {
  /** Sede in cui si svolge l'allenamento. */
  location: LocationSlug;
  /** Gruppo / fascia d'età. Es: "Bambini" */
  group: string;
  /** Giorni della settimana. Es: "Lunedì e Giovedì" */
  days: string;
  /** Fascia oraria. Es: "17:00–18:00" */
  time: string;
}

export interface StartDate {
  location: LocationSlug;
  /** Label del corso/gruppo. Es: "Bambini e Adolescenti" */
  label: string;
  /** Data ISO (yyyy-mm-dd). */
  date: string;
}

export interface Benefit {
  title: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CourseSeo {
  title: string;
  description: string;
  /** H1 unico della pagina. */
  h1: string;
}

export interface Course {
  slug: CourseSlug;
  /** Nome breve usato nei menu e nelle card. */
  name: string;
  /** Numero ordinale per le card (01, 02, …). */
  number: string;
  /** Categoria, es. "Percorso sportivo". */
  category: string;
  eyebrow: string;
  /** Sottotitolo hero. */
  tagline: string;
  /** Descrizione breve per card e meta. */
  description: string;
  /** Introduzione principale della pagina sport. */
  intro: string;
  whatYouLearn: string[];
  benefits: Benefit[];
  targets: string[];
  schedule: ScheduleEntry[];
  startDates: StartDate[];
  locations: LocationSlug[];
  instructorSlugs: string[];
  /** Chiave immagine (vedi src/utils/images.ts). */
  image: string;
  imageAlt: string;
  ctaLabel: string;
  /** Quota indicativa, es. "80 € · 10 lezioni". Dato configurabile. */
  fee?: string;
  faqs: Faq[];
  seo: CourseSeo;
}

export interface Location {
  slug: LocationSlug;
  name: string;
  /** Nome breve per label compatte. */
  shortName: string;
  facility: string;
  address: string;
  zip: string;
  city: string;
  province: string;
  /** Chiave immagine. */
  image: string;
  imageAlt: string;
  /** Rapporto d'aspetto dell'immagine della sede (es. "16 / 10", "1 / 1"). */
  imageAspectRatio: string;
  /** Query testuale per link Google Maps. */
  mapsQuery: string;
  courseSlugs: CourseSlug[];
}

export interface Instructor {
  slug: string;
  name: string;
  role: string;
  grade?: string[];
  courses: CourseSlug[];
  /** Chiave immagine; se assente viene usato il placeholder. */
  image?: string;
  /** Bio breve futura. */
  bio?: string;
}

export interface ContactReferent {
  name: string;
  /** Es. "Judo", "Segreteria". */
  role: string;
  courses: CourseSlug[];
  /** Numero in formato E.164, es. "+393491220173". */
  phone: string;
  /** Numero per la visualizzazione, es. "349 122 0173". */
  phoneDisplay: string;
}

export interface Socials {
  facebook: string;
  instagram: string;
}
