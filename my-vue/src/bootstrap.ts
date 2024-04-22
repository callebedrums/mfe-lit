import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import createAppRouter from "./router";

const { router } = createAppRouter();

createApp(App).use(router).mount("#app");
