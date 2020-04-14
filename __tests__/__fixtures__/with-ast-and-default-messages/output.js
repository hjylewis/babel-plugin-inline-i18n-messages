import { addMessages as _addMessages } from "i18n/addMessages.js";

_addMessages([
  [
    "hello",
    {
      message: "hello, world",
      ast: [
        {
          type: 0,
          value: "hello, world",
        },
      ],
    },
  ],
  [
    "bye",
    {
      message: "bye, world",
      ast: [
        {
          type: 0,
          value: "bye, world",
        },
      ],
    },
  ],
]);

import i18n from "i18n";
i18n("hello");
i18n("bye");
