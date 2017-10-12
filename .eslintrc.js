module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: [
    'react'
  ],
  settings: {
    react: {
      'jsx-boolean-value': 'always'
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'arrow-body-style': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-closing-bracket-location': [1, 'after-props'],
    'react/jsx-boolean-value': 0,
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.js',
          '.jsx',
        ],
      },
    ],
    'react/no-danger': 0,
    'strict': 0,
    'prefer-template': 0,
    'consistent-return': 0,
    'no-case-declarations': 0,
    'no-console': [
      'warn',
      { allow: [
        'warn',
        'error'
      ]}
    ],
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 0,
    'no-prototype-builtins': 0,
  },
  env: {
    browser: true
  }
};
