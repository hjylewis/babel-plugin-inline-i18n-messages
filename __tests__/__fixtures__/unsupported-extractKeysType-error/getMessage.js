module.exports = function getMessage(key, locale) {
  const message = ({
    "hello": "hello, world",
    "bye": "bye, world",
  })[key];
  return message;
};
