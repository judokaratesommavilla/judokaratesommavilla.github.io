<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import ContactForm from './ContactForm.vue';
import { contacts } from '../../data/contacts';
import { mailtoLink, telLink, whatsappLink } from '../../utils/phone';

const open = ref(false);
const dialogRef = ref<HTMLElement | null>(null);
const defaultCourse = ref('');
const defaultLocation = ref('');
const formKey = ref(0);

let lastFocused: HTMLElement | null = null;
let previousOverflow = '';

const OPEN_EVENT = 'sommavilla:open-modal';

function openModal(detail?: { course?: string; location?: string }) {
  defaultCourse.value = detail?.course ?? '';
  defaultLocation.value = detail?.location ?? '';
  formKey.value += 1; // rimonta il form per ripulire gli stati precedenti
  open.value = true;
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  lastFocused = document.activeElement as HTMLElement | null;
  nextTick(() => dialogRef.value?.focus());
}

function closeModal() {
  if (!open.value) return;
  open.value = false;
  document.body.style.overflow = previousOverflow;
  lastFocused?.focus?.();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    closeModal();
    return;
  }
  if (event.key === 'Tab' && open.value) {
    // Focus trap
    const dialog = dialogRef.value;
    if (!dialog) return;
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

function onOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget) closeModal();
}

function onOpenEventListener(event: Event) {
  openModal((event as CustomEvent).detail);
}

onMounted(() => {
  window.addEventListener(OPEN_EVENT, onOpenEventListener);
  document.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener(OPEN_EVENT, onOpenEventListener);
  document.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = previousOverflow;
});
</script>
<template>
  <!-- Nessun Teleport: vedi PhotoModal.vue. -->
  <Transition name="modal">
    <div
      v-if="open"
      class="fixed inset-0 z-[950] grid place-items-center overflow-y-auto bg-[rgba(13,15,18,0.72)] p-[var(--gutter)] backdrop-blur-[4px]"
      @click="onOverlayClick"
    >
      <div
        ref="dialogRef"
        class="modal-panel relative max-h-[calc(100dvh-2*var(--gutter))] w-full max-w-[760px] overflow-hidden rounded bg-paper text-text shadow-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        tabindex="-1"
      >
        <button
          type="button"
          class="absolute top-[0.9rem] right-[0.9rem] inline-flex h-[2.4rem] w-[2.4rem] cursor-pointer items-center justify-center rounded-full border border-line bg-transparent text-text-muted transition-colors duration-[280ms] ease-[var(--ease)] hover:border-ink hover:bg-ink hover:text-white"
          @click="closeModal"
          aria-label="Chiudi la finestra"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-[1.1rem] w-[1.1rem]">
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <!-- Contenitore scrollabile: pannello con angoli arrotondati puliti -->
        <div
          class="scroll-thin max-h-[calc(100dvh-2*var(--gutter))] overflow-y-auto p-[clamp(1.5rem,4vw,2.5rem)] [padding-right:calc(clamp(1.5rem,4vw,2.5rem)+0.75rem)]"
        >
          <span
            class="inline-flex items-center gap-[0.6rem] font-display text-[0.85rem] font-semibold tracking-[0.2em] text-red uppercase before:block before:h-[0.6rem] before:w-[0.6rem] before:bg-red before:content-['']"
          >
            Informazioni e iscrizioni
          </span>
          <h2 id="contact-modal-title" class="mt-[0.6rem] text-[2.2rem]">
            Come possiamo aiutarti?
          </h2>
          <p class="mt-[0.6rem] mb-[1.4rem] text-base text-text-muted">
            Hai una domanda? Vuoi sapere quale corso è più adatto a te o a tuo figlio?
            Scrivici: ti rispondiamo noi.
          </p>

          <ContactForm
            :key="formKey"
            :default-course="defaultCourse"
            :default-location="defaultLocation"
          />

          <div class="mt-[1.6rem] border-t border-line pt-[1.2rem]">
            <span class="text-[0.85rem] font-bold tracking-[0.12em] text-text-muted uppercase">
              Preferisci parlare subito con noi?
            </span>
            <div class="mt-[0.6rem] flex flex-wrap gap-[1.1rem]">
              <a
                :href="whatsappLink(contacts.whatsappNumber, 'Ciao, vorrei avere informazioni sui vostri corsi.')"
                target="_blank"
                rel="noopener noreferrer"
                class="font-display text-[1.05rem] font-bold tracking-[0.05em] text-red uppercase no-underline transition-colors duration-[280ms] ease-[var(--ease)] hover:text-red-dark"
              >
                WhatsApp
              </a>
              <a
                :href="telLink(contacts.referents[3].phone)"
                class="font-display text-[1.05rem] font-bold tracking-[0.05em] text-red uppercase no-underline transition-colors duration-[280ms] ease-[var(--ease)] hover:text-red-dark"
              >
                Telefono
              </a>
              <a
                :href="mailtoLink(contacts.email)"
                class="font-display text-[1.05rem] font-bold tracking-[0.05em] text-red uppercase no-underline transition-colors duration-[280ms] ease-[var(--ease)] hover:text-red-dark"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>




