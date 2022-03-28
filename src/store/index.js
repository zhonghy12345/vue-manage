import Vue from 'vue'
import Vuex, { mapGetters } from 'vuex'
import Cookie from 'js-cookie'
import router from '../store/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isCollapse: false,
    tabsList: [
      //默认值
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    currentMenu: null,
    menu: [],
    //权限
    token: ''
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      if (val !== 'home') {  //如果不是首页
        state.currentMenu = val
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabsList.push(val)
        }
      }
      else {
        state.currentMenu = null  //重置
      }
    },
    //修改tabsList数据源
    closeTag(state, val) {
      const result = state.tabsList.findIndex(item => item.name === val.name)
      if (result !== -1) {
        state.tabsList.splice(result, 1)
      }
    },
    setMenu(state, val) {
      store.menu = val
      Cookie.set('menu', JSON.stringify(val))  //缓存 防止丢失
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    //动态添加路由
    addMenu(state, router) {
      if (!Cookie.get('menu')) {  //cookie中没有menu
        return
      }
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const menuArr = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../../views/${item.url}`)
            return item
          })
          menuArr.push(...item.children)
        } else {
          item.component = () => import(`../../views/${item.url}`)
          menuArr.push(item)
        }
      })
      //路由动态添加
      menuArr.forEach(item => {
        router.addRoute('Main', item)
      })
    },
    setToken(state, val) {
      state.token = val
      //将token进行缓存
      Cookie.set('token', val)
    },
    clearToken(state) {   //清除token
      state.token = ''
      Cookie.remove('token')
    },
    getToken(state) {//获取token
      state.token = state.token || Cookie.get('token')
    }
  }
})
export default store