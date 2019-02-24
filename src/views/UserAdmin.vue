<template>
  <div>
    <el-table :data="tableData.filter(data=>!search || data.account.includes(search))" border stripe>
      <el-table-column>
        <template slot="header" scope="scope" >
          <el-input v-model="search" style="width: 300px"
             size="large"  placeholder="请输入用户名" prefix-icon="el-icon-search"/>
        </template>
       <el-table-column
         type="index"
       >
       </el-table-column>
      <el-table-column
        prop="id"
        label="用户编号"
      >
      </el-table-column>
      <el-table-column
        prop="account"
        label="用户名称"
      >
      </el-table-column>
      <el-table-column
        label="用户权限"
      >
        <template scope="scope">
          <div> {{scope.row.role===1?"管理员权限":"普通权限"}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
      >
        <template scope="scope">
          <div> {{scope.row.disabled?"可用":"已禁用"}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="是否禁用"
      >
      <template scope="scope">
        <el-radio v-model="scope.row.disabled"  @change="changeStatus(scope.row)" label=true >可用</el-radio>
        <el-radio v-model="scope.row.disabled"  @change="changeStatus(scope.row)" label=false >禁用</el-radio>
      </template>
      </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import store from '@/store.js'
export default {
  name: 'UserAdmin',
  data: function () {
    return {
      search: '',
      tableData: []

    }
  },
  mounted: function () {
    this.getUsers()
  },
  methods: {
    changeStatus: function (user) {
      $.ajax({
        url:  store.state.urlprefix+'/admin/disable/'+ user.id,
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'GET',
      }).done((e)=>{
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })
        this.getUsers()
      }).fail((e)=>{
        this.$message({
          showClose: true,
          message: '获取用户列表失败，' + '意外事件，本次演示到此结束',
          type: 'error'
        })
      })

    },
    getUsers: function () {
      $.ajax({
        url: store.state.urlprefix + '/admin/listallusers',
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'GET',
      }).done((e)=>{
        this.tableData= e.data
        // this.$message({
        //   showClose: true,
        //   message: e.msg,
        //   type: 'success'
        // })

      }).fail((e)=>{
        this.$message({
          showClose: true,
          message: '获取用户列表失败，' + '意外事件，本次演示到此结束',
          type: 'error'
        })
      })
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
