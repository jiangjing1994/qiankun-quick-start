<template>
    <div style="position: relative">

        <KemDialog :visible.sync="visible"  @save="save" :closeOnClickModal="true">
            <template slot="header">
                <span >
                    代码编辑器
                    <el-tooltip class="item" effect="dark" :content="content" placement="right-end">
                        <el-button type="text" icon="el-icon-info"></el-button>
                    </el-tooltip>
                </span>

            </template>


            <el-alert title="字段&字段别名" type="error"></el-alert>
            <el-alert :title="axisSelecteds.columns.toString()" type="success"></el-alert>
            <el-alert :title="axisSelecteds.columnsName.toString()" type="info"></el-alert>
            <MonacoEditor v-model="computedvalue"  language="javaScript" style="width: 100%;height: 500px;margin-top: 10px"></MonacoEditor>

        </KemDialog>
        <KemButton type="operate.edit" @click="handleButton">编辑</KemButton>

    </div>
</template>
<script>


export default {
    name: 'CodeEditorButton',

    props: {
        value: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        }
    },

    computed: {
        axisSelecteds(){
            const {
                yAxisSelected = [] ,
                xAxisSelected = [],
                columnSelected = [],
            } = this.chart_settings
            const axisSelecteds =  [...xAxisSelected,...yAxisSelected,...columnSelected]
            let columns = []
            let columnsName = []
            axisSelecteds.forEach(item=>{
                columns.push(item.variableName)
                columnsName.push(item.name)

            })
            return   {
                columns,
                columnsName
            }
        },
        chart_settings: {
            get() {
                return this.$store.state.element.chart_settings
            },
        },
        computedvalue: {
            get () {
                return this.value
            },
             set (v) {
                 this.$emit('input', v)
             }
        },

    },

    data() {
        return {
            visible: false,

        }
    },

    methods: {
        handleButton(){
            this.visible = !this.visible

        },
        save(){
        /*    this.$emit('input', this.computedvalue)
            this.$message.success('修改成功')*/
            this.visible = !this.visible
        }
    },
}
</script>

<style scoped>
.el-alert{
    padding: 0 12px;
}

</style>
