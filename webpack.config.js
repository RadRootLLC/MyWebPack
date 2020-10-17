const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  target: "web",
  devtool: "source-map",
  entry: {
    index: ["./src/index.js"],
  },
  output: {
    path: path.join(__dirname, "build"),
    publicPath: '/',
    filename: "bundle.[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "images/",
              context: 'src/images',
              esModule: false,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === "development" ? '[name].css' : '[name].[hash].css',
      chunkFilename: process.env.NODE_ENV === "development" ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "index.html",
      minify: false,
    }),
    new HtmlWebPackPlugin({
      template: "src/daycare-boarding.html",
      filename: "daycare-boarding.html",
      minify: false,
    }),
    new HtmlWebPackPlugin({
      template: "src/training.html",
      filename: "training.html",
      minify: false,
    }),
    new HtmlWebPackPlugin({
      template: "src/team.html",
      filename: "team.html",
      minify: false,
    }),
    new HtmlWebPackPlugin({
      template: "src/contact.html",
      filename: "contact.html",
      minify: false,
    }),
    new HtmlWebPackPlugin({
      template: "src/404.html",
      filename: "404.html",
      minify: false,
    }),
  ],
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    contentBase: "./public",
    open: true,
    inline: true,
    index: 'index.html',
    disableHostCheck: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
