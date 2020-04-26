export const messages = {};

export function addMessages(idAndMessages) {
  idAndMessages.forEach(([id, message]) => {
    if (messages[id] && messages[id] !== message) {
      throw new Error('An i18n message with that id already exists');
    }
    messages[id] = message;
  });
}