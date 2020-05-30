const path = require('path')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

module.exports = {
  entry: {
    'index': PATHS.src + '/index.ts'
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'commonjs react',
   'react-dom': 'commonjs react-dom',
 },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(scss|css|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              parser: 'postcss-scss',
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                'src/styles/resources.scss',
              ],
            },
          },
        ],
      },
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.IgnorePlugin(/test\.ts$/),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve('./package.json'),
          to: '.',
        }
      ]
    }),
  ]
}