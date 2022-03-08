module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  env: {
    browser: true,
  },
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
    'react/jsx-props-no-spreading': 'off',
  },
};
