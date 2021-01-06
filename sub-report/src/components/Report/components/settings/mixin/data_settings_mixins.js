export default {
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
        changeDataSource: function(){
            this.$api.GET_DATAMODEL_BY_DSID(this.chart.chart_settings.dataSourceId).then(res=>{
                this.data_model = res;

                this.changeDataModel();
            })
        },
        changeDataModel: function(){
            if(this.chart.chart_settings.dataModelId) {
                let model = this.data_model.find(m => m.id === this.chart.chart_settings.dataModelId)
                if(model) {
                    this.data_model_columns = model.columns
                }else{
                    this.data_model_columns = []
                }
            }
        }

    }
}
