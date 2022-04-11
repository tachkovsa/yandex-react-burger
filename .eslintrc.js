module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    "plugin:cypress/recommended",
  ],
  env: {
    browser: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    "cypress"
  ],
  rules: {
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'no-multi-assign': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-useless-escape': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'consistent-return': 'off',
    'default-param-last': 'off',
    'guard-for-in': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/no-cycle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-children-prop': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/default-param-last': 'off',
  },
};
