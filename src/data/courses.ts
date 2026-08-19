import type { Course } from './types';

/**
 * Catalogo corsi — fonte unica di verità per tutte le pagine sport.
 * Quando cambia un orario o un'informazione, modifica qui.
 */
export const courses: Course[] = [
  {
    slug: 'judo',
    name: 'Judo',
    number: '01',
    category: 'Corso sportivo',
    eyebrow: 'Lo sport principale della società',
    tagline: 'Disciplina, tecnica e crescita sul tatami.',
    description:
      'Il judo è la via dell’adattabilità: è sia uno sport da combattimento che un percorso di crescita, dentro e fuori dal tatami, per bambini, adolescenti, ragazzi e adulti.',
    intro:
      'Il judo è un’arte marziale olimpica che insegna a cadere, a controllare il proprio corpo e a rispettare gli altri. Dai primi passi sul tatami fino alla pratica agonistica, ogni allenamento costruisce tecnica, disciplina e fiducia, un passo alla volta.',
    whatYouLearn: [
      'Cadute e capovolte sicure (ukemi)',
      'Proiezioni di base e avanzate (nage waza)',
      'Controllo a terra (katame waza)',
      'Regole, etichetta e preparazione fisica',
    ],
    benefits: [
      {
        title: 'Rispetto',
        text: 'Sul tatami si saluta, si ascolta e si rispetta il compagno di allenamento: valori che accompagnano anche fuori dalla palestra.',
      },
      {
        title: 'Sicurezza',
        text: 'Imparare a cadere in modo sicuro protegge il corpo anche nella vita di tutti i giorni.',
      },
      {
        title: 'Allenamento completo',
        text: 'Forza, equilibrio, flessibilità e resistenza: un allenamento che coinvolge tutto il corpo.',
      },
      {
        title: 'Crescita personale',
        text: 'Autostima, autocontrollo e fiducia in sé: crescere dentro e fuori dal tatami.',
      },
    ],
    targets: ['Bambini', 'Adolescenti', 'Ragazzi', 'Adulti'],
    schedule: [
      {
        location: 'sommacampagna',
        group: 'Bambini (6 - 9 anni)',
        days: 'Lunedì e Giovedì',
        time: '17:00–18:00',
      },
      {
        location: 'sommacampagna',
        group: 'Adolescenti (10 - 13 anni)',
        days: 'Lunedì e Giovedì',
        time: '18:00–19:00',
      },
      {
        location: 'sommacampagna',
        group: 'Ragazzi (14 - 17 anni)',
        days: 'Lunedì e Giovedì',
        time: '19:00–20:10',
      },
      {
        location: 'sommacampagna',
        group: 'Adulti (dai 18 anni)',
        days: 'Lunedì e Giovedì',
        time: '20:10–21:30',
      },
      {
        location: 'villafranca-di-verona',
        group: 'Bambini (6 - 9 anni)',
        days: 'Martedì e Venerdì',
        time: '17:00–18:00',
      },
      {
        location: 'villafranca-di-verona',
        group: 'Adolescenti e Ragazzi (dai 10 anni)',
        days: 'Martedì e Venerdì',
        time: '18:00–19:00',
      },
    ],
    startDates: [
      {
        location: 'sommacampagna',
        label: 'Bambini e Adolescenti (6 - 13 anni)',
        date: '2026-09-14',
      },
      {
        location: 'sommacampagna',
        label: 'Ragazzi e Adulti (dai 14 anni)',
        date: '2026-09-03',
      },
      {
        location: 'villafranca-di-verona',
        label: 'Bambini, Adolescenti e Ragazzi (dai 6 anni)',
        date: '2026-09-15',
      },
    ],
    locations: ['sommacampagna', 'villafranca-di-verona'],
    instructorSlugs: [
      'doriano-cordioli',
      'giancarlo-zocca',
      'dario-vuerich',
      'paolo-menini',
      'ales-spazian',
      'luca-bonizzoni',
      'mirco-de-marchi',
      'enrico-felizzi',
    ],
    image: 'courses/judo-card',
    imageAlt: 'Judoka durante un allenamento di judo a Villafranca di Verona e Sommacampagna',
    ctaLabel: 'Trova il tuo corso di judo',
    faqs: [
      {
        question: 'A che età si può iniziare il Judo?',
        answer:
          'I corsi di judo partono dai bambini in età scolare. Per i più piccoli (4–5 anni) è disponibile a Sommacampagna il percorso di psicomotricità, pensato per preparare al meglio l’ingresso sul tatami.',
      },
      {
        question: 'Dove si svolgono i corsi di Judo?',
        answer:
          'A Villafranca di Verona (Palazzetto dello Sport, Via della Speranza) e a Sommacampagna (Scuola Secondaria Dante Alighieri, Via Campagnol 18).',
      },
      {
        question: 'Quali sono gli orari dei corsi di Judo?',
        answer:
          'A Sommacampagna il lunedì e il giovedì, dalle 17:00 alle 21:30 in base al gruppo. A Villafranca il martedì e il venerdì, dalle 17:00 alle 19:00. Consulta la sezione orari di questa pagina.',
      },
      {
        question: 'Posso fare una lezione di prova?',
        answer:
          'Certo. Contattaci e organizzeremo la tua prima lezione: potrai conoscere la palestra, i tecnici e il gruppo. Per la Difesa Personale è prevista una prima lezione di prova.',
      },
      {
        question: 'Cosa serve per iniziare?',
        answer:
          'Per iniziare basta abbigliamento comodo e una borraccia. Il judogi (kimono) si può valutare insieme ai tecnici dopo le prime lezioni. Per indicazioni pratiche aggiornate, contattaci.',
      },
    ],
    seo: {
      title: 'Judo a Villafranca di Verona e Sommacampagna | ASD Judo Karate Sommavilla',
      description:
        'Corsi di Judo per bambini, adolescenti, ragazzi e adulti a Villafranca di Verona e Sommacampagna. Impara disciplina e tecnica con tecnici qualificati FIJLKAM.',
      h1: 'Judo a Villafranca di Verona e Sommacampagna',
    },
  },
  {
    slug: 'karate',
    name: 'Karate',
    number: '02',
    category: 'Corso sportivo',
    eyebrow: 'Il secondo pilastro della società',
    tagline: 'Tecnica, coordinazione e controllo.',
    description:
      'Il karate insegna a controllare il movimento, il corpo e la situazione. Un percorso che sviluppa tecnica, coordinazione e disciplina, adatto a bambini, ragazzi e adulti.',
    intro:
      'Il karate è molto più di tecniche e combattimento: è controllo, concentrazione e rispetto. A Sommacampagna proponiamo un percorso diviso per fasce d’età, dove bambini e ragazzi imparano a dosare la forza e a crescere con disciplina, un allenamento alla volta.',
    whatYouLearn: [
      'Posizioni e tecniche di base',
      'Kata e forme',
      'Coordinazione e controllo del corpo',
      'Concentrazione e autocontrollo',
    ],
    benefits: [
      {
        title: 'Coordinazione',
        text: 'Il karate sviluppa equilibrio, ritmo e controllo del movimento in ogni età.',
      },
      {
        title: 'Controllo',
        text: 'Imparare a dosare la forza e a gestire le proprie reazioni è il cuore della pratica.',
      },
      {
        title: 'Crescita personale',
        text: 'Autostima, rispetto e costanza: valori che si costruiscono allenamento dopo allenamento.',
      },
      {
        title: 'Forma fisica',
        text: 'Un allenamento completo per tonificare, migliorare la postura e la resistenza.',
      },
    ],
    targets: ['Bambini e adolescenti', 'Ragazzi e adulti'],
    schedule: [
      {
        location: 'sommacampagna',
        group: 'Bambini e adolescenti (fino a 13 anni)',
        days: 'Martedì e Venerdì',
        time: '18:30–19:30',
      },
      {
        location: 'sommacampagna',
        group: 'Ragazzi e adulti (dai 14 anni)',
        days: 'Martedì e Venerdì',
        time: '19:30–21:00',
      },
    ],
    startDates: [
      {
        location: 'sommacampagna',
        label: 'Bambini, adolescenti, ragazzi e adulti',
        date: '2026-09-18',
      }
    ],
    locations: ['sommacampagna'],
    instructorSlugs: ['giorgio-malesani'],
    image: 'courses/karate-card',
    imageAlt: 'Karateka durante un allenamento di karate a Sommacampagna',
    ctaLabel: 'Scopri il karate',
    faqs: [
      {
        question: 'A che età si può iniziare il Karate?',
        answer:
          'I corsi di karate a Sommacampagna sono organizzati in due gruppi: bambini e adolescenti, e ragazzi e adulti.',
      },
      {
        question: 'Dove si svolge il corso di Karate?',
        answer:
          'Presso la Scuola Secondaria Dante Alighieri, Via Campagnol 18, a Sommacampagna.',
      },
      {
        question: 'Quali sono gli orari del Karate?',
        answer:
          'Il martedì e il venerdì: bambini e adolescenti dalle 18:30 alle 19:30, ragazzi e adulti dalle 19:30 alle 21:00.',
      },
      {
        question: 'Posso fare una lezione di prova?',
        answer:
          'Certo. Contattaci e organizzeremo la tua prima lezione di karate: potrai conoscere il tecnico e il gruppo.',
      },
      {
        question: 'Cosa serve per iniziare il Karate?',
        answer:
          'Per iniziare basta abbigliamento comodo e una borraccia. Il karategi (kimono) si può valutare insieme al tecnico dopo le prime lezioni.',
      },
    ],
    seo: {
      title: 'Karate a Sommacampagna | ASD Judo Karate Sommavilla – Villafranca di Verona',
      description:
        'Corsi di Karate per bambini, giovani, ragazzi e adulti a Sommacampagna. Tecnica, coordinazione e controllo con ASD Judo Karate Sommavilla, attiva a Villafranca di Verona e Sommacampagna.',
      h1: 'Karate a Sommacampagna',
    },
  },
  {
    slug: 'difesa-personale',
    name: 'Difesa Personale',
    number: '03',
    category: 'Corso per tutti',
    eyebrow: 'La sicurezza inizia da te',
    tagline: 'Reagisci · Difenditi · Controlla · Liberati',
    description:
      'Tecniche di difesa realistiche per gestire lo stress e l’emergenza. Un percorso maschile e femminile che aumenta sicurezza e autostima.',
    intro:
      'La sicurezza inizia da te. Il nostro percorso di Difesa Personale insegna a gestire lo stress e l’emergenza con tecniche realistiche, adatte a tutti: nessuna preparazione fisica richiesta. Impari a riconoscere le situazioni di rischio, a controllare la distanza e a liberarti dalle prese, con calma e lucidità.',
    whatYouLearn: [
      'Tecniche di difesa realistiche adatte a tutti',
      'Gestione dello stress in situazioni di emergenza',
      'Gestione della distanza e del contatto',
      'Come liberarsi da prese e aggressioni comuni',
    ],
    benefits: [
      {
        title: 'Sicurezza',
        text: 'Impara a riconoscere le situazioni di rischio e a reagire in modo efficace.',
      },
      {
        title: 'Autostima',
        text: 'Sapere di potersi difendere cambia il modo di muoversi nel mondo.',
      },
      {
        title: 'Gestione dello stress',
        text: 'Respirazione, calma e lucidità anche sotto pressione.',
      },
      {
        title: 'Adatto a tutti',
        text: 'Nessuna preparazione richiesta: le tecniche si adattano a corpo, età e livello.',
      },
    ],
    targets: ['Maschile e femminile'],
    schedule: [
      {
        location: 'villafranca-di-verona',
        group: 'Maschile e femminile (dai 14 anni)',
        days: 'Martedì',
        time: '19:00–20:00',
      },
    ],
    startDates: [
      {
        location: 'villafranca-di-verona',
        label: 'Difesa Personale (dai 14 anni)',
        date: '2026-10-13',
      },
    ],
    locations: ['villafranca-di-verona'],
    instructorSlugs: ['dario-vuerich', 'ales-spazian', 'luca-bonizzoni', 'enrico-felizzi'],
    image: 'courses/self-defense-card',
    imageAlt: 'Corso di difesa personale maschile e femminile a Villafranca di Verona',
    ctaLabel: 'Prova la difesa personale',
    faqs: [
      {
        question: 'A chi è rivolto il corso di Difesa Personale?',
        answer:
          'Il corso è aperto a tutti, maschile e femminile, senza preparazione fisica richiesta.',
      },
      {
        question: 'Dove si svolge il corso?',
        answer:
          'Al Palazzetto dello Sport di Villafranca di Verona, in Via della Speranza.',
      },
      {
        question: 'Quando inizia e in quali orari?',
        answer:
          'Il percorso inizia martedì 13 ottobre 2026 e si svolge ogni martedì dalle 19:00 alle 20:00.',
      },
      {
        question: 'Serve essere in forma?',
        answer:
          'No: le tecniche sono realistiche e vengono adattate al livello di ciascuno.',
      },
      {
        question: 'È prevista una lezione di prova?',
        answer:
          'Sì, è possibile partecipare a una prima lezione di prova. Contattaci per organizzarla.',
      },
    ],
    seo: {
      title: 'Difesa Personale a Villafranca di Verona | ASD Judo Karate Sommavilla',
      description:
        'Corso di Difesa Personale maschile e femminile a Villafranca di Verona. Tecniche realistiche, gestione dello stress e dell’emergenza. Prima lezione di prova disponibile.',
      h1: 'Difesa Personale a Villafranca di Verona',
    },
  },
  {
    slug: 'psicomotricita',
    name: 'Psicomotricità',
    number: '04',
    category: 'Corso per i più piccoli',
    eyebrow: 'I primi passi sul tatami',
    tagline: 'Coordinazione e relazione attraverso il gioco.',
    description:
      'Un percorso pensato per bambine e bambini di 4 e 5 anni: coordinazione, movimento e relazione attraverso il gioco.',
    intro:
      'La psicomotricità è il modo migliore per avvicinare i più piccoli al movimento. Attraverso il gioco, bambine e bambini di 4 e 5 anni sviluppano coordinazione, equilibrio e relazione con gli altri, preparandosi con serenità al mondo del tatami.',
    whatYouLearn: [
      'Coordinazione motoria di base',
      'Relazione con gli altri attraverso il gioco',
      'Primi schemi di movimento e caduta',
      'Autonomia e fiducia in sé',
    ],
    benefits: [
      {
        title: 'Gioco e movimento',
        text: 'Ogni attività è un gioco: si impara muovendosi, senza accorgersene.',
      },
      {
        title: 'Coordinazione',
        text: 'Esercizi pensati per sviluppare equilibrio, orientamento e controllo del corpo.',
      },
      {
        title: 'Relazione',
        text: 'I bambini imparano a stare insieme, condividere e collaborare.',
      },
      {
        title: 'Preparazione al tatami',
        text: 'Un primo approccio sereno e divertente al mondo delle arti marziali.',
      },
    ],
    targets: ['Bambine e bambini di 4 e 5 anni'],
    schedule: [
      {
        location: 'sommacampagna',
        group: 'Bambine e bambini (4 – 5 anni)',
        days: 'Giovedì',
        time: '16:15–16:55',
      },
    ],
    startDates: [
      {
        location: 'sommacampagna',
        label: 'Psicomotricità (4 – 5 anni)',
        date: '2026-10-08',
      },
    ],
    locations: ['sommacampagna'],
    instructorSlugs: ['doriano-cordioli', 'paolo-menini', 'psicomotricista'],
    image: 'courses/psicomotricita-card',
    imageAlt: 'Percorso di psicomotricità per bambini di 4 e 5 anni a Sommacampagna',
    ctaLabel: 'Scopri il percorso per i più piccoli',
    faqs: [
      {
        question: 'Per quale età è pensato il percorso?',
        answer:
          'Il percorso di psicomotricità è pensato per bambine e bambini di 4 e 5 anni.',
      },
      {
        question: 'Dove si svolge?',
        answer:
          'Presso la Scuola Secondaria Dante Alighieri, Via Campagnol 18, a Sommacampagna.',
      },
      {
        question: 'Quando si svolge?',
        answer:
          'Ogni giovedì, dalle 16:15 alle 16:55. Il percorso inizia giovedì 8 ottobre 2026.',
      },
      {
        question: 'Qual è la quota di partecipazione?',
        answer:
          'La quota indicata è di 80 € per 10 lezioni. Contattaci per confermare il dettaglio aggiornato.',
      },
      {
        question: 'Chi conduce il percorso?',
        answer:
          'I tecnici della società, affiancati da un/una psicomotricista definito/a ogni anno.',
      },
    ],
    seo: {
      title: 'Psicomotricità a Sommacampagna per bambini 4-5 anni | ASD Judo Karate Sommavilla',
      description:
        'Percorso di psicomotricità per bambine e bambini di 4-5 anni a Sommacampagna: coordinazione e relazione attraverso il gioco, dall’8 ottobre 2026.',
      h1: 'Psicomotricità a Sommacampagna',
    },
  },
];

export const courseMap = Object.fromEntries(
  courses.map((course) => [course.slug, course]),
) as Record<Course['slug'], Course>;
