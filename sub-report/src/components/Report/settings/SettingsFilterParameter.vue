<template>
    <el-form class="aside-form" label-position="left" label-width="100px" :model="chart.chart_settings" v-if="chart && chart.chart_settings">
        <el-form-item label="参数">
            <el-table
                    :data="chart.chart_settings.parameters"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="defaultType"
                        label="组件类型"
                        width="80">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.defaultType">
                            <el-option label="按钮样式" value="radio"></el-option>
                            <el-option label="下拉框" value="select"></el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="variableName"
                        label="字段名"
                        width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.variableName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="value"
                        label="默认值"
                        width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.value"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="options"
                        label="选项值"
                        width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.options"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="optionsLabel"
                        label="选项名"
                        width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.optionsLabel"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operator"
                        label="操作类型"
                        width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.operator"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作"
                        width="60">
                    <template slot-scope="scope">
                        <el-button @click="delete_parameter(scope.$index)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display:flex;justify-content: center;margin-top: 5px;">
                <el-button type="success" size="mini" icon="el-icon-plus" circle @click="append_parameter"></el-button>
            </div>
        </el-form-item>
    </el-form>
</template>
<script>

export default {
    props: ['chart'],
    methods: {
        append_parameter(){

            if(!(this.chart.chart_settings.parameters instanceof Array)){
                this.chart.chart_settings.parameters=[]
            }
            let new_parameter = {
                name: "",
                variableName: "",
                defaultValue: "",
                options: "",
                defaultType: "select",
                operator: "="
            }
            this.chart.chart_settings.parameters.push(new_parameter)
        },
        delete_parameter(idx){
            this.chart.chart_settings.parameters.splice(idx, 1)
        },
    },

}
</script>
