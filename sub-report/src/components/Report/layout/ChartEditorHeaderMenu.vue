<template>
    <div class="chart-editor-header-menu__body">
       <!-- <div class="report-title">{{report.name}}</div>-->
        <div class="report-charts-menu">
            <el-menu
                    @select="appendChart"
                    mode="horizontal"

            >
                <HeaderMenu :navMenus="menuData" ></HeaderMenu>
            </el-menu>
        </div>
        <div class="report-charts-submit-panel">
            <KemButton @click="saveReport" type="success">保存</KemButton>
            <!--<el-button @click="saveAndPreview"><ren-icon-svg name="preview"></ren-icon-svg>保存并预览</el-button>-->
            <KemButton @click="preview">预览</KemButton>
            <!--<KemButton @click="previewfollow">关注列表</KemButton>-->
            <KemButton type="info" @click="exitToReportMgr">退出</KemButton>
        </div>
    </div>
</template>
<script>

import {mapState} from "vuex"
import HeaderMenu from '../menu/HeaderMenu'
import {menuData} from '../menu/menuConfig'
export default {
    name: "chart-editor-header-menu",
    components:{
        HeaderMenu
    },
    computed: {
        ...mapState({
            report: state => state.app.report,
            id: state => state.app.id,
            layout: state => state.app.layout,
            chart: state => state.element,
        }),
    },
    data() {
        return {
            menuData,
        }
    },
    methods: {


        appendChart(chart_type){




             this.$store.dispatch('app/appendChart',{chart_type})

        },

        saveReport(){

            this.$store.commit('report/SET_LOADING',true);

          ///  this.$store.commit('app/UPDATA_LAYOUT_ITEM',this.chart);

            this.$store.dispatch('app/saveReport').then(()=>{

                this.$store.commit('report/SET_LOADING',false);
                this.$message({
                    message: '报告保存成功！',
                    type: 'success'
                });
            })

        },

        saveAndPreview(){

            this.saveReport();

            this.preview();

        },

        preview(){

            let routeUrl = this.$router.resolve({
                path: `/${this.report.isDashboard?'dashboard':'report'}/view/${this.id}`
            });

            window.open(routeUrl .href, '_blank');
        },
        previewfollow(){

            let routeUrl = this.$router.resolve({
                path: `/follow/view/${this.id}`
            });

            window.open(routeUrl .href, '_blank');
        },

        exitToReportMgr(){

            this.$router.go(-1)

        }
    }
}
</script>

<style lang="scss">
.chart-editor-header-menu__body{
    height: 45px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 35px;
    .report-title{
        width: 250px;
        font-weight: bold;
        font-size: 18px;
        color: #444444;
    }


}
</style>
