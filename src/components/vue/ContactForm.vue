<script setup lang="ts">
import { reactive, ref } from 'vue';

interface Props {
  defaultCourse?: string;
  defaultLocation?: string;
}

const props = defineProps<Props>();

const COURSES = [
  { value: '', label: 'Non so ancora' },
  { value: 'judo', label: 'Judo' },
  { value: 'karate', label: 'Karate' },
  { value: 'difesa-personale', label: 'Difesa Personale' },
  { value: 'psicomotricita', label: 'Psicomotricità' },
];

const LOCATIONS = [
  { value: '', label: 'Non so ancora' },
  { value: 'sommacampagna', label: 'Sommacampagna' },
  { value: 'villafranca-di-verona', label: 'Villafranca di Verona' },
];

const form = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  course: props.defaultCourse ?? '',
  location: props.defaultLocation ?? '',
  message: '',
  consent: false,
  company: '', // honeypot anti-spam
});

const errors = reactive<Record<string, string>>({});
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
const submitError = ref('');

function fieldError(field: string): string | undefined {
  return errors[field];
}

function validate(): boolean {
  Object.keys(errors).forEach((key) => delete errors[key]);
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.name.trim()) errors.name = 'Inserisci il nome.';
  if (!form.surname.trim()) errors.surname = 'Inserisci il cognome.';
  if (!form.email.trim()) errors.email = 'Inserisci la tua email.';
  else if (!emailRe.test(form.email.trim())) errors.email = 'Inserisci un indirizzo email valido.';
  if (form.phone.trim() && !/^[+\d][\d\s.\-()]{5,}$/.test(form.phone.trim())) {
    errors.phone = 'Inserisci un numero di telefono valido.';
  }
  if (!form.consent) {
    errors.consent = 'Per inviare la richiesta è necessario accettare la privacy policy.';
  }
  return Object.keys(errors).length === 0;
}

async function onSubmit() {
  // Impedisce invii multipli.
  if (status.value === 'loading') return;
  // Honeypot: se compilato, il campo è stato riempito da un bot.
  if (form.company) return;
  if (!validate()) return;

  status.value = 'loading';
  submitError.value = '';

  const courseLabel = form.course ? COURSES.find((c) => c.value === form.course)?.label : 'Non so ancora';
  const locationLabel = form.location
    ? LOCATIONS.find((l) => l.value === form.location)?.label
    : 'Non so ancora';

  const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined;

  try {
    if (endpoint) {
      // Forminit ("Form Blocks") accetta solo campi nominati `fi-{blockType}-{name}`
      // (es. `fi-sender-email`) via multipart/form-data, oppure un body JSON nella
      // forma `{ blocks: [...] }`. Un oggetto JSON piatto con chiavi arbitrarie viene
      // rifiutato con `400 Bad Request`. Qui usiamo FormData: il Content-Type
      // multipart (con boundary) viene impostato automaticamente dal browser.
      const data = new FormData();
      data.append('fi-sender-firstName', form.name.trim());
      data.append('fi-sender-lastName', form.surname.trim());
      data.append('fi-sender-email', form.email.trim());
      // Telefono come blocco `text` (fi-text-phone) e non `sender.phone`: Forminit
      // valida sender.phone in formato E.164 e rifiuterebbe numeri italiani non
      // normalizzati (es. "345 123 4567" senza prefisso internazionale).
      if (form.phone.trim()) data.append('fi-text-phone', form.phone.trim());
      // Corso e sede come blocchi `text` (fi-text-corso / fi-text-sede): il form
      // Forminit ha già un blocco `location` di tipo multi nella dashboard, quindi
      // un `fi-select-location` con valore singolo viene rifiutato con 400.
      // Allinea questi nomi con i blocchi di "Form Settings → Blocks" (app.forminit.com).
      data.append('fi-text-corso', courseLabel);
      data.append('fi-text-sede', locationLabel);
      data.append('fi-text-message', form.message.trim());

      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
      });
      if (!response.ok) {
        // Il body di Forminit contiene il codice di errore (es. FI_SCHEMA_FORMAT_*):
        // lo logghiamo per il debug senza mostrarlo all'utente.
        const detail = await response.text().catch(() => '');
        console.error('[ContactForm] Invio fallito', response.status, detail || response.statusText);
        throw new Error(`HTTP ${response.status}`);
      }
    } else {
      // Sviluppo: nessun endpoint configurato → invio simulato.
      if (import.meta.env.DEV) {
        console.info('[ContactForm] PUBLIC_FORM_ENDPOINT non configurato, invio simulato.', {
          name: form.name.trim(),
          surname: form.surname.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          course: courseLabel,
          location: locationLabel,
          message: form.message.trim(),
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 650));
    }
    status.value = 'success';
  } catch (error) {
    status.value = 'error';
    submitError.value =
      'Non siamo riusciti a inviare il messaggio. Riprova tra poco o scrivici direttamente su WhatsApp o per telefono.';
  }
}
</script>
<template>
  <div class="contact-form">
    <!-- Stato di successo -->
    <div v-if="status === 'success'" class="contact-form__success py-6 text-center" role="status" aria-live="polite">
      <span class="contact-form__success-mark mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red text-[1.4rem] text-white" aria-hidden="true">✓</span>
      <h3>Grazie!</h3>
      <p class="m-0 text-text-muted">Abbiamo ricevuto la tua richiesta. Ti ricontatteremo appena possibile.</p>
    </div>

    <form v-else @submit.prevent="onSubmit" novalidate>
      <!-- Honeypot: campo nascosto agli utenti, visibile ai bot -->
      <div class="contact-form__honeypot absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label for="company">Lascia vuoto questo campo</label>
        <input id="company" v-model="form.company" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div v-if="status === 'error'" class="contact-form__error mb-4 rounded-sm border border-red-line bg-red-soft p-3 font-semibold text-red-dark" role="alert">
        {{ submitError }}
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label for="cf-name">Nome</label>
          <input
            id="cf-name"
            v-model="form.name"
            type="text"
            autocomplete="given-name"
            :aria-invalid="fieldError('name') ? 'true' : undefined"
            :aria-describedby="fieldError('name') ? 'cf-name-error' : undefined"
            required
          />
          <span v-if="fieldError('name')" id="cf-name-error" class="field-error">{{ fieldError('name') }}</span>
        </div>

        <div class="form-field">
          <label for="cf-surname">Cognome</label>
          <input
            id="cf-surname"
            v-model="form.surname"
            type="text"
            autocomplete="family-name"
            :aria-invalid="fieldError('surname') ? 'true' : undefined"
            :aria-describedby="fieldError('surname') ? 'cf-surname-error' : undefined"
            required
          />
          <span v-if="fieldError('surname')" id="cf-surname-error" class="field-error">{{ fieldError('surname') }}</span>
        </div>

        <div class="form-field">
          <label for="cf-email">Email</label>
          <input
            id="cf-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            :aria-invalid="fieldError('email') ? 'true' : undefined"
            :aria-describedby="fieldError('email') ? 'cf-email-error' : undefined"
            required
          />
          <span v-if="fieldError('email')" id="cf-email-error" class="field-error">{{ fieldError('email') }}</span>
        </div>

        <div class="form-field">
          <label for="cf-phone">Telefono</label>
          <input
            id="cf-phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            placeholder="Facoltativo"
            :aria-invalid="fieldError('phone') ? 'true' : undefined"
            :aria-describedby="fieldError('phone') ? 'cf-phone-error' : undefined"
          />
          <span v-if="fieldError('phone')" id="cf-phone-error" class="field-error">{{ fieldError('phone') }}</span>
        </div>


        <div class="form-field">
          <label for="cf-course">Corso di interesse</label>
          <select id="cf-course" v-model="form.course">
            <option v-for="option in COURSES" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="form-field">
          <label for="cf-location">Sede di interesse</label>
          <select id="cf-location" v-model="form.location">
            <option v-for="option in LOCATIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="form-field form-field--full">
          <label for="cf-message">Messaggio / domanda</label>
          <textarea
            id="cf-message"
            v-model="form.message"
            placeholder="Raccontaci per chi cerchi il corso o che informazioni ti servono…"
          ></textarea>
        </div>

        <div class="form-field form-field--full">
          <label class="form-check">
            <input
              v-model="form.consent"
              type="checkbox"
              :aria-invalid="fieldError('consent') ? 'true' : undefined"
              :aria-describedby="fieldError('consent') ? 'cf-consent-error' : undefined"
            />
            <span>
              Acconsento al trattamento dei miei dati personali per ricevere informazioni sui corsi
              (informativa nella
              <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>).
            </span>
          </label>
          <span v-if="fieldError('consent')" id="cf-consent-error" class="field-error">{{ fieldError('consent') }}</span>
        </div>
      </div>

      <div class="contact-form__actions mt-[1.25rem] flex flex-wrap gap-[0.75rem]">
        <button class="btn btn--lg w-full" type="submit" :disabled="status === 'loading'">
          <span v-if="status === 'loading'" class="contact-form__spinner h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true"></span>
          {{ status === 'loading' ? 'Invio in corso…' : 'Invia la richiesta' }}
        </button>
      </div>
    </form>
  </div>
</template>

