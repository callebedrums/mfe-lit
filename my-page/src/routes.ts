export * from "./sub-page1";
export * from "./sub-page2";
export * from "./app";

export const routes = [
  {
    path: "/",
    component: "my-page",
    children: [
      { path: "/", component: "my-app-sub-page1" },
      { path: "/sub-page2", component: "my-app-sub-page2" },
    ],
  },
];

export default routes;
