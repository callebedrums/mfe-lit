import { Commands, Context, Route } from "@vaadin/router";

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
          {
            path: "/my-vue",
            // myVue implements the getRoutes function pattern.
            children: () => import("myVue/myVue").then((module) => module.getRoutes(baseURL + 'my-vue'))

            // other possibility would be to implement the action method,
            // load the myVue Web component
            // and return it as the route component
            
            // action: async (_context: Context, commands: Commands) => {
            //   // importing web component implemented in vue
            //   const { tag } = await import("myVue/myVue");
            //   return commands.component(tag);
            // }
          }
        ],
      },
    ];
  }

  return routes;
}

export default getRoutes;
