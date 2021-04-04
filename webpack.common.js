const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mergeJSON = require("handlebars-webpack-plugin/utils/mergeJSON");

const pagesFolder = "./src/pages/";
// const jsonFolder = "src/data/";

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
        // templateParameters:projectData,
        templateParameters(compilation) {
          const DATA = path.resolve(
            __dirname,
            `src/data/${v.replace(/\.hbs$/, "")}.json`
          );
          // Add datafile path to watch and rebuild when data changes
          // const projectData = mergeJSON(path.join(__dirname, "src/data/*.json"));
          compilation.fileDependencies.add(DATA);
          // Clear previous cached data from file if exist
          delete require.cache[require.resolve(DATA)];
          // Return always fresh data
          return require(DATA);
        },
        minify: true,
        cache: false,
      })
  );

// console.log(allPages,projectData);

module.exports = {
  entry: {
    vendor: require("./src/vendor"),
    main: {
      import: "./src/index.js",
      dependOn: "vendor",
    },
  },
  output: {
    filename: "assets/scripts/ups.[name].bundle.js",
    path: path.resolve(__dirname, "ups-output"),
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
          partialDirs: [
            path.resolve(__dirname, "./src/templates/"),
            path.resolve(__dirname, "./src/templates/partials"),
            path.resolve(__dirname, "./src/templates/partials/components"),
            path.resolve(__dirname, "./src/templates/partials/modules"),
          ],
          helperDirs: path.resolve(__dirname, "./src/scripts/helper/"),
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
              sourceMap: true,
            },
          },
        ],
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
    // new webpack.ProvidePlugin({
    //   $: "jQuery",
    //   jQuery: "jQuery",
    // }),
    ...allPages,
    new MiniCssExtractPlugin({
      filename: "assets/styles/ups.[name].styles.css",
      chunkFilename: "[id].css",
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
};
