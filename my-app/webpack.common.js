//webpack.common.js
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// const styleLoader = "style-loader";
const styleLoader = MiniCssExtractPlugin.loader;

export default {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: "ts-loader", options: { onlyCompileBundledFiles: true } },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          styleLoader,
          { loader: "css-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          styleLoader,
          { loader: "css-loader", options: { sourceMap: true } },
          "resolve-url-loader",
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
        exclude: /style.s[ac]ss$/,
      },
      {
        test: /\.style\.s[ac]ss$/i,
        use: [
          "lit-scss-loader",
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new MiniCssExtractPlugin()],
};
