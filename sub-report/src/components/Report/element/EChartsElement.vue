<template>
    <div style='width: 100%;height: 100%;' :id="chartID" ></div>
</template>

<script>
import {mapState} from 'vuex'
import {EleResize} from '../libs/esresize'
import {renderChart} from '../libs/ChartGenerator'
import westeros_theme from './echarts_theme/westeros.json'
import walden_theme from './echarts_theme/walden.json'
import chalk_project from './echarts_theme/chalk.project.json'
import westeros_project from './echarts_theme/westeros.project.json'
import { getFetchData } from './generate_chart/index'

import _ from 'lodash'
import echarts from 'echarts'

export default {
    components: {},
    props: ['chartID','chart'],
    data(){
        return {
            chart_data: [],
            me_chart_option: {},
            mychart: null,
            isRefresh: -1
        }
    },

    computed: {
        ...mapState({
            reportTheme: state => state.app.report.theme,
        }),


        chart_option(){
            return this.chart.chart_option


        },
        chart_settings(){
            return this.chart.chart_settings

        },
        chart_senior(){
            return this.chart.chart_senior

        },
        chart_seniorList(){
            return this.chart.chart_seniorList

        },
    },
    watch: {

        chart_option: {
            handler(value){
                /*   this.isRefresh += 1
                   if(this.isRefresh > 0) {
                       this.refreshChartOption(value)
                   }*/
                this.refreshChartOption(value)
            },
            deep: true
        },
        chart_settings: {
            handler(value){
                 /* this.isRefresh += 1
                 if(this.isRefresh > 0) {
                     this.refreshGenerateChart()
                 }*/
                this.refreshGenerateChart()
            },
            deep: true
        },

        reportTheme(){
            this.changeTheme()
        }
    },
    created(){
    },
    mounted() {
        //注册echarts的主题
        echarts.registerTheme('westeros', westeros_theme);

        echarts.registerTheme('walden', walden_theme);

        echarts.registerTheme('chalk_project', chalk_project);

        echarts.registerTheme('westeros_project', westeros_project);

        this.firstRenderChart()

    },
    beforeDestroy() {
        this.destroyChart()
    },
    methods: {
        //首次绘制图形
        async firstRenderChart(){


            this.chart_data = await getFetchData(this.chart_settings)

            this.createChart()

            this.createOptions()

            this.setOptionChart()

        },

        // 图配置变了
        refreshChartOption: _.debounce(function(val) {

            this.createOptions()

            this.setOptionChart()

        },500),

        // 数据配置变了
        refreshGenerateChart: _.debounce(async function(val) {

            if (this.mychart) {
                this.mychart.showLoading({text: '正在加载数据'});
            }

            this.chart_data = await getFetchData(this.chart_settings)

            this.createOptions()

            this.setOptionChart()

        },500),


        //销毁图表
        destroyChart() {
            if (this.mychart == null) {
                return
            }
            this.mychart.dispose()
            this.mychart = null;
        },
        //更换主题
        changeTheme(){

            this.destroyChart()

            this.createChart()

            this.setOptionChart()
        },

        // 更新图
        setOptionChart(){

            const option = this.option
            if (this.mychart == null) {
                return
            }
            this.mychart.hideLoading();

            this.mychart.setOption(option,true)



        },

        // 生成图配置项
        createOptions(){


            const chartData = this.chart_data

            this.option ={}

            if(this.chart_settings?.chart_type === 'echarts_customize'){

                this.option =  this.renderEchartsCustomize()

                return this.option

            }

            if(chartData){

                this.option = _.cloneDeep(renderChart(this.chart_option, this.chart_settings, chartData))

            }else {
                this.option = this.chart_option
            }

            return this.option

        },

        // 生成图
        createChart(){

            //const chart = this.$refs['chart']
            const chart = document.getElementById(this.chartID)

            if (this.mychart) {
                this.mychart.clear()
            }

            this.mychart = echarts.init(chart, this.reportTheme)

            this.mychart.showLoading({text: '正在加载数据'});

            this.mychart.on('click',(params)=>{

                let type=params.componentType;

                try {
                    if(type==="series"){

                        let chart_data = {}

                        if("radar" === params.seriesType){
                            chart_data = params.data.chart_data
                        }else {
                            chart_data = this.option.series[params.seriesIndex].chart_data[params.dataIndex]

                        }

                        this.$emit('clickChart',{
                            params,
                            chart_senior:this.chart_senior,
                            chart_seniorList:this.chart_seniorList,
                            chart_settings:this.chart_settings,
                            chart_data,
                            type
                        })


                    }

                }

                catch {
                    console.log('error')
                }


            })


            // 重点这两句监听使用resize方法
            let listener =  ()=> {
                this.mychart.resize()
            }

            EleResize.on(chart, listener)


        },

        // 渲染代码图
        renderEchartsCustomize(){

            let data = this.chart_data

            // 使用eval的替代方案来执行脚本
            let chart_code = `function chart_code(data){
                                 let option
                                 ${this.chart_settings.chart_code}
                                    return option
                               }`

            let chart_fun = new Function(`return ${chart_code}`)();

            return chart_fun(data)
        }

    }

}
</script>
