<template>
    <div>
        <el-form class="aside-form" label-position="top" label-width="80px" :model="chart.chart_settings"
                 v-if="chart!==undefined">
        <el-table :data="chart.chart_settings.yAxisSelected" border
                  style="width: 100%">
            <el-table-column prop="name" label="名称" width="60"></el-table-column>
            <el-table-column label="线颜色" width="60">
                <template slot-scope="scope">
                    <el-color-picker v-model="scope.row.line_color"></el-color-picker>
                </template>
            </el-table-column>
            <el-table-column label="线的宽度" width="60">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.line_width"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="区域颜色" width="60">
                <template slot-scope="scope">
                    <el-color-picker v-model="scope.row.area_color" show-alpha></el-color-picker>
                </template>
            </el-table-column>
            <el-table-column label="点的大小" width="60">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.symbol_size"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="点的样式" width="60">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.symbol_type">
                        <el-option label="circle" value="circle"></el-option>
                        <el-option label="rect" value="rect"></el-option>
                        <el-option label="roundRect" value="roundRect"></el-option>
                        <el-option label="triangle" value="triangle"></el-option>
                        <el-option label="diamond" value="diamond"></el-option>
                        <el-option label="pin" value="pin"></el-option>
                        <el-option label="arrow" value="arrow"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="点的颜色" width="60">
                <template slot-scope="scope">
                    <el-color-picker v-model="scope.row.symbol_color"></el-color-picker>
                </template>
            </el-table-column>
        </el-table>
        </el-form>
    </div>
</template>
<script>
    export default{
        props: ['chart'],
    }
</script>