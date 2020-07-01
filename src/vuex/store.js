import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // baseUrl: 'http://192.168.0.164/app/WatchEx',
    // baseUrl: 'http://192.168.1.3/app/WatchEx/api',
    baseUrl: 'https://hk.wistechx.cn/app/WatchEx/api',
    // baseUrl: 'https://hk.wistechx.cn/app/WatchEx/test/api',
    currentRole: null, // 当前用户角色
    isLogin: false,
    token: '',
    nick: '', //用户昵称
    peerFlag: 0,
    marketPriceFlag: 0,
    storeFlag: 0,
    watchFlag: 0,
    rateFlag: 0,
    financeFlag: 0,
    imgUrl: '',
    productsList: '',
    allowBack: false
  },
  mutations: {
    // 更改用户状态信息
    userStatus(state, role) {
      if (role) {
        state.currentRole = role;
        state.isLogin = true;
      } else if (role == null) {
        // 退出登录的时候清空sessionStorage里的内容
        sessionStorage.setItem('role', null);
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('nick', '');
        sessionStorage.setItem('peerFlag', '');
        sessionStorage.setItem('marketPriceFlag', '');
        sessionStorage.setItem('storeFlag', '');
        sessionStorage.setItem('watchFlag', '');
        sessionStorage.setItem('rateFlag', '');
        sessionStorage.setItem('financeFlag', '');
        state.currentRole = null;
        state.isLogin = false;
        state.token = '';
      }
    },

    userToken(state, token) {
      if (token) {
        state.token = token;
      } else {
        state.token = null;
      }
    },

    nick(state, nick) {
      if (nick) {
        state.nick = nick;
      } else {
        state.nick = '';
      }
    },

    allowBack(state, allowBack) {
      state.allowBack = false;
    },

    peerFlag(state, peerFlag) {
      if (peerFlag) {
        state.peerFlag = peerFlag;
      } else {
        state.peerFlag = '';
      }
    },
    marketPriceFlag(state, marketPriceFlag) {
      if (marketPriceFlag) {
        state.marketPriceFlag = marketPriceFlag;
      } else {
        state.marketPriceFlag = '';
      }
    },
    storeFlag(state, storeFlag) {
      if (storeFlag) {
        state.storeFlag = storeFlag;
      } else {
        state.storeFlag = '';
      }
    },
    watchFlag(state, watchFlag) {
      if (watchFlag) {
        state.watchFlag = watchFlag;
      } else {
        state.watchFlag = '';
      }
    },
    rateFlag(state, rateFlag) {
      if (rateFlag) {
        state.rateFlag = rateFlag;
      } else {
        state.rateFlag = '';
      }
    },
    financeFlag(state, financeFlag) {
      if (financeFlag) {
        state.financeFlag = financeFlag;
      } else {
        state.financeFlag = '';
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
    setStoreFlag({
      commit
    }, storeFlag) {
      commit('storeFlag', storeFlag)
    },
    setWatchFlag({
      commit
    }, watchFlag) {
      commit('watchFlag', watchFlag)
    },
    setRateFlag({
      commit
    }, rateFlag) {
      commit('rateFlag', rateFlag)
    },
    setFinanceFlag({
      commit
    }, financeFlag) {
      commit('financeFlag', financeFlag)
    },
    updateAppSetting({
      commit
    }, allowBack) {
      commit('allowBack', false)
    },
  },
  modules: {}
});