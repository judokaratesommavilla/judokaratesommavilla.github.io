const MONTHS_IT = [
  'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
  'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre',
];

const MONTHS_SHORT_IT = [
  'gen', 'feb', 'mar', 'apr', 'mag', 'giu',
  'lug', 'ago', 'set', 'ott', 'nov', 'dic',
];

function parseIso(iso: string): Date {
  // Interpreta come data locale (senza spostamenti di fuso).
  return new Date(`${iso}T00:00:00`);
}

/** "2026-10-13" → "13 ottobre 2026" */
export function formatDateLong(iso: string): string {
  const d = parseIso(iso);
  return `${d.getDate()} ${MONTHS_IT[d.getMonth()]} ${d.getFullYear()}`;
}

/** "2026-10-13" → "13 ottobre" */
export function formatDayMonth(iso: string): string {
  const d = parseIso(iso);
  return `${d.getDate()} ${MONTHS_IT[d.getMonth()]}`;
}

/** "2026-10-13" → "13 ott 2026" */
export function formatDateShort(iso: string): string {
  const d = parseIso(iso);
  return `${d.getDate()} ${MONTHS_SHORT_IT[d.getMonth()]} ${d.getFullYear()}`;
}

/** "2026-10-13" → "13/10/2026" */
export function formatDateISO(iso: string): string {
  const d = parseIso(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}
