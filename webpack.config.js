// core modules
const isProduction = require('./env').prodEnvironment;
const webpack = require('webpack');
const path = require('path');
const postcssUrl = require('postcss-url');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BaseHrefPlugin = require('base-href-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

// config contant
const baseHref = "";
const deployUrl = "";
const entryPoints = ["polyfills", "styles", "main"];

let plugins = [
	new webpack.ProgressPlugin(),
	new HtmlWebpackPlugin({
		"template": __dirname+"/src/index.html",
		"filename": "./index.html",
		"hash": false,
		"inject": true,
		"compile": true,
		"favicon": false,
		"minify": isProduction,
		"cache": true,
		"showErrors": true,
		"chunks": "all",
		"excludeChunks": [],
		"title": "TP React Seeder",
		"xhtml": true,
		"chunksSortMode": function sort(left, right) {
			let leftIndex = entryPoints.indexOf(left.names[0]);
			let rightindex = entryPoints.indexOf(right.names[0]);

			if(leftIndex > rightindex) {
				return 1;
			}
			else if(leftIndex < rightindex) {
				return -1;
			}
			else {
				return 0;
			}
		}
	}),
	new BaseHrefWebpackPlugin({})
];

if(isProduction) {
	plugins = plugins.concat([
		new webpack.optimize.UglifyJsPlugin({ 
			mangle: false, 
			sourcemap: false,
			compress: {
		        warnings: false,
		        pure_getters: true,
		        unsafe: true,
		        unsafe_comps: true,
		        screw_ie8: true
	      	}
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.styl$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0
		})
	]);
}

const postcssPlugins = function () {
	// safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
	const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
	const minimizeOptions = {
		autoprefixer: false,
		safe: true,
		mergeLonghand: false,
		discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
	};
	return [
		postcssUrl({
			url: (URL) => {
				// Only convert root relative URLs, which CSS-Loader won't process into require().
				if (!URL.startsWith('/') || URL.startsWith('//')) {
					return URL;
				}

				if (deployUrl.match(/:\/\//)) {
					// If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
					return `${deployUrl.replace(/\/$/, '')}${URL}`;
				}
				else if (baseHref.match(/:\/\//)) {
					// If baseHref contains a scheme, include it as is.
					return baseHref.replace(/\/$/, '') +
					`/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
				}
				else {
					// Join together base-href, deploy-url and the original URL.
					// Also dedupe multiple slashes into single ones.
					return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
				}
			}
		}),
		autoprefixer(),
	].concat(isProduction ? [cssnano(minimizeOptions)] : []);
};

module.exports = {
	devtool: !isProduction? "inline-sourcemap" : null,
	entry: {
		main: ['./src/main.js'],
		styles: ['./src/main.styl'],
		polyfills: ['./src/polyfills.js']
	},
	output: {
		path: __dirname+'/dist',
		filename: "[name].bundle.js",
		chunkFilename: "[id].chunk.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2016', 'stage-1'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
				}
			},
			{
				exclude: [
					__dirname+"/src/main.styl"
				],
				test: /\.css$/,
				use: [
					"exports-loader?module.exports.toString()",
					{
						loader: "css-loader",
						options: {
							sourceMap: false,
							importLoaders: 1
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: postcssPlugins
						}
					}
				]
			},
			{
				exclude: [
					__dirname+"/src/main.styl"
				],
				test: /\.styl$/,
				use: [
					"exports-loader?module.exports.toString()",
					{
						loader: "css-loader",
						options: {
							sourceMap: false,
							importLoaders: 1
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: postcssPlugins
						}
					},
					{
						loader: "stylus-loader",
						options: {
							"sourceMap": false,
							"paths": []
						}
					}
				]
			},
			{
				include: [
					__dirname+"/src/main.styl"
				],
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: false,
							importLoaders: 1
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: postcssPlugins
						}
					}
				]
			},
			{
				include: [
					__dirname+"/src/main.styl"
				],
				test: /\.styl$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: false,
							importLoaders: 1
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: postcssPlugins
						}
					},
					{
						loader: "stylus-loader",
						options: {
							sourceMap: false,
							paths: []
						}
					}
				]

			},
			{
				test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|cur|ani)$/,
				loader: "url-loader?name=[name].[hash:20].[ext]&limit=10000"
			}			
		]
	},
	plugins: plugins,
	devServer: {
		historyApiFallback: true
	}
}