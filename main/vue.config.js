module.exports = {
  transpileDependencies: ['common'],
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'qiankun-example'
        return args
      })
  },
  devServer: {
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
