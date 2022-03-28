//路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由配置
const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),  //按需引入
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: () => import('../views/home')
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () => import('../views/User')
      // },
      // {
      //   path: '/mall',
      //   name: 'mall',
      //   component: () => import('../views/mall')
      // },
      // {
      //   path: '/page1',
      //   name: 'page1',
      //   component: () => import('../views/other/pageOne')
      // }, {
      //   path: '/page2',
      //   name: 'page2',
      //   component: () => import('../views/other/pageTwo')
      // },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router