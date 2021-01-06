<template>
    <div class="chart-item__title" v-if = "chart.chart_settings" :style="titleStyle">
        <div  v-if = "chart.chart_settings.title && chart.chart_settings.title.show">
            <span>{{chart.chart_settings.title.text}} </span>
            <el-tooltip
                    class="item"
                    effect="dark"
                    :content="chart.chart_settings.title.notes"
                    placement="bottom"
                    v-if="chart.chart_settings.title.notes && chart.chart_settings.title.notes !== ''">
                <ren-icon-svg name="help" style="font-size: inherit"></ren-icon-svg>
            </el-tooltip>
        </div>
        <div style="display: flex">

            <chart-title-filter v-for="(p,index) in chart.chart_settings.parameters" :key="index" :parameter="p" style="margin-left:5px;"></chart-title-filter>

<!--
            <KemButton type="text" icon='el-icon-download' style="margin-left: 5px;font-size: 16px" @click="download"/>
-->

        </div>



    </div>
</template>
<script>

 import ChartTitleFilter from "./ChartTitleFilter"


export default {
    props: ['chart'],
    components: {ChartTitleFilter},
    computed: {

        titleStyle() {

            const { title }= this.chart?.chart_settings
            return {
               /* width:'100%',
                justifyContent: title.align,
                fontSize: `${title.fontsize}px`,*/
            }
        }
    },
    methods: {
    /*    async download() {
            const res = await this.generateChart()

            const { chart_settings } = this.chart

            const { title, xAxisSelected,   yAxisSelected}= this.chart?.chart_settings

           // const {rows,columns}= createDataModelParms({chart_settings, rows:res})

            let axisSelected = [...xAxisSelected,...yAxisSelected]

            let tHeader =[]
            let filterVal =[]

            axisSelected.map(item=>{
                tHeader.push(item.variableName)
                filterVal.push(item.name)
            })
            exportJsonToExcel(res,tHeader, filterVal,title.text)

            this.$emit('operateEvents',{type:'download'})
        },
        //获取图数据
        generateChart(){
            //如果配置了模型id，那么根据模型id去获取数据
            const chart_settings = this.chart?.chart_settings

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
        },*/

     },
}
</script>
