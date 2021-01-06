<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="基础" name="base">
            <ren-dashboard-common-properties></ren-dashboard-common-properties>
        </el-tab-pane>
        <el-tab-pane label="边框" name="text">
            <ren-dashboard-datav-border-properties></ren-dashboard-datav-border-properties>
        </el-tab-pane>
    </el-tabs>
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
            RenDashboardDatavBorderProperties: resovle => require(['@/components/ren-dashboard-editor/editor/property-panel/element_common/ren-dashboard-datav-border-properties'], resovle),
        },
        methods:{

        }
    }
</script>