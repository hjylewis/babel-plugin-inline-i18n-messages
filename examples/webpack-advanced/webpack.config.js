const path = require("path");
const ReplaceSentinelPlugin = require("./plugin");

function createConfig() {
  return {
    mode: "development",
    devServer: {
      contentBase: "./dist",
      index: "en.html",
      openPage: "en.html",
    },
    devtool: "source-map",
    entry: {
      index: "./src/index.js",
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    output: {
      filename: `[name].js`,
      path: path.resolve(__dirname, "dist"),
    },
    optimization: {
      splitChunks: {},
    },

    // The cool stuff below!!!
    plugins: [new ReplaceSentinelPlugin()], // plugin that replaces the sentinels and outputs the localized js
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
                    extractKeysType: "formatjs",
                    getMessageFile: "./i18n/getSentinelMessage.js", // insert the sentinels
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

module.exports = createConfig();
