import { Commands, Context, Route } from "@vaadin/router";
import { MyPage } from "./app";

export * from "./sub-page1";
export * from "./sub-page2";
export * from "./app";

let routes: Route[] | undefined = undefined;

export function getRoutes(baseURL: string = "/") {
  if (!routes) {
    routes = [
      {
        path: "/",
        // The `action` function is called when the route is activated
        // it creates the `my-page` component and sets the `baseURL` property received from the parent app.
        // if there is no parent app, the `baseURL` is set to `/`
        // the `my-page` component requires the `baseURL` property to generate the correct links internally to the sub-pages
        action: (_context: Context, commands: Commands) => {
          const myPage = commands.component("my-page") as unknown as MyPage;
          myPage.baseURL = baseURL;
          return myPage;
        },
        children: [
          { path: "/", component: "my-app-sub-page1" },
          { path: "/sub-page2", component: "my-app-sub-page2" },
        ],
      },
    ];
  }

  return routes;
}

export default getRoutes;
