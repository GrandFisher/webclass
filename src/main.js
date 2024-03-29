import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import $ from 'jquery'
import './plugins/element.js'

Vue.config.productionTip = false
// Vue.use($)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
