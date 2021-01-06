<template>
<div style="padding: 100px">

    <div>version -{{version}}</div>
    <div>buildTime - {{buildTime}}</div>
    <router-link to="/data_source/dataSourceMgr">  数据源管理 </router-link>
    <router-link to="/data_model/modelMgr">  数据模型管理 </router-link>
    <router-link to="/report/reportMgr">  看板管理 </router-link>
    <router-link to="/dashboard/dashboardMgr"> 大屏管理 </router-link>
</div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            buildTime: process.env.VUE_APP_BUILD_TIME,
            version: process.env.VUE_APP_VERSION
        }
    },
}
</script>

<style scoped>

</style>
