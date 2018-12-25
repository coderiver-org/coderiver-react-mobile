const webpack = require('webpack');
const webpackConfig = require('../configs/webpack.config');

const config = webpackConfig({ mode: 'production' });

webpack(config, (err, stats) => {
  process.stdout.write(stats.toString() + '\n');
});
