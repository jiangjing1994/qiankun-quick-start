<template>
    <div class="dashboard-display__body">

        <KemDataView
                :backgroundColor="report.backgroundColor"
                :backgroundImage="`img/${report.backgroundImage}`"
                :width="report.width"
                :height="report.height"
            >
            <div style="width:100%;height: 100%;position: relative ">
                <div v-for="(element, index) in layout" :key="index"
                     :w="element.w" :h="element.h "
                     :x="element.x" :y="element.y"

                     :style="` position: absolute;left: ${element.x}px;top: ${element.y}px;width: ${element.w}px;height: ${element.h}px`"
                     :parentLimitation="true"

                >
                    <DisplayChartElement :item="element"/>

                </div>
            </div>



        </KemDataView>

    </div>
</template>
<script>

import DisplayChartElement from '@/components/Report/layout/DisplayChartElement'
import VueDragResize from 'vue-drag-resize';

import {mapState} from 'vuex'
import DataView from '@/components/DataView'
export default{
    props: ['renreport','isFollow'],


    data() {
        return {
            reload:false
        }
    },

    computed: {
        ...mapState({
            layout: state => state.app.layout,
            report: state => state.app.report,

        }),

    },
    components: {

        DisplayChartElement,
        VueDragResize,
        DataView,
    },
    methods: {},

    created() {
        const reportId = this.$route.params.id

        this.$store.dispatch('app/getReport', { reportId }).then(()=>{

            this.$store.commit('report/SET_REPORT_IS_EDIT', false);

            this.reload=true


        })

        window.addEventListener('message', e => {

            this.$store.commit('report/SET_POST_MESSAGE_DATA', e.data);


        });
    },

}
</script>
<style scoped>
.dashboard-display__body{
    width: 100vw;
    height: 100vh;
}
</style>
