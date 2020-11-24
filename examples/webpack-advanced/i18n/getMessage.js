const fs = require("fs");
const path = require("path");
const { parse } = require("intl-messageformat-parser");

module.exports = function getMessage(key, locale, defaultMessage) {
  const file = fs.readFileSync(
    path.resolve(__dirname, `./messages/${locale}.json`)
  );
  const messages = JSON.parse(file);
  const message = messages[key] || defaultMessage;

  return {
    message,
    ast: parse(message),
  };
};
