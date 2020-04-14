const { addNamed } = require("@babel/helper-module-imports");
const { default: template } = require("@babel/template");
const nodePath = require("path");
const fs = require("fs");
const formatjsExtractKeys = require("./formatjs/extractKeys");

function validateOptions(options) {
  const {
    addMessagesSource,
    getMessageFile,
    extractKeysFile,
    extractKeysType,
  } = options;

  if (!getMessageFile) {
    throw new Error(`Missing "getMessageFile" option in config`);
  }

  if (extractKeysType && extractKeysType !== "formatjs") {
    throw new Error(
      `Unsupported option for extractKeysType "${extractKeysType}"`
    );
  }

  if (extractKeysType && extractKeysFile) {
    throw new Error(
      `Option "extractKeysFile" and "extractKeysType" cannot be used at the same time.`
    );
  }

  if (!extractKeysFile && !extractKeysType) {
    throw new Error(
      `Missing "extractKeysFile" or "extractKeysType" option in config`
    );
  }

  if (!addMessagesSource) {
    throw new Error(`Missing "addMessagesSource" option in config`);
  }

  return options;
}

function getFile(filename) {
  const absoluteFilename = nodePath.resolve(process.cwd(), filename);

  if (!fs.existsSync(absoluteFilename)) {
    throw new Error(`Missing file at "${absoluteFilename}"`);
  }

  return require(absoluteFilename);
}

const pluginName = "inline-i18n-messages";
module.exports = function (babel) {
  return {
    name: pluginName,
    pre(file) {
      const { options } = file.opts.plugins.find((p) => p.key === pluginName);

      validateOptions(options);

      const { getMessageFile, extractKeysFile } = options;

      if (extractKeysFile) {
        this.extractKeys = getFile(extractKeysFile);
      }
      this.getMessage = getFile(getMessageFile);
    },
    visitor: {
      Program(path, state) {
        const { locale, addMessagesSource, extractKeysType } = state.opts;

        let keys = [];
        if (extractKeysType && extractKeysType === "formatjs") {
          keys = formatjsExtractKeys(state.filename);
        } else {
          keys = this.extractKeys(state.filename);
        }

        if (keys.length === 0) {
          return;
        }

        const idAndMessages = keys.map((k) => {
          let key;
          let defaultMessage;
          if (k.key) {
            key = k.key;
            defaultMessage = k.defaultMessage;
          } else {
            key = k;
          }
          const message = this.getMessage(key, locale, defaultMessage);

          if (!message) {
            throw new Error(`Missing message with key "${key}"`);
          }

          return [key, message];
        });

        const addMessagesIdentifier = addNamed(
          path,
          "addMessages",
          addMessagesSource
        );

        path.unshiftContainer(
          "body",
          babel.types.expressionStatement(
            babel.types.callExpression(addMessagesIdentifier, [
              template.expression(JSON.stringify(idAndMessages))(),
            ])
          )
        );
      },
    },
  };
};
