<template>
    <div style="overflow: hidden;height: 100vh;">
        <div>
        <el-form class="aside-form" label-position="top" label-width="80px" :model="report" v-if="report" >
            <el-form-item label="大屏的标题">
                <el-input v-model="report.name"></el-input>
            </el-form-item>
            <el-form-item label="大屏宽度">
                <el-input v-model="report.width"></el-input>
            </el-form-item>
            <el-form-item label="大屏高度">
                <el-input v-model="report.height"></el-input>
            </el-form-item>
            <el-form-item label="缩放方式">
                <el-radio-group v-model="report.resize_type">
                    <el-radio :label="1" style="margin-bottom: 5px;">自适应高宽</el-radio>
                    <el-radio :label="2" style="margin-bottom: 5px;">宽度铺满，按比例缩放</el-radio>
                    <el-radio :label="3" style="margin-bottom: 5px;">高度铺满，按比例缩放</el-radio>
                    <el-radio :label="4" style="margin-bottom: 5px;">保持原始分辨率</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="内置背景图片地址">
                <el-input v-model="report.background_pic"></el-input>
            </el-form-item>
            <el-form-item label="背景颜色">
                <el-color-picker v-model="report.background_color"></el-color-picker>
            </el-form-item>
            <el-form-item label="背景图片模糊度">
                <el-slider v-model="report.background_blur"></el-slider>
            </el-form-item>
            <el-form-item label="背景图片透明度">
                <el-slider v-model="report.background_alpha"></el-slider>
            </el-form-item>
            <el-form-item label="图表样式主题">
                <el-input v-model="report.theme"></el-input>
            </el-form-item>
            <el-form-item label="大屏变量">
                <p>这里需要一个表格</p>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
    import BetterScrollMixin from '@/components/better_scroll_mixin'

    import {mapState} from 'vuex'
    export default {
        mixins: [BetterScrollMixin],
        computed:{
            ...mapState({
                report: state => state.dashboard.report,
            })
        }
    }
</script>
