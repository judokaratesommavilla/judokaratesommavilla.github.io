<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { siteLinks } from '../../data/site';

/**
 * Banner di consenso ai cookie (Google Ads / Consent Mode v2).
 *
 * Comportamento:
 * - alla prima visita mostra il banner (lo stato di default del tag è
 *   `denied`, vedi GoogleTag.astro);
 * - "Accetta tutti" → tutto granted; "Rifiuta tutti" → tutto denied;
 * - "Personalizza" → pannello con le categorie (statistiche / marketing),
 *   "Salva preferenze" applica la selezione;
 * - la scelta viene salvata in localStorage e lo stato del tag viene
 *   riallineato al mount (utile nelle View Transitions / al ritorno).
 */

type MarketingConsent = 'granted' | 'denied';

interface ConsentPref {
  analytics: MarketingConsent; // analytics_storage
  marketing: MarketingConsent; // ad_storage / ad_user_data / ad_personalization
}

const STORAGE_KEY = 'sommavilla:cookie-consent';

const visible = ref(false);
const showDetails = ref(false);
const panelRef = ref<HTMLElement | null>(null);
const analyticsPref = ref(false);
const marketingPref = ref(false);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function setConsent(pref: ConsentPref) {
  window.gtag?.('consent', 'update', {
    ad_storage: pref.marketing,
    ad_user_data: pref.marketing,
    ad_personalization: pref.marketing,
    analytics_storage: pref.analytics,
  });
}

function persist(pref: ConsentPref) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
  } catch {
    // localStorage non disponibile: il consenso vale per la sessione corrente.
  }
}

function applyAndClose(pref: ConsentPref) {
  setConsent(pref);
  persist(pref);
  visible.value = false;
  showDetails.value = false;
}

function acceptAll() {
  applyAndClose({ analytics: 'granted', marketing: 'granted' });
}

function rejectAll() {
  applyAndClose({ analytics: 'denied', marketing: 'denied' });
}

function savePreferences() {
  applyAndClose({
    analytics: analyticsPref.value ? 'granted' : 'denied',
    marketing: marketingPref.value ? 'granted' : 'denied',
  });
}

function openDetails() {
  showDetails.value = true;
  // Accessibilità: focus sul primo toggle del pannello.
  nextTick(() => {
    const firstToggle = panelRef.value?.querySelector<HTMLElement>('[data-cookie-toggle]');
    firstToggle?.focus();
  });
}

function backToMain() {
  showDetails.value = false;
  nextTick(() => panelRef.value?.focus());
}

/** Parsing robusto della preferenza salvata (gestisce anche il formato
 *  legacy del vecchio banner, che salvava solo la scelta marketing). */
function parsePref(raw: string): ConsentPref | null {
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (typeof data === 'object' && data !== null) {
      if (data.analytics && data.marketing) {
        return {
          analytics: data.analytics as MarketingConsent,
          marketing: data.marketing as MarketingConsent,
        };
      }
      // Legacy: "granted" = aveva accettato tutto, "denied" = tutto negato.
      if (data.marketing) {
        const pref = data.marketing as MarketingConsent;
        return { analytics: pref, marketing: pref };
      }
    }
  } catch {
    /* preferenza corrotta: mostra il banner */
  }
  return null;
}

onMounted(() => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    visible.value = true;
    // Accessibilità: sposta il focus sul banner quando appare.
    nextTick(() => panelRef.value?.focus());
    return;
  }
  const pref = parsePref(raw);
  if (!pref) {
    visible.value = true;
    return;
  }
  // Preferenza già espressa: riallinea lo stato del tag senza mostrare il banner.
  setConsent(pref);
});
</script>

<template>
  <Transition name="cookie">
    <div
      v-if="visible"
      ref="panelRef"
      class="fixed inset-x-0 bottom-0 z-[880] border-t-2 border-red bg-ink px-[var(--gutter)] py-[1.15rem] text-text-dark shadow-[0_-16px_48px_rgba(13,15,18,0.5)]"
      role="region"
      aria-label="Informativa sul consenso dei cookie"
      tabindex="-1"
    >
      <div class="mx-auto flex w-full max-w-[var(--container)] flex-col gap-[0.75rem]">
        <!-- Vista principale -->
        <div
          v-if="!showDetails"
          class="flex w-full flex-col gap-[0.75rem] lg:flex-row lg:items-center lg:gap-[2rem]"
        >
          <div class="min-w-0 flex-1">
            <p class="m-0 font-display text-[1.05rem] font-bold tracking-[0.08em] text-white uppercase">
              Questo sito usa cookie
            </p>
            <p class="m-0 mt-[0.15rem] text-[0.92rem] leading-[1.5] text-text-dark-muted">
              Cookie di terze parti per misurare le campagne e fare profilazione di marketing: attivati
              solo con il tuo consenso.
            </p>
            <p class="m-0 mt-[0.2rem] text-[0.82rem] leading-[1.4] text-text-dark-muted">
              <a
                :href="siteLinks.cookie"
                class="font-semibold text-white underline decoration-white/60 underline-offset-[3px] transition-colors duration-[280ms] ease-[var(--ease)] hover:text-white hover:decoration-white"
              >
                Cookie Policy
              </a>
              &nbsp;|&nbsp;
              <a
                :href="siteLinks.privacy"
                class="font-semibold text-white underline decoration-white/60 underline-offset-[3px] transition-colors duration-[280ms] ease-[var(--ease)] hover:text-white hover:decoration-white"
              >
                Privacy Policy
              </a>
            </p>
          </div>
          <!-- Mobile: "Accetta" grande a destra, "Rifiuta" compatto,
               "Personalizza" come link secondario (resta cliccabile). -->
          <div class="flex w-full flex-col items-stretch gap-[0.4rem] lg:hidden">
            <div class="flex items-stretch gap-[0.4rem]">
              <button
                type="button"
                class="btn btn--ghost-dark min-h-[2.9rem] flex-1 px-[0.85rem]"
                @click="rejectAll"
              >
                Rifiuta
              </button>
              <button type="button" class="btn min-h-[2.9rem] flex-[1.5]" @click="acceptAll">
                Accetta
              </button>
            </div>
            <button
              type="button"
              class="self-center cursor-pointer border-0 bg-none p-0 py-[0.3rem] text-[0.85rem] font-semibold text-text-dark-muted underline decoration-white/30 underline-offset-[3px] transition-colors duration-[280ms] ease-[var(--ease)] hover:text-white"
              @click="openDetails"
            >
              Personalizza
            </button>
          </div>
          <!-- Desktop: riga orizzontale con le tre opzioni equivalenti
               (layout originale, larghezza auto) -->
          <div class="hidden shrink-0 items-center gap-[0.6rem] lg:flex">
            <button type="button" class="btn btn--ghost-dark" @click="openDetails">Personalizza</button>
            <button type="button" class="btn btn--ghost-dark" @click="rejectAll">Rifiuta</button>
            <button type="button" class="btn" @click="acceptAll">Accetta</button>
          </div>
        </div>

        <!-- Pannello personalizzazione -->
        <div v-else class="w-full">
          <div class="mb-[0.35rem] flex items-center justify-between gap-4">
            <p class="m-0 font-display text-[1rem] font-bold tracking-[0.08em] text-white uppercase">
              Le tue preferenze
            </p>
            <button
              type="button"
              class="cursor-pointer border-0 bg-none p-0 text-[0.85rem] font-semibold text-text-dark-muted no-underline transition-colors duration-[280ms] ease-[var(--ease)] hover:text-white"
              @click="backToMain"
            >
              Indietro
            </button>
          </div>

          <div class="grid gap-[0.4rem]">
            <!-- Cookie tecnici: sempre attivi -->
            <div class="flex items-center justify-between gap-4 border-t border-line-dark pt-[0.45rem]">
              <div class="min-w-0">
                <p class="m-0 text-[0.9rem] font-semibold text-white">Cookie tecnici</p>
                <p class="m-0 text-[0.8rem] leading-[1.4] text-text-dark-muted">
                  Funzionamento del sito. Sempre attivi.
                </p>
              </div>
              <input
                type="checkbox"
                class="h-[1rem] w-[1rem] shrink-0 accent-red"
                checked
                disabled
                aria-label="Cookie tecnici (sempre attivi)"
              />
            </div>

            <!-- Statistiche -->
            <div class="flex items-center justify-between gap-4 border-t border-line-dark pt-[0.45rem]">
              <div class="min-w-0">
                <p class="m-0 text-[0.9rem] font-semibold text-white">Statistiche</p>
                <p class="m-0 text-[0.8rem] leading-[1.4] text-text-dark-muted">
                  Analisi del traffico e delle visite.
                </p>
              </div>
              <input
                v-model="analyticsPref"
                type="checkbox"
                data-cookie-toggle
                class="h-[1rem] w-[1rem] shrink-0 accent-red"
                aria-label="Consenso per le statistiche"
              />
            </div>

            <!-- Marketing -->
            <div class="flex items-center justify-between gap-4 border-t border-line-dark pt-[0.45rem]">
              <div class="min-w-0">
                <p class="m-0 text-[0.9rem] font-semibold text-white">Marketing</p>
                <p class="m-0 text-[0.8rem] leading-[1.4] text-text-dark-muted">
                  Misurazione delle campagne e pubblicità mirata.
                </p>
              </div>
              <input
                v-model="marketingPref"
                type="checkbox"
                data-cookie-toggle
                class="h-[1rem] w-[1rem] shrink-0 accent-red"
                aria-label="Consenso per il marketing"
              />
            </div>
          </div>

          <div
            class="mt-[0.7rem] flex flex-wrap items-center gap-[0.6rem] border-t border-line-dark pt-[0.6rem]"
          >
            <button type="button" class="btn" @click="savePreferences">Salva preferenze</button>
            <button type="button" class="btn btn--ghost-dark" @click="acceptAll">Accetta tutti</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
