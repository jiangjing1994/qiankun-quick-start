
import { flow  } from '../modules/flow'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "base_flow",
    generate_the_chart(chart_option, chart_settings, data) {

        const {
            columnSelected,
        } = chart_settings

        // 数据相关参数


        const createDataModelParms = ({chart_settings, rows}) =>{
            const {
                columnSelected = [] ,
                name,
                key,
                nodeList,
                lineList,
                binding,
                color,
                backgroundColor,
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
                name,
                key,
                color,
                backgroundColor,
                nodeList:evalToObejct(nodeList),
                lineList:evalToObejct(lineList),
                binding:evalToObejct(binding),

                columnsConfig,
                columns,
                column,
                rows
            }
        }

        const dataModelParms= createDataModelParms({chart_settings, rows:data})



        chart_option = flow( dataModelParms)



        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


