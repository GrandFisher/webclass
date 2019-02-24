import Vue from 'vue'
import Router from 'vue-router'
// import Login from './views/Login'
import Home from './views/Home'
// import Admin from './views/UserAdmin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue')
        },
        {
          path: 'booklist',
          name: 'booklist',
          component: () => import(/* webpackChunkName: "BookList" */ './views/BookList.vue')
        },
        {
          path: 'useradmin',
          name: 'useradmin',
          component: () => import(/* webpackChunkName: "UserAdmin" */ './views/UserAdmin.vue')
        },
        {
          path: 'count',
          name: 'count',
          component: () => import(/* webpackChunkName: "Count" */ './views/Count.vue')
        },
        {
          path: 'orderlist',
          name: 'orderlist',
          component: () => import(/* webpackChunkName: "OrderList" */ './views/OrderList.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import(/* webpackChunkName: "Cart" */ './views/Cart.vue')
        }
      ]
    },
    {
      path: '/123',
      name: '123',
      component: () => import(/* webpackChunkName: "about" */ './views/UserAdmin.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
