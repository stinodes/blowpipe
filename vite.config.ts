import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  plugins: [devtools({}), solid(), solidSvg()],
});
