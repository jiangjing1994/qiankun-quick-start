 import { text } from '../modules/text'

export default {
    chart_type: "text_base",

    generate_the_chart(chart_option, chart_settings, data) {

        chart_option = text(chart_settings)





        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


