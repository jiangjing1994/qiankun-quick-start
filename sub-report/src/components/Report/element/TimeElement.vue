<template>
    <div class="text__body">
        <div :style="style" style="padding: 0 4%">

            <el-link style="color:inherit" v-if="option.link" :href="option.linkHref" :target="option.linkTarget">{{chart_data}}</el-link>
            <span v-else>{{chart_data}}</span>

        </div>

    </div>

</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import {renderChart} from '../libs/ChartGenerator'

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
    created() {
        this.timeInterval = setInterval(() => {
            this.refreshTime()
        }, 1000)
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
        refreshTime () {

            if(this.chart_settings.type === 'YYYY.MM.DD HH:mm:ss'){
                this.chart_data=moment().format('YYYY.MM.DD HH:mm:ss')
            }else if(this.chart_settings.type === 'YYYY.MM.DD'){
                this.chart_data=moment().format('YYYY.MM.DD')

            }else{
                this.chart_data=moment().format('HH:mm:ss')
            }
            // this.chart_data = moment().format('YYYY.MM.DD HH:mm:ss')
        },
        async firstGetData(){

            this.chart_data = await this.generateChart()

            this.updataOption()

        },
        // 数据配置变了
        refreshGenerateChart: _.debounce(async function(val) {



            this.chart_data = await this.generateChart()

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

        //获取图数据
        generateChart(){
            //如果配置了模型id，那么根据模型id去获取数据
            const chart_settings = this.chart_settings
            const { openStaticData } = chart_settings

            if(openStaticData){
                return new Promise(function (resolve) {
                    resolve(chart_settings.staticData)
                })
            }

            if(chart_settings?.dataModelId) {
                //读取图表数据
                let parameters = chart_settings.parameters || []
                let seniorList_parameters = chart_settings.seniorList_parameters || []

                if(chart_settings.senior_parameters instanceof Object){

                    parameters = [...parameters,{...chart_settings.senior_parameters}]
                }

                const query =  this.$route.query

                const postMd = this.$store.state.report.postMessageData

                const p = {...query,...postMd}

                let urlParams = []
                for(let i in p){
                    urlParams.push({
                        variableName:i,
                        value:p[i]
                    })
                }
                parameters = [...parameters,...urlParams,...seniorList_parameters]



                return this.$api.FETCH_ANALYSIS_DATA(chart_settings.dataModelId,parameters, '')

            }
            else {
                return new Promise(function (resolve) {
                    resolve()
                })
            }
        },

        async refresh(){


            this.chart_data = await this.generateChart()



        },
    }
}
</script>

<style scoped>

</style>
