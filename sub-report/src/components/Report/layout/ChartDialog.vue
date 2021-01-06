<template>
    <KemDialog :visible.sync="visible" :append-to-body="true">
        <template slot="header">
            <div style="display: inline-block;width: 95%;position: relative">
                <chart-title-element :chart="chart_senior"></chart-title-element>

            </div>
        </template>
        <div v-if="visible"  style="height: 500px">
            <component
                    chartID='chartSeniorComponent'
                    :is="chartSeniorComponent"
                    :chart="chart_senior">

            </component>

        </div>

    </KemDialog>

</template>

<script>
import EChartsElement from '@/components/Report/element/EChartsElement'
import CoreMetricElement from '@/components/Report/element/CoreMetricElement'
import SimpleTableElement from '@/components/Report/element/SimpleTableElement'
import ChartTitleElement from '@/components/Report/element/ChartTitleElement'
export default {
    name: "chartDialog",
    components: {
        EChartsElement,
        ChartTitleElement,
        CoreMetricElement,
        SimpleTableElement,
    },
    data() {
        return {
            visible: false,
            chart_senior:{},
        }
    },
    computed: {
        chartSeniorComponent(){
            return {
                core_metrics:'CoreMetricElement',
                simple_table:'SimpleTableElement',
            }[this.chart_senior.chart_type] || 'EChartsElement'
        },
    },
    methods: {
        openDialog(value) {

            let {params,chart_senior,chart_seniorList,chart_data} = value

            let seniorList_parameters = []
            for(let i in chart_data){
                seniorList_parameters.push({
                    variableName:i,
                    value:chart_data[i] +''
                })
            }

           // params.seriesName
            if(!chart_senior.open) return

            this.chart_senior ={}
            chart_seniorList.map(item=>{
                if(params.seriesName === item.variableName){
                    this.chart_senior = item
                }


            })

            // this.chart_senior.chart_settings = {
            //     // senior_parameters:{
            //     //     value:  params.value+'',
            //     //     variableName: params.seriesName,
            //     // },
            //     ...this.chart_senior.chart_settings,
            //     seniorList_parameters,
            //
            // }

            console.log(seniorList_parameters)


            if(this.chart_senior.chart_settings){
                this.chart_senior.chart_settings['seniorList_parameters'] = seniorList_parameters

            }



            //this.chart_senior = chart_senior

            this.visible=true


        }
    },
}
</script>

<style scoped>

</style>
