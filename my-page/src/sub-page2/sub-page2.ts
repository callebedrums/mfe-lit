import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

// add the `?inline` query parameter to the import to prevent the CSS from being extracted
// import myElementStyle from "./app.style.scss?inline";

@customElement("my-app-sub-page2")
export class MyAppSubPage2 extends LitElement {
  static styles = css`
    h1 {
      margin: 0;
      padding: 20px 0;
    }
  `;

  render() {
    return html` <h1>Sub Page 2</h1> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app-sub-page2": MyAppSubPage2;
  }
}
