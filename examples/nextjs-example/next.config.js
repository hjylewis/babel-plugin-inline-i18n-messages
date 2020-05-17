const path = require("path");

module.exports = {
  webpack: (config, options) => {
    // Create an alias for i18n
    config.resolve.alias["i18n"] = path.join(__dirname, "i18n");

    config.module.rules.push({
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "babel-loader",
          options: {
            plugins: [
              [
                "inline-i18n-messages",
                {
                  extractKeysType: "formatjs",
                  getMessageFile: "./i18n/getMessage.js",
                  addMessagesSource: "i18n/addMessages.js",
                },
              ],
            ],
          },
        },
      ],
    });

    return config;
  },
};
