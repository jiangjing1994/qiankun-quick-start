<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="基础" name="base">
                <ren-dashboard-common-properties></ren-dashboard-common-properties>
            </el-tab-pane>
            <el-tab-pane label="文字" name="text">
                <ren-dashboard-simple-text-properties></ren-dashboard-simple-text-properties>
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
            RenDashboardSimpleTextProperties: resovle => require(['@/components/ren-dashboard-editor/editor/property-panel/element_common/ren-dashboard-simple-text-properties'], resovle),
        },
        methods:{

        }
    }
</script>