const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: false,
    port: 8080,
    publicPath: "/dist/",
  },
};
