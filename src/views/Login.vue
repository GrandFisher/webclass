<template>
  <el-dialog title="登录/注册" :visible.sync="dialogFormVisible">
  <el-form v-if="!isReg" :class="{'admin':admin}"
          :model="formData" :rules="rules"
          ref="formData" label-width="130px">
          <el-form-item class="userName" prop="loginName" label="用户名：" key="userLogin">
            <el-input type="text" v-model="formData.loginName" required="required"/>
          </el-form-item>
          <el-form-item class="userPasswd" prop="loginPasswd" label="密码：" key="loginPasswd">
            <el-input type="password" v-model="formData.loginPasswd" required/>
          </el-form-item>
          <el-form-item>
            <el-button type="submit" @click="login">登录</el-button>
            <el-button type="button" @click="reg">注册</el-button>
          </el-form-item>
  </el-form>
        <el-form v-else
          :model="formData" :rules="rules"
          label-width="130px" ref="formData">
          <el-form-item class="userName" prop="userName" label="用户名：" key="regName">
            <el-input type="text" v-model="formData.userName" />
          </el-form-item>
          <el-form-item class="userPasswd" prop="userPasswd" label="密码：" key="regPasswd">
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
  </el-dialog>
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
      dialogFormVisible: true,
      isReg: false,
      admin: false,
      isIndeterminate: false,
      checkAll: false,
      checkedHobbies: [],
      hobbies: ['编程', '读书', '音乐', '写作'],
      formData: {
        loginName: '',
        loginPasswd: '',
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
      var datatemp1={
        "username": this.formData.loginName,
        "password": this.formData.loginPasswd
      }
      var tempname=this.formData.loginName
      if (!this.checkForm()) {
        event.preventDefault()
        // this.$message.error('登录出错，请检查输入')
      } else {
        $.ajax({
          url: store.state.urlprefix + '/user/login',
          data: JSON.stringify(datatemp1),
          contentType: "application/x-www-form-urlencoded",
          dataType: 'JSON',
          async: false, // 请求是否异步，默认为异步
          type: 'POST',
        }).done((e)=>{
            this.$refs['formData'].resetFields()
            this.$message({
              showClose: true,
              message: e.msg,
              type: 'success'
            })
            store.dispatch('setToken',store.state.tokenprefix+ e.data)

          $.ajax({
            url: store.state.urlprefix + '/user/info/' + tempname,
            headers:{'Authorization': store.state.token },
            contentType: "application/json; charset=utf-8",
            async: true, // 请求是否异步，默认为异步
            type: 'POST',
          }).done((e)=>{

            store.dispatch('setAdmin',e.data.role)
            store.dispatch('setUser',e.data)
            this.$router.push({path:'/booklist'})

          }).fail((data)=>{
            this.$message({
              showClose: true,
              message: '请求失败，' + '意外事件，本次演示到此结束',
              type: 'error'
            })
          })

        }).fail((e)=>{
            this.$message({
              showClose: true,
              message: "登录失败",
              type: 'error'
            })
        })
      }

    },
    reg: function () {
      // this.$router.push('/home')
      this.$refs['formData'].resetFields()
      this.isReg = !this.isReg
    },
    addUser: function () {
      if (!this.checkForm()) {
        event.preventDefault()
        return
      }
      console.log("调用ajax注册")
      var datatemp = {
        "role": 0,
        'disabled': false,
        'account': this.formData.userName,
        'password': this.formData.userPasswd,
        'email': this.formData.userEmail,
        'hobbies': [1, 2, 3, 4]
      }
      $.ajax({
        url: store.state.urlprefix + '/user/register',
        data: JSON.stringify(datatemp),
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'POST'
      }).done((e)=>{
        this.$message({
          showClose: true,
          message: '注册成功',
          type: 'success'
        })
        this.$refs['formData'].resetFields()
        this.isReg = false
      }).fail((e) =>{
        this.$message({
          showClose: true,
          message: '注册失败',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>
  .el-form{
    width: 50%;
    margin: auto;
  }
  el-input{
    margin-left: 20px;
  }
  label{
    display: inline-block;
    width: 120px;
    text-align: right;
  }
  .admin{
  }
</style>
