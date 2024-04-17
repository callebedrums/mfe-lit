import { Router } from "@vaadin/router";

const outlet = document.getElementById("outlet");
const router = new Router(outlet);

router.setRoutes([
  {
    path: `/`,
    children: () => import("./routes").then((module) => module.getRoutes()),
  },
  {
    path: "(.*)",
    redirect: "/",
  },
]);
