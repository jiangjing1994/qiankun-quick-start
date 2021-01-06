<template>
    <div class="tab-main-form">
        <el-form class="aside-form" label-position="top" label-width="80px" :model="chart.chart_settings"
                 v-if="chart && chart.chart_settings">
            <el-form-item label="指标默认字体颜色">
                <el-color-picker v-model="chart.chart_settings.metricColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="是否显示边框">
                <el-switch v-model="chart.chart_settings.isBoard"></el-switch>
            </el-form-item>
            <el-form-item label="指标默认字体大小">
                <el-input v-model="chart.chart_settings.metricFontsize"></el-input>
            </el-form-item>
            <el-form-item label="指标单位字体大小">
                <el-input v-model="chart.chart_settings.metricUnitFontsize"></el-input>
            </el-form-item>
            <el-form-item label="标题字体大小">
                <el-input v-model="chart.chart_settings.titleFontsize"></el-input>
            </el-form-item>
            <el-form-item label="各个指标配置">
                <el-table
                        :data="chart.chart_settings.metricsSelected"
                        border
                        style="width: 100%">
                    <el-table-column prop="name" label="指标名称" width="100"></el-table-column>
                    <el-table-column prop="name" label="指标单位" width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.unit_name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="指标宽度" width="180">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.span"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="指标字体颜色" width="180">
                        <template slot-scope="scope">
                            <el-color-picker v-model="scope.row.metric_color"></el-color-picker>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import BetterScrollMixin from '@/components/better_scroll_mixin'

    export default {
        props: ['chart'],
        mixins: [BetterScrollMixin],
    }
</script>
