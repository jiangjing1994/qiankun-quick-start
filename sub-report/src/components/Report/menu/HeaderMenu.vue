<template>
    <div >
        <template v-for="(navMenu) in navMenus" >
            <el-menu-item v-if="!navMenu.children&&navMenu"
                          :key="navMenu.value" :data="navMenu" :index="navMenu.value"  :disabled="navMenu.disabled"
            >
                <template slot="title">
                    <div style="padding-left: 10px;">
                        <KemSvgIcon  :icon-class="navMenu.icon" /><span style=";font-size: 12px;padding-left: 6px">{{navMenu.label}}</span>

                    </div>

                 </template>
            </el-menu-item>

            <el-submenu v-if="navMenu.children&&navMenu"
                        :key="navMenu.value" :data="navMenu" :index="navMenu.value" :disabled="navMenu.disabled">
                <template slot="title">
                        <KemSvgIcon  :icon-class="navMenu.icon" /><span >{{navMenu.label}}</span>
                </template>
                <HeaderMenu :navMenus="navMenu.children"></HeaderMenu>
            </el-submenu>
        </template>
    </div>

</template>

<script>
    export default {
        name: 'HeaderMenu',
        props: ['navMenus'],
        data() {
            return {}
        },
        methods: {

        }
    }
</script>


<style lang="scss" >
/* 水平样式 */
.el-menu--horizontal>div>.el-submenu {
    float: left;
}
/* 一级菜单的样式 */
.el-menu--horizontal>div>.el-menu-item {
    float: left;
    height: 45px;
    line-height: 45px;
    font-size: 12px;
    margin: 0;
}
/* 解决下图1 下拉三角图标 */
.el-menu--horizontal>div>.el-submenu .el-submenu__icon-arrow {
    position: static;
    vertical-align: middle;
    margin-left: 3px;
    margin-top: 0px;
}
/* 解决下图2 无下拉菜单时 不对齐问题 */
.el-menu--horizontal>div>.el-submenu .el-submenu__title {
    /*height: 60px;
    line-height: 60px;

    color: #909399;*/
    border-bottom: 2px solid transparent;
    height: 45px;
    line-height: 45px;
    font-size: 12px;
}
/*颜色*/
.text_body{
    //color: $--color-primary;

}
.el-submenu__title *{
    vertical-align:middle!important;
 }

.el-menu-item *{
    vertical-align:middle!important;
 }
</style>
