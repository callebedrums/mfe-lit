declare module "*.scss" {
  import { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}

declare module "*.sass" {
  import { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}

declare module "*.css" {
  import { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}

declare module "*.scss?inline" {
  import { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}

declare module "*.sass?inline" {
  import { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}

declare module "*.css?inline" {
  import { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}

// types/myPage.d.ts
declare module "myPage/myPage" {
  import { Route } from "@vaadin/router";
  export function getRoutes(baseURL: string = "/"): Array<Route>;
  export default getRoutes;
}
