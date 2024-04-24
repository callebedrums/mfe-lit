//webpack.dev.js
import path from "path";
import url from "url";
import { merge } from "webpack-merge";
import config from "./webpack.config.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default merge(config, {
  mode: "development",
  devServer: {
    static: [path.resolve(__dirname, "dist")],
    historyApiFallback: true,
    open: true,
    port: 8080,
    proxy: [
      {
        context: ["/app/my-page"],
        target: "http://localhost:3000",
        pathRewrite: { "^/app/my-page": "" },
      },
      {
        context: ["/app/my-vue-comp"],
        target: "http://localhost:3002",
        pathRewrite: { "^/app/my-vue-comp": "" },
      },
      {
        context: ["/app/my-vue"],
        target: "http://localhost:3001",
        pathRewrite: { "^/app/my-vue": "" },
      },
    ],
  },
});
