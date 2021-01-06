<template>
    <div class="ren-panel">
        <div class="ren-panel-title">
            <div class="ren-panel-title-left">
                <h2>数据源编辑</h2>
            </div>
        </div>
        <div class="ren-panel-title-right">
            <el-form label-width="120px" :model="data_source" style="padding: 10px 20px" v-if="data_source">
                <el-form-item label="数据源名称">
                    <el-input v-model="data_source.name" class="model-input"></el-input>
                </el-form-item>
                <el-form-item label="数据源类型">
                   <el-select v-model="data_source.type" placeholder="请选择">
                        <el-option label="Mysql数据源" value="mysql"></el-option>
                        <el-option label="Oracle数据源" value="oracle"></el-option>
                        <el-option label="AntDB数据源" value="antdb"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据源URL地址">
                    <el-input v-model="data_source.url" class="model-input"></el-input>
                </el-form-item>
                <el-form-item label="数据源用户名">
                    <el-input v-model="data_source.username" class="model-input"></el-input>
                </el-form-item> 
                 <el-form-item label="数据源密码">
                    <el-input v-model="data_source.password" class="model-input" show-password></el-input>
                </el-form-item>               
            </el-form>
            <div style="display:flex;justify-content: center;padding: 15px;border-top: 1px solid #eee;">
                <el-button type="primary" @click="saveDataSource" v-loading="save_loading">保  存</el-button>
                <el-button @click="test">测试连接</el-button>
                <el-button @click="back">返  回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return {
                data_source: null,
                data_source_id: null,
                save_loading: false
            }
        },
        
        created() {
            this.data_source_id = this.$route.params.id
            if (this.data_source_id == 0) {

                this.data_source = {
                    id: 0,
                    name:"",
                    type: "mysql",
                    url: "",
                    username: "",
                    password: ""
                }

            } else {
                this.$api.GET_DATA_SOURCE(this.data_source_id).then(res => {
                    this.data_source = res;
                })
            }

        },
        methods:{
            saveDataSource: function(){
                    this.save_loading = true
                    this.$api.SAVE_DATA_SOURCE(this.data_source).then((res)=>{
                        this.data_source = res
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                        this.save_loading = false
                    })
            },
            back(){
                 this.$router.go(-1)
            },
            test(){
                this.$api.TEST_DATA_SOURCE_CONNECTION(this.data_source).then((res)=>{
                    if(res && res.code && res.code !== 0){
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }else{
                         this.$message({
                            message: '连接成功！',
                            type: 'success'
                        })
                    } 
                })
            }

        }
        
    }
</script>
<style scoped>
    .model-input {
        width: 260px;
    }
</style>