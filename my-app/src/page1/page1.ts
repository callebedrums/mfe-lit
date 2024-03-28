import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

// add the `?inline` query parameter to the import to prevent the CSS from being extracted
// import myElementStyle from "./app.style.scss?inline";

@customElement("my-app-page1")
export class MyAppPage1 extends LitElement {
  static styles = css`
    h1 {
      margin: 0;
      padding: 20px 0;
    }
  `;

  render() {
    return html` <h1>Page 1</h1> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app-page1": MyAppPage1;
  }
}
