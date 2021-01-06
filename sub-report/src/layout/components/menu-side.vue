<template>
<div :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}">
    <el-menu
      default-active="2"
      :collapse="asideCollapse"
      :defaut-active="$route.path"
      router
      >

      <el-menu-item index="/data_source/dataSourceMgr">  <ren-icon-svg name="menu-datasource"></ren-icon-svg><span>数据源管理</span></el-menu-item>
      <el-menu-item index="/data_model/modelMgr">  <ren-icon-svg name="menu-datamodel"></ren-icon-svg><span>数据模型管理</span></el-menu-item>
      <el-menu-item index="/report/reportMgr">  <ren-icon-svg name="menu-report"></ren-icon-svg><span>看板管理</span></el-menu-item>
      <el-menu-item index="/dashboard/dashboardMgr">  <ren-icon-svg name="menu-dashboard"></ren-icon-svg><span>大屏管理</span></el-menu-item>

<!--      <el-submenu index="system">-->
<!--        <template slot="title">-->
<!--          <ren-icon-svg name="menu-users"></ren-icon-svg>-->
<!--          <span>系统管理</span>-->
<!--        </template>-->
<!--        <el-menu-item index="userMgr">  <ren-icon-svg name="menu-users"></ren-icon-svg>用户管理</el-menu-item>-->
<!--        <el-menu-item index="roleMgr">  <ren-icon-svg name="menu-role"></ren-icon-svg>角色管理</el-menu-item>-->
<!--        <el-menu-item index="orgMgr">  <ren-icon-svg name="menu-org"></ren-icon-svg>组织管理</el-menu-item>-->
<!--        <el-menu-item index="authPermit">  <ren-icon-svg name="menu-permit"></ren-icon-svg>角色授权</el-menu-item>-->
<!--        <el-menu-item index="resMgr">  <ren-icon-svg name="menu-res"></ren-icon-svg>资源管理</el-menu-item>-->
<!--      </el-submenu>-->

<!--        <el-submenu index="datavis">-->
<!--        <template slot="title">-->
<!--          <ren-icon-svg name="menu-dashboard"></ren-icon-svg>-->
<!--          <span>数据可视化</span>-->
<!--        </template>-->
<!--        <el-menu-item index="/data_source/dataSourceMgr">  <ren-icon-svg name="menu-datasource"></ren-icon-svg>数据源管理</el-menu-item>-->
<!--        <el-menu-item index="/data_model/modelMgr">  <ren-icon-svg name="menu-datamodel"></ren-icon-svg>数据模型管理</el-menu-item>-->
<!--        <el-menu-item index="/report/reportMgr">  <ren-icon-svg name="menu-report"></ren-icon-svg>数据报表管理</el-menu-item>-->
<!--        <el-menu-item index="/bigscreen/BigScreenMgr">  <ren-icon-svg name="menu-dashboard"></ren-icon-svg>大屏管理</el-menu-item>-->
<!--      </el-submenu>-->

    </el-menu>
</div>
</template>
<script>
import { mapState } from 'vuex'


export default {
    name: "menu-side",
    props: ['asideWidth', 'asideWidthCollapse'],
    computed: {
        ...mapState({
            asideCollapse: state => state.menu.asideCollapse,
        })
    },
    methods: {

    }
}
</script>
