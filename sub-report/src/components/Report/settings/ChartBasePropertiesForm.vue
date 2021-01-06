<template>
    <div class="tab-main-form">
        <KemForm
                :form-config="{labelPosition:'left',size:'mini',labelWidth:'120px'}"
                :form-items="chartItems"
                @updataFormData="updataFormData"
                :data="element"
        ></KemForm>
        <KemForm
                :form-config="{labelPosition:'left',size:'mini',labelWidth:'120px'}"
                :form-items="formItems"
                :data="chart.chart_settings.title"
        ></KemForm>
    </div>
</template>
<script>
import BetterScrollMixin from '@/components/better_scroll_mixin'
import {mapState} from "vuex"

export default {
    props: ['chart'],
    mixins: [BetterScrollMixin],
    computed: {
        element: {
            get() {
                return this.$store.state.element
            },
            // set(value) {
            //
            //     this.$store.dispatch('element/setElementData',value)
            //
            // }

        },
        formItems(){
            return [
                {label: '图表标题', prop: 'text', span:24, component: 'KemInput',},
                {label: '标题位置', prop: 'align', span:24,component: 'KemSelect',props:{
                        options:[
                            {label:'左',value:'flex-start'},
                            {label:'中',value:'center'},
                            {label:'右',value:'flex-end'},
                        ]},},
                {label: '是否显示标题', prop: 'show', span:24, component: 'el-switch',},
                {label: '字体大小', prop: 'fontsize', span:24, component: 'KemInputNumber',},
                {label: '标题描述', prop: 'notes', span:24, component: 'KemInput',},


            ]
        },
        chartItems(){
            return [

                {label: 'x', prop: 'x', span:24, component: 'KemInputNumber',},
                {label: 'y', prop: 'y', span:24, component: 'KemInputNumber',},


            ]
        }

    },
    created(){
        if(!this.chart.chart_settings.title){
            this.chart.chart_settings.title = {
                show: true,
                text: "",
                align: "flex-start",
                fontsize: "18",
                titleheight: "32",
                notes: ""
            }
        }
    },
    methods: {
        updataFormData(value) {
            console.log(value)
            this.$store.dispatch('element/setElementData',value)
        }
    },

}
</script>
