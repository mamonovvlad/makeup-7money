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
        IS_PROXY: `'${process.env.IS_PROXY_PROD}'`,
        IS_PROXY2: `'${process.env.IS_PROXY2_PROD}'`,
      },
    }),
  ],
  
});





