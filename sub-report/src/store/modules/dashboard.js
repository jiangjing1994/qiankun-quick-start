export default {
    namespaced: true,
    state: {
        id: 0,
        report: null,
        layout: null,
        width: 0,
        height: 0,
        scale: 1.0,
        select_item_index: -1,
        data_sources: [],
        data_models: [],
        data_columns: [],
        model_datas: {},
        loading: false
    },
    actions: {
        async loadDashboard({commit,state}, id) {
            if (id == 0) {
                commit("SET_REPORT", {
                    name: '测试报表',
                    width: 1920,
                    height: 1080,
                    resize_type: 1,
                    background_pic: "/img/bg1.png",
                    background_color: "#000",
                    background_blur: 0,
                    background_alpha: 100,
                    theme: 'default',
                    parameters: []
                })
                commit("SET_LAYOUT", [])
            } else {
                commit("SET_LOADING")
                await this._vm.$api.GET_DASHBOARD(id).then((res) => {
                    commit("UNSET_LOADING")
                    state.id = res.id
                    state.report = res.dashboard
                    state.layout = res.layout
                })
            }
        },
        async saveDashboard({state, commit}){
            let dashboard = {
              id: state.id,
              name: state.report.name,
              dashboard: state.report,
              layout: state.layout
            }
            commit("SET_LOADING")
            await this._vm.$api.SAVE_DASHBOARD(dashboard).then((res)=>{
              state.id = res.id
              commit("UNSET_LOADING")
                this._vm.$message({
                    message: '保存成功！',
                    type: 'success'
                });
            })
        },
        autoResizeScreen({commit, state, dispatch}, value) {
            let width_scale = value.width / state.report.width
            let height_scale = value.height / state.report.height
            commit("SET_WIDTH", value.width)
            commit("SET_HEIGHT", value.height)
            dispatch("refreshScale", width_scale > height_scale ? height_scale : width_scale)
        },
        refreshScale({commit}, scale) {
            commit("CHANGE_SCALE", scale)
        },
        resizeElement({state}, value) {
            let index = value.index
            let rect = value.rect
            state.layout[index].h = rect.height
            state.layout[index].w = rect.width
            state.layout[index].x = rect.left
            state.layout[index].y = rect.top
        },
        appendElement({state}, element) {
            state.layout.push(element)
        },
        setActive({commit, state}, index) {
            for (let i = 0; i < state.layout.length; i++) {
                if (i !== index) {
                    commit('SET_UNACTIVE', i);
                } else {
                    commit('SET_ACTIVE', index);
                }
            }

        },
        unsetActive({commit}, index) {
            commit("SET_UNACTIVE", index)
        },
        async loadDataSources({commit}) {
            await this._vm.$api.GET_ALL_DATASOURCE().then((res) => {
                commit('SET_DATASOUCES', res)
            })
        },
        async loadDataModels({commit}, id) {
            return this._vm.$api.GET_DATAMODEL_BY_DSID(id).then((res) => {
                commit('SET_DATAMODELS', res)
                return res
            })
        },
        setDataColumns({commit, state}, id) {
            commit("SET_DATACOLUMNS", state.data_models.find((model) => model.id === id).columns)
        },
        async loadModelData({commit, state}, id) {
            if (state.model_datas[id] !== undefined) {
                return state.model_datas[id]
            } else {
                return this._vm.$api.FETCH_DATAMODEL_DATA(id).then((res) => {
                    commit("SET_MODEL_DATA", id, res)
                    state.model_datas[id] = res
                    return res
                })
            }
        }
    },
    getters: {
        selectedItem: state => {
            return state.layout.find(item => item.active === true)
        }
    },
    mutations: {
        SET_REPORT(state, report) {
            state.report = report
        },
        SET_LAYOUT(state, layout) {
            state.layout = layout
        },
        CHANGE_SCALE(state, scale) {
            state.scale = scale
        },
        SET_WIDTH(state, width) {
            state.width = width
        },
        SET_HEIGHT(state, height) {
            state.height = height
        },
        SET_ACTIVE(state, index) {
            state.layout[index].active = true
            state.select_item_index = index
            // state.old_z = state.layout[index].z
            // state.layout[index].z = 10000
        },
        SET_UNACTIVE(state, index) {
            state.layout[index].active = false
            state.select_item_index = -1
            // state.layout[index].z = state.old_z
        },
        SET_DATASOUCES(state, datasources) {
            state.data_sources = datasources
        },
        SET_DATAMODELS(state, datamodels) {
            state.data_models = datamodels
        },
        SET_DATACOLUMNS(state, datacolumns) {
            state.data_columns = datacolumns
        },
        SET_MODEL_DATA(state, id, data) {
            state.model_datas[id] = data
        },
        SET_LOADING(state){
            state.loading = true
        },
        UNSET_LOADING(state){
            state.loading = false
        }

    }
}