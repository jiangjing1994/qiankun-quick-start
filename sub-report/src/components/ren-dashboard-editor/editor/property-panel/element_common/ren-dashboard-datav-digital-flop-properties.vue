<template>
    <div style="overflow: hidden;height: 100vh;">
        <div>
            <el-form class="aside-form" label-position="top" label-width="80px" :model="selectedItem"
                     v-if="selectedItem!==undefined">
                <el-form-item label="主要内容">
                    <el-input v-model="selectedItem.chart_settings.fontContent"></el-input>
                </el-form-item>
                <el-form-item label="文字颜色">
                    <el-color-picker v-model="selectedItem.chart_settings.fontColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="文字大小">
                    <el-input-number v-model="selectedItem.chart_settings.fontSize" controls-position="right" :min="6" :max="128"></el-input-number>
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