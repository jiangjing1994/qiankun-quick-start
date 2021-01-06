<template>
    <div>
        <el-form-item>
            设置为面积图：&nbsp;<el-switch v-model="chart.chart_settings.isLineArea"></el-switch>
        </el-form-item>
        <el-form-item>
            线是否光滑：&nbsp;<el-switch v-model="chart.chart_settings.isLineSmooth"></el-switch>
        </el-form-item>
        <el-form-item>
            线是否标记数据：&nbsp;<el-switch v-model="chart.chart_settings.isLineLabel"></el-switch>
        </el-form-item>

        <el-table
                :data="chart.chart_settings.yAxisSelected"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="y轴选择的名称"
                    width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="系列类型"
                    width="180">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.series_type">
                        <el-option label="折线" value="line"></el-option>
                        <el-option label="柱状" value="bar"></el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>


        <el-table
                :data="chart.chart_settings.yAxisSelected2"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="y轴选择的名称"
                    width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="系列类型"
                    width="180">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.series_type">
                        <el-option label="折线" value="line"></el-option>
                        <el-option label="柱状" value="bar"></el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default{
    props: ['chart'],
    created(){
        // if(this.chart && this.chart.chart_settings && this.chart.chart_settings.yAxisSelected){
        //     for(let i = 0; i < this.chart.chart_settings.yAxisSelected.length;i++){
        //         if(this.chart.chart_settings.yAxisSelected[i].series_type === undefined){
        //             this.chart.chart_settings.yAxisSelected[i].series_type = 'line'
        //         }
        //     }
        // }
    }
}
</script>
