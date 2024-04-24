import { defineCustomElement } from "vue";
import HelloWorld from "./HelloWorld.ce.vue";

// exporting the Vue Component as a Web Component
const HelloWorldComponent = defineCustomElement(HelloWorld);
customElements.define("hello-world", HelloWorldComponent);

export { HelloWorldComponent };
