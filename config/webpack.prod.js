// Build config:
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const dotenv = require("dotenv");
dotenv.config();

module.exports = merge(common, {
  // PRODUCTION MODE
  mode: "production",
  devtool: false,
  plugins: [
    
    new webpack.DefinePlugin({
        'process.env.PROXY':`'${process.env.PROXY_PROD}'`,
        'process.env.PROXY2': `'${process.env.PROXY2_PROD}'`,
    }),
  
  ],
});





