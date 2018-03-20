const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
	filename: "[name].css",
	disable: process.env.NODE_ENV === "development"
});
module.exports = {
	target: "web",
	devtool: "source-map",
	entry: {
		index: ["./src/index.js"],
		fontawesome: ["./src/js/fontawesome.js"]
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "js/[name].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env", "minify"]
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						{
							loader: "css-loader",
							options: {
								minimize: {
									discardComments: {
										removeAll: true
									}
								}
							}
						},
						{
							loader: "postcss-loader"
						},
						{
							loader: "sass-loader"
						}
					],
					fallback: "style-loader",
					allChunks: true
				})
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
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		extractSass,
		new HtmlWebPackPlugin({
			template: "src/index.html",
			filename: "index.html"
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				index: {
					name: "index",
					test: "index",
					enforce: true
				},
				bootstrap: {
					test: new RegExp("node_modules" + "\\" + path.sep + "bootstrap.*"),
					chunks: "initial",
					name: "bootstrap",
					enforce: true
				},
				fontawesome: {
					name: "fontawesome",
					test: "fontawesome",
					enforce: true
				},
				jquery: {
					test: new RegExp("node_modules" + "\\" + path.sep + "jquery.*"),
					chunks: "initial",
					name: "jquery",
					enforce: true
				},
				popper: {
					test: new RegExp("node_modules" + "\\" + path.sep + "popper.*"),
					chunks: "initial",
					name: "popper",
					enforce: true
				}
			}
		}
	},
	devServer: {
		host: "localhost",
		port: 3000,
		contentBase: "./public",
		open: true,
		inline: true,
		disableHostCheck: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	}
};
