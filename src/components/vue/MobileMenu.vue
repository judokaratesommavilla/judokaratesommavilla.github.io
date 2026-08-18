<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { mainNavigation } from '../../data/navigation';
import { contacts } from '../../data/contacts';
import { mailtoLink, telLink, whatsappLink } from '../../utils/phone';

const open = ref(false);
const menuRef = ref<HTMLElement | null>(null);

function toggle() {
  if (open.value) close();
  else openMenu();
}

function openMenu() {
  open.value = true;
  document.body.style.overflow = 'hidden';
  nextTick(() => {
    menuRef.value?.querySelector<HTMLElement>('.mobile-menu__close')?.focus();
  });
}

function close() {
  open.value = false;
  document.body.style.overflow = '';
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) close();
}

function openContactModal() {
  close();
  window.dispatchEvent(new CustomEvent('sommavilla:open-modal'));
}

function onOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget) close();
}

onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>
<template>
  <div class="mobile-menu">
    <button
      type="button"
      class="group inline-flex h-[2.75rem] w-[2.75rem] cursor-pointer flex-col justify-center gap-[5px] rounded-sm border border-[var(--nav-toggle-border,var(--color-line))] bg-transparent p-[0.6rem] transition-colors duration-[280ms] ease-[var(--ease)] group-[.is-scrolled]:border-[var(--nav-toggle-border-dark,var(--color-line-dark))] lg:hidden"
      :aria-expanded="open"
      aria-controls="mobile-menu-panel"
      aria-label="Apri il menu"
      @click="toggle"
    >
      <span class="block h-[2px] w-full rounded-[2px] bg-[var(--nav-toggle-bar,var(--color-ink))] transition-[transform,background-color] duration-[280ms] ease-[var(--ease)] group-[.is-scrolled]:bg-[var(--nav-toggle-bar-dark,var(--color-white))] group-aria-expanded:translate-y-[7px] group-aria-expanded:rotate-45"></span>
      <span class="block h-[2px] w-full rounded-[2px] bg-[var(--nav-toggle-bar,var(--color-ink))] transition-[opacity,background-color] duration-[280ms] ease-[var(--ease)] group-[.is-scrolled]:bg-[var(--nav-toggle-bar-dark,var(--color-white))] group-aria-expanded:opacity-0"></span>
      <span class="block h-[2px] w-full rounded-[2px] bg-[var(--nav-toggle-bar,var(--color-ink))] transition-[transform,background-color] duration-[280ms] ease-[var(--ease)] group-[.is-scrolled]:bg-[var(--nav-toggle-bar-dark,var(--color-white))] group-aria-expanded:-translate-y-[7px] group-aria-expanded:-rotate-45"></span>
    </button>

    <!-- Nessun Teleport: l'isola è renderizzata a fine <body> (vedi PhotoModal.vue). -->
    <Transition name="menu">
      <div
        v-if="open"
        class="fixed inset-0 z-[940] overflow-y-auto bg-[rgba(13,15,18,0.6)] backdrop-blur-[2px]"
        @click="onOverlayClick"
      >
        <div
          ref="menuRef"
          class="mobile-menu__panel scroll-thin fixed top-0 right-0 bottom-0 flex w-[min(85vw,24rem)] flex-col overflow-y-auto border-l border-line-dark bg-ink-soft p-[1.5rem] text-text-dark [--scroll-thumb:rgba(244,242,236,0.4)] [--scroll-thumb-hover:rgba(244,242,236,0.6)]"
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
        >
          <div class="mb-[1.5rem] flex items-center justify-between">
            <span class="inline-flex items-center gap-[0.6rem]">
              <img src="/logo_white.svg" alt="" width="36" height="40" loading="lazy" decoding="async" class="h-[2.5rem] w-[2.2rem] object-contain" />
              <span class="flex flex-col leading-[1.05]">
                <strong class="font-display text-[1.05rem] font-bold tracking-[0.04em] text-white uppercase">
                  Judo Karate
                </strong>
                <em class="font-display text-[0.75rem] font-semibold tracking-[0.24em] text-red uppercase not-italic">
                  Sommavilla
                </em>
              </span>
            </span>
            <button
              type="button"
              class="mobile-menu__close inline-flex h-[2.4rem] w-[2.4rem] cursor-pointer items-center justify-center rounded-full border border-line-dark bg-transparent text-text-dark"
              aria-label="Chiudi il menu"
              @click="close"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-[1.1rem] w-[1.1rem]">
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          <nav class="mobile-menu__nav" aria-label="Menu mobile">
            <ul class="m-0 list-none p-0">
              <li v-for="item in mainNavigation" :key="item.href" class="border-t border-line-dark last:border-b">
                <a
                  :href="item.href"
                  @click="close"
                  class="block px-[0.2rem] py-[0.85rem] font-display text-[1.2rem] font-semibold tracking-[0.06em] text-text-dark uppercase no-underline transition-colors duration-[280ms] ease-[var(--ease)] hover:text-red"
                >
                  {{ item.label }}
                </a>
                <ul v-if="item.children" class="m-0 list-none p-0">
                  <li v-for="child in item.children" :key="child.href">
                    <a
                      :href="child.href"
                      @click="close"
                      class="block py-[0.55rem] pr-[0.2rem] pl-[1rem] font-display text-base font-semibold tracking-[0.06em] text-text-dark-muted uppercase no-underline transition-colors duration-[280ms] ease-[var(--ease)] hover:text-red"
                    >
                      {{ child.label }}
                    </a>
                  </li>
                </ul>
              </li>
              <li class="border-t border-line-dark">
                <a
                  href="/sport/"
                  @click="close"
                  class="block px-[0.2rem] py-[0.85rem] font-display text-[1.2rem] font-semibold tracking-[0.06em] text-text-dark uppercase no-underline transition-colors duration-[280ms] ease-[var(--ease)] hover:text-red"
                >
                  Tutti i corsi
                </a>
              </li>
            </ul>
          </nav>

          <button type="button" class="btn btn--lg mt-[1.4rem] w-full" @click="openContactModal">
            Prova un corso
          </button>

          <div class="mt-[1.5rem] flex flex-col gap-[0.75rem] border-t border-line-dark pt-[1.25rem]">
            <a
              :href="whatsappLink(contacts.whatsappNumber, 'Ciao, vorrei avere informazioni sui vostri corsi.')"
              target="_blank"
              rel="noopener noreferrer"
              @click="close"
              class="overflow-wrap-anywhere font-display text-base font-bold tracking-[0.05em] text-red uppercase no-underline"
            >
              WhatsApp
            </a>
            <a
              :href="telLink(contacts.referents[3].phone)"
              @click="close"
              class="overflow-wrap-anywhere font-display text-base font-bold tracking-[0.05em] text-red uppercase no-underline"
            >
              Telefono
            </a>
            <a
              :href="mailtoLink(contacts.email)"
              @click="close"
              class="overflow-wrap-anywhere font-display text-base font-bold tracking-[0.05em] text-red uppercase no-underline"
            >
              {{ contacts.email }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

