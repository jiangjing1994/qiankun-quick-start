<template>
    <div class="ren-panel">
        <KemPageCard>
            <template slot="header">数据模型管理</template>

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
    data(){
        return {
            request:this.$api.SEARCH_DATA_MODEL,
            name:'',
            column:[
                {prop:'name',label:'数据模型名称'},
                {prop:'type',label:'数据模型类型'},
                {prop:'datasourceName',label:'数据源名称'},

            ],
        }
    },
    computed: {
        searchParams() {
            return {
                name:this.name
            }
        }
    },
    methods: {
        clickMenuButton({type,row}){

            if("add" === type){
                this.$router.push('/data_model/modelEdit/0')
            }
            else if("del" === type){
                this.$api.DELETE_DATA_MODEL(row.id).then(()=>{
                    this.$refs['postTable'].getListData()
                })
            }
            else if("edit" === type){
                this.$router.push('/data_model/modelEdit/' + row.id)
            }
        },

    }
}
</script>
