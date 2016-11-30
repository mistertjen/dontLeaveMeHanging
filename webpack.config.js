// var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const autoprefixer = require ( 'autoprefixer' )
const config = {
  entry: __dirname + '/public/js/main.js',
  output: {
    path: __dirname + '/public/js/',
    filename: 'webpack.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass", "postcss"]
      }
    ]
  },
  postcss: [
    autoprefixer( { browsers: ['last 2 versions'] } )
  ]
  // plugins: [
  //   new BrowserSyncPlugin( {
  //     host: 'localhost',
  //     port: 3000,
  //     server: { baseDir: ['frontend/public'] },
  //     notify: {
  //       styles:  [
  //           "display: none",
  //           "padding: 15px",
  //           "font-family: sans-serif",
  //           "position: fixed",
  //           "font-size: 0.9em",
  //           "z-index: 9999",
  //           "bottom: 0px",
  //           "right: 0px",
  //           "border-bottom-left-radius: 5px",
  //           "background-color: #1B2032",
  //           "margin: 0",
  //           "color: white",
  //           "text-align: center"
  //       ]
  //     }
  //   } )
  // ]
}

module.exports = config