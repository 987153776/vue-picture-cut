module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset',
    [
      '@vue/cli-plugin-babel/preset', {
        "modules": false,
        "useBuiltIns": "entry",
        "codejs":2
      }
    ]
  ]
}
