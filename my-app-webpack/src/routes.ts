import { Commands, Context, Route } from "@vaadin/router";
import { getRemote } from "./mfe/remote";

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
              getRemote()
                .import(
                  "/app/my-page/assets/remoteEntry.js",
                  "myPage",
                  "./myPage",
                  "module"
                )
                .then((module) => {
                  return module.getRoutes(baseURL + "page2");
                }),
          },
          {
            path: "/my-vue",
            // myVue implements the getRoutes function pattern.
            children: () =>
              getRemote()
                .import(
                  "/app/my-vue/assets/remoteEntry.js",
                  "myVue",
                  "./myVue",
                  "module"
                )
                .then((module) => module.getRoutes(baseURL + "my-vue")),

            // other possibility would be to implement the action method,
            // load the myVue Web component
            // and return it as the route component

            // action: async (_context: Context, commands: Commands) => {
            //   // importing web component implemented in vue
            //   const { tag } = await getRemote().import(
            //   "/app/my-vue/assets/remoteEntry.js",
            //   "myVue",
            //   "./myVue",
            //   "module"
            // );
            //   return commands.component(tag);
            // }
          },
        ],
      },
    ];
  }

  return routes;
}

export default getRoutes;
