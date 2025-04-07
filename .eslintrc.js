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
    // ✳️ Variables sin usar
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    // ✳️ Interfaces vacías
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],

    // ✳️ Sombras de nombres
    '@typescript-eslint/no-shadow': [
      'error',
      {
        ignoreOnInitialization: true,
      },
    ],

    // ✅ Logs y alertas permitidos durante desarrollo
    'no-console': 'warn',
    'no-alert': 'off',

    // ✅ Relajamos tipado forzado en funciones
    '@typescript-eslint/explicit-function-return-type': 'off',

    // ✅ Permitimos `any` y asignaciones inseguras (para prototipo)
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',

    // ✅ Desactivamos filename-case (para no renombrar ahora)
    'unicorn/filename-case': 'off',

    // ✅ No obliga a usar `import type`
    '@typescript-eslint/consistent-type-imports': 'off',

    // ✳️ Estilo general
    'import/newline-after-import': 'error',
    'react/jsx-uses-react': 'error',
    'react/react-in-jsx-scope': 'error',

    // 🚫 Reglas desactivadas por preferencia o compatibilidad
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
    'import/no-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',
    'no-nested-ternary': 'off',
    'no-redeclare': 'off',
    'react/jsx-fragments': 'off',
    'react/prop-types': 'off',
    '@next/next/no-img-element': 'off',
  },
};
