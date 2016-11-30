// get autoprefixer module for the postcss
const autoprefixer = require ( 'autoprefixer' )
const config = {
  // get the main.js file
  entry: __dirname + '/public/js/main.js',
  // create the webpack.js file
  output: {
    path: __dirname + '/public/js/',
    filename: 'webpack.js'
  },
  // use all these modules when creating
  module: {
    loaders: [
      {
        // 
        // look for all .js files
        test: /\.js$/,
        // expect for node_modules and bower_components
        exclude: /(node_modules|bower_components)/,
        // babel-loader used to transpile new JS to older versions which are readable by browsers etc.
        loader: 'babel-loader',
        // preset allows reading of es2015 and older
        query: {
          presets: ['es2015']
        }
      },
      {
        // look for .scss files
        test: /\.scss$/,
        // compile to normal css styles and run the postcss.
        loaders: ["style", "css", "sass", "postcss"]
      }
    ]
  },
  // transpile css to support last 2 versions of all browsers.
  postcss: [
    autoprefixer( { browsers: ['last 2 versions'] } )
  ]
}

module.exports = config