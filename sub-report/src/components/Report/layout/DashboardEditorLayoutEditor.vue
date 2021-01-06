<template>
    <div class="dashboard-editor__Layout" @click="chooserAside({asideType:'report'})">

        <SketchRule

                :width="report.width"
                :height="report.height"
        >
            <div :style="`height: 100%;background-color:${report.backgroundColor}`">
                <VueDragResize v-for="(element, index) in layout" :key="index"
                               :w="element.w" :h="element.h "
                               :x="element.x" :y="element.y"
                               :parentLimitation="true"
                               @resizing="resizeElement($event, element)"
                               @dragging="resizeElement($event, element)"
                               @clicked.stop="selectItem(element.i)"

                >
                    <DisplayChartElement :item="element"/>

                </VueDragResize>


            </div>


        </SketchRule>




    </div>
</template>
<script>

import {GridLayout, GridItem} from 'vue-grid-layout';
import ChartDialog from '@/components/Report/layout/ChartDialog';
import ChartTitleElement from '../element/ChartTitleElement'
import DisplayChartElement from './DisplayChartElement'
import VueDragResize from 'vue-drag-resize';
import {debounce,cloneDeep} from 'lodash'
import { mapState} from "vuex"
import SketchRule from "@/components/SketchRule"

export default {
    name: "chart-editor-layout-editor",

    data() {
        return {
            visible: false,
            chart_senior:{},
            senior_parameters: {},
        }
    },

    computed: {
        ...mapState({
            layout: state => state.app.layout,
            report: state => state.app.report,

        }),


    },
    components: {
        VueDragResize,
        GridLayout,
        GridItem,
        ChartTitleElement,
        ChartDialog,
        DisplayChartElement,
        SketchRule,
    },

    methods: {
        handleBlur(){
            console.log(1)
        },
        handleFocus(){
            console.log(2)
        },
        chooserAside({asideType}){

            this.$store.dispatch('report/setAsideType',asideType)
        },
        activateEv(index) {
            console.log('activateEv' + index);
            this.$refs['drag-input'].focus();
        },
        selectItem(idx){

            this.chooserAside({asideType:'echart'})

            let chart = this.layout.find((item)=> item.i === idx)

            //this.$store.commit('app/ACTIVE_LAYOUT_ITEM',idx)
            this.$store.commit('app/UPDATA_LAYOUT_ITEM',chart)
            this.$store.dispatch('element/setElementData',chart)
            this.$store.commit('element/SET_CHART_DATA',{prop:'isActive',value:true})
            this.$store.commit('report/SET_ASIDE_ACTIVENAME')

        },


        deleteChart(idx){

            this.$confirm('确定要删除这个图表么, 是否继续?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('app/deleteChart',idx)
            })
        },




        resizeElement: debounce(function(rect,element) {

            element.h = rect.height
            element.w = rect.width
            element.x = rect.left
            element.y = rect.top

            this.$store.commit('app/UPDATA_LAYOUT_ITEM',element)

        },200),



    }

}
</script>
<style lang="scss">
.dashboard-editor__Layout{
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: #0498ff;
}
</style>
