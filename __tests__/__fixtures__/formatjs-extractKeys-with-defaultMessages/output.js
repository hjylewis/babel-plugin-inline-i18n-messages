import { addMessages as _addMessages } from "i18n/addMessages.js";

_addMessages([
  ["foo.bar.baz", "Hello World!"],
  ["foo.bar.biff", "Hello Nurse!"],
  [
    "app.home.kittens",
    "{count, plural, =0 {😭} one {# kitten} other {# kittens}}",
  ],
  ["trailing.ws", "   Some whitespace   "],
  ["escaped.apostrophe", "A quoted value ''{value}'"],
  ["e695b", "No ID"],
  ["6995c", "inline no id"],
  ["inline", "formatted message"],
]);

import React, { Component } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
const msgs = defineMessages({
  header: {
    id: "foo.bar.baz",
    defaultMessage: "Hello World!",
    description: "The default message",
  },
  content: {
    id: "foo.bar.biff",
    defaultMessage: "Hello Nurse!",
    description: "Another message",
  },
  kittens: {
    id: "app.home.kittens",
    description: "Counts kittens",
    defaultMessage: "{count, plural, =0 {😭} one {# kitten} other {# kittens}}",
  },
  trailingWhitespace: {
    id: "trailing.ws",
    description: "Whitespace",
    defaultMessage: "   Some whitespace   ",
  },
  escaped: {
    id: "escaped.apostrophe",
    description: "Escaped apostrophe",
    defaultMessage: "A quoted value ''{value}'",
  },
  noId: {
    description: "no ID",
    defaultMessage: "No ID",
  },
  duplicateAsNoId: {
    description: "no ID",
    defaultMessage: "No ID",
  },
});
export default class Foo extends Component {
  render() {
    const msg = msgs.header;
    return (
      <div>
        <h1>
          <FormattedMessage {...msg} />
        </h1>
        <p>
          <FormattedMessage {...msgs.content} />
        </p>
        <p>
          <FormattedMessage {...msgs.kittens} />
        </p>
        <p>
          <FormattedMessage defaultMessage="inline no id" />
        </p>
        <p>
          <FormattedMessage
            id="inline"
            defaultMessage="formatted message"
            description="foo"
          />
        </p>
      </div>
    );
  }
}