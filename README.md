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

Is this PoC we have a Host Application and Two MFEs. These three applications are being served from their own server, but the Host Application implements a proxy (for local development environment only)

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
