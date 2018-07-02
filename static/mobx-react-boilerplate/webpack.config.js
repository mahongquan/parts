var path = require('path');
var webpack = require('webpack');

module.exports = {

 devServer: {
   historyApiFallback: true,
   hot: true,
   inline: true,
   progress: true,
   port: 3000,
   proxy: {
     '/rest/*': {
     target: 'http://127.0.0.1:8000',
     changeOrigin: true,
     secure: false
     }
   }
 },
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
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },
     {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },{
        test: /\.(woff|ttf|eot|woff2|svg|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }]
  }
};
