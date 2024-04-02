import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

// add the `?inline` query parameter to the import to prevent the CSS from being extracted
import myPageStyle from "./app.style.scss?inline";

@customElement("my-page")
export class MyPage extends LitElement {
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
      <div class="my-page">
        <h1>My Page</h1>
        <nav>
          <a href="${this.baseURL}">Sub Page 1</a>
          <a href="${this.baseURL}sub-page2">Sub Page 2</a>
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
