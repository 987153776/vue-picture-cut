module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        targets: {
          ie: '11',
          browsers: ['> 0.2%', 'not dead']
        },
        // 不将 ES6 模块语法转换为 CommonJS（留给 Webpack 处理）
        modules: false,
        // 使用 core-js 进行 polyfill
        useBuiltIns: "usage", // 按需注入 polyfill
        corejs: {
          version: 3, // 使用 core-js@3
          proposals: true,  // 启用提案阶段的 polyfill
        },
      }
    ]
  ]
}
