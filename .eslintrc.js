module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'mocha': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'indent': ['error', 2, { "SwitchCase": 1 }],
    'linebreak-style': ['error','unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'array-bracket-newline': ['error', { multiline: true, minItems: 3 }],
    'object-curly-newline': ['error', { multiline: true, minProperties: 3 }],
    'array-bracket-spacing': ['error', 'never', { arraysInArrays: false, objectsInArrays: false }],
    'object-curly-spacing': ['error', 'always', { arraysInObjects: false, objectsInObjects: false }],
    'object-property-newline': ['error'],
    'comma-spacing': ['error'],
    'comma-style': ['error'],
    'comma-dangle': ['error', 'only-multiline'],
    'keyword-spacing': ['error'],
    'space-in-parens': ['error'],
    'no-trailing-spaces': ['error'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
    'quote-props': ['error', 'consistent-as-needed'],
    'arrow-spacing': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'arrow-parens': ['error', 'as-needed'],
    'prefer-const': ['error'],
    'rest-spread-spacing': ["error", "never"],
    'eol-last': ["error", "always"],
    'no-trailing-spaces': ["error"]
  }
}
