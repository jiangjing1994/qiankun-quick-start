<template>
    <div style="overflow: hidden;height: 100vh;">
        <el-form class="aside-form" label-position="top" label-width="80px" :model="selectedItem"
                 v-if="selectedItem!==undefined">
            <el-collapse accordion>
                <el-collapse-item title="高级图样式 chart">
                    <el-form-item label="是否维饼图">
                        <el-switch v-model="selectedItem.chart_settings.pie"></el-switch>
                    </el-form-item>
                    <el-form-item label="是否内部显示label" v-if="selectedItem.chart_settings.pie">
                        <el-switch v-model="selectedItem.chart_settings.insideLabel_show"></el-switch>
                    </el-form-item>
                    <el-form-item label="是否展示玫瑰饼" v-if="selectedItem.chart_settings.pie">
                        <el-switch v-model="selectedItem.chart_settings.roseType"></el-switch>
                    </el-form-item>

                    <el-table
                            :data="selectedItem.chart_settings.yAxisSelected"
                            style="width: 100%">
                        <el-table-column prop="name" label="名称" width="100"></el-table-column>
                        <el-table-column prop="variableName" label="变量名称" width="100"></el-table-column>
                        <el-table-column prop="chart_type" label="选择类型" width="100">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.chart_type">
                                    <el-option label="line" value="line"></el-option>
                                    <el-option label="bar" value="bar"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="分组" width="100">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.stack"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否显示数值" width="100">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.label_show"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="颜色" width="100">
                            <template slot-scope="scope">
                                <el-color-picker v-model="scope.row.color"></el-color-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="折线是否光滑" width="100">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.smooth"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="折线点的大小" width="100">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.linePoint_radius"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="折线是否面积图" width="100">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.area"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="折线面积填充渐变" width="100">
                            <template slot-scope="scope">
                                <el-color-picker v-model="scope.row.area_color_from" show-alpha></el-color-picker>
                                <el-color-picker v-model="scope.row.area_color_to" show-alpha></el-color-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="柱状图颜色渐变" width="100">
                            <template slot-scope="scope">
                                <el-color-picker v-model="scope.row.bar_color_from" show-alpha></el-color-picker>
                                <el-color-picker v-model="scope.row.bar_color_to" show-alpha></el-color-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="柱状图是否显示背景柱" width="100">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.backgroundBar_show"></el-checkbox>
                            </template>
                        </el-table-column>






                    </el-table>
                </el-collapse-item>
                <el-collapse-item title="图表标题 title" name="chart_title">
                    <el-form-item label="是否显示标题">
                        <el-switch v-model="selectedItem.chart_option.title.show"></el-switch>
                    </el-form-item>
                    <el-form-item label="图表标题" v-if="selectedItem.chart_option.title.show">
                        <el-input v-model="selectedItem.chart_option.title.text"></el-input>
                    </el-form-item>
                    <el-form-item label="图表标题字体颜色" v-if="selectedItem.chart_option.title.show">
                        <el-color-picker v-model="selectedItem.chart_option.title.style.fill"
                                         size="mini"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="图表标题字体大小" v-if="selectedItem.chart_option.title.show">
                        <el-input-number v-model="selectedItem.chart_option.title.style.fontSize"
                                         controls-position="right" :min="6" :max="64"></el-input-number>
                    </el-form-item>
                    <el-form-item label="图表标题位置" v-if="selectedItem.chart_option.title.show">
                        <el-select v-model="selectedItem.chart_option.title.style.textAlign">
                            <el-option label="居中" value="center"></el-option>
                            <el-option label="靠右" value="right"></el-option>
                            <el-option label="靠左" value="left"></el-option>
                        </el-select>

                    </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="图例 legend" name="chart_legend">
                    <el-form-item label="是否显示图例">
                        <el-switch v-model="selectedItem.chart_option.legend.show"></el-switch>
                    </el-form-item>
                    <el-form-item label="图例方式" v-if="selectedItem.chart_option.legend.show">
                        <el-select v-model="selectedItem.chart_option.legend.orient">
                            <el-option label="水平" value="horizontal"></el-option>
                            <el-option label="垂直" value="vertical"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图例字体颜色" v-if="selectedItem.chart_option.legend.show">
                        <el-color-picker v-model="selectedItem.chart_option.legend.textStyle.fill"
                                         size="mini"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="图例字体大小" v-if="selectedItem.chart_option.legend.show">
                        <el-input-number v-model="selectedItem.chart_option.legend.textStyle.fontSize"
                                         controls-position="right" :min="6" :max="64"></el-input-number>
                    </el-form-item>
                    <el-form-item label="图例top" v-if="selectedItem.chart_option.legend.show">
                        <el-input v-model="selectedItem.chart_option.legend.top"></el-input>
                    </el-form-item>
                    <el-form-item label="图例bottom" v-if="selectedItem.chart_option.legend.show">
                        <el-input v-model="selectedItem.chart_option.legend.bottom"></el-input>
                    </el-form-item>
                    <el-form-item label="图例left" v-if="selectedItem.chart_option.legend.show">
                        <el-input v-model="selectedItem.chart_option.legend.left"></el-input>
                    </el-form-item>
                    <el-form-item label="图例right" v-if="selectedItem.chart_option.legend.show">
                        <el-input v-model="selectedItem.chart_option.legend.right"></el-input>
                    </el-form-item>
                </el-collapse-item>


            </el-collapse>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
        </el-form>

    </div>
</template>
<script>
    import {mapGetters} from "vuex"
    import BetterScrollMixin from '@/components/better_scroll_mixin'

    export default {
        mixins: [BetterScrollMixin],

        computed: {
            ...mapGetters('ren/dashboard', [
                'selectedItem'
            ]),
        }
    }
</script>