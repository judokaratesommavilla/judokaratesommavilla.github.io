import { contacts } from '../data/contacts';

/** Costruisce il link WhatsApp (wa.me) da un numero E.164 e un messaggio. */
export function whatsappLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Link WhatsApp della società con messaggio precompilato. */
export function societyWhatsappLink(message: string): string {
  return whatsappLink(contacts.whatsappNumber, message);
}

/** Link tel: da numero E.164. */
export function telLink(phone: string): string {
  return `tel:${phone}`;
}

/** Link mailto con oggetto e corpo opzionali. */
export function mailtoLink(
  to: string,
  options: { subject?: string; body?: string } = {},
): string {
  const params = new URLSearchParams();
  if (options.subject) params.set('subject', options.subject);
  if (options.body) params.set('body', options.body);
  const qs = params.toString();
  return `mailto:${to}${qs ? `?${qs}` : ''}`;
}
