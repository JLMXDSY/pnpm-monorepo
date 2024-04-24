# vue
## 项目搭建
### A.环境配置
1. node环境（用npm/yarn和webpack）
2. 全局安装vue-cli（脚手架）以下是vue-cli2.x的vue-cli3.x请参考官网[@vue/cli](https://cli.vuejs.org/zh/guide/)
```js
npm install -g vue-cli 
npm install webpack -g
```
3. 搭建vue项目
```js
vue init webpack vue-demo
```
4. 生成目录结构
![总框架](https://img-blog.csdn.net/20171126152635816)
![bulid](https://img-blog.csdn.net/20171126152702891)
![config](https://img-blog.csdn.net/20171126152742787)

### B.基础文件
1. 主页
![index](https://img-blog.csdn.net/20171126152954909)
2. 跟组件
![App.vue](https://img-blog.csdn.net/20171126153026332)
3. 入口文件
![main](https://img-blog.csdn.net/20171126153302816)
4. 路由配置文件
![router](https://img-blog.csdn.net/20171126153359275)

### C.配置
1. 安装依赖
```js
npm install 依赖包
"devDependencies": {
    "autoprefixer-loader": "^3.2.0",
    "babel-core": "^6.18.2",
    "babel-loader": "^6.2.7",
    "babel-plugin-transform-runtime": "^6.15.0",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-stage-0": "^6.16.0",
    "babel-runtime": "^6.18.0",
    "css-loader": "^0.25.0",
    "debug": "^2.2.0",
    "express": "^4.14.0",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.9.0",
    "html-webpack-plugin": "^2.24.1",
    "jquery": "^3.1.1",
    "less": "^2.7.1",
    "less-loader": "^2.2.3",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "vue-hot-reload-api": "^1.2.0",
    "vue-html-loader": "^1.2.3",
    "vue-loader": "^7.3.0",
    "webpack": "^1.13.3",
    "webpack-dev-middleware": "^1.8.4",
    "webpack-dev-server": "^1.16.2",
    "webpack-hot-middleware": "^2.13.1"
  },
  "dependencies": {
    "vue": "^1.0.26",
    "vue-router": "^0.7.13"
  }
```

2. config/index.js
```js
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
```
3. 运行项目
```js
npm run dev
```

4. webpack.config.js（基础配置文件)

```js
// 引入依赖模块
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 入口文件，路径相对于本文件所在的位置，可以写成字符串、数组、对象
    entry: {
        // path.resolve([from ...], to) 将to参数解析为绝对路径
        index:path.resolve(__dirname, '../src/entry/index.js'),
        // 需要被提取为公共模块的群组
        vendors:['vue','vue-router','jquery'],
    },

    // 输出配置
    output: {
        // 输出文件，路径相对于本文件所在的位置
        path: path.resolve(__dirname, '../output/static/js/'),

        // 设置publicPath这个属性会出现很多问题：
        // 1.可以看成输出文件的另一种路径，差别路径是相对于生成的html文件；
        // 2.也可以看成网站运行时的访问路径；
        // 3.该属性的好处在于当你配置了图片CDN的地址，本地开发时引用本地的图片资源，上线打包时就将资源全部指向CDN了，如果没有确定的发布地址不建议配置该属性，特别是在打包图片时，路径很容易出现混乱，如果没有设置，则默认从站点根目录加载
        // publicPath: '../static/js/',

        // 基于文件的md5生成Hash名称的script来防止缓存
        filename: '[name].[hash].js',
        // 非主入口的文件名，即未被列在entry中，却又需要被打包出来的文件命名配置
        chunkFilename: '[id].[chunkhash].js'
    },

    // 其他解决方案
    resolve: {
        // require时省略的扩展名，遇到.vue结尾的也要去加载
        extensions: ['','.js', '.vue'],
        // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
        alias:{}
    },    

    // 不进行打包的模块
    externals:{
        'vue':'Vue', //后期不会打包，通过外网引入
        'axios':'axios',
        'vue-router':'VueRouter',
        'echarts':'echarts'
    },

    // 模块加载器
    module: {
        // loader相当于gulp里的task，用来处理在入口文件中require的和其他方式引用进来的文件，test是正则表达式，匹配要处理的文件；loader匹配要使用的loader，"-loader"可以省略；include把要处理的目录包括进来，exclude排除不处理的目录       
        loaders: [
            //  使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/, 
                loader: 'vue-loader',
                exclude: /node_modules/    
            },
            // 使用babel 加载 .js 结尾的文件
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query:{
                    presets: ['es2015', 'stage-0'],  
                    plugins: ['transform-runtime']                      
                }
            }, 
            // 使用css-loader和style-loader 加载 .css 结尾的文件
            {  
                test: /\.css$/,                  
                // 将样式抽取出来为独立的文件
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader"),
                exclude: /node_modules/
            },
            // 使用less-loader、css-loader和style-loade 加载 .less 结尾的文件
            {  
                test: /\.less$/,                  
                // 将样式抽取出来为独立的文件
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader"),
                exclude: /node_modules/
            },           
            // 加载图片
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                    limit: 10000,
                    // 路径要与当前配置文件下的publicPath相结合
                    name:'../img/[name].[ext]?[hash:7]'
                }
            },
            // 加载图标
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: 'file-loader',
                query: {               
                    // 把较小的图标转换成base64的字符串内嵌在生成的js文件里    
                    limit: 10000,
                    name:'../fonts/[name].[ext]?[hash:7]',
                    prefix:'font'
                }
            },              
        ]         
    },

    // 配置插件项
    plugins: []  
}
```
5. webpack.dev.config.js（开发环境下的配置文件）

```js
// 引入依赖模块
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 引入基本配置
var config = require('./webpack.config.js');

// 必须修改原配置中网站运行时的访问路径，相当于绝对路径，修改完之后，当前配置文件下的很多相对路径都是相对于这个来设定；
// 注意：webpack-dev-server会实时的编译，但是最后的编译的文件并没有输出到目标文件夹，而是保存到了内存当中
config.output.publicPath = '/';

// 重新配置模块加载器
config.module= {
    // test是正则表达式，匹配要处理的文件；loader匹配要使用的loader，"-loader"可以省略；include把要处理的目录包括进来，exclude排除不处理的目录       
    loaders: [
        //  使用vue-loader 加载 .vue 结尾的文件
        {
            test: /\.vue$/, 
            loader: 'vue-loader',
            exclude: /node_modules/    
        },
        // 使用babel 加载 .js 结尾的文件
        {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query:{
                presets: ['es2015', 'stage-0'],  
                plugins: ['transform-runtime']                      
            }
        }, 
        // 使用css-loader、autoprefixer-loader和style-loader 加载 .css 结尾的文件
        {  
            test: /\.css$/,                  
            // 将样式抽取出来为独立的文件
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader"),
            exclude: /node_modules/
        },
        // 使用less-loader、autoprefixer-loader、css-loader和style-loade 加载 .less 结尾的文件
        {  
            test: /\.less$/,                  
            // 将样式抽取出来为独立的文件
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader"),
            exclude: /node_modules/
        },           
        // 加载图片
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            query: {
                // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                limit: 10000,
                // 路径和生产环境下的不同，要与修改后的publickPath相结合
                name: 'img/[name].[ext]?[hash:7]'
            }
        },
        // 加载图标
        {
            test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
            loader: 'file-loader',
            query: {                   
                limit: 10000,
                // 路径和生产环境下的不同，要与修改后的publickPath相结合
                name:'fonts/[name].[ext]?[hash:7]',
                prefix:'font'
            }
        },              
    ]         
};

// 重新配置插件项
config.plugins = [
    // 位于开发环境下
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),

    // 自动生成html插件，如果创建多个HtmlWebpackPlugin的实例，就会生成多个页面
    new HtmlWebpackPlugin({
        // 生成html文件的名字，路径和生产环境下的不同，要与修改后的publickPath相结合，否则开启服务器后页面空白
        filename: 'src/pages/index.html',
        // 源文件，路径相对于本文件所在的位置
        template: path.resolve(__dirname, '../src/pages/index.html'),
        // 需要引入entry里面的哪几个入口，如果entry里有公共模块，记住一定要引入
        chunks: ['vendors','index'],
        // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
        inject: 'body',
        // 生成html文件的标题
        title:''
        // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
        // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
    }),    

    // 提取css单文件的名字，路径和生产环境下的不同，要与修改后的publickPath相结合
    new ExtractTextPlugin("[name].[contenthash].css"),    

    // 提取入口文件里面的公共模块
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.js',
    }),    

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurenceOrderPlugin(),

    // 模块热替换插件
    new webpack.HotModuleReplacementPlugin(),

    // 允许错误不打断程序
    new webpack.NoErrorsPlugin(),

    // 全局挂载插件
    new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery"
    })        
];

// vue里的css也要单独提取出来
config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract("css")
    }
};

// 启用source-map，开发环境下推荐使用cheap-module-eval-source-map
config.devtool='cheap-module-eval-source-map';

// 为了实现热加载，需要动态向入口配置中注入 webpack-hot-middleware/client ，路径相对于本文件所在的位置
// var devClient = 'webpack-hot-middleware/client';
// 为了修改html文件也能实现热加载，需要修改上面的devClient变量，引入同级目录下的dev-client.js文件
var devClient = './build/dev-client';
// Object.keys()返回对象的可枚举属性和方法的名称
Object.keys(config.entry).forEach(function (name, i) {
    var extras = [devClient];
    config.entry[name] = extras.concat(config.entry[name]);
})

module.exports = config;
```

6. webpack.prod.config.js（生产环境下的配置文件）

```js
// 引入依赖模块
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 引入基本配置
var config = require('./webpack.config');

// 重新配置插件项
config.plugins = [
    // 位于生产环境下
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),

    // 自动生成html插件，如果创建多个HtmlWebpackPlugin的实例，就会生成多个页面
    new HtmlWebpackPlugin({
        // 生成html文件的名字，路径相对于输出文件所在的位置
        filename: '../../html/index.html',
        // 源文件，路径相对于本文件所在的位置
        template: path.resolve(__dirname, '../src/pages/index.html'),
        // 需要引入entry里面的哪几个入口，如果entry里有公共模块，记住一定要引入
        chunks: ['vendors','special','index'],
        // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
        inject: 'body',
        // 生成html文件的标题
        title:'',
        // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
        // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
    }),      

    // 提取css单文件的名字，路径相对于输出文件所在的位置
    new ExtractTextPlugin("../css/[name].[contenthash].css"),    

    // 提取入口文件里面的公共模块
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.js',
    }),   
    
    // 压缩js代码
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        // 排除关键字，不能混淆
        except:['$','exports','require']
    }),

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurenceOrderPlugin(),

    // 全局挂载插件，当模块使用这些变量的时候，wepback会自动加载，区别于window挂载
    new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery"
    })   
];

// vue里的css也要单独提取出来
config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract("css")
    }
};

// 开启source-map，生产环境下推荐使用cheap-source-map或source-map，后者得到的.map文件体积比较大，但是能够完全还原以前的js代码
config.devtool='source-map';
// 关闭source-map
// config.devtool=false;

module.exports = config;
```

7. dev-server.js（服务器配置文件）

```js
// 引入依赖模块
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config.js');

// 创建一个express实例
var app = express();

// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// 调用webpack并把配置传递过去
var compiler = webpack(config);

// 使用 webpack-dev-middleware 中间件，搭建服务器
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

// 使用 webpack-hot-middleware 中间件，实现热加载
var hotMiddleware = require('webpack-hot-middleware')(compiler);

// 为了修改html文件也能实现热加载，使用webpack插件来监听html源文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' });
        cb();
    })
});

// 注册中间件
app.use(devMiddleware);
app.use(hotMiddleware);

// 监听 8888 端口，开启服务器
app.listen(8888, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:8888');
})
```
7. dev-client.js（配合dev-server.js监听html文件改动也能够触发自动刷新）

```js
// 引入 webpack-hot-middleware/client 
var hotClient = require('webpack-hot-middleware/client');

// 订阅事件，当 event.action === 'reload' 时执行页面刷新
hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload();
    }
})
```

8. 简化命令行

```js
//为了不必每次构建项目都要输入webpack --display-modules --display-chunks --config build/webpack.config.js这条长命令，我们在package.js文件中修改“scripts”项
"scripts": {
  "build":"webpack --display-modules --display-chunks --config build/webpack.config.js",
  "dev":"node ./build/dev-server.js"
}
```
### D.打包优化
1. 打包分析
```js
npm run pack --report
```
2. externals优化
> 外网资源提供（https://www.bootcdn.cn)

```js
// 不进行打包的模块
    externals:{
        // '模块名：构造函数名'
        'vue':'Vue', //后期不会打包，通过外网引入
        'axios':'axios',
        'vue-router':'VueRouter',
        'echarts':'echarts'
    }
// 在index.html引入外网资源

```
3. 组件库按需引入
4. 服务器网络传输优化compression


## SPA

- 特点：
  - 只有一个应用程序文件
  - 浏览器一开始请求页面，必须加载对应的 html、css、js
  - 页面数据都是 ajax 请求回来的
  - 适合用在后台管理系统
- 优点
  - 实现前后端分离
  - 用户体验好，内容改变不用重新加载页面
- 缺点
  - 对 SEO 不友好
  - 首屏加载慢

### SPA 原生实现

```js
<template>
    <div>
      <h2>App根组件(03)</h2>
      <p>
        <!--给如下超链接设置#锚点，使得可以切换不同组件显示
        语法： #xxx  或  #/xxx[推荐]
        -->
        <a href="#/mv" >电影</a>
        <a href="#/ms" >音乐</a>
        <a href="#/at" >关于</a>
      </p>
      <hr>
      <!--
        显示具体子级组件内容 关于/电影/音乐
        我们更适合在此处放一个"代表",随着条件变化，其可以分别代表 关于/电影/音乐 的组件 并显示
        代表是 component 组件名称
        语法：
            <component is="组件标签名称"></component>
            根据is的属性值显示对应的的组件
      -->
      <component :is="showcom"></component>
    </div>
</template>

<script>
// 引入 关于/电影/音乐 3个组件
import Movie from './Movie.vue'
import Music from './Music.vue'
import About from './About.vue'

export default {
  // #/xxx 的锚点信息在浏览器来看，就是hash值(锚点信息)
  // 浏览器本身有一个事件，名称为onhashchange，在锚点信息发生变化的时候，该事件会执行
  // 在vue生命周期函数 created 中使用onhashchange
  created(){
    // 事件函数请通过箭头函数定义(释放this到外部)
    window.onhashchange = ()=>{
      // 在此事件中把变化后的"锚点信息"获得出来
      // 语法：
      //     window.location.hash  // 获得锚点(hash)信息
      // console.log(window.location.hash);   // #/at  #/mv  #/ms

      var hs = window.location.hash
      // 判断锚点显示对应的组件
      switch(hs){
        case '#/mv':
          this.showcom = 'my-movie'
          break
        case '#/ms':
          this.showcom = 'my-music'
          break
        case '#/at':
          this.showcom = 'my-about'
          break
      }
    }
  },

  data(){
    return {
      // 默认显示电影组件
      showcom: 'my-movie'
    }
  },
  // 注册3个子组件
  components:{
    // 组件标签名称: 组件模块
    'my-movie': Movie,
    'my-music': Music,
    'my-about': About
  }
}
</script>

<style lang="less" scoped>
</style>
```

## 路由

原理：组件切换的封装

```js
<template>
    <div class="root">
      <h2>App根组件(04-嵌套路由)</h2>
      <p>
        <!--
          通过VueRouter方式设置锚点超链按钮
          <router-link to="锚点信息">按钮文字提示</>
          tag把默认a标签换成其他标签
        -->
        <router-link to="/mv" tag="li">电影</router-link>
        <router-link to="/ms">音乐</router-link>
        <router-link to="/at">关于</router-link>
      </p>
      <hr>
      <!--
        通过VueRouter的方式设置组件显示占位符
      -->
      <router-view></router-view>
    </div>
</template>

<script>

export default {
}
</script>

<style lang="less" scoped>
.router-link-active {background-color: lightgreen;}
.root {border: 1px solid orange;padding:10px;}
</style>
```

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 2) 把VueRouter注册给Vue
Vue.use(VueRouter)

// 3) 引入 关于/电影/音乐 的3个组件
import Movie from './Movie.vue'
import Music from './Music.vue'
import About from './About.vue'
//   引入 音乐相关 的 各个第3级别vue文件
import Dong from './MusicType/Dong.vue'
import Detail from './Detail.vue'

// 4) 实例化一个VueRouter对象，并在该实例化构造函数参数中设置 锚点 和  组件 的对应关系
//    注意，通过"router"接收对象，router关键字不要修改
const router = new VueRouter({
  routes:[
    // {path:'/', redirect:'锚点路由信息'}
    {path:'/', redirect: '/mv'},
    //:mid 表示后期是一个变化的参数，参数名就是mid（同一组件不同内容的详情不同）
    //props:true 表示当前路由有参数需要传递
    {path:'/mv/', component: Movie},
    {path:'/dt/:mid', props:true, component:Detail,name:'xianqing'}
    {path:'/ms', component: Music, redirect:'/ms/hua', children:[
      {path:'/ms/hua', component: Hua}
    ]},
    {path:'/at', component: About}
  ],
  linkActiveClass:'helloabc' //改router-link-active默认名
})

// 引入App组件
import App from './App.vue'

var vm = new Vue({
  // 5) 把router注册给Vue(注册的是 锚点 和 组件的 对应关系)
  router,
  el:'#app',
  render:c=>c(App)
})

```

## vue传值

#### vue组件(父亲传值给儿子)（已经会了）

```
在父组件中，以标签形式使用子组件的时候，可以通过属性绑定，为子组件传递数据
	父组件:
		<my-son msg1="xxxx" :msg2='yyyy' ></my-son>
在子组件中，定义 props 数组来接收父组件传递来的数据
	子组件:
		  <script>
         export default {
           props: ['msg1', 'msg2']
         }
```

#### vue组件(儿子给父亲传值)（已经会了）

```vue
子组件向父组件传递数据的步骤：
 	父组件 向子组件 传递一个事件
 	子组件 调用 父组件 传递过来的事件，并传递相关的数据
 	父组件 通过事件参数获得子组件传递过来的数据并使用
 父组件向子组件传递方法:
 		<子组件 @func1="show"></子组件>
          ...
          methods:{
          show(arg1,arg2){xxxx}
          }
子组件中：
	给元素设置事件，在事件中通过$emit触发父组件传递过来的事件，并把数据通过   
    	this.$emit('func1',参数,参数)
		this:当前子组件对象
		$emit:通过这个关键字可以使得子组件可以调用 父组件 的事件
```

#### vue组件(兄弟之间传值)(已经会了)

```vue
定义模块 bus.js
	  import Vue from 'vue'
       export default new Vue()
在需要接收数据的兄弟组件中，导入 bus.js 模块
       import bus from './bus.js'
在需要接收数据的兄弟组件中的 created 生命周期函数里，
   使用 bus.$on('事件名称', (接收的数据) => {}) 自定义事件：
       created(){
         // 定义事件
         bus.$on('xxx', (data)=>{
           console.log(data)
         })
       }
```

#### 路由传参 和 接参(完事)

```vue
要把路由规则中，对应的参数位置，通过 : 进行定义 并 设置props开启传参
	const router = new VueRouter({
      routes: [
      	url地址传参
        { path: '/user/:id', component: User }
      ]
    })
    
 export default{
   props: ['id']
 }
 <router-link to="/user/id">Go to Foo</router-link>
const router = new VueRouter({
      routes: [
      	url地址传参
        { path: '/user/:id', component: User }
      ]
    })
   cread(){
       this.$router.params.id
   }
   
   const router = new VueRouter({
      routes: [
      	url地址传参
        { path: '/user/:id', component: User }
      ]
    })
    
    
<router-link to="/user/?id">Go to Foo</router-link>
     
     
const router = new VueRouter({
      routes: [
      	url地址传参
        { path: '/user', component: User }
      ]
    })
   cread(){
       this.$router.query.id
   }
 
```

如果一个路由里面要跳转路由少，用嵌套，如果多的话就用路由传参

```js
// Movie.vue
<template>
    <router-link tag='li' :to='./dt/+item.id'
        v-for='item in movielist' :key='item.id'
    >{{item.id}}---{{item.name}}</router-link>
    // 命名路由传参（可编程）
    <router-link tag='li'
        :to='{name:flag?'xiangqing':'xxx',params:{mid:item.id}}'
        v-for='item in movielist' :key='item.id'
    >{{item.id}}---{{item.name}}</router-link>
</template>
<script>
export default{
    data(){
        return{
            movielist:[
                {id:1001,name:'西红柿首府'},
                {id:1002,name:'大脑题昂贵'}
            ]
        }
    }
}
// Detail.vue
<template>
    <div>电影详情---{{mid}}</div>
</template>
<script>
export default{
    props:['mid']
}
```

### 路由编程式导航

```js
<template>
    <button @click='fan'>返回</button>
    <div>电影详情---{{mid}}</div>
</template>
<script>
export default{
    methods:{
        fan(){
            console.log(this) //>VueComponent -> $router -> _proto_ ->go push back forward
            this.$router.back() //后退一页
            this.$router.forward() //前进一页
            this.$router.push('路由地址')
            this.$router.go(n) //n:- 0 + 后退 刷新 前进
        }
    }
    props:['mid']
}
```

### 导航守卫

```js
// index.js
// router路由模块对象有一个方法，可以使得每个路由在加载组件之前都调用
// router.beforeEach((to, from, next) => { /* 导航守卫 处理逻辑 */ })
// 参数:
    // to:是一个对象，保存着将要访问路由相关的参数
    // from:是一个对象，保存着离开的那个页面的相关路由参数
    // next:是一个函数，对后续的执行起着 拦截 或 放行 的作用 
    // next()继续向下执行 next(fals)停止执行 next(锚点)跳转
router.berforeEach(function(to,from,next){
    if(to.path==='/home'){
        var flag=window.sessionStorage.getItem('isLogin')
        if(!flag){
            return next('/login')
        }
    }
    next()
})
// login.vue
exprot default{
   methods:{
       deng(){
           if(this.username.trim()!==''&&this.userpwd.trim()!==''){
            window.sessionStorage.setItem('isLogin','ok')
            this.username=''
            this.userpwd=''
            alert('登陆ok')
           }else{
            window.sessionStorage.removeItem('isLogin')
           }
       }
   }
}
```

## 渲染容器的几种方式

```js
// 1) 通过el指定容器id
var vm=new Vue({
    // el:'#app',
    data:{
        zimu:'good study good day'
    },
    methods:{},
})
vm.$mount('#app')
// 2）通过vm.$mount('#app')
// 3) 通过render(优先级最高)
var vm=new Vue({
    render:function(create){
        // 1）return create('标签','标签内容')
        // 2）return create('标签',['内容',create(),create()]) 嵌套标签
        // 3）return create(组件模块)
        // 4）return create('strong',{class:{'apple':true,'pear':true},style:{color:red}},'我是strong内容')
    }
    // render:c=>c(组件)  简写
    // el:'#app',
    data:{
        zimu:'good study good day'
    },
    methods:{},
})
```

## 过滤器

### 全局过滤器

```js
// 使用语法：
//  1）插值表达式 {{数据 | 过滤器名称}}
//  2）v-bind属性绑定 <tag v-bind:id="数据 | 过滤器"></tag>
        // v-bind:属性名="变量" 变量在data中
        // v-bind:属性名="'属性值'" 直接赋值
<p>{{myTime|handTime('yyyy-mm-dd')|jiaGong}}</p>
// 定义语法：
//  Vue.filter(过滤器名称，处理函数)
//  Vue.filter(过滤器名称，function(数据，参数，参数){})
Vue.filter('handTime',function(time,geshi){
    var tm=new Date(myTime)
    var yyyy=tm.getFullYear()
    var mm=(tm.getMonth()+1+'').padStart(2,0)
    var dd=(tm.getDate()+'').padStart(2,0)
    var hh=(tm.getHours()+'').padStart(2,0)
    var ii=(tm.getMinutes()+'').padStart(2,0)
    var ss=(tm.getSeconds()+'').padStart(2,0)
    if(geshi==='yyyy-mm-dd'){
        return `${yyyy}-${mm}-${dd}`
    }
    return `${yyyy}-${mm}-${dd} ${hh}:${ii}:${ss}`
})
Vue.filter('jiaGong',function(time){
    return '北京时间:'+time
})
var vm=new Vue({
    el:'#app',
    data:{
        myTime:new Data()
    }
})
```

### 私有过滤器

```js
<p>{{zimu|toBigCase}}</p>
var vm=new Vue({
    // el:'#app',
    data:{
        zimu:'good study good day'
    },
    methods:{},
    filters:{
        toBigCase(daxie){
            return daxie.toUpperCase()
        }
    }
})
vm.$mount('#app')
// vue除了el可以和容器联系，通过vm.$mount('#app')也可以
```

## [插槽](https://segmentfault.com/a/1190000012996217)

## 自定义指令

## computer和watch

## vuex

