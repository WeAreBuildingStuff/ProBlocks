module.exports = {
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}', '__test__/**/*.{ts,tsx}'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ]
};
