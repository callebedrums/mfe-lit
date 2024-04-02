import { Route } from "@vaadin/router";

export * from "./home";
export * from "./page1";
export * from "./app";

let routes: Route[] | undefined = undefined;

export function getRoutes(baseURL: string = "/") {
  if (!routes) {
    routes = [
      {
        path: "/",
        component: "my-app",
        children: [
          { path: "/", component: "my-app-home" },
          { path: "/page1", component: "my-app-page1" },
          {
            path: "/page2",
            children: () =>
              import("myPage/myPage").then((module) => {
                return module.getRoutes(baseURL + "page2");
              }),
          },
        ],
      },
    ];
  }

  return routes;
}

export default getRoutes;
