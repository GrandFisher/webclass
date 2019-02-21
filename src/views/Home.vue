<template>
  <el-container class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <el-header>
      <NavBar/>
    </el-header>
    <el-aside></el-aside>
    <el-main>
      <router-view/>
    </el-main>
    <el-aside></el-aside>
  </el-container>
</template>

<script>
import NavBar from '@/views/NavBar'
import store from '@/store.js'
export default {
  name: 'home',
  components: {
    // HelloWorld
    NavBar
  },
  data: function () {
    return {
      msg: store.state.user
    }
  }

}
</script>
<style scoped>
  .el-header{
    margin: auto;
    width: 80%;
  }
</style>
