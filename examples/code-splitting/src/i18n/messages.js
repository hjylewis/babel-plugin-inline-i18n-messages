export const messages = {};

export function addMessages(idAndMessages) {
  idAndMessages.forEach(([id, message]) => {
    if (messages[id] && messages[id] !== message) {
      throw new Error('message what that id already exists');
    }
    messages[id] = message;
  });
}