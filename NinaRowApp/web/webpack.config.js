const path = require("path");

module.exports = {
  entry: "./index.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname)
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'file-loader'
      }
    ]
  }
};
