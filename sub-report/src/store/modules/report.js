
export default {
    namespaced: true,
    state: {
        //右侧的控制面板是否收起
        asideCollapse: false,
        //右侧的控制面板适用的是那种配置面板
        asideType: 'report',
        //报表主题
        reportTheme: 'walden',

        loading:false,

        asideActiveName:'base',
        //报表状态
        reportIsEdit:true,

        postMessageData:{}
    },
    actions: {
        //右侧菜单是否收起
        asideCollapseToggle({ commit }){
          commit("TOGGLE_ASIDE_MENU")
        },
        setAsideType({commit}, type){
            commit("SET_ASIDE_MENU", type)
        },
        setReportTheme({commit}, theme){
            commit("SET_REPORT_THEME", theme)
        },

        getPostMessageData({commit}){
            return new Promise( (resolve, reject) => {

                window.addEventListener('message', e => {

                    commit('SET_POST_MESSAGE_DATA', e.data)

                    resolve(e.data)

                })

            })

        }

    },
    mutations: {
        //修改右侧边栏是否展开/收起
        TOGGLE_ASIDE_MENU(state){
              // store 赋值
              state.asideCollapse = !state.asideCollapse
        },

        SET_ASIDE_MENU(state, type){
            state.asideType = type
        },

        SET_REPORT_THEME(state, theme){
            state.reportTheme = theme
        },
        SET_LOADING(state,loading){
            state.loading = loading
        },

        SET_ASIDE_ACTIVENAME(state,asideActiveName){
            state.asideActiveName = asideActiveName || 'base'
        },

        SET_POST_MESSAGE_DATA(state,data){

            //console.log('data')
            console.log(data)

            if(data.projectId){
                state.postMessageData = {
                    projectId:data.projectId,
                    userId:data.userId,
                   /* tenantCode:data.tenantCode,
                    token:data.token,*/

                }
            }
        },

        SET_REPORT_IS_EDIT(state,status){

            state.reportIsEdit = status

        }
    }
}
