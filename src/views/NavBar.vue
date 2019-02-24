<template>
  <el-menu class="header"
           background-color="" text-color="" active-text-color=""
           :default-active=$route.path mode="horizontal">
      <el-menu-item index="1" v-if="isAdmin">
        <router-link class="el-menu-item" :to="{name:'booklist' }">书籍管理</router-link>
      </el-menu-item>
      <el-menu-item index="1" v-else>
        <router-link class="el-menu-item" :to="{name:'booklist' }">书籍浏览</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="{name:'orderlist'}">订单管理</router-link>
      </el-menu-item>
      <el-menu-item index="3" v-if="isAdmin">
        <router-link :to="{name:'useradmin'}"> 用户管理 </router-link>
      </el-menu-item>
      <el-menu-item index="4" v-if="isAdmin">
        <router-link :to="{name:'count'}"> 统计 </router-link>
      </el-menu-item>
      <el-menu-item  v-if="!isLogin" index="5">
        <router-link :to="{name:'login'}"> 登录 </router-link>
      </el-menu-item>
      <el-submenu v-else index="5">
        <template slot="title">个人中心</template>
          <el-menu-item index="6" v-if="!isAdmin">
            <router-link :to="{name:'cart'}"> 购物车</router-link>
          </el-menu-item>

        <el-menu-item index="7" @click="logout">注销
        </el-menu-item>
      </el-submenu>

  </el-menu>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'NavBar',
  data: function () {
    return {
      activeIndex: '5'
    }
  },
  computed: {
    isAdmin: function () {
      return store.state.isAdmin
    },
    isLogin:function () {
      return store.state.user!==null||store.state.user!==undefined||store.state.user!==''
    }
  },
  methods:{
    logout:function () {
      store.dispatch('setAdmin',false)
      store.dispatch('setUser','')
      store.dispatch('setToken','')
      this.$router.push({path:'/login'})
    }
  }
}
</script>

<style scoped>
  .el-menu{
    width: 100%;

  }
  .el-menu-item,.el-submenu{
    width: 20%;
    margin:auto;
  }
  a{
    width: 100%;
    height: 100%;
  }


  a{
    /*color: white;*/
    /*width: 100px;*/
    text-decoration: none;
    /*margin: 40px;*/
  }

</style>
