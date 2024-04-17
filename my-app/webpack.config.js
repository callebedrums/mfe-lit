//webpack.config.js
import path from "path";
import url from "url";
import common from "./webpack.common.js";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import packageJson from "./package.json" assert { type: "json" };
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const { ModuleFederationPlugin } = webpack.container;
const deps = packageJson.dependencies;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default merge(common, {
  entry: {
    main: path.resolve(__dirname, "src/index.ts"),
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "./tsconfig.json"),
      }),
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "myAppWebpack",
      shared: {
        lit: {
          requiredVersion: deps["lit"],
          strictVersion: true,
        },
        "lit-html": {
          requiredVersion: deps["lit-html"],
          strictVersion: true,
        },
        "lit-element": {
          requiredVersion: deps["lit-element"],
          strictVersion: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      title: "Webpack + Lit + TS",
      template: path.resolve(__dirname, "./index.html"),
    }),

    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
        },
      ],
    }),
  ],
});
