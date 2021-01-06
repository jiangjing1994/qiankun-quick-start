import ChartConfig from "../configure"

import {cloneDeep} from 'lodash'
export function newChart(chart_type, x, y, w, h, i) {



    if(ChartConfig.charts[chart_type]!==undefined){
         return ChartConfig.charts[chart_type]['new_chart_template'](chart_type, x, y, w, h, i)
    }
}

export function renderChart(chart_option, chart_settings, data){

    let chart_type = chart_settings.chart_type
    if(ChartConfig.charts[chart_type]!==undefined){
        return ChartConfig.charts[chart_type]['generate_the_chart'](cloneDeep(chart_option), cloneDeep(chart_settings), cloneDeep(data))
    }
}
