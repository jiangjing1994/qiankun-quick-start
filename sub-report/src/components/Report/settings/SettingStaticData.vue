<template>
    <KemForm
            :form-items="formItems"
            :form-config="{labelPosition:'left',size:'mini',labelWidth:'120px'}"
            :data="chart.chart_settings"
    ></KemForm>
</template>
<script>

export default {
    props: ['chart', ],
    data() {
        return {
            formItems: [
                {label: '值', prop: 'staticData', span:24, component: 'CodeEditorButton',},
            ]
        }
    },
}
</script>
