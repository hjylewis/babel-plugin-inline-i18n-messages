// Return a Sentinel wrapped key instead of message,
// This will be found and replaced in plugin.js

module.exports = function getMessage(key) {
  return "] :: TRANSLATION_TIME :: [" + key + "] :: TRANSLATION_TIME :: [";
};
