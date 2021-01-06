<template>
    <div style="overflow: hidden;height: 100vh;">
    <div>
        <el-form class="aside-form" label-position="top" label-width="80px" :model="selectedItem.chart_settings" v-if="selectedItem && selectedItem.chart_settings">

            <el-form-item label="数据源">
                <el-select v-model="selectedItem.chart_settings.dataSourceId" @change="changeDataSource">
                    <el-option v-for="o in data_sources" :key="o.id" :label="o.name" :value="o.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="数据模型">
                <el-select v-model="selectedItem.chart_settings.dataModelId" @change="changeDataModel">
                    <el-option v-for="o in data_models" :key="o.id" :label="o.name" :value="o.id"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="X轴/类别轴">
                <el-select  v-model="selectedItem.chart_settings.xAxisSelected" multiple placeholder="请选择" value-key="name">
                    <el-option
                            v-for="(item, index) in data_columns.filter(c => c.type === 'dimension')"
                            :key="index"
                            :label="item.name"
                            :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="X轴排序">
                <el-select v-model="selectedItem.chart_settings.xAxisSorted">
                    <el-option label="默认" value="0"></el-option>
                    <el-option label="从小到大" value="1"></el-option>
                    <el-option label="从大到小" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Y轴/值轴">
                <el-select v-model="selectedItem.chart_settings.yAxisSelected" multiple placeholder="请选择" value-key="name">
                    <el-option
                            v-for="(item, index) in data_columns.filter(c => c.type === 'metric')"
                            :key="index"
                            :label="item.name"
                            :value="item"
                    >
                    </el-option>
                </el-select >
            </el-form-item>

            <el-divider></el-divider>
            <el-table
                    :data="selectedItem.chart_settings.yAxisSelected"
                    style="width: 100%">
                <el-table-column prop="name" label="名称" width="100"></el-table-column>
                <el-table-column prop="variableName" label="变量名称" width="100"></el-table-column>
            </el-table>
            <el-button type="success" icon="el-icon-plus" circle></el-button>
            <el-divider></el-divider>
            <el-form-item label="是否自动刷新">
                <el-switch v-model="selectedItem.chart_settings.isRefresh">
                </el-switch>
            </el-form-item>
            <el-form-item label="刷新时间">
                <el-input v-model="selectedItem.chart_settings.refreshTime"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-button type="success" @click="refresh">刷新图表</el-button>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
        </el-form>
    </div>
    </div>
</template>
<script>
    import BetterScrollMixin from '@/components/better_scroll_mixin'
    import {mapActions, mapState, mapGetters} from "vuex"

    export default {
        mixins: [BetterScrollMixin],
        created() {
            this.loadDataSources()
            this.changeDataSource()

        },
        methods:{
            refresh: function(){

            },
            changeDataSource:function(){

                if(this.selectedItem.chart_settings.dataSourceId && this.selectedItem.chart_settings.dataSourceId!==0) {
                    this.loadDataModels(this.selectedItem.chart_settings.dataSourceId).then(()=>{
                        if(this.selectedItem.chart_settings.dataModelId && this.selectedItem.chart_settings.dataModelId!==0) {
                            this.setDataColumns(this.selectedItem.chart_settings.dataModelId)
                        }
                    })

                }
            },
            changeDataModel:function(){
                this.setDataColumns(this.selectedItem.chart_settings.dataModelId)
                this.selectedItem.chart_settings.xAxisSelected = []
                this.selectedItem.chart_settings.yAxisSelected = []
            },
            ...mapActions('ren/dashboard', ['loadDataSources', 'loadDataModels', 'setDataColumns', 'loadModelData'])
        },
        computed: {
            ...mapGetters('ren/dashboard', ['selectedItem']),
            ...mapState({
                data_sources: state => state.dashboard.data_sources,
                data_models: state => state.dashboard.data_models,
                data_columns: state => state.dashboard.data_columns
            })
        }

    }
</script>
