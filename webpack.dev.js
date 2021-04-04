const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const ClosurePlugin = require('closure-webpack-plugin');

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "output-dev"),
    port: 3000,
    open: true,
  },
  optimization: {
    minimizer: [
      new ClosurePlugin({mode: 'STANDARD'}, {
        // compiler flags here
        //
        // for debugging help, try these:
        //
         formatting: 'PRETTY_PRINT',
         debug: true,
         renaming: false
      })
    ]
  }
});
