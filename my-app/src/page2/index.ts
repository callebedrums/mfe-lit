export * from "./sub-page1";
export * from "./sub-page2";
export * from "./page2";

export const routes = [
  {
    path: "/",
    component: "my-app-page2",
    children: [
      { path: "/", component: "my-app-sub-page1" },
      { path: "/sub-page2", component: "my-app-sub-page2" },
    ],
  },
];
