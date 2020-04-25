export const messages = {};

export function addMessages(idAndMessages) {
  idAndMessages.forEach(([id, payload]) => {
    const { message, ast } = payload;
    if (messages[id] && messages[id] !== message) {
      throw new Error('message what that id already exists');
    }
    messages[id] = ast || message;
  });
}