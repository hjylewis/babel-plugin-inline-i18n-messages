export const messages = {};

export function addMessages(idAndMessages) {
  idAndMessages.forEach(([id, payload]) => {
    const { message, ast } = payload;
    if (messages[id] && messages[id] !== message) {
      throw new Error('An i18n message with that id already exists');
    }
    messages[id] = ast || message;
  });
}