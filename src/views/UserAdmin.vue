<template>
  <div>
    <div>
      <input v-model="search"/>
      <button type="button">搜索</button>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th><div>用户编号</div></th>
            <th><div>用户名称</div></th>
            <th><div>用户权限</div></th>
            <th><div>用户状态</div></th>
            <th><div>是否禁用</div></th>
          </tr>
        </thead>
        <tbody >
            <tr v-for="(user,index) in userList" :key="index">
              <td>{{user.userId}}</td>
              <td>{{user.userName}}</td>
              <td>{{user.userAuth}}</td>
              <td>{{user.userStatus}}</td>
              <td>
                <input type="radio" :name="user.userName+'changeStatus'" value="已禁用"
                       v-model="user.userStatus" @click="changeStatus($event,false)">禁用
                <input type="radio" :name="user.userName+'changeStatus'" value="可用"
                       v-model="user.userStatus" @click="changeStatus($event,true)">可用
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAdmin',
  data: function () {
    return {
      search: '',
      userList: [{
        userId: '1',
        userName: '陈俊',
        userAuth: '失恋中',
        userStatus: '可用'
      }, {
        userId: '2',
        userName: '陈俊2',
        userAuth: '失恋中2',
        userStatus: '已禁用'
      }, {
        userId: '3',
        userName: '董继堂1',
        userAuth: '便秘中1',
        userStatus: '可用'
      }, {
        userId: '4',
        userName: '董继堂2',
        userAuth: '便秘中2',
        userStatus: '已禁用'
      }]
    }
  },
  computed: function () {
  },
  methods: {
    changeStatus: function (event, flag) {
      console.log(event.target)
      console.log(event.currentTarget)
    }
  }
}
</script>

<style scoped>
  table{
    margin:auto;
    text-align: center;
  }
  th,td{
    border: 1px solid black;
  }
  th div{
    margin: 0px 40px;
    width: 80px;
    padding: 0px;
  }
</style>
