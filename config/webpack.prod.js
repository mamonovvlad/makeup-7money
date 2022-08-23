// Build config:
const webpack = require("webpack");
const dotenv = require("dotenv");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
dotenv.config();
module.exports = merge(common, {
  // PRODUCTION MODE
  mode: "production",
  devtool: false,
  plugins: [],
  
});


  


