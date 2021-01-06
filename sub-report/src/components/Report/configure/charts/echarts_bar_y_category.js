import {createDataModelParms, createExtraParmsParms,} from '../modules/generateChart'
import { bar } from '../modules/bar'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "echarts_bar_y_category",
    generate_the_chart(chart_option, chart_settings, data) {

        const {
            stack,
            yAxisName,
            showLine,
            axisSite,
            hiddenMarkLine,
            hiddenWarnItemStyle,
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
            hiddenMarkLine,
            hiddenWarnItemStyle,
            axisLabelRotate,
            ...dataModelParms
        }



        chart_option = bar(dataModelParms.columns, dataModelParms.rows, settings,extra)

        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


