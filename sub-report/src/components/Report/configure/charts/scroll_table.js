import { scrolltable } from '../modules/table'
import { evalToObejct } from '@/utils/utils'

export default {
    chart_type: "scroll_table",

    generate_the_chart(chart_option, chart_settings, data) {

        const {
            columnSelected,
            rowNum,
            headerBGC,
            oddRowBGC,
            evenRowBGC,
            waitTime,
            headerHeight,
            columnWidth,
            align,
            index,
            indexHeader,
            carousel,
            hoverPause
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
            rowNum,
            headerBGC,
            oddRowBGC,
            evenRowBGC,
            waitTime,
            headerHeight,
            columnWidth:evalToObejct(columnWidth),
            align:evalToObejct(align),
            index,
            indexHeader,
            carousel,
            hoverPause
        }
        chart_option = scrolltable(dataModelParms, settings)

        return chart_option
    },
    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}


