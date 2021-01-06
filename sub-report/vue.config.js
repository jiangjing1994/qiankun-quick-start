// 代理配置插件
const proxy = require('http-proxy-middleware');
// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
// monaco-editor
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// package.json的name需注意与主应用一致
const { name } = require('../package.json')

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')


module.exports = {
  publicPath: '/subapp/sub-report',

  // transpileDependencies: process.env.NODE_ENV === "development" ? ["*"] : ["*"],
  chainWebpack: config => {

    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()

    //monaco Editor
    // config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
    //     {
    //         // Languages are loaded on demand at runtime
    //         languages: ['sql', 'json', 'javascript']
    //     }
    // ])
  },

  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },

    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['javascript', 'css', 'html', 'typescript', 'json']
      })
    ]
  },
  productionSourceMap: false,
  //devServer api proxyTable
  devServer: {
    port: process.env.VUE_APP_PORT, // 在.env中VUE_APP_PORT=7788，与父应用的配置一致

    headers: {
      'Access-Control-Allow-Origin': '*' // 主应用获取子应用时跨域响应头
    },
    //host: "localhost",
    //https: false,
    // 自动启动浏览器
    //open: false,
    proxy: {
      "/api": {
        target: "http://10.1.241.162:8000", //北京滴
        changeOrigin: true, //是否跨域
        ws:true,
        secure:false,
        logLevel: 'debug',
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  }

}
/////////////////


// module.exports = {
//   configureWebpack: {
//     output: {
//       library: `${name}-[name]`,
//       libraryTarget: 'umd',
//       jsonpFunction: `webpackJsonp_${name}`,
//     }
//   },
//   devServer: {
//     port: process.env.VUE_APP_PORT, // 在.env中VUE_APP_PORT=7788，与父应用的配置一致
//     headers: {
//       'Access-Control-Allow-Origin': '*' // 主应用获取子应用时跨域响应头
//     }
//   }
// }
