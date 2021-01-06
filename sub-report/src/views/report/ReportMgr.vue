<template>
    <div class="ren-panel">
        <KemPageCard>
            <template slot="header">报告管理</template>

            <KemTable
                    ref="postTable"
                    :menuButton='["addBtn","editBtn","delBtn"]'
                    :default-params="searchParams"
                    @clickMenuButton="clickMenuButton"
                    :request='request'
                    :result='result'
                    :column="column">
                <template slot="menuLeft">
                    <KemInput v-model="search_report_name" ></KemInput>
                </template>
            </KemTable>

        </KemPageCard>


    </div>

</template>


<script>

const result=(res)=>{
    return res.map(item=>{
        return {
            ...item,
            reportName:item.report.name,
            isDashboard:item.report.isDashboard,

        }
    }).filter(item=>{
        return item.isDashboard !== true
    })
}
export default {


    data(){
        return {
            search_report_name: "",

            column:[
                {prop:'reportName',label:'报表名称'}
            ],
            request:this.$api.SEARCH_REPORT_BY_NAME,
            result


        }
    },
    computed: {
        searchParams() {
            return {
                name:this.search_report_name
            }
        }
    },

    methods:{
        clickButton(val){
            alert(val)
        },
        clickMenuButton({type,row}){

            if("add" === type){
                this.$router.push({path:"/report/edit/0"})
            }
            else if("del" === type){
                this.$api.DELETE_REPORT_BY_ID(row.id).then(()=>{
                    this.$refs['postTable'].getListData()

                })
            }
            else if("edit" === type){
                this.$router.push('/report/edit/' + row.id )
            }
        },


    }
}
</script>
