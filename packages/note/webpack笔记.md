# [webpack](https://segmentfault.com/a/1190000006178770)
- 什么是webpack（通过node开发出来）
模块打包机：
  1）分析你的项目结构，通过一个给定的主文件（index.js）找到你项目的所有依赖文件
  2）找到javascript模块和其他浏览器不能直接运行的拓展语言，通过loader处理他们
  3）将其转换并打包成一个（或多个）浏览器可识别的javaScript文件
- 作用
  1）合并多个js为一个（一次http请求）
  2）模块化开发
  3）编译less、scss、es6、es7等
  4）编译图片为base64格式，减少网络请求
- 什么地方适合使用
  1）webpack非常适合单页面应用程序使用
  2）不太适合与多页面的普通网站结合使用
  3）vue/react/angular都适合使用webpack进行项目构建
1. 在package.json
(可以连webpack(非全局安装需使用node_modules/.bin/webpack)这条命令都可以不用)
```json
{
  "name": "webpack-sample-project",
  "version": "1.0.0",
  "description": "Sample webpack project",
  "scripts": {
    "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
  },
  "author": "zhang",
  "license": "ISC",
  "devDependencies": {
    "webpack": "3.10.0"
  }
}
```
2. webpack.config.js 
```js
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```
3. Source Maps(使调试更容易)
```js
module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  }
}
```
4. 使用webpack构建本地服务器（监听代码，自动刷新显示修改后的效果）
```js
npm install --save-dev webpack-dev-server
// webpack.config.js
module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
}
// package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
  }
```
5. Loaders(通过不同loader，webpack能对不同文件处理)
  - test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
  - loader：loader的名称（必须）
  - include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
  - query：为loaders提供额外的设置选项（可选）
6. Babel（babel-loader）
```js
const webpack = require('webpack');
module.exports = {
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究')
    ],
};
```
7. 插件（Plugins）
总结：webpack负责打包，loader负责编译不同类型文件，Plugins是webpack的功能插件



