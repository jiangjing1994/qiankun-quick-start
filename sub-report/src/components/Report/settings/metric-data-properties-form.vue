<template>
    <div class="tab-main-form">
        <el-form class="aside-form" label-position="top" label-width="80px" :model="chart.chart_settings" v-if="chart && chart.chart_settings">
            <el-form-item label="数据源">
                <el-select v-model="chart.chart_settings.dataSourceId" @change="changeDataSource">
                    <el-option v-for="o in data_source" :key="o.id" :label="o.name" :value="o.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="数据模型">
                <el-select v-model="chart.chart_settings.dataModelId" style="width: 160px" @change="changeDataModel">
                    <el-option v-for="o in data_model" :key="o.id" :label="o.name" :value="o.id"></el-option>
                </el-select>
                <ren-icon-svg name="add" style="font-size: 20px;margin-left:3px;"></ren-icon-svg>
                <ren-icon-svg name="edit" style="font-size: 20px;margin-left:3px;"></ren-icon-svg>
            </el-form-item>

            <el-form-item label="指标选取">
                <el-select v-model="cols" multiple placeholder="请选择" >
                    <el-option
                            v-for="item in data_model_columns.filter(c => c.type === 'metric')"
                            :key="item.variableName"
                            :label="item.name"
                            :value="item.id"
                    >
                    </el-option>
                </el-select>
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
    </div>
</template>
<script>
    import BetterScrollMixin from '@/components/better_scroll_mixin'
    import DataSettingMixin from '../components/settings/mixin/data_settings_mixins'

    export default {
        props: ['chart'],
        mixins: [BetterScrollMixin, DataSettingMixin],
        data(){
            return {
                cols: []
            }
        },
        watch: {
            cols: function(){
                this.chart.chart_settings.metricsSelected = this.cols.map((id) => this.data_model_columns.find((m)=>m.id === id))
            }
        },
    }
</script>
