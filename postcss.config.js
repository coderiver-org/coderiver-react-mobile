module.exports = {
  parser: 'postcss-less',
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',  // vmin is more suitable.
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    },
  }
}
