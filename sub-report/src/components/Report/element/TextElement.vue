<template>
    <div class="text__body">
        <div :style="style" style="padding: 0 4%">


            <el-link style="color:inherit" v-if="option.link" :href="option.linkHref" :target="option.linkTarget">{{itemValue(chart_data)}}</el-link>
            <span v-else>{{itemValue(chart_data)}}</span>

        </div>

    </div>

</template>

<script>
import _ from 'lodash'
import {renderChart} from '../libs/ChartGenerator'
import { getFetchData } from './generate_chart/index'
import {get} from 'lodash'
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
        },
        style(){
            const {textStyle} = this.option
            return textStyle
        }
    },
    watch:{
        chart_settings: {
            handler(value){
                console.log(value)
                this.refreshGenerateChart()
            },
            deep: true
        },
        chart_option: {
            handler(value){
                this.refreshGenerateChart()
            },
            deep: true
        },

    },
    methods: {
        itemValue(value) {
            const { openStaticData } = this.chart_settings
            const { setData } = this.option

            if(!openStaticData){
                const result =  get(value,setData)


                return result===0 || result? result : value

            }

            return value


        },
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

<style scoped>

</style>
