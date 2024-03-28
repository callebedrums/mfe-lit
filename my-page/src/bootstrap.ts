import { Router } from "@vaadin/router";

const outlet = document.createElement("div");
outlet.id = "outlet";
document.body.appendChild(outlet);

const router = new Router(outlet);

router.setRoutes([
  {
    path: `/`,
    children: () => import("./routes").then((module) => module.routes),
  },
  {
    path: "(.*)",
    redirect: "/",
  },
]);
