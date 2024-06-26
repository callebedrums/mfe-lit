import { defineConfig } from "vite";

import federation from "@originjs/vite-plugin-federation";

const proxy = {
  "/app/my-page": {
    target: "http://localhost:3000",
    // changeOrigin: true,
    rewrite: (path) => path.replace(/^\/app\/my-page/, ""),
  },
  "/app/my-vue": {
    target: "http://localhost:3001",
    rewrite: (path) => path.replace(/^\/app\/my-vue/, ""),
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [
    federation({
      name: "myApp",
      filename: "remoteEntry.js",
      exposes: {
        "./myApp": "./src/routes.ts",
      },
      remotes: {
        myPage: "/app/my-page/assets/remoteEntry.js",
        myVue: "/app/my-vue/assets/remoteEntry.js",
        dummyApp: "dummy.js",
      },
      shared: ["lit", "lit-html", "lit-element"],
    }),
  ],
  server: { proxy },
  preview: { proxy },
});
