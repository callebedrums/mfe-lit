import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import federation from "@originjs/vite-plugin-federation";

const VITE_PORT = +(process.env.VITE_PORT || 3001);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [
    vue(),
    federation({
      name: 'myVue',
      filename: "remoteEntry.js",
      exposes: {
        './myVue': './src/mfe.ts'
      },
      shared: ['vue']
    })
  ],
  server: {
    port: VITE_PORT,
  },
  preview: {
    port: VITE_PORT,
  },
})
