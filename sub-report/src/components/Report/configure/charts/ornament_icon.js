import { ornament } from '../modules/ornament'

export default {
    chart_type: "ornament_icon",

    generate_the_chart(chart_option, chart_settings) {

        chart_option = ornament(chart_settings)


        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


