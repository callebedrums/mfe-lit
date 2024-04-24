import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

const VITE_PORT = +(process.env.VITE_PORT || 3002);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
    federation({
      name: "myVueComp",
      filename: "remoteEntry.js",
      exposes: {
        "./myVueComp": "./src/mfe.ts",
      },
      shared: ["vue"],
    }),
  ],
  server: {
    port: VITE_PORT,
  },
  preview: {
    port: VITE_PORT,
  },
});
