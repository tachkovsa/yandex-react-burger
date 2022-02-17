module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  env: {
    browser: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'default-param-last': 'off',
  },
};
