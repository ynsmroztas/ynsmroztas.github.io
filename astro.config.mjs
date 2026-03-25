import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ynsmroztas.github.io',
  output: 'static',
  build: {
    assets: '_assets'
  }
});
