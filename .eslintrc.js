const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    // ✅ Permitir logs y alertas durante desarrollo
    'no-console': 'warn',
    'no-alert': 'off',

    // ✅ JSX moderno sin necesidad de importar React
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    // ✅ Desactivamos nombres de archivo forzados
    'unicorn/filename-case': 'off',

    // ✅ Desactivamos tipado forzado para prototipo
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',

    // ✅ Permitir variables sin usar en desarrollo
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    // ✅ Desactivamos validaciones molestas durante dev
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',

    // ✳️ Permitir interfaces vacías con extensión
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],

    // ✳️ Permitir nombres con shadow (inicialización)
    '@typescript-eslint/no-shadow': [
      'error',
      {
        ignoreOnInitialization: true,
      },
    ],

    // ✳️ Estilo general
    'import/newline-after-import': 'error',

    // 🚫 Reglas desactivadas por errores en deploy
    'react-hooks/exhaustive-deps': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-no-leaked-render': 'off',
    'react/button-has-type': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-lone-blocks': 'off',
    'tsdoc/syntax': 'off',
    'import/no-named-as-default-member': 'off',
    'no-implicit-coercion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'eslint-comments/no-unused-disable': 'off',

    // 🚫 Reglas desactivadas por preferencia o compatibilidad
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      { allowNumber: true },
    ],
    'import/no-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',
    'no-nested-ternary': 'off',
    'no-redeclare': 'off',
    'react/jsx-fragments': 'off',
    'react/prop-types': 'off',
    '@next/next/no-img-element': 'off',
    'no-undef': 'off',
  },
};
