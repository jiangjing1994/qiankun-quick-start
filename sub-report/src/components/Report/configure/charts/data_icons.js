
import { dataIcons } from '../modules/dataIcons'
import { evalToObejct } from '@/utils/utils'
import {createDataModelParms } from '../modules/generateChart'
export default {
    chart_type: "data_icons",

    generate_the_chart(chart_option, chart_settings, data) {

        const {
            span,
            gutter,
            animation,
            backgroundColor,
            itemBackgroundColor,
            color,
            titleColor,
            discount,
            decimals,
        } = chart_settings

        // 数据相关参数
        const dataModelParms= createDataModelParms({chart_settings, rows:data},true)





        let settings = {
            span,
            gutter,
            animation,
            backgroundColor,
            itemBackgroundColor,
            color,
            titleColor,
            discount,
            decimals,
        }



        chart_option = dataIcons(dataModelParms , settings)



        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


