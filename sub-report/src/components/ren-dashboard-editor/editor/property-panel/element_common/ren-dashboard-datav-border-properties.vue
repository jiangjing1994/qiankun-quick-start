<template>
    <div style="overflow: hidden;height: 100vh;">
        <div>
            <el-form class="aside-form" label-position="top" label-width="80px" :model="selectedItem"
                     v-if="selectedItem!==undefined">
                <el-form-item label="边框类型">
                    <el-select v-model="selectedItem.chart_settings.chart_name">
                        <el-option label="dv-border-box-1" value="dv-border-box-1"></el-option>
                        <el-option label="dv-border-box-2" value="dv-border-box-2"></el-option>
                        <el-option label="dv-border-box-3" value="dv-border-box-3"></el-option>
                        <el-option label="dv-border-box-4" value="dv-border-box-4"></el-option>
                        <el-option label="dv-border-box-5" value="dv-border-box-5"></el-option>
                        <el-option label="dv-border-box-6" value="dv-border-box-6"></el-option>
                        <el-option label="dv-border-box-7" value="dv-border-box-7"></el-option>
                        <el-option label="dv-border-box-8" value="dv-border-box-8"></el-option>
                        <el-option label="dv-border-box-9" value="dv-border-box-9"></el-option>
                        <el-option label="dv-border-box-10" value="dv-border-box-10"></el-option>
                        <el-option label="dv-border-box-11" value="dv-border-box-11"></el-option>
                        <el-option label="dv-border-box-12" value="dv-border-box-12"></el-option>
                        <el-option label="dv-border-box-13" value="dv-border-box-13"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主颜色">
                    <el-color-picker v-model="selectedItem.chart_settings.color1"></el-color-picker>
                </el-form-item>
                <el-form-item label="副颜色">
                    <el-color-picker v-model="selectedItem.chart_settings.color2"></el-color-picker>
                </el-form-item>
<!--                <el-form-item label="背景颜色">-->
<!--                    <el-color-picker v-model="selectedItem.chart_settings.bgColor"></el-color-picker>-->
<!--                </el-form-item>-->

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