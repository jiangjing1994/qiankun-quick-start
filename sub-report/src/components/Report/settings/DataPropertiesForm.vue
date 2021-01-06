<template>
    <div class="tab-main-form">



        <div>{{chart_type}}</div>
        <SettingDataBase :chart="chart"/>
        <template v-if="!chart.chart_settings.openStaticData">
            <SettingDataModel :chart="chart" @getDataModelColumns="getDataModelColumns"/>
            <SettingDimensionMetric v-if="isEchart(chart_type)" :chart="chart" :dataModelColumns="dataModelColumns"/>
            <SettingCoreMetricsSelected :chart="chart"  :dataModelColumns="dataModelColumns" v-if="'core_metrics' === chart_type"/>

            <SettingMetric v-if="isTable(chart_type)"   :chart="chart" :dataModelColumns="dataModelColumns"/>
            <SettingBaseFlowSelected :chart="chart"  :dataModelColumns="dataModelColumns" v-if="'base_flow' === chart_type"/>
            <SettingsFilterParameter  :chart="chart" :dataModelColumns="dataModelColumns"/>
        </template>
        <template v-else>
            <SettingStaticData :chart="chart"/>

        </template>

    </div>
</template>
<script>
import DragSelect from '@/components/DragSelect/index'
import BetterScrollMixin from '@/components/better_scroll_mixin'
import DataSettingMixin from '../components/settings/mixin/data_settings_mixins'
import SettingDataBase from './SettingDataBase'
import SettingDataModel from './SettingDataModel'
import SettingStaticData from './SettingStaticData'
import SettingDimensionMetric from './SettingDimensionMetric'
import SettingMetric from './SettingMetric'
import SettingCoreMetricsSelected from './SettingCoreMetricsSelected'
import SettingBaseFlowSelected from './SettingBaseFlowSelected.vue'
import SettingsFilterParameter from './SettingsFilterParameter'
export default {
    props: ['chart'],
    components: {
        SettingDataModel,
        SettingDimensionMetric,
        SettingStaticData,
        SettingMetric,
        SettingCoreMetricsSelected,
        SettingsFilterParameter,
        SettingBaseFlowSelected,
        DragSelect,
        SettingDataBase
    },
    mixins: [BetterScrollMixin, DataSettingMixin],
    data() {
        return {
            dataModelColumns: [],
            activeName: '1'
        }
    },
    computed: {
        chart_type() {
            return this.chart?.chart_settings?.chart_type;
        }
    },

    methods: {
        isEchart(chart_type){
            return chart_type.split('_')[0] === 'echarts';
        },
        isTable(chart_type){
            return 'scroll_table' === chart_type || 'simple_table' === chart_type||'base_flow' === chart_type||'data_icons' === chart_type
        },
        getDataModelColumns(value){
            this.dataModelColumns = value
        },
        clickMenuButton(value){
        },

        addOREdit(id){
            this.$router.push(`/data_model/modelEdit/${id||'0'}`)
        }
    }

}
</script>
