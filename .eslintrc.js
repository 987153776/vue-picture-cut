module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    // --- 针对 TypeScript 声明文件 (.d.ts) ---
    {
      files: ['*.d.ts', '**/*.d.ts'], // 匹配所有 .d.ts 文件
      extends: [
        'plugin:@typescript-eslint/recommended', // 使用 TS 推荐规则
      ],
      parser: '@typescript-eslint/parser', // 关键：使用 TS 解析器
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json', // 如果你有 tsconfig，建议指向它
      },
      rules: {
        // 可以为 .d.ts 文件定制规则
        // 例如，在声明文件中，有些规则可能过于严格
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-interface': 'off', // 允许空接口
        // 其他你认为合适的规则...
      },
    },
  ]
}
