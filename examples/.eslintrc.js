module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "globals": {
    "process": "readonly"
  },
  "extends": [
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "sourceType": "module",
      "allowImportExportEverywhere": true
  },
  "plugins": [
      "react"
  ],
};