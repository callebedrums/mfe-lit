# mfe-lit

This project is a Proof of Concept of a Micro-Frontend architecture implementation using lit library, vite builder tool, and Module Federation.

# Environment

- Node.js 18.19.1
- npm 10.2.4

## Quick start

```bash
# clone repository into local machine
git clone git@github.com:callebedrums/mfe-lit.git

# install dependencies
cd ./my-app && npm install && cd ../
cd ./my-page && npm install && cd ../
cd ./my-vue && npm install && cd ../

# execute following commands in their own terminal

cd ./my-app && npm run dev
cd ./my-page && npm run dev
cd ./my-vue && npm run dev
```

## About

The main goal of a Micro-Frontend architecture is to split the application in smaller and independent applications that are going to be bundled and mounted together only in the execution time.

Each small application is called a Micro-Frontend (MFE), and the entry point is the Host Application.

In this PoC we have a Host Application and Two MFEs. These three applications are being served from their own server, but the Host Application implements a proxy (for local development environment only) and simulates a deployment of each app in its own sub-path.
The Host application is served from the root path (`/`), the _'my-page'_ app is served from the `/app/my-page` path, while the _'my-vue'_ app is served from the `/app/my-vue` path.

This particular implementation uses the `@vaadin/router` library to manage the routing system. It consist of a light weight library that renders web-components for each route configured.
It is agnostic of frameworks and expect only a web-component to be rendered. This enables each MFE to choose the framework or library to be used to implement the application, as long as it implements a web-component in the end.

This implementation also uses Module Federation to load remove modules and decouple the applications. This way, a route can be mapped to a component that is implemented in a remote application. This component application is asynchronous loaded and rendered.
These are the MFEs, that also use Module Federation to expose their entrypoints and export the component to be rendered.

If the remote application (MFE) is also composed by multiple pages and/or components, it can return a `@vaadin/router` sub-route configuration instead. this way, it can register multiple sub-routes and multiple components as part of it.

## The Host App

The Host app retrieves a list of the MFE applications with their url path to be mounted in the host, and the remote entry configuration

```JSON
{
  "path": "/page2",
  "remote": {
    "url": "/app/my-page/assets/remoteEntry.js",
    "scope": "myPage",
    "module": "./myPage",
    "type": "module"
  }
}
```

In the example above, we have an MFE application that will be mounted when the url path `/page2` is accessed, and the remote configuration to load it dynamic following the Module Federation standard.

The host application expect that the remote module implements either the `getComponent` function or the `getRoutes` function. If both are implemented the `getComponent` function takes preference.

The `getComponent` function should return the component tag name that should be rendered as the resolution of the routing. If `getComponent` function is implemented but returns undefined, the Host application will consider the `getRoutes` function instead.

The `getRoutes` function should return a list of `@vaadin/router` routes to be rendered as sub-routes of the MFE application path.

Both functions receive the current path as a baseUrl argument, so MFE knows on what sub-path it is being mounted and configure itself properly if required.

## MFE applications

The MFE application has to expose a remote entry point following the Module Federation standar, and has to implement either the `getComponent` function or the `getRoutes` function.

```TypeScript
// exporting getComponents example
export * from 'my-component.ts';

/** setting baseUrl as default in the case the app is running outside the MFE architecture */
export function getComponents(baseUrl: string = '/') {
  // we can use the baseUrl to initiate any internal service, or even decide with component to return
  return 'my-component';
}


// exporting getRoutes example
import { Commands, Context, Route } from "@vaadin/router";
export * from 'my-first-component.ts';
export * from 'my-second-component.ts';

let routes: Route[] | undefined = undefined;

export function getRoutes(baseUrl: string = '/') {
  // set routes just once
  if (!routes) {
    routes = [
      {
        path: '/', component: 'my-first-component',
        path: '/second-path', component: 'my-second-component'
      }
    ]
  }

  return routes;
}
```

## ------

the _/my-app_ folder contains the Host Application. it provides the initial layout and some pages.

The _/my-page_ folder contains the Micro-Frontend application. it provides other sub-pages to be rendered in the Host Application.

The _/my-vue_ folder contains a Micro-Frontend implemented in Vue. it provides a single page.

## References

- [lit](https://lit.dev/)
- [@vaadin/router](https://github.com/vaadin/router?tab=readme-ov-file)
- [webpack](https://webpack.js.org/)
- [vite](https://vitejs.dev/)
- [module federation](https://module-federation.io/guide/start/index.html)
- [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
- [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
