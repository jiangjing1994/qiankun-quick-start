<template>
    <div class="chart-item__content" @click.stop="selectThisChart">
        <div class="button_group" v-if="!report.isDashboard">

            <div class="btn"    v-for="(i,key) in buttonList" :key="key" >

                <el-tooltip
                        effect="dark"
                        :content="i.content"
                        placement="top"

                >
                    <download-excel
                        v-if="i.type === 'download'"
                         class   = "btn btn-default"
                        :fetch   = "fetchData"
                        :fields = "getJsonFields()"
                        worksheet = "My Worksheet"
                        type    = "xls"
                        name    = "filename.xls">

                    <KemSvgIcon :iconClass="i.iconClass" />

                </download-excel>
                    <KemSvgIcon v-else :iconClass="i.iconClass" @click.stop="clickbtn(i)" />

                </el-tooltip>
            </div>

        </div>

        <div class="title_body" :style="titleStyle" v-if="!report.isDashboard">
            <ChartTitleElement :chart="item"/>
        </div>

        <div class="content_body" :style="contentStyle">

            <component
                    :is="chartEditorComponent(item.chart_settings.chart_type)"
                    :chartID='item.i'
                    :chart="item"
                    @clickChart="clickChart"
            />
        </div>


        <ChartDialog ref="chartDialog"/>



    </div>
</template>

<script>
import EChartsElement from '../element/EChartsElement'
import CoreMetricElement from '../element/CoreMetricElement'
import SimpleTableElement from '../element/SimpleTableElement'
import ScrollTableElement from '../element/ScrollTableElement'
import BaseFlowElement from '../element/BaseFlowElement'
import TextElement from '../element/TextElement'
import FiltersInputElement from '../element/FiltersInputElement'
import OrnamentIconElement from '../element/OrnamentIconElement'
import TimeElement from '../element/TimeElement'
import DataElement from '../element/DataElement'
import ChartDialog from './ChartDialog';
import ChartTitleElement from '../element/ChartTitleElement'
 import { getFetchData } from '@/components/Report/element/generate_chart/index.js'

import {mapState} from 'vuex'

export default {
    name: "DisplayChartElement",
    components:{
        ChartDialog,
        EChartsElement,
        CoreMetricElement,
        SimpleTableElement,
        ScrollTableElement,
        BaseFlowElement,
        TextElement,
        TimeElement,
        DataElement,
        FiltersInputElement,
        OrnamentIconElement,
        ChartTitleElement,
    },
    data() {
        return {
            json_fields: {
                'Complete name': 'name',
                'City': 'city',
                'Telephone': 'phone.mobile',
                'Telephone 2' : {
                    field: 'phone.landline',
                    callback: (value) => {
                        return `Landline Phone - ${value}`;
                    }
                },
            },
            json_data: [
                {
                    'name': 'Tony Peña',
                    'city': 'New York',
                    'country': 'United States',
                    'birthdate': '1978-03-15',
                    'phone': {
                        'mobile': '1-541-754-3010',
                        'landline': '(541) 754-3010'
                    }
                },
                {
                    'name': 'Thessaloniki',
                    'city': 'Athens',
                    'country': 'Greece',
                    'birthdate': '1987-11-23',
                    'phone': {
                        'mobile': '+1 855 275 5071',
                        'landline': '(2741) 2621-244'
                    }
                }
            ],
        }
    },
    props: ['item'],
    computed: {
        ...mapState({
            report: state => state.app.report,
            reportIsEdit: state => state.report.reportIsEdit,

        }),
        contentStyle() {
            let  top = 55
            if(this.report.isDashboard){
                top  = 15
            }

            return {
                top: `${top}px`,
                width: `100%`,
                height: `calc(100% - ${top}px)`,
                position: `absolute`,
            }
        },
        titleStyle() {
            let  top = 15
            return {
                position: `absolute`,
                height: `40px`,
                width: `100%`,
                top: `${top}px`,
                paddingLeft: `10px`,
            }
        },

        buttonList() {

            if(this.reportIsEdit) return [
                {iconClass:'download',content:'下载',type: 'download'},
                {iconClass:'trashcan',content:'删除',type:'delete'},
            ]

            return [{iconClass:'download',content:'下载',type: 'download'},]
        }
    },
    methods: {
        async fetchData(){
            const {chart_settings} = this.item
            const res = await getFetchData(chart_settings)

            console.log(res)
            return res
         },
        getJsonFields(){
            const item = this.item
            let obj = {}
            try {

                const { chart_settings } = item
                const { title, xAxisSelected,   yAxisSelected}= chart_settings
                let axisSelected = [...xAxisSelected,...yAxisSelected] || []


                axisSelected.map(item=>{
                     obj[item.name] = item.variableName

                })
            }catch  {

                obj={}
            }

            console.log('asdasdasdasda')

            console.log(obj)


            return obj
        },
        clickbtn({type}){

            this.$emit('clickBtn',{type,item:this.item})

            if('delete'===type){
                this.deleteChart(this.item)

            }
            if('download'===type){
                //this.download(this.item)

            }

        },


        deleteChart({i}){

            this.$confirm('确定要删除这个图表么, 是否继续?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('app/deleteChart',i)
            })
        },


        chartEditorComponent(chart_type){

            return {
                core_metrics:'CoreMetricElement',
                base_flow:'BaseFlowElement',
                simple_table:'SimpleTableElement',
                scroll_table:'ScrollTableElement',
                text_base:'TextElement',
                filters_input:'FiltersInputElement',
                ornament_icon:'OrnamentIconElement',
                text_time:'TimeElement',
                data_icons:'DataElement',
            }[chart_type] || 'EChartsElement'
        },
        clickChart(value){
            this.$refs['chartDialog'].openDialog(value)
        },
        selectThisChart(){
            this.$emit('selectThisChart',this.item.i)
        },


         //获取图数据
        generateChart(chart_settings){
            //如果配置了模型id，那么根据模型id去获取数据

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


    },
}
</script>

<style scoped lang="scss">
.chart-item__content{
    height: 100%;
    width: 100%;
    position: relative;
    &:hover .button_group{
        display: block;
    }
    .button_group{
        position: absolute;
        height: 15px;
        line-height: 15px;
        right: 0px;


        display: block;
        color: #1b1b28;
        font-size: 12px;
        text-align: right;
        z-index: 999;
        border: 1px dashed #e5ffff;
        .btn{
            display: inline-block;
            margin: 0 5px;
            cursor: pointer;
            font-size: 20px!important;



        }

    }
    .title_body{
        /*position: absolute;*/
        /*height: 40px;*/
        /*width: 100%;*/
        /*top: 15px;*/
        /*padding-left: 10px;*/
        //line-height: 40px;
    }

    .content_body{
        //top: 55px;
        /*width: 100%;*/
        /*height: calc(100% - 0px);*/
        /*position: absolute;*/

    }
}

</style>
