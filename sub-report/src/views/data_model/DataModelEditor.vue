<template>
    <div class="ren-panel">
        <div class="ren-panel-title">
            <div class="ren-panel-title-left">
                <h2>数据模型编辑</h2>
            </div>
        </div>
        <div class="ren-panel-title-right">
            <data-model-sql-editor :sqlDataModelID="sqlDataModelID"></data-model-sql-editor>
        </div>
    </div>
</template>
<script>
    import DataModelSqlEditor from '@/components/DataModel/data-model-sql-editor'
    export default {
        components:{DataModelSqlEditor},
        data() {
            return {
                dataSource: [],
                sqlDataModelID: 0
            }
        },
        created(){
            this.sqlDataModelID = this.$route.params.id

        }
    }
</script>
