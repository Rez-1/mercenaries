module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-env',
  ],
  plugins: [
    ['template-html-minifier', {
      modules: {
        'lit-element': ['html', 'css'],
      },
      htmlMinifier: {
        caseSensitive: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }],
  ],
}
