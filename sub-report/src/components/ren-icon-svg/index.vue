,<template>
    <svg aria-hidden="true" class="svg-icon" >
        <use :xlink:href="icon"></use>
    </svg>
</template>

<script>
    export default {
        name: 'ren-icon-svg',
        props: {
            name: {
                type: String,
                //required: true
            }
        },
        computed: {
            icon () {
                return `#icon-${this.name}`
            }
        }
    }
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;

}
</style>
