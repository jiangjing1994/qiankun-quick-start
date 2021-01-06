<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="基础" name="base">
            <ren-dashboard-common-properties></ren-dashboard-common-properties>
        </el-tab-pane>
        <el-tab-pane label="装饰" name="text">
            <ren-dashboard-datav-decoration-properties></ren-dashboard-datav-decoration-properties>
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
            RenDashboardDatavDecorationProperties: resovle => require(['@/components/ren-dashboard-editor/editor/property-panel/element_common/ren-dashboard-datav-decoration-properties'], resovle),
        },
        methods:{

        }
    }
</script>