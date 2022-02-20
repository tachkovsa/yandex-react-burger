module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  env: {
    browser: true,
  },
  rules: {
    'consistent-return': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'default-param-last': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};
