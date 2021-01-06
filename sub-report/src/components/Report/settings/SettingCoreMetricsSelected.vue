<template>
    <el-form class="aside-form" label-position="left" label-width="100px" :model="chart.chart_settings" v-if="chart && chart.chart_settings">
        <el-form-item label="指标选取">
            <drag-select v-model="chart.chart_settings.metricsSelected" multiple placeholder="请选择" value-key="variableName">
                <el-option
                        v-for="item in dataModelColumns"
                        :key="item.variableName"
                        :label="item.name"
                        :value="item"
                >
                </el-option>
            </drag-select>
        </el-form-item>
        <el-form-item label="指标配置">
            <el-table
                    :data="chart.chart_settings.metricsSelected"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="指标名称"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="variableName"
                        label="变量名称"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="displayName"
                        label="显示名称"
                        width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.displayName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="aggFunction"
                        label="聚合方式"
                        width="120">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.aggFunction">
                            <el-option label="求和" value="sum"></el-option>
                            <el-option label="平均" value="avg"></el-option>
                            <el-option label="计数" value="count"></el-option>
                            <el-option label="最大值" value="max"></el-option>
                            <el-option label="最小值" value="min"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
    </el-form>
</template>
<script>
import DragSelect from '@/components/DragSelect/index'

export default {
    props: ['chart','dataModelColumns'],
    components:{DragSelect},
}
</script>
