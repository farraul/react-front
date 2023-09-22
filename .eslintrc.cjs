module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'no-shadow': 0,
    'consistent-return': 0,
    'no-nested-ternary': 0,
    'no-console': 1,
    'no-case-declarations': 0,
    'import/prefer-default-export': 0,
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 0
  },
};
