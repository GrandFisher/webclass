<template>
    <div>
      <div>
        <el-table v-if="isAdmin"
                  :data="isBook?stastics.filter(data=>!search || data.bookName.toString().includes(search))
                  :userconsume.filter(data=>!search||data.userId.toString().includes(search))"  stripe>
          <el-table-column>
            <template slot="header" scope="scope">
              <div class="heads">
                <el-switch
                  v-model="isBook" active-text="图书销量清单"  inactive-text="用户消费清单">
                </el-switch>
                <el-input v-model="search" style="width: 300px" v-if="isBook"
                          placeholder="请输入图书名称" prefix-icon="el-icon-search"/>
                <el-input v-model="search" style="width: 300px" v-else
                          placeholder="请输入用户编号" prefix-icon="el-icon-search"/>
                <el-date-picker
                  v-model="timeInterval" type="daterange" align="center"
                                unlink-panels range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期" :picker-options="pickerOptions"
                                value-format="timestamp">
                </el-date-picker>
                <el-button
                  @click="searchSubmit"
                           type="primary"
                           style="background-color: #589ef8"
                           icon="el-icon-search">
                  搜索
                </el-button>
              </div>
            </template>
            <template v-if="isBook">
              <el-table-column
                type="index"
              >
              </el-table-column>
              <el-table-column
              label="图书编号"
              prop="bookId"
              >
              </el-table-column>
              <el-table-column
                label="图书名称"
                prop="bookName"
              >
              </el-table-column>
              <el-table-column
                label="销量"
                prop="sales"
              >
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                type="index"
                >
              </el-table-column>
              <el-table-column
                label="用户编号"
                prop="userId"
              >
              </el-table-column>
              <el-table-column
                label="总消费"
                prop="totalConsume"
              >
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'Count',
  data: function () {
    return {
      search: '',
      isBook: true,
      timeInterval: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一年',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      stastics: [],
      //   [{
      //   bookId: 4,
      //   bookName: 'code',
      //   sales: 6
      // }],
      userconsume: []
      // [{
      //   userId: 1,
      //   totalConsume: 67.8
      // }]
    }
  },
  computed: {
    isAdmin: function () {
      return store.state.isAdmin
    }
  },
  methods: {
    searchSubmit: function(){
      if(this.timeInterval===null) return
      if(this.isBook){
        this.searchStastics()
      }else {
        this.searchUserConsume()
      }
    },
    searchStastics: function () {
      let times= this.timeInterval.toString().split(',')
      let start=times[0].substring(0,times[0].length-3)
      let end=times[1].substring(0,times[1].length-3)
      $.ajax({
        url: store.state.urlprefix + '/admin/statistics?start='+start+'&end=' +end,
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'GET',
      }).done((e)=>{
        this.stastics=e.data
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })

      }).fail((e)=>{
        this.$message({
          showClose: true,
          message: '获取统计信息失败，' + '意外事件，本次演示到此结束',
          type: 'error'
        })
      })
    },
    searchUserConsume:function () {
      let times= this.timeInterval.toString().split(',')
      let start=times[0].substring(0,times[0].length-3)
      let end=times[1].substring(0,times[1].length-3)
      $.ajax({
        url: store.state.urlprefix + '/admin/userconsume?start='+start+'&end=' +end,
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'GET',
      }).done((e)=>{
        this.userconsume=e.data
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })

      }).fail((e)=>{
        this.$message({
          showClose: true,
          message: '获取统计信息，' + '意外事件，本次演示到此结束',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>
 .el-switch{
   margin-top: 10px;
   vertical-align: top;
   height: auto;
 }
 .el-input{
   margin-top: 14px;
   height: auto;
 }
 .el-button{
   position: absolute;
   margin-top: 14px;
 }
  .el-date-editor{
    top: -16px;
  }
  .heads{
    position: relative;
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
</style>
