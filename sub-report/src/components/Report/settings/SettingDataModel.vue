<template>
    <el-form class="aside-form" label-position="left" label-width="100px" :model="chart.chart_settings" v-if="chart && chart.chart_settings">
        <el-form-item label="数据源">
            <el-select v-model="chart.chart_settings.dataSourceId" @change="changeDataSource">
                <el-option v-for="o in data_source" :key="o.id" :label="o.name" :value="o.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="数据模型">
            <el-select v-model="chart.chart_settings.dataModelId" style="width: 160px" @change="changeDataModel">
                <el-option v-for="o in data_model" :key="o.id" :label="o.name" :value="o.id"></el-option>
            </el-select>
            <KemButton type="icon.add"  @click="addOREdit()"></KemButton>
            <KemButton type="icon.edit" @click="addOREdit(chart.chart_settings.dataModelId)" ></KemButton>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    props: ['chart'],

    data() {
        return {
            data_source: [],
            data_model: [],
            data_model_columns: []
        }
    },
    mounted() {
        this.$api.GET_ALL_DATASOURCE().then(res =>{
            this.data_source = res;
        })

        if(this.chart.chart_settings && this.chart.chart_settings.dataSourceId) {
            this.changeDataSource()
        }


    },
    methods:{
        changeDataSource(){
            this.$api.GET_DATAMODEL_BY_DSID(this.chart.chart_settings.dataSourceId).then(res=>{
                this.data_model = res;

                this.changeDataModel();
            })
        },
        changeDataModel(){
            if(this.chart.chart_settings.dataModelId) {
                let model = this.data_model.find(m => m.id === this.chart.chart_settings.dataModelId)
                if(model) {
                    this.data_model_columns = model.columns
                }else{
                    this.data_model_columns = []
                }

                this.$emit('getDataModelColumns',this.data_model_columns)
            }
        },
        addOREdit(id){
            this.$router.push(`/data_model/modelEdit/${id||'0'}`)
        }

    }


}
</script>
