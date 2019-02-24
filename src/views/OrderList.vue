<template>
  <div>
    <el-table :data="tableData.filter(data=>isAdmin?(!search || data.userid.toString().includes(search)):data)"  stripe>
      <el-table-column>
        <template slot="header" scope="scope" >
          <el-input v-model="search" style="width: 300px" v-if="isAdmin"
                    placeholder="请输入用户编号" prefix-icon="el-icon-search"/>
          <el-date-picker v-if="!isAdmin"
            v-model="timeInterval" type="daterange" align="center"
            unlink-panels range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" :picker-options="pickerOptions" value-format="timestamp">
          </el-date-picker>
          <el-button @click="searchTimeFilter" v-if="!isAdmin"
            type="primary" style="background-color: #589ef8" icon="el-icon-search">
            搜索
          </el-button>
        </template>
        <el-table-column type="expand" class="demo-table-expand">
          <template slot-scope="props">
            <el-table :data="props.row.detailEntities">
              <el-table-column
               prop="bookName"
               label="图书名称"
              >
              </el-table-column>
              <el-table-column
               prop="bookAuthor"
               label="作者"
              >
              </el-table-column>
              <el-table-column
               prop="bookPrice"
               label="图书名称"
              >
              </el-table-column>
              <el-table-column
               prop="quantity"
               label="图书数量"
              >
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
        >
        </el-table-column>
        <!--<el-table-column-->
          <!--label="订单编号"-->
          <!--prop="detailEntities.orderid"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <el-table-column
          v-if ="isAdmin"
          label="用户编号"
          prop="userid"
        >
        </el-table-column>
        <el-table-column
          label="日期"
          prop="createTime"
        >
        </el-table-column>
        <el-table-column
          label="总价"
          prop="totalPrice"
        >
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from '../store'

export default {
  // 顾客和管理员分别加载不同的list
  name: 'OrderList',
  data: function () {
    return {
      search: '',
      timeInterval: '',
      // startTime: '2015-01-31',
      // endTime: new Date().toISOString().slice(0, 10),
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
      tableData: [{
        totalPrice: 11.3,
        userid: 1,
        createTime: '2019-02-20 07:35:22.0',
        detailEntities: [
          {
            id: 8,
            orderid: 18,
            bookName: 'code',
            bookAuthor: 'dawnchau',
            bookIsbn: '23-3344',
            bookStock: 5,
            bookPrice: 11.3,
            quantity: 1
          }
        ]
      }]
    }
  },
  mounted: function(){
    this.searchOrder()
  },
  methods: {
    searchTimeFilter(){
      let times= this.timeInterval.toString().split(',')
      let start=times[0]
      let end=times[1]
      $.ajax({
        url: store.state.urlprefix + '/user/listordersbetween?start='+start+'&end=' +end,
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'GET',
      }).done((e)=>{
        this.tableData=e.data
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })

      }).fail((e)=>{
        this.$message({
          showClose: true,
          message: '获取订单失败，' + '意外事件，本次演示到此结束',
          type: 'error'
        })
      })
    },
    searchOrder: function () {
      let tempUrl
      if(this.isAdmin){
        tempUrl='/admin/listallorders'
      }else {
        tempUrl='/user/listorders?userId=' +store.state.user.id
      }
      $.ajax({
        url: store.state.urlprefix + tempUrl ,
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'GET',
      }).done((e)=>{
        this.tableData=e.data
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })

      }).fail((e)=>{
        this.$message({
          showClose: true,
          message: '获取订单失败，' + '意外事件，本次演示到此结束',
          type: 'error'
        })
      })
    }
  },
  computed: {
    isAdmin: function () {
      return store.state.isAdmin
    }
  }
}
</script>

<style scoped>
  table{
    margin: auto;
    border: 1px solid black;
  }
  th,td{
    width: 200px;
    padding: 0px 20px;
  }
</style>
