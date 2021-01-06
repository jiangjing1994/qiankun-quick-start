<template>
    <KemForm
            :form-items="formItems"
            :form-config="{labelPosition:'left',size:'mini',labelWidth:'100px'}"
            :data="chart.chart_settings"
    >
        <div slot="columnSelected">
            <KemTable
                    :table-data="chart.chart_settings.columnSelected"
                    :column="column"
                    :expand="expand"
                    @clickMenuButton="clickMenuButton"
            >
                <template slot="expand" slot-scope="{ scope }">
                     <KemInput v-model="scope.row.name"></KemInput>
                </template>
            </KemTable>
         </div>




    </KemForm>

</template>
<script>
export default {
    props: ['chart' ],
    data() {
        return {

            expand: true,
            column: [
                {prop: "name", label: "字段别名"},
                {prop: "variableName", label: "字段名称"},
                {prop: "type", label: "所属类型"},
                {prop: "colType", label: "变量类型"}
            ],
            formItems: [
                {
                    label: '指标配置',
                    span:24,
                    prop: 'columnSelected',
                    showIf: () => true,
                    slot: 'columnSelected'
                }
            ]
        }
    },
    methods: {
        clickMenuButton() {

        }
    },

}
</script>



