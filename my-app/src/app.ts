import { LitElement, unsafeCSS, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// add the `?inline` query parameter to the import to prevent the CSS from being extracted
import myElementStyle from "./app.style.scss?inline";

@customElement("my-app")
export class MyApp extends LitElement {
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
        </nav>
        <div class="slot">
          <slot>
            <!-- Children elements are projected here -->
          </slot>
        </div>
      </div>
    `;
  }

  static styles = unsafeCSS(myElementStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app": MyApp;
  }
}
