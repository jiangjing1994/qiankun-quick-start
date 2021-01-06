
import { table } from '../modules/table'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "simple_table",
     generate_the_chart(chart_option, chart_settings, data) {

        const {
            columnSelected,
        } = chart_settings

        // 数据相关参数


        const createDataModelParms = ({chart_settings, rows}) =>{
            const {
                columnSelected = [] ,
             } = chart_settings

            let columnsConfig ={}
            let columns = []
            let column = []

            columnSelected.forEach(item=>{
                columnsConfig[item.variableName] = item
                columns.push(item.variableName)
                column.push({
                    label: item.name,
                    prop: item.variableName
                })
            })

            return {
                columnsConfig,
                columns,
                column,
                rows
            }
        }

        const dataModelParms= createDataModelParms({chart_settings, rows:data})

        let settings = {

            ...dataModelParms
        }
        chart_option = table(dataModelParms.columns, dataModelParms.rows, settings)

        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


