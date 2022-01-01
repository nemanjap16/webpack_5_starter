const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const PATHS = {
  src: path.join(__dirname, 'src'),
};

const config = {
  devtool: 'source-map',
  // application entry point
  entry: './src/index.js',
  /* 
  module should be before output
  also before dev server & plugins
  */
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: true,
        },
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|jpeg|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new PurgeCssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/template.html'),
      inject: 'body',
      hash: true,
    }),
  ],

  devServer: {
    open: true,
    hot: true,
    compress: true,
    // https: true, <-- optionally
    historyApiFallback: true,
    host: 'localhost',
    static: './dist',
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
