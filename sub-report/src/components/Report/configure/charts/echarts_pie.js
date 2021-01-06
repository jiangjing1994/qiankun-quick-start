import {createDataModelParms, createExtraParmsParms,} from '../modules/generateChart'

import { pie } from '../modules/pie'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "echarts_pie",
    generate_the_chart(chart_option, chart_settings, data) {

        const {
            radius,
            offsetY,
            roseType,
            selectedMode,
            hoverAnimation,
            level,
            legendLimit,
            limitShowNum,
            legendVisible,
            tooltipVisible,
        } = chart_settings

        // 数据相关参数
        const dataModelParms= createDataModelParms({chart_settings, rows:data})

        // 通用参数
        const extra= createExtraParmsParms({chart_settings})

        let settings = {
            radius,
            offsetY,
            roseType,
            selectedMode,
            hoverAnimation,
            level:evalToObejct(level),
            legendLimit,
            limitShowNum,
            ...dataModelParms
        }



        chart_option = pie(dataModelParms.columns, dataModelParms.rows, settings,extra)



        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


