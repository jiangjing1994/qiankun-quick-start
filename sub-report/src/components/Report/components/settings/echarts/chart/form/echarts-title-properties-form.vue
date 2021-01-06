<template>
    <el-form class="aside-form" label-position="top" label-width="80px" :model="chart.chart_option" v-if="chart && chart.chart_option">
        <el-form-item label="图表标题">
            <el-input v-model="chart.chart_option.title['text']"></el-input>
        </el-form-item>
        <el-form-item label="标题link">
            <el-input v-model="chart.chart_option.title['link']"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
            <el-input v-model="chart.chart_option.title['subtext']"></el-input>
        </el-form-item>
        <el-form-item label="标题位置">
            <el-radio-group v-model="chart.chart_option.title['left']">
                <el-radio :label="'left'">左</el-radio>
                <el-radio :label="'center'">中</el-radio>
                <el-radio :label="'right'">右</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示标题">
            <el-switch v-model="chart.chart_option.title['show']">
            </el-switch>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        props: ['chart'],
        created(){
            if(!this.chart.chart_option.title) {
                this.chart.chart_option.title = {}
            }
        }

    }
</script>