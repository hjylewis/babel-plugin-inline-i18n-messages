var _addMessages = require("i18n/addMessages.js").addMessages;

_addMessages([
  ["hello", "hello, world"],
  ["bye", "bye, world"],
]);

const i18n = require("i18n");

i18n("hello");
i18n("hello");
