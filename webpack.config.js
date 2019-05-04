// Pliim

const { resolve } = require("path");

module.exports = {
  entry: {
    app: "./app/App.js",
    preferences: "./app/Preferences.js"
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname)
  },
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  }
};
