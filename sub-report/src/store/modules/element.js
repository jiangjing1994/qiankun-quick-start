import {newChart} from "@/components/Report/libs/ChartGenerator";
import { getID } from '@/utils/utils'

export default {
    namespaced: true,
    state: {
        x:null,
        y:null,
        w:null,
        h:null,
        i:null,
        static:null,
        moved:null,
        isActive:null,
        z:null,
        chart_option:null,
        chart_settings:null,
        chart_senior:null,
        chart_seniorList:[],

    },
    actions: {

        setElementData({ commit }, data) {

            commit('SET_CHART_POSITION',data)

            commit('SET_CHART_OPTION',data.chart_option)

            commit('SETCHART_SETTINGS',data.chart_settings)

            commit('SETCHART_SENIOR',data.chart_senior)

            commit('SETCHART_SENIORLIST',data.chart_seniorList)

        },

        setElementDataSettings({ commit }, chart_settings) {

            commit('SETCHART_SETTINGS',chart_settings)

        },

        setElementDataSettingSenior({  state,commit },{chart_type}){

            return new Promise( (resolve, reject) => {

                try {
                    let { chart_option,chart_settings } = newChart(chart_type)

                    state.chart_senior['chart_option']=chart_option

                    state.chart_senior['chart_settings']=chart_settings

                    commit('SETCHART_SENIOR',state.chart_senior)

                    resolve(state.chart_senior)
                }catch (e) {
                    reject(e)
                }


            })

        },

        appendSettingSenior({  state,commit},{chart_type}){

            if(!chart_type){
                alert('chart_type不能为空')
                return
            }

            return new Promise( (resolve, reject) => {

                try {
                    let { chart_option,chart_settings } = newChart(chart_type)

                    let senior = {}

                    senior['chart_type'] = chart_type

                    senior['chart_option'] = chart_option

                    senior['chart_settings']=chart_settings

                    senior['chart_senior']={}

                    senior['chart_id'] = getID()

                    commit('APPEND_SENIORLIST_ITEM',senior)

                    resolve(state)
                }catch (e) {
                    reject(e)
                }


            })

        },

        upDataSettingSenior({  state,commit },data){

            const {chart_id} = data

            if(!chart_id){
                alert('chart_id不能为空')
                return
            }
            return new Promise( (resolve, reject) => {

                try {
                    commit('UPDATA_SENIORLIST_ITEM',data)

                    resolve(state.chart_seniorList)
                }catch (e) {
                    reject(e)
                }


            })

        },



    },
    mutations: {
        SET_CHART_POSITION(state, {x, y, w, h, i, static:s, moved,isActive,z}){


            state.x = x;
            state.y = y;
            state.w = w;
            state.h = h;
            state.i = i;
            state.static = s;
            state.isActive = isActive;
            state.z = z
        },
        SET_CHART_DATA(state, {prop,value}){

            state[prop] = value

        },

        SET_CHART_OPTION(state, chart_option){

            state.chart_option = chart_option
        },

        SETCHART_SETTINGS(state, chart_settings){


            state.chart_settings = chart_settings
        },

        SETCHART_SENIOR(state, chart_senior){

            state.chart_senior = chart_senior

        },

        SET_SENIOR_PARAMETERS(state, senior_parameters){

            state.chart_senior['senior_parameters'] = senior_parameters

        },

        SETCHART_SENIORLIST(state, chart_seniorList){

            state.chart_seniorList = chart_seniorList

        },

        APPEND_SENIORLIST_ITEM(state, item){

            let chart_seniorList = state.chart_seniorList || []

            chart_seniorList.push(item)

            state.chart_seniorList = chart_seniorList

        },

        UPDATA_SENIORLIST_ITEM(state, newItem){

            let chart_seniorList = state.chart_seniorList

            chart_seniorList.splice(chart_seniorList.findIndex(item => item.chart_id === newItem.chart_id), 1,newItem)

            state.chart_seniorList = chart_seniorList

        },


    }
}
