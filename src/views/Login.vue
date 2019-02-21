<template>
  <el-form v-if="!isReg" :class="{'admin':admin}"
          :model="formData" :rules="rules"
          ref="formData" label-width="130px">
          <el-form-item class="userName" prop="loginName" label="用户名：">
            <el-input type="text" v-model="formData.userName" required="required"/>
          </el-form-item>
          <el-form-item class="userPasswd" prop="loginPasswd" label="密码：">
            <el-input type="password" v-model="formData.userPasswd" required/>
          </el-form-item>
          <el-form-item>
            <el-button type="submit" @click="login">登录</el-button>
            <el-button type="button" @click="reg">注册</el-button>
          </el-form-item>
  </el-form>
        <el-form v-else
          :model="formData" :rules="rules"
          label-width="130px" ref="formData">
          <el-form-item class="userName" prop="userName" label="用户名：">
            <el-input type="text" v-model="formData.userName" />
          </el-form-item>
          <el-form-item class="userPasswd" prop="userPasswd" label="密码：">
            <el-input type="password" v-model="formData.userPasswd"/>
          </el-form-item>
          <el-form-item class="repeatPasswd" prop="repeatPasswd" label="请再次输入密码：">
            <el-input type="password" v-model="formData.repeatPasswd"/>
          </el-form-item>
          <el-form-item class="userEmail" prop="userEmail" label="邮箱：">
            <el-input type="email" v-model="formData.userEmail"/>
          </el-form-item>
          <el-form-item class="userHobby" label="爱好：">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedHobbies" @change="handleCheckHobbiesChange">
                  <el-checkbox v-for="(hobby,index) in hobbies" :label="hobby" :key="index"> {{hobby}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="submit" @click="addUser">确定</el-button>
            <el-button type="button" @click="reg">返回</el-button>
          </el-form-item>
        </el-form>
</template>

<script>
import store from '@/store'
export default {
  name: 'Login',
  store,
  data: function () {
    // let validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     if (this.formData.repeatPasswd !== '') {
    //       this.$refs.formData.validateField('repeatPasswd')
    //     }
    //     callback()
    //   }
    // };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.userPasswd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isReg: true,
      admin: false,
      isIndeterminate: false,
      checkAll: false,
      checkedHobbies: [],
      hobbies: ['编程', '读书', '音乐', '写作'],
      formData: {
        userName: '',
        // nameInfo: '',
        // nameValid: '',
        userPasswd: '',
        // passwordInfo: '',
        // passwordValid: '',
        repeatPasswd: '',
        // repeatInfo: '',
        // repeatValid: '',
        userEmail: ''
        // emailInfo: '',
        // emailValid: '',
        // userObejct: ''
      },
      rules: {
        loginName: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        loginPasswd: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],
        userName: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 4, max: 16, message: '用户名长度为4-16个字符', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/, message: '用户名长度为4-16位,可以是数字字母下划线', trigger: 'blur' }],
        userPasswd: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { trigger: 'blur', min: 6, max: 21, message: '密码长度为6-21位，不能是纯英文和纯数字' },
          {
            trigger: 'blur',
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/,
            message: '不能是纯英文和纯数字'
          }],
        repeatPasswd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userEmail: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, {
          pattern: /^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/i,
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    // userName: function () {
    //   var result
    //   $.post('', { 'userName': this.userName }).done(function (data) {
    //     // checkForm(
    //     this.userName = data
    //   }).fail(function (e) {
    //
    //   })
    // }

    // checkName 检查名字是否合法，如果合法则根据是否为admin结果来更新
    // admin: function (val) {
    //   this.$http.get('', { 'username': val }).then((res)=>function () {
    //     res.data.result
    //   })
    // }
    // '当用户名发生变化时自动变换,可以设置限制频率'
    // 每次在这更新userObject，顺便显示是不是用户名重复了
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedHobbies = val ? this.hobbies : []
      this.isIndeterminate = false
    },
    handleCheckHobbiesChange (value) {
      this.checkAll = value.length === this.hobbies.length
      this.isIndeterminate = value.length > 0 && value.length < this.hobbies.length
    },
    checkForm () {
      let flag
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          console.log('校验成功')
          flag = true
        } else {
          console.log('校验失败')
          flag = false
        }
      })
      return flag
    },
    checkName: function () {
      // this.
    },
    login: function () {
      if (!this.checkForm()) {
        event.preventDefault()
        // this.$message.error('登录出错，请检查输入')
      } else {
        $.ajax({
          url: 'http://*******/api/xxx',
          data: {
            'role': 0,
            'disabled': true,
            'account': this.userName,
            'password': this.userPasswd,
            'email': this.userEmail,
            'hobbies': [1, 2, 3, 4]
          },
          // beforeSend: function (request) {
          //   request.setRequestHeader('Authorization', token)
          // },
          dataType: 'JSON',
          async: false, // 请求是否异步，默认为异步
          type: 'POST',
          success: function (list) {
          },
          error: function () {
          }
        }).done().fail()
      }

      // if (localStorage.getItem('userName') === this.userName && localStorage.getItem('userPasswd') === this.userPasswd) {
      //   this.userPasswd = ''
      //   // @Todo 进行权限验证
      //   // if (localStorage.getItem('Auth') === 'off') {
      //   //   alert('账户已被禁用')
      //   //   return
      //   // }
      //
      //   store.commit('setUser',
      //     localStorage.getItem('userName')
      //   )
      //   event.preventDefault()
      //   this.$router.push('/home')
      // }
    },
    reg: function () {
      // this.$router.push('/home')
      this.isReg = !this.isReg
    },
    addUser: function () {
      if (!this.checkForm()) {
        event.preventDefault()
      } else {
        $.ajax({
          url: 'http://*******/api/xxx',
          data: {
            'role': 0,
            'disabled': true,
            'account': this.userName,
            'password': this.userPasswd,
            'email': this.userEmail,
            'hobbies': [1, 2, 3, 4]
          },
          // beforeSend: function (request) {
          //   request.setRequestHeader('Authorization', token)
          // },
          dataType: 'JSON',
          async: false, // 请求是否异步，默认为异步
          type: 'POST',
          success: function (list) {
          },
          error: function () {
          }
        }).done().fail()
      }
      // this.formData.validate((valid) => {
      //   if (valid) {
      //     alert('注册成功')
      //   } else {
      //     alert('注册失败')
      //   }
      // })
      // if (this.userPasswd === this.repeatPasswd) {
      //   localStorage.setItem('userName', this.userName)
      //   localStorage.setItem('userPasswd', this.userPasswd)
      //   this.userName = ''
      //   this.repeatPasswd = ''
      //   this.userPasswd = ''
      //   this.isReg = false
      // } else {
      //   this.userPasswd = ''
      //   this.repeatPasswd = ''
      //   alert('两次输入密码不一致')
      // }
    }
  }
}
</script>

<style scoped>
  .el-input{
    width: 200px;
  }
  label{
    display: inline-block;
    width: 120px;
    text-align: right;
  }
  .admin{
  }
</style>
