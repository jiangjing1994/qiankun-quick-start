<template>
    <el-form class="aside-form" label-position="top" label-width="80px" :model="chart" v-if="chart.chart_option">
        <el-form-item>
            是否显示图例：&nbsp;<el-switch v-model="chart.chart_option.legend.show"></el-switch>
        </el-form-item>
        <el-form-item label="图表排列方式">
            <el-select v-model="chart.chart_option.legend.orient" placeholder="请选择">
                <el-option label="horizontal" value="horizontal"></el-option>
                <el-option label="vertical" value="vertical"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="x轴位置">
            <el-select v-model="chart.chart_option.legend.x" placeholder="请选择">
                <el-option label="center" value="center"></el-option>
                <el-option label="left" value="left"></el-option>
                <el-option label="right" value="right"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="y轴位置">
            <el-select v-model="chart.chart_option.legend.y" placeholder="请选择">
                <el-option label="top" value="top"></el-option>
                <el-option label="center" value="center"></el-option>
                <el-option label="bottom" value="bottom"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        props: ['chart'],
        create(){
            if(!this.chart.chart_option.legend){
                this.chart.chart_option.legend = {}
            }
        }
    }
</script>