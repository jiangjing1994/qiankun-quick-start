<template>
    <div class="ren-layout">
        <!--顶栏-->
<!--        <div class="ren-layout-content">-->
<!--            <aside :flex="{width: asideCollapse ? ('0 0 ' + asideWidthCollapse) : ('0 0 ' + asideWidth)}">-->
<!--                <header-brand :asideWidth="asideWidth" :asideWidthCollapse="asideWidthCollapse" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}"></header-brand>-->
<!--                <menu-side :asideWidth="asideWidth" :asideWidthCollapse="asideWidthCollapse"></menu-side>-->
<!--            </aside>-->
<!--            <article>-->
<!--                <router-view />-->
<!--            </article>-->
<!--        </div>-->
        <router-view />
    </div>
</template>
<script>
    import styles from '@/assets/style/variables.scss'
    import { mapState } from 'vuex'
    import HeaderBrand from './components/header-brand';
    import HeaderUser from './components/header-user';
    import MenuSide from './components/menu-side';
    export default {
        components: {HeaderBrand, MenuSide, HeaderUser},
        data(){
            return {
                asideWidth: styles.asideWidth,
                asideWidthCollapse: '65px'
            }
        },
        computed: {
            ...mapState({
                asideCollapse: state => state.menu.asideCollapse,
            })
        },
    }
</script>
<style lang="scss">
    @import '~@/assets/style/theme/theme.scss';
</style>
