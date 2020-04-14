module.exports = function getMessage(key, locale) {
  const message = ({
    "bye": "bye, world",
  })[key];
  return message;
};
