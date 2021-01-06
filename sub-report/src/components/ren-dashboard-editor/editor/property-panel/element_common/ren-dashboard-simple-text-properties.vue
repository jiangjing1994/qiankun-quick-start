<template>
    <div style="overflow: hidden;height: 100vh;">
        <div>
            <el-form class="aside-form" label-position="top" label-width="80px" :model="selectedItem"
                     v-if="selectedItem!==undefined">
                <el-form-item label="文字内容">
                    <el-input v-model="selectedItem.chart_settings.fontText"></el-input>
                </el-form-item>
                <el-form-item label="文字颜色">
                    <el-color-picker v-model="selectedItem.chart_settings.fontColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="字体">
                    <el-select v-model="selectedItem.chart_settings.fontFamily">
                        <el-option label="默认" value="inherit"></el-option>
                        <el-option label="微软雅黑" value="Microsoft YaHei"></el-option>
                        <el-option label="sans-serif" value="sans-serif"></el-option>
                        <el-option label="Serif" value="serif"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文字大小">
                    <el-input-number v-model="selectedItem.chart_settings.fontSize" controls-position="right" :min="6" :max="128"></el-input-number>
                </el-form-item>
                <el-form-item label="字体加粗">
                    <el-input v-model="selectedItem.chart_settings.fontWeight"></el-input>
                </el-form-item>
            </el-form>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
        </div>
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