module.exports = {
  extends: [
    '@repo/eslint-config/react', // Note: Use @repo/eslint-config/react without .js extension
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended' // Base TypeScript settings
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json' // Ensure this path is correct relative to ESLint config
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/stylistic-type-checked' // Add other TypeScript configs if needed
      ]
      // Add any TypeScript specific rules or settings here if necessary
    }
  ],
  rules: {
    'react/prop-types': 'off'
  }
};
