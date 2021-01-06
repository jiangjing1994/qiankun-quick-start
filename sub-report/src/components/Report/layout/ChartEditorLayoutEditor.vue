<template>
    <div class="ren-report-editor-main ren-report-layout" @click="chooserAside({asideType:'report'})">
        <div>
            <grid-layout
                    :layout.sync="layout"
                    :col-num="12"
                    :row-height="30"
                    :is-draggable="true"
                    :is-resizable="true"
                    :is-mirrored="false"
                    :vertical-compact="true"
                    :margin="[10, 10]"
                    :use-css-transforms="true"
            >
                <grid-item v-for="item in layout"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                           :key="item.i"
                >
                    <DisplayChartElement :item="item" @selectThisChart="selectItem"/>
                </grid-item>
            </grid-layout>
        </div>

    </div>
</template>
<script>

import {GridLayout, GridItem} from 'vue-grid-layout';
import ChartDialog from '@/components/Report/layout/ChartDialog';
import DisplayChartElement from './DisplayChartElement'
import BetterScrollMixin from '@/components/better_scroll_mixin'

import { mapState} from "vuex"

export default {
    name: "chart-editor-layout-editor",
    mixins: [BetterScrollMixin],

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

        }),


    },
    components: {
        GridLayout,
        GridItem,
        ChartDialog,
        DisplayChartElement,
    },

    methods: {
        chooserAside({asideType}){

            this.$store.dispatch('report/setAsideType',asideType)
        },

        // todo 有坑
        selectItem(idx){

            this.chooserAside({asideType:'echart'})
            let chart = this.layout.find((l)=> l.i === idx)
            this.$store.dispatch('element/setElementData',chart)
            this.$store.commit('report/SET_ASIDE_ACTIVENAME')

        },







    }

}
</script>
