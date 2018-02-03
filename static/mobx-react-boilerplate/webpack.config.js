var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer:{proxy: {
     '/rest/*': {
     target: 'http://localhost:8000',
     changeOrigin: true,
     secure: false
     }
 }},
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
           test: /\.css$/,
           use: ['style-loader', 'css-loader']
      },{
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
     {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            use: 'file-loader?publicPath=./&outputPath=font/'
        }
     ]
  }
};
