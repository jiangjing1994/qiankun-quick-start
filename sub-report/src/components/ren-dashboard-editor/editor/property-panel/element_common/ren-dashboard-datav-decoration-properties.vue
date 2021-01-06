<template>
    <div style="overflow: hidden;height: 100vh;">
        <div>
            <el-form class="aside-form" label-position="top" label-width="80px" :model="selectedItem"
                     v-if="selectedItem!==undefined">
                <el-form-item label="装饰类型">
                    <el-select v-model="selectedItem.chart_settings.chart_name">
                        <el-option label="dv-decoration-1" value="dv-decoration-1"></el-option>
                        <el-option label="dv-decoration-2" value="dv-decoration-2"></el-option>
                        <el-option label="dv-decoration-3" value="dv-decoration-3"></el-option>
                        <el-option label="dv-decoration-4" value="dv-decoration-4"></el-option>
                        <el-option label="dv-decoration-5" value="dv-decoration-5"></el-option>
                        <el-option label="dv-decoration-6" value="dv-decoration-6"></el-option>
                        <el-option label="dv-decoration-7" value="dv-decoration-7"></el-option>
                        <el-option label="dv-decoration-8" value="dv-decoration-8"></el-option>
                        <el-option label="dv-decoration-9" value="dv-decoration-9"></el-option>
                        <el-option label="dv-decoration-10" value="dv-decoration-10"></el-option>
                        <el-option label="dv-decoration-11" value="dv-decoration-11"></el-option>
                        <el-option label="dv-decoration-12" value="dv-decoration-12"></el-option>
                        <el-option label="dv-decoration-13" value="dv-decoration-13"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主颜色">
                    <el-color-picker v-model="selectedItem.chart_settings.color1"></el-color-picker>
                </el-form-item>
                <el-form-item label="副颜色">
                    <el-color-picker v-model="selectedItem.chart_settings.color2"></el-color-picker>
                </el-form-item>
                <el-form-item label="是否reverse">
                    <el-checkbox v-model="selectedItem.chart_settings.reverse"></el-checkbox>
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