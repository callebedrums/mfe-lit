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
        component: "my-page",
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
