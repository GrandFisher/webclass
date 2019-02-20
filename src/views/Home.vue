<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
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
