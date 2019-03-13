module.exports = {
    "extends": "airbnb-base",
    "env": {
      "browser": true,
      "node": true,
      "jest": true,
      "jquery": true,
      "mongo": true,
      "es6": true
    },
    "rules": {
      "comma-dangle": "warn",
      "no-console": "off",
      "no-unused-vars": [
        "warn",
        {
          "vars": "local",
          "args": "none"
        }
      ],
      "linebreak-style": 0,
      "arrow-parens": [2, "as-needed"],
      "no-param-reassign": 0,
    }
  };