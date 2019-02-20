<template>
  <div class="header">
    <h2>董继堂助教的图书管理系统</h2>
    <div class="route">
      <!--<nav>-->
        <!--<img src="../assets/logo.png"/>-->
        <!--<p @click="toggle()"><router-link to="/booklist">首页</router-link>-->
        <!--</p>-->

        <!--<p @click="toggle()"><router-link to="/useradmin">用户管理</router-link>-->
        <!--</p>-->
      <!--</nav>-->
      <div class="route-content" v-if="isAdmin">
        <span><router-link :to="{name:'booklist' }">书籍浏览</router-link></span>
        <span><router-link :to="{name:'orderlist'}">订单管理</router-link></span>
        <span><router-link :to="{name:'useradmin'}"> 用户管理 </router-link></span>
        <span><router-link :to="{name:'count'}"> 统计 </router-link></span>
        <span><router-link :to="{name:'login'}"> 登录 </router-link></span>
        <span><router-link :to="{name:'cart'}"> 购物车</router-link></span>
      </div>
      <div class="route-content" v-else>
        <router-link :to="{name:'booklist'}" >书籍浏览 </router-link>
        <router-link :to="{name:'orderlist'}"> 订单管理 </router-link>
        <router-link :to="{name:'login'}"> 登录 </router-link>
        <router-link :to="{name:'cart'}"> 购物车</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'NavBar',
  data: function () {
    return {
      isAdmin: store.state.isAdmin
    }
  }
}
</script>

<style scoped>
  .header{
    background-color: green;
  }
  h2{
    color: white;
  }
  .route{
    text-align: center;
    margin: 40px auto;
    height: 100px;
    vertical-align: middle;
    background-color: green;
  }
  .route-content{
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  .route-content span{
    flex: 1 0 auto;
    border: 1px solid black;
    padding: 10px;
    /*overflow: hidden;*/
  }
  span a{
    /*width: 100px;*/
  }
  a{
    color: white;
    width: 100px;
    text-decoration: none;
    margin: 40px;
  }
  a:hover {
    cursor: pointer;
    color: yellow;
    text-decoration:none;
  }
  /*.router-link-active{*/
    /*color: black;*/
    /*text-decoration: none;*/
  /*}*/
  .router-link-exact-active{
    color: blue;
  }

  nav img{
    width: 50px;
    height: 50px;
    padding: 5px;
    margin: 5px;
  }
  nav p {
    text-align: center;
    font-size: 16px;
    flex-shrink: 0;
    padding: 10px;
    margin: 5px;
    color: #e5e5e5;
  }
  .route-content{
    display: flex;
  }
  nav {
    padding: 0 10px;
    display: flex;
    align-items: center;
    overflow: auto;
    background-color: #31c17b;
  }

</style>
