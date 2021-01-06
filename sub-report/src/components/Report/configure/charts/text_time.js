import {createbaseTemplateConfig, createDefaultOption, createDefaultSettings,} from '../modules/generateChart'
import {time} from '../modules/time'
import { evalToObejct } from '@/utils/utils'
import moment from "moment";

export default {
    chart_type: "text_time",
    new_chart_template (chart_type, x, y, w, h, i) {
        const baseTemplateConfig= createbaseTemplateConfig({chart_type, x, y, w, h, i})
        const chart_option = createDefaultOption({chart_type})
        const chart_settings = createDefaultSettings({chart_type})

         return {
            ...baseTemplateConfig,
            chart_option,
            chart_settings,
        }
    },
    generate_the_chart(chart_option, chart_settings, data) {
        chart_option = time(chart_settings)
        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


