/// <reference types="astro/client" />

// Importi Vite con query `?raw` (contenuto testuale di un file, es. SVG).
declare module '*.svg?raw' {
  const src: string;
  export default src;
}

// Variabili d'ambiente pubbliche (prefisso PUBLIC_*).
interface ImportMetaEnv {
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_FORMINIT_EMAIL?: string;
  /** Token pubblico Cloudflare Web Analytics (beacon disattivato se non configurato). */
  readonly PUBLIC_CF_WEB_ANALYTICS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
