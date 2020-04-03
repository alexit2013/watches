import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // baseUrl: 'http://192.168.0.108/app/WatchEx',
    // baseUrl: 'https://hk.wistechx.cn/app/WatchEx/api',
    baseUrl: 'https://hk.wistechx.cn/app/WatchEx/test/api',
    currentRole: null, // 当前用户角色
    isLogin: false,
    token: '',
    nick: '', //用户昵称
    peerFlag: 0,
    marketPriceFlag: 0,
    imgUrl: '',
    productsList: '',
    allowBack: false
  },
  mutations: {
    // 更改用户状态信息
    userStatus(state, role) {
      if (role) {
        state.currentRole = role
        state.isLogin = true
      } else if (role == null) {
        // 退出登录的时候清空sessionStorage里的内容
        sessionStorage.setItem('role', null)
        sessionStorage.setItem('token', '')
        sessionStorage.setItem('nick', '')
        sessionStorage.setItem('peerFlag', '');
        sessionStorage.setItem('marketPriceFlag', '');
        state.currentRole = null
        state.isLogin = false
        state.token = ''
      }
    },

    userToken(state, token) {
      if (token) {
        state.token = token
      } else {
        state.token = null
      }
    },

    nick(state, nick) {
      if (nick) {
        state.nick = nick
      } else {
        state.nick = ''
      }
    },

    allowBack(state, allowBack) {
      state.allowBack = false
    },

    peerFlag(state, peerFlag) {
      if (peerFlag) {
        state.peerFlag = peerFlag
      } else {
        state.peerFlag = ''
      }
    },
    marketPriceFlag(state, marketPriceFlag) {
      if (marketPriceFlag) {
        state.marketPriceFlag = marketPriceFlag
      } else {
        state.marketPriceFlag = ''
      }
    },
  },
  actions: {
    // 应用mutations
    setRole({
      commit
    }, role) {
      commit('userStatus', role)
    },

    setToken({
      commit
    }, token) {
      commit('userToken', token)
    },

    setNick({
      commit
    }, nick) {
      commit('nick', nick)
    },
    setPeerFlag({
      commit
    }, peerFlag) {
      commit('peerFlag', peerFlag)
    },
    setMarketPriceFlag({
      commit
    }, marketPriceFlag) {
      commit('marketPriceFlag', marketPriceFlag)
    },
    updateAppSetting({
      commit
    }, allowBack) {
      commit('allowBack', false)
    }
  },
  modules: {}
});