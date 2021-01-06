<template>
    <div class="right-aside-content">
        <report-dashboard-panel v-if="selectedItem===undefined"></report-dashboard-panel>
        <datav-box-border-properties v-else-if="selectedItem.chart_settings && selectedItem.chart_settings.chart_name.startsWith('dv-border-box')"></datav-box-border-properties>
        <datav-decoration-properties v-else-if="selectedItem.chart_settings && selectedItem.chart_settings.chart_name.startsWith('dv-decoration')"></datav-decoration-properties>
        <simple-dashboard-text-properties v-else-if="selectedItem.chart_settings && selectedItem.chart_settings.chart_name === 'simple-dashboard-text'"></simple-dashboard-text-properties>
        <datav-digital-flop-properties v-else-if="selectedItem.chart_settings && selectedItem.chart_settings.chart_name === 'dv-digital-flop'"></datav-digital-flop-properties>
        <datav-capsule-chart-properties v-else-if="selectedItem.chart_settings && selectedItem.chart_settings.chart_name === 'dv-capsule-chart'"></datav-capsule-chart-properties>
        <datav-chart-properties v-else></datav-chart-properties>
    </div>
</template>
<script>
    import ReportDashboardPanel from "./property-panel/report-property-panel"
    import DatavChartProperties from "./property-panel/element_properties/datav-chart-properties-panel"
    import SimpleDashboardTextProperties from "./property-panel/element_properties/simple-dashboard-text-properties"
    import DatavBoxBorderProperties from "./property-panel/element_properties/datav-box-border-properties-panel"
    import DatavDecorationProperties from "./property-panel/element_properties/datav-decoration-properties-panel"
    import DatavDigitalFlopProperties from "./property-panel/element_properties/datav-digital-flop-properties-panel"
    import DatavCapsuleChartProperties from "./property-panel/element_properties/datav-capulse-chart-properties-panel"

    import {mapState, mapGetters} from "vuex"
    export default {
        components: {ReportDashboardPanel, DatavChartProperties,
            SimpleDashboardTextProperties, DatavBoxBorderProperties,
            DatavDecorationProperties, DatavDigitalFlopProperties,
            DatavCapsuleChartProperties},
        computed: {
            ...mapGetters('ren/dashboard', [
                'selectedItem'
            ]),
            ...mapState({
                layout: state => state.dashboard.layout,
            })
        },
    }
</script>
