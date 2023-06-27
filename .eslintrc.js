module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:solid/typescript'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'solid'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      },
      'alis' : {
        'extensions': [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ],
        'map': [
          ['@', './src'],
          ['@utils', './src/utils'],
          ['@consts', './src/consts'],
          ['@layouts', './src/layouts'],
          ['@services', './src/services'],
          ['@components', './src/components'],
        ]
      }
    }
  }
};
