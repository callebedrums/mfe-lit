import { defineConfig } from "vite";

import federation from "@originjs/vite-plugin-federation";

const VITE_PORT = +(process.env.VITE_PORT || 3000);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [
    federation({
      name: "myPage",
      filename: "remoteEntry.js",
      exposes: {
        "./myPage": "./src/routes.ts",
      },
      shared: ["lit", "lit-html", "lit-element"],
    }),
  ],
  server: {
    port: VITE_PORT,
  },
  preview: {
    port: VITE_PORT,
  },
});
