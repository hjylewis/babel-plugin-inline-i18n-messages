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
    devtool: "inline-source-map",
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
    plugins: [new ReplaceSentinelPlugin()],
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
                    getMessageFile: "./i18n/getSentinelMessage.js",
                    addMessagesSource: "i18n/messages",
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    optimization: {
      splitChunks: {},
    },
  };
}

module.exports = createConfig();
