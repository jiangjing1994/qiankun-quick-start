import api from '@/api'
import { createReport } from "@/components/Report/libs/ReportUtils"
import { newChart } from "@/components/Report/libs/ChartGenerator";
import { cloneDeep } from 'lodash'
import { getID } from '@/utils/utils'
import { createChartTemplate} from "@/components/Report/configure/modules/generateChart"

export default {
    namespaced: true,
    state: {
        report:'',
        layout:[],
        id:'',
        name:'',
        datamodelId:''
    },
    actions: {

        getReport({ commit }, data) {

            let { reportId } = data

            return new Promise( (resolve, reject) => {
                if (reportId === '0'){

                    commit('CREATE_REPORT')

                }
                else {
                    api.GET_REPORT(reportId).then(res => {

                        commit('CREATE_REPORT',res)

                        resolve(res)

                    }).catch(error => {
                        reject(error)
                    })
                }



            })
        },

        saveReport({ state ,dispatch}){
            return new Promise( (resolve, reject) => {

                api.SAVE_REPORT({...state}).then((res)=>{

                    dispatch('getReport',{reportId:state.id})

                    resolve(res)

                }).catch(error => {

                    reject(error)
                })


            })

        },

        appendChart({ state , commit },{chart_type}){

             const {isDashboard} = state.report
            //
            // let max_y_item = null;
            // let max_i = 0;
            // for(let i = 0;i < state.layout.length; i++){
            //     if(state.layout[i]["i"] > max_i){
            //         max_i = state.layout[i]["i"]
            //     }
            //
            //     if (max_y_item === null || max_y_item.y < state.layout[i].y){
            //         max_y_item = state.layout[i]
            //
            //     }else if(max_y_item.y === state.layout[i].y || max_y_item.x < state.layout[i].x){
            //         max_y_item = state.layout[i]
            //     }
            // }
            //
            // if(isDashboard){
            //     commit('APPEND_LAYOUT_ITEM', newChart(chart_type, 100, 100, 400, 400, (parseInt(max_i)+1)))
            //
            //     return
            // }
            // commit('APPEND_LAYOUT_ITEM',newChart(chart_type, 0, 0, 4, 6, (parseInt(max_i)+1)))

            if('core_metrics' === chart_type){
                commit('APPEND_LAYOUT_ITEM',newChart(chart_type, 0, 0, 4, 6, getID()))
                return
            }
            commit('APPEND_LAYOUT_ITEM',createChartTemplate({
                chart_type,
                isDashboard,
                i:getID()
            }))

        },

        copyChart({ state , commit }, {item}){

            let newItem = cloneDeep(item)
            newItem.i = getID()


            commit('APPEND_LAYOUT_ITEM',newItem)

        },

        deleteChart({ commit },idx){

            commit('DELETE_LAYOUT_ITEM',idx)

        },

    },
    mutations: {
        SET_REPORT(state, data){

            state.report = data
        },
        SET_LAYOUT(state, data){

            state.layout = data
        },

        CREATE_REPORT(state, data){

            data =  data || createReport()

            const { report,layout ,id, name,datamodelId } = data

            state.report = report

            state.layout = layout

            state.id = id

            state.name = name

            state.datamodelId = datamodelId

        },

        APPEND_LAYOUT_ITEM(state, item){

            let layout = state.layout || []

            layout.push({...item,chart_senior:{}})

            state.layout = layout

        },

        UPDATA_LAYOUT_ITEM(state, newItem){



            let layout = state.layout

            layout.splice(layout.findIndex(item => item.i === newItem.i), 1,newItem)

            state.layout = layout

        },

        DELETE_LAYOUT_ITEM(state, idx){

            let layout = state.layout || []

            layout.splice(layout.findIndex(item => item.i === idx), 1)

            state.layout = layout

        },

        ACTIVE_LAYOUT_ITEM(state, idx){

            let layout = state.layout || []

            layout = layout.map(item=>{
                return{
                    ...item,
                    isActive:item.i === idx
                }
            })



            state.layout = layout

        }
    }
}
