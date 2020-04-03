// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from '@/vuex/store'

import global from '@/components/global.js'
import functions from './globalFunctions.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qrcode from 'vue-qrcode-directive'
import vueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件，图例
require('echarts/lib/component/title')
require('echarts/lib/component/grid')
require('echarts/lib/component/tooltip')

Vue.config.productionTip = false

Vue.prototype.$axios = axios
//vue全局注入echarts
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.use(functions)
Vue.use(qrcode)
Vue.use(vueDirectiveImagePreviewer)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  // 判断该路由是否需要登录权限
  if (type === 'login') {
    if (sessionStorage.getItem("token")) {
      next()
    } else {
      next('/login')
    }
  } else {
    next() // 确保一定要有next()被调用
  }


  let allowBack = false //    给个默认值true
  if (to.meta.allowBack !== undefined) {
    allowBack = to.meta.allowBack
  }
  if (!allowBack) {
    history.pushState(null, null, location.href)
  }
  store.dispatch('updateAppSetting', { //   updateAppSetting 只是store里面的一个action， 用来改变store里的allowBack的值的，具体怎么改这个值 要根据各位的实际情况而定
    allowBack: allowBack
  })
})

// http 请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求前
  let pathname = location.pathname;
  if (sessionStorage.getItem('token')) {
    if (pathname !== '#/' && pathname !== '#/login') {
      config.headers.common['token'] = sessionStorage.getItem('token');
    }
  }
  return config;
}, err => {
  return Promise.reject(err);
})
// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          sessionStorage.setItem("token", null);
          sessionStorage.setItem("role", null);
          console.log(router.currentRoute.fullPath)
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath //登录成功后跳入浏览的当前页面
            }
          })
      }
    }
    return Promise.reject(error.response)
  });


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),

}).$mount("#app")