const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HandlebarsPlugin = require("handlebars-webpack-plugin");
const mergeJSON = require("handlebars-webpack-plugin/utils/mergeJSON");
const projectData = mergeJSON(path.join(__dirname, "src/data/*.json"));

const pagesFolder = "./src/pages/";
const fs = require("fs");
const allPages = fs
  .readdirSync(pagesFolder)
  .filter((v) => /\.hbs$/.test(v))
  .map(
    (v) =>
      new HtmlWebpackPlugin({
        template: `./src/pages/${v}`,
        filename: `${v.replace(/\.hbs$/, "")}.html`,
        inject: "body",
        publicPath: "auto",
        templateParameters:projectData,
        minify:true
      })
  );

// console.log(allPages,projectData);

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "ups.bundle.js",
    path: path.resolve(__dirname, "ups-output"),
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "output-dev"),
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(handlebars|hbs)$/,
        loader: "handlebars-loader",
        options: {
          partialDirs:  [path.resolve(__dirname, "./src/templates/"),path.resolve(__dirname, "./src/templates/partials")],
          helperDirs: path.resolve(__dirname, "./src/scripts/helper/"),
          precompileOptions: {
            knownHelpersOnly: false,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
              useRelativePath: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jQuery",
      jQuery: "jQuery",
    }),
    ...allPages,
    new MiniCssExtractPlugin({
      filename: "css/[name]-styles.css",
      chunkFilename: "[id].css",
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
};
