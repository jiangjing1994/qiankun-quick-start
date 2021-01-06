import {createDataModelParms, createExtraParmsParms,} from '../modules/generateChart'

import { gauge} from '../modules/gauge'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "echarts_gauge",
    generate_the_chart(chart_option, chart_settings, data) {

        const {
            dataName,
            seriesMap,

            unit ,
            pos ,
            radius,
            range_max ,
            range_min ,
            highlight ,

            legendVisible,
            tooltipVisible,
        } = chart_settings

        // 数据相关参数
        const dataModelParms= createDataModelParms({chart_settings, rows:data})

        // 通用参数
        const extra= createExtraParmsParms({chart_settings})

        let settings = {
            dataName:evalToObejct(dataName),
            seriesMap:evalToObejct(seriesMap),
            unit ,
            pos ,
            radius,
            range_max ,
            range_min ,
            highlight ,
            ...dataModelParms
        }



        chart_option = gauge(dataModelParms.columns, dataModelParms.rows, settings,extra)



        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


