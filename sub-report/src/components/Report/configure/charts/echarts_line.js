import {createDataModelParms, createExtraParmsParms,} from '../modules/generateChart'

import { line } from '../modules/line'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "echarts_line",
    generate_the_chart(chart_option, chart_settings, data) {

        const {
            area,
            yAxisName,
            stack,
            hiddenMarkLine,
            axisSite,
            min,
            max,
            legendVisible,
            tooltipVisible,
            axisLabelRotate,
        } = chart_settings

        // 数据相关参数
        const dataModelParms= createDataModelParms({chart_settings, rows:data})

        // 通用参数
        const extra= createExtraParmsParms({chart_settings})

        let settings = {
            stack:evalToObejct(stack),
            axisSite:evalToObejct(axisSite),
            yAxisName:evalToObejct(yAxisName),
            min:evalToObejct(min),
            max:evalToObejct(max),
            hiddenMarkLine,
            area,
            axisLabelRotate,
            ...dataModelParms
        }

        chart_option = line(dataModelParms.columns, dataModelParms.rows, settings,extra)

        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},
    ],
}


