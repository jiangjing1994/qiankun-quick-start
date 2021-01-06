<template>
    <div class="right-aside-content" >
        <KemForm

                v-if="report"
                ref="editForm"
                :form-items="formItems"
                :form-config="{labelPosition:'left',size:'mini',labelWidth:'120px'}"
                :data="report"
        ></KemForm>

    </div>
</template>
<script>
import {mapState} from "vuex"

export default {
    data(){
        return {
            BS: null
        }
    },
    computed: {
        ...mapState({
            asideCollapse: state => state.report.asideCollapse,
            asideType: state => state.report.asideType
        }),

        report: {
            get() {
                return this.$store.state.app.report
            },
            set(value) {
                this.$store.commit('report/SET_REPORT', value)
            }

        },
        formItems(){
            let dashboardFormItems =[]
            if(this.report.isDashboard){
                dashboardFormItems=[
                    {label: '大屏宽度', prop: 'width', span:24, component: 'KemInputNumber',},
                    {label: '大屏高度', prop: 'height', span:24, component: 'KemInputNumber',},
                    {label: '大屏背景色', prop: 'backgroundColor', span:24, component: 'KemColorPicker',},
                     {label: '大屏背景图', prop: 'backgroundImage', span:24, component: 'KemSelect',props:{
                            options:[
                                {label:'bg4.jpg',value:'bg4.jpg'},
                                {label:'bg5.jpg',value:'bg5.jpg'},
                                {label:'hunan.png',value:'hunan.png'},

                            ]},},
                ]

            }


             return [
                {label: '报表的标题', prop: 'name', span:24, component: 'KemInput',},
                {label: '报表的描述', prop: 'notes', span:24, component: 'KemInput',},
              /*  {label: '是否定时刷新', prop: 'isRefresh', span:24, component: 'el-switch',},*/
                {label: '隐藏邮件功能', prop: 'disableSendEmail', span:24, component: 'el-switch',},
                {label: '大屏', prop: 'isDashboard', span:24, component: 'el-switch',},
                {label: '开启关注', prop: 'isFollow', span:24, component: 'el-switch',},
                {label: '定时刷新的频率', prop: 'refreshInterval', span:24, component: 'KemInput',},
                {label: '图表的主题', prop: 'theme', span:24, component: 'KemSelect',props:{
                        options:[
                            {label:'default',value:'default'},
                            {label:'walden',value:'walden'},
                            {label:'dark',value:'dark'},
                            {label:'light',value:'light'},
                            {label:'westeros',value:'westeros'},
                            {label:'chalk_light',value:'chalk_project'},
                            {label:'westeros_project',value:'westeros_project'},
                        ]},},
                 ...dashboardFormItems

            ]
        }


    }
}
</script>
