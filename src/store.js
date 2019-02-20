import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isAdmin: true,
    cartList: [{
      bookCover: '董继堂和陈俊春光乍泄',
      bookName: '物种起源',
      bookAuthor: '周拂晓',
      bookPrice: 44,
      bookNum: 6
    }, {
      bookCover: '董继堂和陈俊再续前缘',
      bookName: '生物本能',
      bookAuthor: '周拂晓',
      bookPrice: 44,
      bookNum: 6
    }, {
      bookCover: '董继堂和陈俊最终幻想',
      bookName: '不要脸',
      bookAuthor: '周拂晓',
      bookPrice: 44,
      bookNum: 6
    }]
  },
  mutations: {
    setUser (state, userObject) {
      state.user = userObject
    }
  },
  actions: {

  }
})
