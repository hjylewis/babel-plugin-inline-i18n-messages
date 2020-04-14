module.exports = function getMessage(key, locale, defaultMessage) {
  const message = ({})[key];
  return message || defaultMessage;
};
