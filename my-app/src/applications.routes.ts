import { Commands, Context, Route } from "@vaadin/router";
import { remote } from "./mfe/remote";

async function getApplications() {
  // applications endpoint should be configurable
  const applications = await fetch("/applications.json").then((response) =>
    response.json()
  );

  for (const application of applications) {
    const config = application.remote;
    remote().register(config.url, config.scope, config.module, config.type);
    application.module = `${config.scope}/${config.module.replace(
      /^\.\//,
      ""
    )}`;
  }

  return applications;
}

let routes: Route[] | undefined = undefined;

export async function getApplicationsRoutes(baseURL: string = "/") {
  if (!routes) {
    // Fetch the applications configuration
    const applications = await getApplications();

    // Generate the routes for each application
    routes = applications.map((application) => {
      let baseRouteUrl = baseURL + application.path.replace(/^\//, "");

      return {
        path: application.path,
        /**
         * The action method is called whenever the route is activated.
         * If the action method does not return a component, the router proceed with processing children paths.
         * If the action method returns a component, the router renders the component as the route content.
         */
        action: async (_context: Context, commands: Commands) => {
          const module = await remote().get(application.module);
          if (typeof module.getComponent !== "function") return;
          const tag = module.getComponent(baseRouteUrl);
          if (tag) return commands.component(tag);
        },
        /**
         * Children routes are processed when the parent route is activated.
         * If the MFE application does not provide a component in the action method, the router will process the children routes.
         */
        children: async () => {
          let children = [];
          const module = await remote().get(application.module);

          if (
            typeof module.getComponent === "function" &&
            module.getComponent(baseRouteUrl)
          )
            return children;

          if (typeof module.getRoutes === "function") {
            children = module.getRoutes(baseRouteUrl) || [];
          }

          return children;
        },
      };
    });
  }

  return routes;
}
