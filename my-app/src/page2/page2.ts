import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

// add the `?inline` query parameter to the import to prevent the CSS from being extracted
import page2Style from "./page2.style.scss?inline";

@customElement("my-app-page2")
export class MyAppPage2 extends LitElement {
  render() {
    return html`
      <div class="page2">
        <h1>Page 2</h1>
        <nav>
          <a href="/page2/">Sub Page 1</a>
          <a href="/page2/sub-page2">Sub Page 2</a>
        </nav>
        <div class="slot">
          <slot></slot>
        </div>
      </div>
    `;
  }
  static styles = unsafeCSS(page2Style);
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app-page2": MyAppPage2;
  }
}
