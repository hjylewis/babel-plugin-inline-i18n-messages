module.exports = {
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
    }
};