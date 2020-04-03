import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      name: 'login',
      component: Login,
      meta:{
        title: 'login',
        type: '' // 不需要鉴权
      },
      children: [{
        path: '/login',
        component: Login,
      }]
    },
    { //主页
      path: '/home',
      name: 'home',
      component: () => import('@/components/home/home.vue'),
      meta:{
        title: '手表进销存系统',
        type: 'login',
        allowBack: false
      }
    }
  ]
})
