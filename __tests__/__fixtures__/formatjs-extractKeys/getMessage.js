module.exports = function getMessage(key, locale) {
  const message = ({
    "foo.bar.baz": "Hello World!",
    "foo.bar.biff": "Hello Nurse!",
    "app.home.kittens": "{count, plural, =0 {😭} one {# kitten} other {# kittens}}",
    'trailing.ws': '   Some whitespace   ',
    'escaped.apostrophe': "A quoted value ''{value}'",
    'e695b': "No ID",
    "6995c": "inline no id",
    "inline": "formatted message"
  })[key];
  return message;
};
