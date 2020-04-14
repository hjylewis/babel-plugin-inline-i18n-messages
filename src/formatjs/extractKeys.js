const execa = require("execa");

module.exports = function extractKeys(filename) {
  const args = ["extract"].concat(filename);

  const { stdout } = execa.sync("formatjs", args, {
    preferLocal: true,
    encoding: "utf8",
  });

  const messages = JSON.parse(stdout);

  const keys = messages.map((message) => ({
    key: message.id,
    defaultMessage: message.defaultMessage,
  }));
  return keys;
};
