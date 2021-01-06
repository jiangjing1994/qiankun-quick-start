<template>

    <div class="report-metric-div"    >
        <el-row  style="width: 100%;text-align: center" v-if="currentChart && currentChart.chart_option && currentChart.chart_option.series!==undefined">
            <el-col
                    :style="{border: (currentChart.chart_settings.isBoard ? '1px solid #eee':'none')}"
                    style="padding: 10px"
                    v-for="(m, key) in currentChart.chart_option.series"
                    :key="key"
                    :span="m.span||6" >
                <div class="summary-item" style='cursor: pointer' @click="clickChartMetric(m)" :style="{color: (m.metric_color ? m.metric_color : currentChart.chart_settings.metricColor),
            fontSize: currentChart.chart_settings.metricFontsize + 'px'}">
                    {{m.value}}<span :style="{fontSize: currentChart.chart_settings.metricUnitFontsize + 'px'}">{{m.unit_name}}</span>
                </div>
                <div class="metric-title" :style="{fontSize: currentChart.chart_settings.titleFontsize+'px'}">{{m.name}}</div>
            </el-col>
        </el-row>
    </div>


</template>
<script>
import { getFetchData } from './generate_chart/index'

import {renderChart} from '../libs/ChartGenerator'
import _ from 'lodash'
export default {
    props: ['chartID', 'chart'],
    data(){
        return {
            chart_data: [],
            currentChart:{}
        }
    },
    mounted(){
        this.refresh()
    },
    computed: {
        chart_settings(){
            return this.chart.chart_settings
        }
    },
    watch:{
        chart_settings: {
            handler: _.debounce(function(){
                this.refresh()
            }, 1000),
            deep: true
        }
    },
    methods: {
        clickChartMetric(item){

            this.$emit('clickChart',{
                params:{
                    value:item.value,
                    seriesName:item.name
                },
                chart_senior:this.currentChart.chart_senior,
                chart_seniorList:this.currentChart.chart_seniorList,
                chart_settings:this.currentChart.chart_settings,
                chart_data:item,
            })
        },


        async refresh(){


            this.chart_data = await getFetchData(this.chart_settings)

            this.currentChart=  renderChart(this.chart, this.chart_settings, this.chart_data)?.chart;


        },
    }

}
</script>
