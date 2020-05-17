// https://github.com/hjylewis/babel-plugin-inline-i18n-messages/issues/6

const messages = {
  en: {},
  es: {},
};

export function getMessages(locale) {
  return messages[locale];
}

export function addMessages(idAndMessages) {
  idAndMessages.forEach(([id, messageObject]) => {
    Object.keys(messageObject).forEach(locale => {
      messages[locale][id] = messageObject[locale];
    });
  });
}