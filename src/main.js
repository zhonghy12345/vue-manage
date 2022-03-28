import Vue from 'vue'
import App from './App.vue'
import { Button, Container, Main, Header, Aside, Menu, MenuItem, MenuItemGroup, Submenu, Icon } from 'element-ui'
import { Dropdown, DropdownMenu, DropdownItem, Form, FormItem, Input, Select, DatePicker, Switch, Option } from 'element-ui'
import { Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Dialog, MessageBox } from 'element-ui'
import { Pagination, Message } from 'element-ui'


import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'

import store from './store/index.js'
import router from '../router'
import http from 'axios'
import '../api/mock.js'

Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Input)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)

//导航守卫  实现路由监听
router.beforeEach((to, from, next) => {
  store.commit('getToken')   //防止页面刷新 token丢失
  const token = store.state.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })  //强制跳转去登录页面
  } else if (token && to.name === 'login') {
    next({ name: 'Home' })
  }
  else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
