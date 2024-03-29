
let path = require('path')
const resolve = (...p) => require('path').resolve(__dirname, ...p)
let HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

module.exports = {
	mode: 'none',
	// 需要import引入
	entry: {
		a: './src/ts/a.ts',
		b: './src/ts/b.js',
	},
	// 不需要import引入
	// entry: {
  //   ...entryPath(__dirname+'/src/ts')
	// },
	output: {
		filename: 'js/[name].js',
		path: path.join(__dirname, './dist'),
		// publicPath: './dist',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					configFile: resolve('./tsconfig.json'),
					onlyCompileBundledFiles: false,
				}
			},
			{
				test: /\.(less|css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// publicPath: './css'
							// 这里可以指定一个 publicPath
							// 默认使用 webpackOptions.output中的publicPath
							// outputPath: '../../../styles'
						},
					},
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true,
								// modifyVars: theme,
							},
							// limit: 10000,
							// name: 'css/[name].[hash:7].[ext]',
						}
					}
				],
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'file-loader'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				// include: [resolve('./assets')],
				use: [
					{
						loader: 'url-loader',
						// limit: 8 * 1024,
						
						// esModule: false 
					},
				]
			},
			// {
			// 	test: /\.html$/,
			// 	use: ['file-loader?name=[path][name].[ext]!extract-loader!html-loader']
			// }
			// {
			// 	test:/\.html$/,
			// 	// test: /\.html$/i,
			// 	use:[
			// 			{
			// 					loader:"html-loader",
			// 					options:{
			// 							attrs:["img:src"]  //此处的参数值  img是指html中的 <img/> 标签， src是指 img的src属性   表示 html-loader 作用于 img标签中的 src的属性
			// 					}
			// 			}
			// 	]
			// }	
		],
	},
	resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@': resolve( '../src' )
    }
  },
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'webpack10',
			template: 'index.html'	
		}),
		new MiniCssExtractPlugin({
			filename: 'css/base.css',
			chunkFilename: '[id].css',
		}),
		new CopyPlugin({
      patterns: [
				{	
					from: path.join(__dirname, './src/images'),  
					to: path.join(__dirname, './dist/images'), 
				},
      ],
    }),
	],
	optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        common: {
					name: 'common',	
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
				// runtime: {
				// 	name: 'runtime',
				// 	test: /ts/,
        //   priority: -20,
        // }
      }
    }
  },
}

// 读取入口文件
function entryPath(currentDirPath) {
  let entryObj = {};
  let arrPath = fs.readdirSync(currentDirPath)
  arrPath.forEach((item) => {
    entryObj[item.split('.')[0]] = path.resolve(__dirname, './src/ts/'+item)
  })
  return entryObj;
}