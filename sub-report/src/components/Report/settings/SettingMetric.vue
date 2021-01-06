<template>
    <el-form class="aside-form" label-position="left" label-width="100px" :model="chart.chart_settings" v-if="chart && chart.chart_settings">

        <el-form-item label="指标选取">
            <drag-select v-model="chart.chart_settings.columnSelected" multiple placeholder="请选择" value-key="variableName">
                <el-option
                        v-for="item in dataModelColumns"
                        :key="item.variableName"
                        :label="item.name"
                        :value="item"
                >
                </el-option>
            </drag-select>
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
