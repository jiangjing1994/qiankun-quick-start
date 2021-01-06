import { filters } from '../modules/filters'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "filters_input",

    generate_the_chart(chart_option, chart_settings) {



        chart_option = filters(chart_settings)





        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


