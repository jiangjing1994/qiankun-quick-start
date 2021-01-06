<template>
    <div>
        <div style="text-align: right;padding: 15px;border-bottom: 1px solid #eee;">
            <KemButton  v-loading="save_loading" @click="saveDataModel">提交</KemButton>
            <KemButton type="danger" @click="back">取消</KemButton>
        </div>
        <el-form label-width="120px" :model="data_model" style="padding: 10px 20px" v-if="data_model">
            <el-form-item label="数据模型名称">
                <el-input v-model="data_model.name" class="model-input"></el-input>
            </el-form-item>
            <el-form-item label="数据源">

                <el-select v-model="data_model.datasourceId" placeholder="请选择" v-if="dataSources">
                    <el-option v-for="s in dataSources" :key="s.id" :label="s.name" :value="s.id"></el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="SQL语句">

                <el-card shadow="boeder">
                    <div slot="header">
                        <KemButton v-loading="execute_loading" @click="fetchColumns" >执行sql</KemButton>
                    </div>
                    <MonacoEditor  style="height: 400px" v-model="data_model.sqlText" language="sql" />

                </el-card>

            </el-form-item>
            <el-form-item label="列信息">

                <el-card shadow="boeder">
                    <div slot="header">
                        <KemButton type="success"  @click="append_column">新增一行</KemButton>
                    </div>
                    <el-table
                            :data="data_model.columns"
                            border
                            style="width: 1500px">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <MonacoEditor  style="height: 210px;width: 100%" v-model="scope.row.thresholdConfig" language="javaScript" />

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="字段别名"
                                width="150">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="variableName"
                                label="字段名称"
                                width="150">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.variableName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="所属类型"
                                width="150">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.type" placeholder="请选择">
                                    <el-option label="维度值" value="dimension"></el-option>
                                    <el-option label="度量值" value="metric"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="colType"
                                label="变量类型"
                                width="150">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.colType" placeholder="请选择">
                                    <el-option label="字符串类型" value="varchar"></el-option>
                                    <el-option label="整型类型" value="int"></el-option>
                                    <el-option label="浮点类型" value="float"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
<!--                        <el-table-column-->
<!--                                prop="warningRules"-->
<!--                                label="阈值配置"-->
<!--                                width="750">-->
<!--                            <template slot-scope="scope">-->

<!--                                <MonacoEditor  style="height: 180px;width: 750px" v-model="scope.row.thresholdConfig" language="javaScript" />-->
<!--                            </template>-->
<!--                        </el-table-column>-->

                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="delete_column(scope.$index)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-card>


            </el-form-item>
            <!--            <div data-v-6dcd3816="" class="el-form-item el-form-item&#45;&#45;small">-->
            <!--                <label class="el-form-item__label" style="width: 120px;float:none;">SQL语句</label>-->

            <!--                <el-button v-loading="execute_loading" @click="fetchColumns" style="margin-bottom: 8px;">执行sql-->
            <!--                </el-button>-->
            <!--                <div class="monaco-container">-->
            <!--                    <div ref="containerEditor" class="monaco-editor"></div>-->
            <!--                </div>-->
            <!--            </div>-->
            <div class="el-form-item el-form-item--small">

            </div>
        </el-form>

    </div>
</template>
<script>
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import MonacoEditor from '@/components/MonacoEditor'

export default {
    props: ['sqlDataModelID'],
    components: {MonacoEditor},
    data() {
        return {
            save_loading: false,
            execute_loading: false,
            editor: null,
            data_model: null,
            dataSources: null,
            editorOptions: {
                value: "",
                language: 'sql',
                theme: 'vs',
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
            }
        }
    },
    created() {
        if (this.sqlDataModelID == 0) {

            this.data_model = {
                id: 0,
                name: "",
                type: "sql",
                sqlText: "",
                columns: [],
                datasourceId: null,
            }
            this.loadMoncaEditor()

        } else {
            this.$api.GET_DATA_MODEL(this.sqlDataModelID).then(res => {
                this.data_model = res;
                this.loadMoncaEditor()
                if (this.editor !== null) {
                    this.editor.setValue(this.data_model.sqlText)
                }
            })
        }

        this.$api.GET_ALL_DATASOURCE().then((res) => {
            this.dataSources = res;
        })
    },
    methods: {
        append_column() {
            this.data_model.columns.push({
                id: 0,
                name: "",
                variableName: "",
                type: "metric",
                colType: ""
            })
        },
        delete_column(idx) {
            this.data_model.columns.splice(idx, 1)
        },
        saveDataModel() {
            this.save_loading = true;
            this.$api.SAVE_DATA_MODEL(this.data_model.id, this.data_model).then((res) => {
                this.save_loading = false;
                this.data_model = res;
                this.$message({
                    message: '保存成功！',
                    type: 'success'
                });
            })
        },
        back() {
            this.$router.go(-1)
        },
        fetchColumns() {
            this.execute_loading = true
            this.$api.DATA_MODEL_COLS_FETCH(this.data_model).then((res) => {
                this.execute_loading = false
                if (res) {
                    this.data_model.columns = res;
                }
            })
        },
        loadMoncaEditor() {

        }
    }
}

</script>
<style scoped>
.model-input {
    width: 230px;
}

.monaco-container {
    width: 100%;
    height: 300px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid #eee;
}

.monaco-editor {
    width: 100%;
    height: 300px;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
