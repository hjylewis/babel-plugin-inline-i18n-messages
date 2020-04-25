const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

function createConfig(locale) {
  return {
    mode: "development",
    devServer: {
      contentBase: "./dist",
      index: "en.html",
      openPage: "en",
    },
    devtool: "inline-source-map",
    entry: "./src/index.js",
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    output: {
      filename: `${locale}.js`,
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          LOCALE: JSON.stringify(locale),
        },
      }),
      new HtmlWebpackPlugin({
        title: locale,
        filename: `${locale}.html`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: [
                [
                  "inline-i18n-messages",
                  {
                    locale,
                    extractKeysType: "formatjs",
                    getMessageFile: "./i18n/getMessage.js",
                    addMessagesSource: "i18n/messages",
                  },
                ],
              ],
            },
          },
        },
      ],
    },
  };
}

module.exports = ["en", "es"].map(createConfig);
