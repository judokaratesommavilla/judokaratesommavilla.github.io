<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

interface PhotoDetail {
  src: string;
  alt: string;
  caption: string;
}

const open = ref(false);
const dialogRef = ref<HTMLElement | null>(null);
const photo = ref<PhotoDetail>({ src: '', alt: '', caption: '' });

let lastFocused: HTMLElement | null = null;
let previousOverflow = '';

const OPEN_EVENT = 'sommavilla:open-image';

function openModal(detail?: PhotoDetail) {
  if (!detail?.src) return;
  photo.value = {
    src: detail.src,
    alt: detail.alt ?? '',
    caption: detail.caption ?? '',
  };
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
  <!-- Nessun Teleport: l'isola Vue è già renderizzata a fine <body>, quindi
       gli overlay `position: fixed` coprono comunque il viewport. Rimuovere il
       Teleport evita il mismatch di hydration "Symbol(v-cmt)" (con @astrojs/vue
       il contenuto teleportato non viene emesso nell'SSR). -->
  <Transition name="modal-img">
    <div
      v-if="open"
      class="fixed inset-0 z-[960] grid place-items-center overflow-hidden bg-[rgba(13,15,18,0.8)] p-[var(--gutter)] backdrop-blur-[4px]"
      @click="onOverlayClick"
    >
      <div
        ref="dialogRef"
        class="img-panel relative flex h-[calc(100dvh-2*var(--gutter))] w-full max-w-[1080px] flex-col overflow-hidden rounded bg-paper shadow-soft"
        role="dialog"
        aria-modal="true"
        :aria-label="photo.alt || 'Foto ingrandita'"
        tabindex="-1"
      >
        <button
          type="button"
          class="absolute top-[0.9rem] right-[0.9rem] z-[1] inline-flex h-[2.6rem] w-[2.6rem] cursor-pointer items-center justify-center rounded-full border border-line bg-paper text-text transition-colors duration-[280ms] ease-[var(--ease)] hover:border-ink hover:bg-ink hover:text-white"
          @click="closeModal"
          aria-label="Chiudi la foto"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-[1.15rem] w-[1.15rem]">
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <!-- Area immagine: flessibile (flex-1 + min-h-0) e centrata; l'immagine
             mantiene rigorosamente il suo aspect ratio (max-h-full/max-w-full +
             h-auto/w-auto) e si restringe per far spazio al testo. Il pannello
             ha altezza definita (h-[calc(100dvh-2*var(--gutter))]) così le
             percentuali di max-h-full si risolvono e la foto non viene tagliata. -->
        <div class="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          <img
            :src="photo.src"
            :alt="photo.alt"
            decoding="async"
            class="block h-auto max-h-full w-auto max-w-full object-contain"
          />
        </div>
        <figcaption
          v-if="photo.caption"
          class="shrink-0 border-t border-line px-[1.4rem] pt-3 pb-[1.1rem] text-[0.98rem] leading-[1.5] text-text-muted"
        >
          {{ photo.caption }}
        </figcaption>
      </div>
    </div>
  </Transition>
</template>
