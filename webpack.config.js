const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

// HTMLファイルを動的に取得し、必要なバンドルを割り当てる
const htmlPlugins = glob.sync('./src/**/*.html').map((file) => {
  const filename = path.relative('./src', file);

  let outputFilename;
  let chunks;

  if (filename === 'template/index.html') {
    outputFilename = 'template/index.html';
    chunks = ['template'];
  }

  return new HtmlWebpackPlugin({
    filename: outputFilename,
    template: file,
    inject: 'body',
    chunks,
    scriptLoading: 'module',
    minify: false,
    publicPath: '/direct-online/',
  });
});

module.exports = {
  mode: 'production',
  entry: {
    template: ['./src/js/utils.js', './src/js/template.js', './src/css/template.css'],
  },
  output: {
    filename: (pathData) => {
      if (pathData.chunk.name === 'template') {
        return 'template/js/[name].bundle.js';
      }
    },
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/direct-online/',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src'),
    },
    hot: true,
    open: true,
    watchFiles: {
      paths: ['src/**/*.html', 'src/**/*.css', 'src/**/*.js'],
      options: {
        usePolling: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|webp|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => {
        if (chunk.name === 'template') {
          return 'template/css/[name].css';
        }
      },
    }),
    ...htmlPlugins,
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/images', to: 'images' }],
    }),
  ],
};
