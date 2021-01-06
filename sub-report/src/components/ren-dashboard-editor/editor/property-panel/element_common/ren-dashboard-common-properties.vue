<template>
    <div class="right-aside-content">
        <el-form class="aside-form" label-position="top" label-width="80px" :model="selectedItem" v-if="selectedItem!==undefined">
            <el-form-item label="图表名称">
                <el-input v-model="selectedItem.name"></el-input>
            </el-form-item>
            <el-form-item label="图表描述">
                <el-input v-model="selectedItem.notes"></el-input>
            </el-form-item>
            <el-form-item label="X坐标">
                <el-input v-model="selectedItem.x"></el-input>
            </el-form-item>
            <el-form-item label="Y坐标">
                <el-input v-model="selectedItem.y"></el-input>
            </el-form-item>
            <el-form-item label="宽度">
                <el-input v-model="selectedItem.w"></el-input>
            </el-form-item>
            <el-form-item label="高度">
                <el-input v-model="selectedItem.h"></el-input>
            </el-form-item>
            <el-form-item label="Z坐标-图层">
                <el-input v-model="selectedItem.z"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {mapGetters} from "vuex"
    export default {
        computed: {
            ...mapGetters('ren/dashboard', [
                'selectedItem'
            ]),
        }
    }
</script>