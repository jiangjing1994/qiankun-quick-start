import {createDataModelParms, createExtraParmsParms,} from '../modules/generateChart'

import { histogram } from '../modules/bar'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "echarts_bar",
    generate_the_chart(chart_option, chart_settings, data) {

        const {
            stack,
            yAxisName,
            showLine,
            axisSite,
            hiddenMarkLine,
            hiddenWarnItemStyle,
            min,
            max,
            dataOrder,
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
            showLine:evalToObejct(showLine),
            min:evalToObejct(min),
            max:evalToObejct(max),
            dataOrder:evalToObejct(dataOrder),
            hiddenMarkLine,
            hiddenWarnItemStyle,
            axisLabelRotate,
            ...dataModelParms
        }



        chart_option = histogram(dataModelParms.columns, dataModelParms.rows, settings,extra)



        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


