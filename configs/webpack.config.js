const path = require('path');
const webpack = require('webpack');
// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const theme = require('../package.json').theme;
const PROJECT_ROOT = path.join(__dirname, '../');
const SRC = path.join(PROJECT_ROOT, '/', 'src');
const PUBLIC = path.join(PROJECT_ROOT, '/', 'public');
const styleLoader = (mode) => mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

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
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },

      {
        test: /\.css$/,
        use: [
          styleLoader(argv.mode),
          'css-loader',
        ],
      },

      {
        test: /\.module\.less$/,
        use: [
          styleLoader(argv.mode),
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          'less-loader',
          'postcss-loader'
        ],
      },

      {
        test: /\.less$/,
        use: [
          styleLoader(argv.mode),
          { loader: 'css-loader' },
          { loader: 'less-loader', options: {modifyVars: theme }},
        ],
        exclude: /\.module\.less$/,
        include: /node_modules/,
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
    plugins: [
      new TsConfigPathsPlugin(),
    ],
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
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  devServer: {
    contentBase: SRC,
    hot: true,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
});
