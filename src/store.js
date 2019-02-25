import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlprefix: 'http://localhost:8080',
    tokenprefix: "Bearer ",
    user: {},
    isAdmin: '',
    token:
      // '',
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfVVNFUiIsInN1YiI6IjQ0NDQ0IiwiZXhwIjoxNTUxMDE3ODg3fQ.SQNXCQzhzTLotYh9yFv3c0Qu9cLYQ_ebSdkeRqIsUZAbVKQvy6gZCZ9uQI8mbNyTT2QF3T3-NXUpX2kegs_5Cg',
    cartList: []
  },
  mutations: {
    setUser (state, userObject) {
      state.user = userObject
    },
    setAdmin (state, bool) {
      state.isAdmin = bool
    },
    setToken (state, token){
      state.token =token
    },
    updateCart (state) {
      $.ajax({
        url: state.urlprefix+ '/user/listallcartbooks?userId=' + state.user.id,
        headers:{'Authorization': state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'GET',
      }).done((e)=>{
        state.cartList = e.data
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })
      }).fail((e)=>{
        this.$message({
          showClose: true,
          message: "获取购物车信息出错",
          type: 'error'
        })
      })
    }

  },
  actions: {
    setUser ({commit}, userObject) {
      commit('setUser',userObject )
    },
    setAdmin ({commit},bool) {
      commit('setAdmin',bool)
    },
    setToken ({commit},token) {
      commit('setToken',token)
    },
    updateCart ({commit}) {
      commit('updateCart')
    }
  }
})
