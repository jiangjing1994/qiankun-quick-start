import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: {name: 'home'},
    component: Layout,
    children: [
      {path: '/home', name: 'home', component: ()=>import('../views/home/index')},
      {path: '/report/reportMgr', name: 'report-management', component: ()=>import('../views/report/ReportMgr')},
      {path: '/report/edit/:id', name: 'report-editor', component: ()=>import('../views/report/ReportEditor')},
      {path: '/data_model/modelMgr', name: 'data-model-management', component: ()=>import('../views/data_model/DataModelMgr')},
      {path: '/data_model/modelEdit/:id', name: 'data-model-editor', component: ()=>import('../views/data_model/DataModelEditor')},
      {path: '/data_source/dataSourceMgr', name: 'data-source-management', component: ()=>import('../views/data_source/DataSourceMgr')},
      {path: '/data_source/edit/:id', name: 'data-source-editor', component: ()=>import('../views/data_source/DataSourceEditor')},
      {path: '/dashboard/dashboardMgr', name: 'dashboard-management', component: ()=>import('../views/dashboard/DashboardMgr')},
    ]
  },
  {path: '/dashboard/edit/:id', name: 'dashboard-management-editor', component: ()=>import('@/views/dashboard/DashboardEditor')},
  {path: '/dashboard/view/:id', name: 'dashboard-management-view', component: ()=>import('@/views/dashboard/DashboardView')},
  {path: '/report/view/:id', name: 'report-view', component: ()=>import('../views/report/ReportView')},
  {path: '/aaaa', name: 'rzxczxcd', component: ()=>import('../views/PieChart')},


]


// const router = new VueRouter({
//   mode: 'hash',
//   base: process.env.BASE_URL,
//   routes
// })
//
// export default router
export default routes
