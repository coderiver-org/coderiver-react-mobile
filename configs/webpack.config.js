const path = require('path');
const webpack = require('webpack');
// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const theme = require('../package.json').theme;
const PROJECT_ROOT = path.join(__dirname, '../');
const SRC = path.join(PROJECT_ROOT, '/', 'src');
const PUBLIC = path.join(PROJECT_ROOT, '/', 'public');

module.exports = argv => ({
  mode: argv.mode,
  context: PROJECT_ROOT,
  entry: './src/index.tsx',
  output: {
    filename: '[name].[hash].js',
    path: PUBLIC,
  },

  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.module\.less$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },

      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'less-loader',
            options: {
              modules:false,
              modifyVars: theme,
              javascriptEnabled: true
          }},
        ],
        exclude: /\.module\.less$/,
      },

      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },

      {
        test: /\.ts$/,
        enforce: 'pre',
        use: ['tslint-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.css', 'json'],
    plugins: [new TsConfigPathsPlugin()],
  },

  plugins: [
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: `${SRC}/assets/images/favicon.ico`,
      inlineSource: 'runtime~.+\\.js',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // This plugin enables the “inlineSource” option
    new InlineSourcePlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(argv.mode),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(SRC, '/assets/images/logo.png'),
        to: path.join(PUBLIC),
      },
    ]),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  devServer: {
    contentBase: SRC,
    hot: true,
    host:"0.0.0.0",
    inline: true,
    disableHostCheck: true,
    historyApiFallback:true,
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
});
