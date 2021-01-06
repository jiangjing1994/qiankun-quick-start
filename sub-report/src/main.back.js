import '@babel/polyfill';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import corePlugin from './plugins/core'

// mockjs
// require('@/api/mock.js')

Vue.config.productionTip = false

// 核心插件
Vue.use(corePlugin)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
