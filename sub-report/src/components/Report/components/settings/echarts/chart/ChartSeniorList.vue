<template>
    <div>
        <KemDialog :visible.sync="visible" @save="save">
            <template slot="header">默认</template>
            <PanelSeniorSetting v-if="visible" :chart_senior="chart_senior"></PanelSeniorSetting>

        </KemDialog>

        <avue-crud ref="crud" :option="option1" :data="chart_seniorList" @row-update="rowUpdate"  >
            <template slot-scope="{row,index}" slot="menu">
                <KemButton type="text" @click="rowEdit(row,index)">配置</KemButton>
                <KemButton type="text" @click="rowCell(row,index)">{{!row.$cellEdit?'编辑':'保存'}}</KemButton>
                <KemButton type="text" @click="copyCell(row,index)">复制</KemButton>
                <KemButton type="text" @click="rowDel(row,index)">删除</KemButton>
            </template>
        </avue-crud>
    </div>


</template>

<script>

import PanelSeniorSetting from '@/components/Report/settings/PanelSeniorSetting'
 import {cloneDeep} from 'lodash'
import {mapState} from "vuex"

export default {
    components:{
        PanelSeniorSetting
    },
    data(){
        return {
            visible:false,
            chart_senior:{},

            option1:{
                addBtn:false,
                menuWidth:180,
                editBtn:false,
                delBtn:false,
                addRowBtn:false,
                cellBtn:false,
                cancelBtn:false,
                refreshBtn:false,
                columnBtn:false,
                column: [{
                    label:'参数变量名',
                    prop: 'variableName',
                    cell: true,

                },]
            }
        }
    },
    computed: {
        ...mapState({
            chart_seniorList: state => state.element.chart_seniorList,
        }),


    },

    methods:{
        addCell(){
            this.$refs.crud.rowCellAdd({})
        },
        rowCell(row, index) {
            this.$refs.crud.rowCell(row, index)
        },
        copyCell(row, index) {
            let newRow = cloneDeep(row)

            delete newRow.$index

            this.chart_seniorList.splice(row.$index+1,0, newRow)
        },
        rowEdit(row, index) {

            this.chart_senior=row

            this.visible = true

        },
        rowDel(row, index) {
            this.chart_seniorList.remove(row)
        },
        rowUpdate(form, index, done) {
            // this.$message.success(
            //     '编辑数据' + JSON.stringify(form) + '数据序号' + index
            // )
            done()
        },
        handleRowClick(row, event, column) {
            this.$message({
                showClose: true,
                message: '序号' + row.$index,
                type: 'success',
            });
        },


        save(){
            this.$store.commit('element/UPDATA_SENIORLIST_ITEM',this.chart_senior);

            this.visible = !this.visible

        },
    }
}
</script>

<style scoped>

</style>
