<template>
    <div class="ren-panel">
        <KemPageCard>
            <template slot="header">数据源管理</template>

            <KemTable
                    ref="postTable"
                    :menuButton='["addBtn","editBtn","delBtn"]'
                    :default-params="searchParams"
                    @clickMenuButton="clickMenuButton"
                    :request='request'
                    :column="column">
                <template slot="menuLeft">
                    <KemInput v-model="name" ></KemInput>
                </template>
            </KemTable>
        </KemPageCard>


    </div>

</template>
<script>
export default {
    data() {
        return {
            request: this.$api.SEARCH_DATA_SOURCE_BY_NAME,
            name: "",
            column:[
                {prop:"id",label:"ID"},
                { prop:"name", label:"数据源名称"}
            ]
        }

    },
    computed:{
        searchParams(){
            return {
                name:this.name
            }
        }
    },
    methods: {
        clickMenuButton({type,row}){

            if("add" === type){
                this.$router.push('/data_source/edit/0')
            }
            else if("del" === type){
                const data = this.$refs['postTable'].crudData
                data.splice(data.length-1, 1)
            }
            else if("edit" === type){
                this.$router.push('/data_source/edit/' + row.id)
            }
        },
        searchDataSource: function(){
            this.$api.SEARCH_DATA_SOURCE_BY_NAME(this.search_data_source_name).then(res=>{
                this.dataSources = res
            })
        },
        createDataSource: function(){
            this.$router.push('/data_source/edit/0')
        },
        editRow: function(id){
            this.$router.push('/data_source/edit/' + id)
        },
        deleteRow: function(idx){
            this.dataSources.splice(idx, 1)
        }
    }
}
</script>
