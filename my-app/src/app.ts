import { LitElement, unsafeCSS, html } from "lit";
import { customElement } from "lit/decorators.js";

// add the `?inline` query parameter to the import to prevent the CSS from being extracted
import myElementStyle from "./app.style.scss?inline";

@customElement("my-app")
export class MyApp extends LitElement {
  render() {
    return html`
      <div class="app">
        <nav>
          <a href="/">Home</a>
          <a href="/page1">Page 1</a>
          <a href="/page2">Page 2</a>
        </nav>
        <div class="slot">
          <slot></slot>
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
