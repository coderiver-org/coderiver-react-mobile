const webpack = require('webpack');
const webpackConfig = require('../configs/webpack.config');
const webpackDevServer = require('webpack-dev-server');

const config = webpackConfig({ mode: 'development' });

const options = {
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config);

const devServerOptions = Object.assign({}, config.devServer, {
  stats: {
    colors: true,
  },
});

const server = new webpackDevServer(compiler, devServerOptions);

server.listen(8080, '0.0.0.0', () => {
  console.log('Starting server on http://localhost:8080');
});
