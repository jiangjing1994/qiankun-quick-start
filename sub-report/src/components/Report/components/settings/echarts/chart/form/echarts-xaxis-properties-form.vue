<template>
    <el-form class="aside-form" label-position="top" label-width="80px" :model="chart" v-if="chart.chart_option">
        <el-form-item>
            是否显示X轴：&nbsp;<el-switch v-model="chart.chart_option.xAxis.show"></el-switch>
        </el-form-item>
        <el-form-item>
            X轴是否边界留空隙：&nbsp;<el-switch v-model="chart.chart_option.xAxis.boundaryGap"></el-switch>
        </el-form-item>


    </el-form>
</template>
<script>
    export default {
        props: ['chart'],

    }
</script>