import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { readFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    https: {
      key: readFileSync('ssl/key.pem'),
      cert: readFileSync('ssl/cert.pem')
    }
  },
  base: "/webshare/"
})
