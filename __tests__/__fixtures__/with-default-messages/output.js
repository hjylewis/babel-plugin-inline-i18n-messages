import { addMessages as _addMessages } from "i18n/addMessages.js";

_addMessages([
  ["hello", "Hello, World"],
  ["bye", "Bye, World"],
]);

import i18n from "i18n";
i18n("hello");
i18n("bye");
