import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import ExtraVuePage from "./components/ExtraVuePage.vue";

export default function createAppRouter(baseUrl: string = "/") {
  const routes: any[] = [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
    },
    {
      path: "/hello",
      name: "HellowYou",
      component: ExtraVuePage,
    },
  ];
  const history = createWebHistory(baseUrl);

  const router = createRouter({
    history,
    routes,
  });

  return {
    router,
    cleanUp: () => history.destroy(),
  };
}
