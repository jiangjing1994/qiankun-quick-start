<template>

    <ren-report-display :isFollow="true"></ren-report-display>
</template>
<script>
import RenReportDisplay from '@/components/Report/RenReportDisplay'
export default {
    data(){
        return {
            report: null
        }
    },
    components: {RenReportDisplay},



}
</script>
