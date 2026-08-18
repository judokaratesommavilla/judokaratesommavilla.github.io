// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Sito ospitato su Aruba Hosting alla radice del dominio.
  site: 'https://asdsommavilla.it',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Qualità di default per le immagini elaborate da astro:assets.
        // I formati multipli (AVIF + WebP) si generano a livello di componente,
        // es. <Picture formats={['avif', 'webp']} />, non qui.
        quality: 80,
      },
    },
  },
  integrations: [
    vue(),
    sitemap({
      // La pagina 404 non deve comparire nella sitemap.
      filter: (page) => !page.includes('/404'),
      serialize: (item) => {
        item.lastmod = undefined;
        item.changefreq = undefined;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Evita di ricaricare tutto quando cambiano i file dati.
      watch: {
        ignored: ['**/dist/**'],
      },
    },
  },
});
