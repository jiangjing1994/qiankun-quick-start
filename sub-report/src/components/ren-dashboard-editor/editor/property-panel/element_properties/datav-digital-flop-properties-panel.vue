<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="基础" name="base">
                <ren-dashboard-common-properties></ren-dashboard-common-properties>
            </el-tab-pane>
            <el-tab-pane label="数据" name="data">
                <ren-dashboard-sql-data-properties></ren-dashboard-sql-data-properties>
            </el-tab-pane>
            <el-tab-pane label="高级" name="advance">
                <ren-dashboard-digital-flop-properties></ren-dashboard-digital-flop-properties>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: 'base'
            };
        },
        components: {
            RenDashboardCommonProperties: resovle => require(['@/components/ren-dashboard-editor/editor/property-panel/element_common/ren-dashboard-common-properties'], resovle),
            RenDashboardSqlDataProperties: resovle => require(['@/components/ren-dashboard-editor/editor/property-panel/element_common/ren-dashboard-sql-data-properties'], resovle),
            RenDashboardDigitalFlopProperties: resovle => require(['@/components/ren-dashboard-editor/editor/property-panel/element_common/ren-dashboard-datav-digital-flop-properties'], resovle),
        },
        methods:{

        }
    }
</script>