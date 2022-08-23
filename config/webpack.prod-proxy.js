// Build config:
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config();
const { merge } = require("webpack-merge");
const common = require("./webpack.common");


module.exports = merge(common, {
  // PRODUCTION MODE
  mode: "production",
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        PROXY: `'${process.env.PROXY_PROD}'`,
        PROXY2: `'${process.env.PROXY2_PROD}'`,
      },
    }),
  ],
  
});





