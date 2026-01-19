import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://esc5221.github.io',
  base: '/awesome-agentic-patterns/',
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
