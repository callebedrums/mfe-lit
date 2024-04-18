import { Route } from "@vaadin/router";
import { getApplicationsRoutes } from "./applications.routes";

export * from "./home";
export * from "./page1";
export * from "./app";

let routes: Route[] | undefined = undefined;

export async function getRoutes(baseURL: string = "/") {
  if (!routes) {
    const appRoutes = await getApplicationsRoutes(baseURL);
    routes = [
      {
        path: "/",
        component: "my-app",
        children: [
          { path: "/", component: "my-app-home" },
          { path: "/page1", component: "my-app-page1" },
          ...appRoutes,
        ],
      },
    ];
  }

  return routes;
}

export default getRoutes;
