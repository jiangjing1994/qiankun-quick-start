<template>
    <div class="data-element__body">
          <KemDataIcons :option="option"></KemDataIcons>
     </div>
</template>
<script>
import _ from 'lodash'
import {renderChart} from '../libs/ChartGenerator'
import { getFetchData } from './generate_chart/index'
export default {
    props: ['chart'],
    data(){
        return {
            chart_data: null,
            option:{
                data:null
            }
        }
    },
    mounted() {

        this.firstGetData()

    },
    computed: {
        chart_settings(){
            return this.chart.chart_settings
        },
        chart_option(){
            return this.chart.chart_option


        },
        column(){
            return this.option.column
        }
    },
    watch:{
        chart_settings: {
            handler(value){
                this.refreshGenerateChart()
            },
            deep: true
        },

    },
    methods: {
        async firstGetData(){

            this.chart_data = await getFetchData(this.chart_settings)

            this.updataOption()

        },
        // 数据配置变了
        refreshGenerateChart: _.debounce(async function(val) {


            this.chart_data = await getFetchData(this.chart_settings)

            this.updataOption()

        },500),
        // 更新图
        updataOption(){

            const chartData = this.chart_data

            this.option ={}

            if(chartData){

                this.option = _.cloneDeep(renderChart(this.chart_option, this.chart_settings, chartData))


            }else {
                this.option = this.chart_option
            }


        },


        async refresh(){


            this.chart_data = await getFetchData(this.chart_settings)



        },
    }
}
</script>
<style lang="scss">
.data-element__body{
    height: 100%;
    overflow: auto;
    padding: 10px;
}
</style>
