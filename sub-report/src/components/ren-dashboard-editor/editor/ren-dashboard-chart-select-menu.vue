<template>
    <div class="ren-dashboard-editor-header">
        <div class="dashboard-title">{{report.name}}</div>
        <div class="dashboard-charts-menu">
        <el-menu mode="horizontal" @select="handleSelect">
            <el-submenu index="box-border">
                <template slot="title">素材</template>
                <el-menu-item index="dv-border-Box">边框</el-menu-item>
                <el-menu-item index="dv-decoration">装饰</el-menu-item>
            </el-submenu>
            <el-submenu index="base-charts">
                <template slot="title">基础报表</template>
                <el-menu-item index="dv-base-line">折线图</el-menu-item>
                <el-menu-item index="dv-base-bar">柱状图</el-menu-item>
                <el-menu-item index="dv-base-pie">饼图</el-menu-item>
            </el-submenu>
            <el-submenu index="text">
                <template slot="title">文字</template>
                <el-menu-item index="base-text">文字</el-menu-item>
            </el-submenu>
            <el-submenu index="digital">
                <template slot="title">数字指标</template>
                <el-menu-item index="dv-digital-flop">数字翻牌器</el-menu-item>
            </el-submenu>
            <el-submenu index="advance">
                <template slot="title">高级图表</template>
                <el-menu-item index="dv-capsule-chart">胶囊柱图</el-menu-item>
                <el-menu-item index="dv-scroll-board">轮播表</el-menu-item>
            </el-submenu>
        </el-menu>
        </div>
        <div class="dashboard-charts-submit-panel">
            <el-button @click="save"><ren-icon-svg name="save" ></ren-icon-svg>保存</el-button>
<!--
            <el-button @click="saveAndPreview"><ren-icon-svg name="preview"></ren-icon-svg>保存并预览</el-button>
-->
            <el-button @click="preview"><ren-icon-svg name="preview"></ren-icon-svg>预览</el-button>
        </div>
    </div>
</template>
<script>
    import {newBoxBorder, newLBaseLineChart, newBaseBarChart, newPieChart,
        newSimpleDashboardText, newDatavDecoration, newDigitalFlop, newCapsuleChart, newScrollBoard}
        from "../libs/element_generate"
    import {mapActions, mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({
                id: state=>state.dashboard.id,
                report: state => state.dashboard.report
            })
        },
        methods: {
            save: function(){
                this.saveDashboard()
            },
            saveAndPreview(){
                this.saveDashboard().then(()=>{
                    let routeUrl = this.$router.resolve({
                        path: "/dashboard/view/" + this.id,
                    });
                    window.open(routeUrl .href, '_blank');
                })

            },
            preview(){
                let routeUrl = this.$router.resolve({
                    path: "/dashboard/view/" + this.id,
                });
                window.open(routeUrl .href, '_blank');

            },
            handleSelect: function(idx){

                let chart_element = null

                switch(idx){
                    case 'dv-border-Box':
                        chart_element = newBoxBorder()
                        break
                    case 'dv-decoration':
                        chart_element = newDatavDecoration()
                        break
                    case 'dv-base-line':
                        chart_element = newLBaseLineChart()
                        break
                    case 'dv-base-bar':
                        chart_element = newBaseBarChart()
                        break
                    case 'dv-base-pie':
                        chart_element = newPieChart()
                        break
                    case 'dv-digital-flop':
                        chart_element = newDigitalFlop()
                        break
                    case 'dv-capsule-chart':
                        chart_element = newCapsuleChart()
                        break
                    case 'dv-scroll-board':
                        chart_element = newScrollBoard()
                        break
                    case 'base-text':
                        chart_element = newSimpleDashboardText()
                        break
                }

                if(chart_element !== null) {
                    this.appendElement(chart_element)
                }

            },
            ...mapActions('ren/dashboard', [
                'appendElement','saveDashboard'
            ])
        }
    }
</script>
