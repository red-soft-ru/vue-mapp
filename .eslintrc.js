module.exports = {
  extends: [
    'standard',
    'plugin:vue/recommended',
  ],
  rules: {
    semi: ['error', 'never'],
    indent: [
      'error',
      2,
      {
        ObjectExpression: 1,
        ArrayExpression: 1,
        flatTernaryExpressions: true,
        SwitchCase: 1,
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'array-bracket-newline': ["error", "consistent"],
    'guard-for-in': 'off',
    'object-curly-spacing': ['error', 'always'],
    'require-jsdoc': 'off',
    'space-before-function-paren': ['error', 'never'],
    "comma-dangle": ["error", "always-multiline"],
    "vue/no-v-html": 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/attribute-hyphenation': [2, 'always'],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      },
    ],
    'no-console': process.env.PRE_COMMIT ? [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ] : 'off',
    'no-useless-escape': 0,
  },
};