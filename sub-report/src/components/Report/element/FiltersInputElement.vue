<template>
    <div class="filters-input_element" :style="`background-image: url(${inputs})`" style="background-size: 100% 100%">
        <KemInput v-model="value" :placeholder="placeholder" >
            <div slot="append" style="width: 25px;height: 25px;cursor: pointer" @click="onclick"> </div>
        </KemInput>
    </div>

</template>

<script>
import _ from 'lodash'
import {renderChart} from '../libs/ChartGenerator'
import { getFetchData,getParamsObject } from './generate_chart/index'
import qs from 'qs'
import inputs from '@/assets/image/inputs.png'
export default {
    props: ['chart'],
    data(){
        return {
            value: '',
            inputs,
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
        placeholder(){
           return  this.option.placeholder || '请输入'
        },
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
        onclick(){

            const {linkHref,  linkTarget,staticParams={}}=this.option

            const paramsObject =  getParamsObject(this.chart_settings)



            let params =  qs.stringify({
                str:this.value,
                ...paramsObject,
                ...staticParams


            })

            window.open(`${linkHref}?${params}`,linkTarget)
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

<style lang="scss">
.filters-input_element{
    position: relative;
    z-index: 99;
    width: 100%;
    height: 100%;

    .el-input-group__append, .el-input-group__prepend{
        background-color: transparent!important;
        border: none !important;

    }
    .el-input__inner{
        background-color: transparent!important;
        border: none !important;
        color: #ffffff;

    }
}

</style>
