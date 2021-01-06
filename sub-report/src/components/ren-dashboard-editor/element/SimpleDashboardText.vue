<template>
    <div>
        <p
                :style="{'color':element.chart_settings.fontColor,
                'fontSize': element.chart_settings.fontSize + 'px',
                'fontFamily': element.chart_settings.fontFamily,
                'fontWeight': element.chart_settings.fontWeight}">
            {{element.chart_settings.fontText}}
        </p>
    </div>
</template>
<script>
    export default {
        props: ['element']
    }
</script>
