const merge = require("webpack-merge");
const config = require("./webpack.config.js");
const NodemonPlugin = require("nodemon-webpack-plugin");
const path = require("path");

module.exports = merge(config, {
  devtool: "source-map",
  watch: true,
  plugins: [
    new NodemonPlugin({
      verbose: false,
      ignore: ["*.js.map"],
      nodeArgs: ["--inspect"]
    })
  ]
});
