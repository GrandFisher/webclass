<template>
  <el-menu class="header"
           background-color="" text-color="" active-text-color=""
           :default-active=$route.path mode="horizontal">
      <el-menu-item index="1">
        <router-link class="el-menu-item" :to="{name:'booklist' }">书籍浏览</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="{name:'orderlist'}">订单管理</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link :to="{name:'useradmin'}"> 用户管理 </router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link :to="{name:'count'}"> 统计 </router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link :to="{name:'login'}"> 登录 </router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link :to="{name:'cart'}"> 购物车</router-link>
      </el-menu-item>
  </el-menu>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'NavBar',
  data: function () {
    return {
      activeIndex: '5',
      isAdmin: store.state.isAdmin
    }
  }
}
</script>

<style scoped>
  .el-menu{
    width: 100%;
  }
  .el-menu-item{
    width: 16%;
    padding: 0;
  }
  a{
    width: 100%;
    height: 100%;
  }
  /*.header{*/
    /*background-color: green;*/
  /*}*/
  /*h2{*/
    /*color: white;*/
  /*}*/
  /*.route{*/
    /*text-align: center;*/
    /*margin: 40px auto;*/
    /*height: 100px;*/
    /*vertical-align: middle;*/
    /*background-color: green;*/
  /*}*/
  /*.route-content{*/
    /*width: 80%;*/
    /*margin: auto;*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*flex-wrap: nowrap;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  /*}*/
  /*.route-content span{*/
    /*flex: 1 0 auto;*/
    /*border: 1px solid black;*/
    /*padding: 10px;*/
    /*!*overflow: hidden;*!*/
  /*}*/
  /*span a{*/
    /*!*width: 100px;*!*/
  /*}*/
  a{
    /*color: white;*/
    /*width: 100px;*/
    text-decoration: none;
    /*margin: 40px;*/
  }
  /*a:hover {*/
    /*cursor: pointer;*/
    /*color: yellow;*/
    /*text-decoration:none;*/
  /*}*/
  /*.router-link-active{*/
    /*color: black;*/
    /*text-decoration: none;*/
  /*}*/
  /*.router-link-exact-active{*/
    /*color: blue;*/
  /*}*/
  /*.route-content{*/
    /*display: flex;*/
  /*}*/
</style>
