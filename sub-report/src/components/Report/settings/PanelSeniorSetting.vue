<template>
    <el-row>
        <el-col :span="12">
            <chart-title-element :chart="chart_senior"></chart-title-element>
            <div class="chart-item__content" style="height: 500px">
                <component
                        chartID='chartEditorComponent'
                        :chart_option="chart_senior.chart_option"
                        :chart_settings="chart_senior.chart_settings"
                        :is="chartEditorComponent"
                        :chart="chart_senior">

                </component>

            </div>

        </el-col>
        <el-col :span="12">
            <el-tabs v-model="activeName">
                <el-tab-pane label="基础" name="base">
                    <ChartBasePropertiesForm v-if="activeName === 'base'" :chart="chart_senior"></ChartBasePropertiesForm>
                </el-tab-pane>
                <el-tab-pane label="数据" name="data">
                    <EchartDataPropertiesForm  v-if="activeName === 'data'" :chart="chart_senior"></EchartDataPropertiesForm>
                </el-tab-pane>
                <el-tab-pane label="图表" name="chart">
                    <EchartChartPropertiesForm  v-if="activeName === 'chart'" :chart="chart_senior"></EchartChartPropertiesForm>
                </el-tab-pane>
            </el-tabs>

        </el-col>
    </el-row>

</template>
<script>
import {mapState} from "vuex"

import EChartsElement from '@/components/Report/element/EChartsElement.vue'
import CoreMetricElement from '@/components/Report/element/CoreMetricElement'
import SimpleTableElement from '@/components/Report/element/SimpleTableElement'
import BaseFlowElement from '@/components/Report/element/BaseFlowElement'

import ChartTitleElement from '@/components/Report/element/ChartTitleElement'


import ChartBasePropertiesForm from './ChartBasePropertiesForm'
import EchartDataPropertiesForm from './DataPropertiesForm'
import MetricDataPropertiesForm from './metric-data-properties-form'
import EchartChartPropertiesForm from './ChartPropertiesFormBaseSettings'
import MetricChartPropertiesForm from './ChartPropertiesFormBaseSettingsMetric'
 import EchartCustomizeCodeForm from '../components/settings/echarts/chart/echart-customize-code-form'

export default {
    components: {
        EChartsElement,
        CoreMetricElement,
        SimpleTableElement,
        BaseFlowElement,

        ChartTitleElement,

        ChartBasePropertiesForm,
        MetricDataPropertiesForm,MetricChartPropertiesForm,
        EchartDataPropertiesForm, EchartChartPropertiesForm,EchartCustomizeCodeForm,
     },
    props: {
        showAdvanced: {
            type: Boolean,
            default: true
        },
        chart_senior: {
            type: Object,
            default: ()=>{
                return{}
            }
        },

    },
    data(){
        return {
            BS: null,
            activeName: "base"
        }
    },
    watch: {
        chart: {
            //配置发生变化自动更新option
            handler(){

                //this.$store.dispatch('element/setElementData',value)
            },
            deep: true
        },

    },
    computed: {
        ...mapState({
            // chart_senior: state => state.element.chart_senior,
        }),
        chart: {
            get() {
                return this.$store.state.element
            },
            set(value) {

                console.log(value)

                this.$store.dispatch('element/setElementData',value)

            }

        },



        chartEditorComponent(){
            return {
                core_metrics:'CoreMetricElement',
                simple_table:'SimpleTableElement',
                base_flow:'BaseFlowElement',
            }[this.chart_senior.chart_type] || 'EChartsElement'
        }
    },

    methods: {

    }
}
</script>
