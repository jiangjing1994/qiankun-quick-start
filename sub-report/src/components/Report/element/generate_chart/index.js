import VueRouter from '@/router'
import store from '@/store'
import api from '@/api'
import {evalToObejct} from "@/utils/utils";

const getFetchData = (chart_settings)=>{



    const { openStaticData } = chart_settings

    if(openStaticData){
        return new Promise(function (resolve) {
            let data = evalToObejct(chart_settings.staticData)
            if( JSON.stringify(data) === "{}") data = chart_settings.staticData



            resolve(data)
        })
    }

    if(chart_settings?.dataModelId) {

        let parameters = getParamsList(chart_settings)

         return new Promise(function (resolve) {
            api.FETCH_ANALYSIS_DATA(chart_settings.dataModelId,parameters, '').then(res=>{

                console.log(res)



                resolve(res)

            })
        })
    }
    else {
        return new Promise(function (resolve) {
            resolve()
        })
    }
}

const getParamsList = chart_settings=>{

    let parameters = chart_settings.parameters || []
    let seniorList_parameters = chart_settings.seniorList_parameters || []

    if(chart_settings.senior_parameters instanceof Object){

        parameters = [...parameters,{...chart_settings.senior_parameters}]
    }

    const query =  VueRouter?.currentRoute?.query

    const postMd = store.state.report.postMessageData

    const p = {...query,...postMd}

    let urlParams = []
    for(let i in p){
        urlParams.push({
            variableName:i,
            value:p[i]
        })
    }

    return [...parameters,...urlParams,...seniorList_parameters]

}

const getParamsObject = chart_settings=>{

    let arr =  getParamsList(chart_settings)
    let obj = {}
    arr.map(item=>{
        obj[item.variableName] = item.value
    })

    return obj

}

export { getFetchData,getParamsList ,getParamsObject}
