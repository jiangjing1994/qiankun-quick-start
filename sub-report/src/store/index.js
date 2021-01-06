import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import element from './modules/element'
import dashboard from './modules/dashboard'
import menu from './modules/menu'
import report from './modules/report'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    element,
    dashboard,
    menu,
    report
  },
  getters
})

export default store
