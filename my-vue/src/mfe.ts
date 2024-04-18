import { createApp, App as VueApp } from "vue";
import { Route } from "@vaadin/router";
import "./style.css";
import App from "./App.vue";

// creating a custom Web Component to wrap the Vue Application.
class MyVueElement extends HTMLElement {
  private app: VueApp<Element> | undefined = undefined;
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
    this.app = createApp(App);
    this.app.mount(this);
  }

  // remove the Vue Application when the web component is removed.
  disconnectedCallback() {
    console.log("unmounting Vue Application");
    this.app?.unmount();
    this.app = undefined;
  }
}

const MyVueTag = "my-vue-app";

// register web application;
customElements.get(MyVueTag) || customElements.define(MyVueTag, MyVueElement);

let routes: Route[] | undefined = undefined;

// exposing routes to follow my-app pattern
function getRoutes(baseURL: string = "/") {
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

function getComponent(baseURL: string = "/") {
  console.log("My Vue: getComponent", baseURL);
  return MyVueTag;
}

export { MyVueElement, getRoutes, getComponent };
export default getRoutes;
