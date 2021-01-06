<template>
    <div class="flow__body">
        <el-tooltip class="item" effect="dark"  placement="bottom">
            <pre slot="content" style="height: 300px;overflow-y: auto">{{chart_data}} </pre>
            <el-button type="text" style="position: absolute;right: 10px;top: 10px;z-index: 100;color: transparent">data</el-button>
        </el-tooltip>
        <Flow :option="option" :chartData="chart_data" v-if="option"></Flow>
    </div>

</template>

<script>
import _ from 'lodash'
import {renderChart} from '../libs/ChartGenerator'
import { getFetchData } from './generate_chart/index'
import Flow from '@/components/Flow'

export default {
    data() {
        return {
            asas:  [
                {
                    "id":"nodeA",
                    "name":"需求评审",
                    "left":20,
                    "top":20,
                    "list":[
                        {
                            "value":"[0].重开数",
                            "link":"https://www.baidu.com/",
                            "color":"red"
                        },
                        {
                            "value":"[0].缺陷总数",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeB",
                    "name":"节点B",
                    "left":180,
                    "top":20,
                    "list":[
                        {
                            "value":"[0].重开数",
                            "color":"red"
                        },
                        {
                            "value":"[0].缺陷总数",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeC",
                    "name":"节点C",
                    "left":340,
                    "top":20,
                    "list":[
                        {
                            "value":"上一版本",
                            "color":"red"
                        },
                        {
                            "value":"[0].缺陷总数",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeD",
                    "name":"节点D",
                    "left":500,
                    "top":20,
                    "list":[
                        {
                            "value":"需求上架"
                        }
                    ]
                },

                {
                    "id":"nodeH",
                    "name":"nodeH",
                    "left":20,
                    "top":160,
                    "list":[
                        {
                            "value":"[0].重开数",
                            "color":"red"
                        },
                        {
                            "value":"[0].缺陷总数",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeG",
                    "name":"nodeG",
                    "left":180,
                    "top":160,
                    "list":[
                        {
                            "value":"[0].重开数",
                            "color":"red"
                        },
                        {
                            "value":"[0].缺陷总数",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeF",
                    "name":"nodeF",
                    "left":340,
                    "top":160,
                    "list":[
                        {
                            "value":"上一版本",
                            "color":"red"
                        },
                        {
                            "value":"[0].缺陷总数",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeE",
                    "name":"nodeE",
                    "left":500,
                    "top":160,
                    "list":[
                        {
                            "value":"需求上架"
                        }
                    ]
                },



                {
                    "id":"nodeI",
                    "name":"nodeI",
                    "left":20,
                    "top":300,
                    "list":[
                        {
                            "value":"[0].重开数",
                            "color":"red"
                        },
                        {
                            "value":"[0].缺陷总数",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeJ",
                    "name":"nodeJ",
                    "left":180,
                    "top":300,
                    "list":[
                        {
                            "value":"[0].重开数",
                            "color":"red"
                        },
                        {
                            "value":"[0].缺陷总数",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeK",
                    "name":"nodeK",
                    "left":340,
                    "top":300,
                    "list":[
                        {
                            "value":"上一版本",
                            "color":"red"
                        },
                        {
                            "value":"[0].缺陷总数",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeL",
                    "name":"nodeL",
                    "left":500,
                    "top":300,
                    "list":[
                        {
                            "value":"需求上架"
                        }
                    ]
                },
            ],


            count: 0,
            chart_data: null,
            chartDataObj: {},

            form: '',
            option: null
        }
    },
    components:{
        Flow
    },
    props: ['chart'],

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
        nodeList() {
            return this.option.nodeList
        }
    },
    mounted() {
        this.firstGetData()

        //this.form = this.nodeList[this.count].id;
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
        getDataObject(){
            const data  = this.chart_data
            const key   = this.option?.key

            console.log(this.option)


            if(data instanceof Array && data.length>0 && key){
                data.forEach(item=>{
                    this.chartDataObj[item[key]] = item
                })
            }

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

            this.option =null

            this.$nextTick(()=>{
                if(chartData){

                    this.option = _.cloneDeep(renderChart(this.chart_option, this.chart_settings, chartData))




                }else {
                    this.option = this.chart_option
                }

                this.getDataObject()

            })



        },

        //获取图数据
        generateChart(){
            //如果配置了模型id，那么根据模型id去获取数据
            const chart_settings = this.chart_settings

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


            this.chart_data = await getFetchData(this.chart_settings)



        },
        handleClick(node) {
            this.$message.success(JSON.stringify(node))
        },
        handleNext() {
            this.count++
            if (this.count >= this.nodeList.length) {
                this.count = 0;
            }
            this.form = this.nodeList[this.count].id;
        }
    }
}
</script>

<style lang="scss">
.flow__body {

    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

}
</style>
