import {createDataModelParms, createExtraParmsParms,} from '../modules/generateChart'
import { scatter } from '../modules/scatter'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "echarts_scatter",
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
            ...dataModelParms
        }



        chart_option = scatter(dataModelParms.columns, dataModelParms.rows, settings,extra)



        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


