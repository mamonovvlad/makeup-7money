const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
dotenv.config();
// Main const. Feel free to change it
const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  source: "source/",
  assets: "assets/",
};

// Pages const for HtmlWebpackPlugin
const PAGES_DIR = `${PATHS.src}/views`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".html"));

module.exports = {
  //Увидомление об оптимизации
  // performance: {
  //   hints: false,
  // },

  externals: {
    paths: PATHS,
  },
  output: {
    filename: `${PATHS.source}js/[name].js`,
    path: PATHS.dist,
  },
  entry: {
    app: PATHS.src,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        // JavaScript
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        // Vue
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loader: {
            scss: "vue-style-loader!css-loader!sass-loader",
          },
        },
      },
      {
        //Fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset",
        generator: {
          filename: "source/fonts/[name][ext][query]",
        },
      },
      {
        // images / icons
        test: /\.(png|jpg|jpeg|svg|ico)$/,
        type: "asset",
        generator: {
          filename: "source/images/[name][ext][query]",
        },
      },
      {
        // scss
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "~": PATHS.src,
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),

    new MiniCssExtractPlugin({
      filename: `${PATHS.source}css/[name].css`,
    }),

    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          favicon: `./src/static/favicon.ico`,
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page}`,
          minify: {
            collapseWhitespace: false,
          },
        })
    ),

    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
