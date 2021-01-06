<template>
    <el-tabs v-model="activeName">

        <el-tab-pane label="基础" name="base">
            <ChartBasePropertiesForm v-if="activeName === 'base'" :chart="chart"></ChartBasePropertiesForm>
        </el-tab-pane>
        <el-tab-pane label="数据" name="data">
            <EchartDataPropertiesForm  v-if="activeName === 'data'" :chart="chart"></EchartDataPropertiesForm>
        </el-tab-pane>
        <el-tab-pane label="功能配置" name="chart">
             <EchartChartPropertiesForm  v-if="activeName === 'chart'" :chart="chart"></EchartChartPropertiesForm>
        </el-tab-pane>
        <el-tab-pane label="高级功能" name="advanced">
            <ChartConfigSenior v-if="activeName === 'advanced'" :chart="chart" />
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import {mapState} from "vuex"
import ChartBasePropertiesForm from './ChartBasePropertiesForm'
import EchartDataPropertiesForm from './DataPropertiesForm'
import EchartChartPropertiesForm from './ChartPropertiesFormBaseSettings'
import EchartCustomizeCodeForm from '../components/settings/echarts/chart/echart-customize-code-form'
import ChartConfigSenior from '../components/settings/echarts/chart/ChartConfigSenior'

export default {
    components: {
        ChartBasePropertiesForm,
         EchartDataPropertiesForm,
        EchartChartPropertiesForm,
        EchartCustomizeCodeForm,
         ChartConfigSenior
    },
    props: {
        showAdvanced: {
            type: Boolean,
            default: true
        },
    },
    data(){
        return {
            BS: null,
        }
    },

    computed: {
        ...mapState({
            chart_settings: state => state.element.chart_settings,
            asideCollapse: state => state.report.asideCollapse,
            asideType: state => state.report.asideType,

        }),
        chart: {
            get() {
                return this.$store.state.element
            },
            // set(value) {
            //
            //     console.log(value)
            //
            //     this.$store.dispatch('element/setElementData',value)
            //
            // }

        },
        activeName: {
            get() {
                return this.$store.state.report.asideActiveName
            },
            set(value) {

                this.$store.commit('report/SET_ASIDE_ACTIVENAME',value)

            }

        },

        chartComponent(){
            return {
                 //simple_table:'TableChartPropertiesForm',
                echarts_customize:'EchartCustomizeCodeForm',
            }[this.chart_settings.chart_type] || 'EchartChartPropertiesForm'
        }
    },

    methods: {

    }
}
</script>
