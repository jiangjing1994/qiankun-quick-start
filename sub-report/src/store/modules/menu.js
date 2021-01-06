
export default {
    namespaced: true,
    state: {
        asideCollapse: true
    },
    actions: {
        //左侧菜单是否收起
        asideCollapseToggle({ commit }){
          commit("TOGGLE_ASIDE_MENU")
        }

    },
    mutations: {
        //修改左侧边栏是否展开/收起
        TOGGLE_ASIDE_MENU(state){
              // store 赋值
              state.asideCollapse = !state.asideCollapse
        }
    }
}