import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

// add the `?inline` query parameter to the import to prevent the CSS from being extracted
import myPageStyle from "./app.style.scss?inline";

@customElement("my-page")
export class MyPage extends LitElement {
  render() {
    return html`
      <div class="my-page">
        <h1>My Page</h1>
        <nav>
          <a href="/">Sub Page 1</a>
          <a href="/sub-page2">Sub Page 2</a>
        </nav>
        <div class="slot">
          <slot></slot>
        </div>
      </div>
    `;
  }
  static styles = unsafeCSS(myPageStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    "my-page": MyPage;
  }
}
