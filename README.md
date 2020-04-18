# babel-plugin-inline-i18n-messages

A tooling-agnostic i18n message inlining plugin for babel. Enables dynamic scalable i18n message bundles capable of being code-split.

![Before and after diagram. Before: single large message bundle loaded upfront. After: several smaller file-scoped message bundles loaded with each file.](images/inline-i18n-messages-diagram.png)

## Why

* **Automatic bundles:** No manual maintenance of message bundles. File-scoped bundles are created and loaded automatically.
* **Reduced message bundle bloat** Only the messages need are loaded so no unused messages are loaded. 
* **Tooling agnostic** Configuration is generic enough so that any i18n tool can be used.
* **Easily code-split** File-scoped message bundles mean that code splitting messages is trivial.

For more explanation see [Motivation](#Motivation). 

## Example
See full examples [here](/examples).

```javascript
i18n('key.path.hello');
i18n('key.path.sup');

      ↓ ↓ ↓ ↓ ↓ ↓

import { addMessages } from "i18n/addMessages.js";
addMessages([
  ["key.path.hello", "hello, world"],
  ["key.path.sup", "sup, world"],
]);
i18n('key.path.hello');
i18n('key.path.sup');
```

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Add to babel configuration](#add-to-babel-configuration)
- [Options](#options)
- [react-intl/formatjs Quickstart](#react-intlformatjs-quickstart)
- [API](#api)
  - [`addMessages`](#addmessages)
  - [`getMessage`](#getmessage)
  - [`extractKeys`](#extractkeys)
- [Motivation](#motivation)
  - [The problem](#the-problem)
  - [The solution](#the-solution)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

### Installation
```bash
npm install babel-plugin-inline-i18n-messages --save-dev
```

### Add to babel configuration
Add to your .babelrc or babel-loader configuration. For more information about the plugin options see [Options](#Options).
```json
{
  "plugins": [
    [
      "inline-i18n-messages", {
        "addMessagesSource": "path/to/addMessages/module",
        "getMessageFile": "path/to/getMessage/module",
        "extractKeysFile": "path/to/extractKeysFile/module",
        "locale": "en-us"
      }
    ]
  ]
}
```

## Options

* `addMessagesSource` _(required)_: Path to client-side module that exports addMessages function. See [addMessages](#addMessages).
* `getMessageFile` _(required)_: Path to build-side module that exports getMessage function. See [getMessage](#getMessage).
* `extractKeysFile` OR `extractKeysType` _(required)_: Your configuration must include one of the following:
  * `extractKeysFile`: Path to build-side module that exports extractKeys function. See [extractKeys](#extractKeys).
  * `extractKeysType`: One of the supported extractKeysTypes: `formatjs`. See [react-intl/formatjs quickstart](#react-intl/formatjs-Quickstart) for more informatiom.
* `locale`: Locale string that is passed to your [getMessage](#getMessage) function.

## react-intl/formatjs Quickstart
1. install
1. add addMessages like this
1. add getMessage like this
(see this more advanced example for AST pre-parsing)
1. set option to react-intl specific

## API

### `addMessages`
A client-side module that exports a named function called `addMessages`. This function should accept an array of id and message arrays and inject them into your i18n tooling. This function will be dependent on your client-side i18n tooling. You'll add the the path to this module as the `addMessagesSource` option in the [plugin configuration](#Options).

Example:
```js
// src/i18n/messages.js
export const messages = {};

export function addMessages(idAndMessages) {
  idAndMessages.forEach(([id, message]) => {
    messages[id] = message;
  });
}

// src/i18n/index.js
import {messages} from './messages.js';
import i18n from 'i18n-tool';

i18n.init(messages);
```
See full examples [here](/examples).

### `getMessage`

A build-side module that exports a default function called `getMessage`. This function should accept a message key, locale, and default message and return a message. This function will be dependent on your localization flow and where you keep your translated messages. You'll add the the path to this module as the `getMessageFile` option in the [plugin configuration](#Options).

Example:
```js
// i18n/getMessage.js
module.exports = function getMessage(key, locale, defaultMessage) {
  const file = fs.readFileSync(`./messages/${local}.json`);
  const messages = JSON.parse(file);

  return messages[key] || defaultMessage
}
```
See full examples [here](/examples).

### `extractKeys`

A build-side module that exports a default function called `extractKeys`. This function should accept a filename and return an array of message key string or an object containing key strings and default message strings. These keys will be passed to your [getMessage](#getMessage) function. This function will be dependent on your client-side i18n tooling. You'll add the the path to this module as the `extractKeysFile` option in the [plugin configuration](#Options).

Example:
```js
// i18n/extractKeys.js
const {extract} = require("i18n-tool");

module.exports = function extractKeys(filename) {
  return extract(filename).keys;
};
```
See full examples [here](/examples).

## Motivation

### The problem
Most internationalization (i18n) libraries require you to statically define your i18n messages upfront in one large object. Visiting one page might require you to load the messages of the entire application. This creates an issue at large scales when those message objects can be massive.

You could manually split up your message objects and load them at specific parts of your application but this process is unwieldy. What happens if you delete a page? Create a new page? What if two pages require the same messages? You'd have to manually maintain this relationship in your i18n message bundles. This approach leads to an awkward and brittle maintenance experience.

### The solution
What if instead of loading on large object upfront for the entire application, we file-scoped the loading of i18n messages. This would mean each file had it's own i18n message bundle which was loaded only when the file was loaded. Think of this like as similar to a CSS-in-JS solution for i18n messages. We are co-locating your messages in your JS like how CSS-in-JS co-locates your styles in your JS to reduce bloat. By loading only the messages we need, when we need them, we are never loading extraneous messages.

This is exactly what `babel-plugin-inline-i18n-messages` does automatically. When you include this plugin into your babel configuration, it will search for the message keys you use in each file and dynamically load only the messages you need per file. This makes it extremely easy to code-split parts of your application in a way that your i18n messages are also code-split.

Furthermore, it does so in a way that is agnostic to what i18n tooling you are using. If you are using react-intl/formatjs see the [section]().