// https://github.com/hjylewis/babel-plugin-inline-i18n-messages/issues/6

const fs = require("fs");
const path = require("path");

module.exports = function getMessage(key, locale, defaultMessage) {
  const en = JSON.parse(fs.readFileSync(
    path.resolve(process.cwd(), `./i18n/messages/en.json`)
  ));
  const es = JSON.parse(fs.readFileSync(
    path.resolve(process.cwd(), `./i18n/messages/es.json`)
  ));

  return {
    en: en[key] || defaultMessage,
    es: es[key] || defaultMessage,
  }
};