export * from "./components";
import { Commands, Context, Route } from "@vaadin/router";

// use getRoutes if using vaadin router
let routes: Route[] | undefined = undefined;

export function getRoutes(baseURL: string = "/") {
  console.log("My Vue Components: getRoutes", baseURL);

  if (!routes) {
    routes = [
      {
        path: "/",
        action: (_context: Context, commands: Commands) => {
          const myPage = commands.component("hello-world") as any;
          myPage.msg = " Vue Component as a Web Component";
          return myPage;
        },
      },
    ];
  }

  return routes;
}
