<template>
    <div>
      <template v-if="!isReg">
        <form class="login" :class="{'admin':admin}" @submit.prevent="submitForm" action="#" method="get">
          <div class="userName">
            <label >用户名：</label>
            <input type="text" v-model.lazy="userName" required="required"/>
            <span>{{userName}}</span>
          </div>
          <div class="userPasswd">
            <label>密码：</label>
            <input type="password" v-model="userPasswd" required/>
          </div>
          <div>
            <button type="submit" @click="login">登录</button>
            <button type="button" @click="reg">注册</button>
          </div>
        </form>
      </template>
      <template v-else>
        <form @submit.prevent="addUser" >
          <div class="userName">
            <label>用户名：</label>
            <input type="text" v-model="userName" />
          </div>
          <div class="userPasswd">
            <label>密码：</label>
            <input type="password" v-model="userPasswd"/>
          </div>
          <div class="repeatPasswd">
            <label>请再次输入密码：</label>
            <input type="password" v-model="repeatPasswd"/>
          </div>
          <div class="userEmail">
            <label>邮箱</label>
            <input type="email" v-model="userEmail"/>
          </div>
          <div class="userHobby">
            <label>爱好</label>
            <div>
              <label>爱好一</label>
              <input type="checkbox"/>
            </div>
          </div>
          <div>
            <button type="submit" >确定</button>
            <button type="button" @click="reg">返回</button>
          </div>
        </form>
      </template>
    </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Login',
  store,
  data: function () {
    return {
      isReg: false,
      admin: false,
      userName: '',
      nameInfo: '',
      nameValid: '',
      userPasswd: '',
      passwordInfo: '',
      passwordValid: '',
      repeatPasswd: '',
      repeatInfo: '',
      repeatValid: '',
      userEmail: '',
      emailInfo: '',
      emailValid: '',
      userObejct: ''
    }
  },
  watch: {
    userName: function () {
      $(function () {
        alert("haha")
      })
      this.checkForm()
      // checkName 检查名字是否合法，如果合法则根据是否为admin结果来更新
      // admin: function (val) {
      //   this.$http.get('', { 'username': val }).then((res)=>function () {
      //     res.data.result
      //   })
      // }
      // '当用户名发生变化时自动变换,可以设置限制频率'
    }
    // 每次在这更新userObject，顺便显示是不是用户名重复了
  },
  methods: {
    submitForm () {

    },
    checkForm () {
      if (this.nameValid === true) {

      }
    },
    checkName: function () {
      // this.
    },
    login: function () {
      if (localStorage.getItem('userName') === this.userName && localStorage.getItem('userPasswd') === this.userPasswd) {
        this.userPasswd = ''
        // @Todo 进行权限验证
        // if (localStorage.getItem('Auth') === 'off') {
        //   alert('账户已被禁用')
        //   return
        // }

        store.commit('setUser',
          localStorage.getItem('userName')
        )
        event.preventDefault()
        this.$router.push('/home')
      } else {
        this.userPasswd = ''
        alert('用户名密码不正确')
      }
    },
    reg: function () {
      // this.$router.push('/home')
      this.isReg = !this.isReg
    },
    addUser: function () {
      if (this.userPasswd === this.repeatPasswd) {
        localStorage.setItem('userName', this.userName)
        localStorage.setItem('userPasswd', this.userPasswd)
        this.userName = ''
        this.repeatPasswd = ''
        this.userPasswd = ''
        this.isReg = false
      } else {
        this.userPasswd = ''
        this.repeatPasswd = ''
        alert('两次输入密码不一致')
      }
    }
  }
}
</script>

<style scoped>
  .admin{
  }
</style>
