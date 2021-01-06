<template>
<!--    <div class="brand"  :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}">
        <a href="#" class="brand-logo" v-show="!asideCollapse">
            DataOps&nbsp;v1.0
        </a>
        <div class="brand-collapse" :class="{'collapsed': asideCollapse}" @click="toggleLeftMenu">
           <ren-icon-svg name="right-arrow-header"></ren-icon-svg>
        </div>
    </div>-->
    <div style="height: 50px;background-color: #264f74;text-align: center;cursor: pointer;color: #ffffff;line-height: 50px;overflow: hidden" @click="toggleLeftMenu">
        DataOps&nbsp;v{{version}}

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import config from "../../../package.json";

    export default {
        name: "header-brand",
        props: ['asideWidth', 'asideWidthCollapse'],
        data() {
            return {
                version: process.env.VUE_APP_BUILD_TIME
            }
        },
        computed: {
            ...mapState({
                asideCollapse: state => state.menu.asideCollapse,
            })
        },
        mounted(){
        },
        methods: {
            ...mapActions(['ren/menu/asideCollapseToggle']),
            ...mapActions('ren/menu', [
                'asideCollapseToggle'
            ]),
            toggleLeftMenu: function(){
                this.asideCollapseToggle()
            }
        }
    }
</script>

<style scoped>

</style>
