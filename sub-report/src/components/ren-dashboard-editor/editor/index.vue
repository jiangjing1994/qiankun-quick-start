<template>

    <div class="ren-dashboard-editor" v-if="report!=null && layout!=null" style="overflow: hidden;">
        <div class="ren-dashboard-top-menu">
           <ren-dashboard-chart-select-menu></ren-dashboard-chart-select-menu>
        </div>
        <div class="ren-dashboard-body" v-loading="loading">
            <div class="ren-dashboard-left-elements"><ren-dashboard-left-zindex></ren-dashboard-left-zindex></div>
            <ren-dashboard-main-editor class="ren-dashboard-main-editor"></ren-dashboard-main-editor>
            <div class="ren-dashboard-right-properties"><ren-dashboard-right-properties></ren-dashboard-right-properties></div>
        </div>
    </div>
</template>
<script>
    import RenDashboardMainEditor from "./ren-dashboard-main-editor"
    import RenDashboardChartSelectMenu from "./ren-dashboard-chart-select-menu"
    import RenDashboardLeftZindex from './ren-dashboard-left-zindex'
    import RenDashboardRightProperties from './ren-dashboard-right-properties'
    import { mapState, mapActions } from 'vuex'

    export default {
        components: {RenDashboardMainEditor, RenDashboardChartSelectMenu, RenDashboardLeftZindex, RenDashboardRightProperties},
        created(){
            let id = this.$route.params.id
            this.loadDashboard(id)
        },
        computed: {
            ...mapState({
                report: state => state.dashboard.report,
                layout: state => state.dashboard.layout,
                loading: state => state.dashboard.loading
            })
        },
        methods:{
            ...mapActions('ren/dashboard', [
                'loadDashboard'
            ]),

        }
    }
</script>
