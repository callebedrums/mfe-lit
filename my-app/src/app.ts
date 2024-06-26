import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import myElementStyle from "./app.style.scss";

@customElement("my-app")
export class MyApp extends LitElement {
  static styles = [myElementStyle];

  private $baseURL: string = "/";

  @property({ type: String })
  set baseURL(value: string) {
    value.endsWith("/") || (value += "/");
    this.$baseURL = value;
  }

  get baseURL() {
    return this.$baseURL;
  }

  render() {
    return html`
      <div class="app">
        <nav>
          <a href="${this.baseURL}">Home</a>
          <a href="${this.baseURL}page1">Page 1</a>
          <a href="${this.baseURL}page2">Page 2</a>
          <a href="${this.baseURL}my-vue">My Vue</a>
          <a href="${this.baseURL}my-vue-comp">My Vue Components</a>
        </nav>
        <div class="slot">
          <slot>
            <!-- Children elements are projected here -->
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app": MyApp;
  }
}
