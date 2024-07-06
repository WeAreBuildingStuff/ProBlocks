export default {
  extends: [
    "@repo/eslint-config/next.js",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json" 
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
