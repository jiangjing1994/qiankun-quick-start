// Element
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css'
//
// // echarts
// import echarts from 'echarts'
//
// // davaV
 import dataV from '@jiaminghi/data-view'
//
// // axios
// import axios from 'axios'
//
// //svg icon
 import '@/assets/svg-icons'
//
// //api
 import api from '@/api'
//
 import KemUI from '@jiangjing94/mimi'
 import '@jiangjing94/mimi/lib/mimiui.css'
 import MonacoEditor from '@/components/MonacoEditor'
 import CodeEditorButton from '@/components/CodeEditorButton'
import IconSelect from '@/components/IconSelect'
import JsonExcel from 'vue-json-excel'
//
// //import Avue from '@smallwei/avue'
 import PBULICFUNC from './publicFunc'
//
import jsPlumb from 'jsplumb'

export default {
    async install(Vue) {
        // 设置为 false 以阻止 vue 在启动时生成生产提示
        // https://cn.vuejs.org/v2/api/#productionTip
        Vue.config.productionTip = false
       //
       //  // 将axios挂载到Vue实例,在组件中可以直接Da使用
       //  // todo：删除
       //  Vue.prototype.$axios = axios
       //
       //  // 使用api来完成前后台交互
        Vue.prototype.$api = api
       //
       //  // 当前环境
        Vue.prototype.$env = process.env.NODE_ENV
       //  // 当前的 baseUrl
         Vue.prototype.$baseUrl = process.env.BASE_URL
       //  // 当前版本
         Vue.prototype.$version = process.env.VUE_APP_VERSION
       //  // 构建时间
        Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
       //  // 全局方法
        Vue.prototype.$PBULICFUNC = PBULICFUNC
       //
        Vue.prototype.$jsPlumb = jsPlumb.jsPlumb
       //
       //  // Element
       // // Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
       //
       //  // Element
         Vue.use(KemUI)
       //
       // // Vue.use(Avue)
       //
         Vue.component('downloadExcel', JsonExcel)
       //
        Vue.component('MonacoEditor',MonacoEditor)
        Vue.component('CodeEditorButton',CodeEditorButton)
         Vue.component('IconSelect',IconSelect)
       //  // Echarts
       //  Vue.prototype.$echarts = echarts
       //
       //  //DataV
         Vue.use(dataV)

    }
}
