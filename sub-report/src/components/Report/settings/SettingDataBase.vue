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
                 {label: '静态数据', prop: 'openStaticData', span:24, component: 'KemSwitch',},
            ]
        }
    },
}
</script>
