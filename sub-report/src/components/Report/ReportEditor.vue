<template>

    <div class="ren-report-editor__body ren-report-editor">
        <chart-editor-header-menu  v-loading="loading"/>
        <div class="content_body">
            <split-pane :min-percent='10' :default-percent='74' split="vertical">
                <template slot="paneL">
                    <div class="ren-report-editor-content"  v-loading="loading">
                        <chart-editor-layout-editor></chart-editor-layout-editor>

                    </div>
                </template>
                <template slot="paneR">
                    <div class="ren-report-editor-content" >
                        <chart-editor-right-setting ></chart-editor-right-setting>

                    </div>

                </template>
            </split-pane>

        </div>
    </div>

</template>
<script>
import ChartEditorHeaderMenu from "./layout/ChartEditorHeaderMenu"
import ChartEditorLayoutEditor from "./layout/ChartEditorLayoutEditor"
import ChartEditorRightSetting from "./layout/ChartEditorRightSetting"
import { mapState } from "vuex"
import splitPane from 'vue-splitpane'

export default {
    components: {
        splitPane,
        ChartEditorHeaderMenu,
        ChartEditorLayoutEditor,
        ChartEditorRightSetting
    },
    computed: {
        ...mapState({
            loading: state => state.report.loading,
        }),
    },

    data(){
        return {
            chart: null,
        }
    },
    created(){
        const reportId = this.$route.params.id

        this.$store.dispatch('app/getReport', { reportId }).then(()=>{

            this.$store.commit('report/SET_REPORT_IS_EDIT', true);

        })    },
    methods: {
        selectChartItem(chart){

            this.chart = chart
        },

    }
}
</script>
<style lang="scss">
.ren-report-editor__body{
    height: 100vh;
    background-color: #dff9f9;

    .content_body{
        height: calc(100vh - 50px);
        box-sizing: border-box;
    }
}

</style>
