
const { parse } = require('intl-messageformat-parser');

module.exports = function getMessage(key, locale, defaultMessage) {
  const message = ({})[key] || defaultMessage;

  return {
    message,
    ast: parse(message)
  }
}