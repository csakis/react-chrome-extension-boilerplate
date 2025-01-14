const path = require("path");
const ChromeExtensionReloader = require("webpack-chrome-extension-reloader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./chrome/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

const config = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    app: path.join(__dirname, "./chrome/static/index.js"),
    background: path.join(__dirname, "./chrome/scripts/background.js"),
    content: path.join(__dirname, "./chrome/scripts/content.js")
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "boilerplate", // change this to your app title
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#000000"
      },
      manifest: "manifest.json",
      filename: "index.html",
      template: "./chrome/static/index.html",
      hash: true
    }),
    new ChromeExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        background: "background",
        content: "content"
      }
    }),
    new CopyPlugin([
      {
        from: "chrome/icons",
        to: "icons"
      }
    ]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.png$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
    ]
  },
  
};

module.exports = config;
