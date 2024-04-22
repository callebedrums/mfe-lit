import { createApp, App as VueApp } from "vue";
import { Route } from "@vaadin/router";
import "./style.css";
import App from "./App.vue";
import createAppRouter from "./router";

let $baseURL = "/";

// creating a custom Web Component to wrap the Vue Application.
class MyVueElement extends HTMLElement {
  private app: VueApp<Element> | undefined = undefined;
  private router: any | undefined = undefined;
  constructor() {
    super();
  }

  // instanciate the Vue Application when the web component is instanciated.
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `:host { display: block; }`;
    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(document.createElement("slot"));

    console.log("mounting Vue Application");

    // create the Vue Router
    this.router = createAppRouter($baseURL);

    // create the Vue Application
    this.app = createApp(App);
    this.app.use(this.router.router);
    this.app.mount(this);
  }

  // remove the Vue Application when the web component is removed.
  disconnectedCallback() {
    console.log("unmounting Vue Application");

    // unmount the Vue Application
    this.app?.unmount();
    this.app = undefined;

    // clean up the Vue Router
    this.router?.cleanUp();
  }
}

const MyVueTag = "my-vue-app";

// register web application;
customElements.get(MyVueTag) || customElements.define(MyVueTag, MyVueElement);

function getComponent(baseURL: string = "/") {
  $baseURL = baseURL;
  console.log("My Vue: getComponent", baseURL);
  return MyVueTag;
}

// use getRoutes if using vaadin router
let routes: Route[] | undefined = undefined;

// exposing routes to follow my-app pattern
function getRoutes(baseURL: string = "/") {
  $baseURL = baseURL;
  console.log("My Vue: getRoutes", baseURL);

  // if (!routes) {
  //   routes = [
  //     {
  //       path: "/",
  //       component: MyVueTag,
  //     },
  //   ];
  // }

  return routes;
}

export { MyVueElement, getRoutes, getComponent };
export default getRoutes;
