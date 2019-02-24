<template>
  <div>
    <el-table :data="tableData.filter(data=>!search || data.bookDetail.name.includes(search))" border stripe>
      <el-table-column>
        <template slot="header" scope="scope" >
          <el-input v-model="search" style="width: 300px"
                    placeholder="请输入书名" prefix-icon="el-icon-search"/>
        </template>
        <el-table-column
          type="index"
        >
        </el-table-column>
        <!--<el-table-column type="selection">-->
        <!--</el-table-column>-->
        <el-table-column
          label="图书编号"
          prop="bookid"
        >
        </el-table-column>
        <el-table-column
          prop="bookDetail.name"
          label="图书名称"
        >
        </el-table-column>
        <el-table-column
          prop="bookDetail.author"
          label="图书作者"
        >
        </el-table-column>
        <el-table-column
          prop="bookDetail.price"
          label="单价"
        >
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="数量"
        >
        </el-table-column>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;text-align: right">
      <el-button @click="clearCart" style="left: 1000px">购买</el-button>
    </div>
  </div>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'Cart',
  data: function () {
    return {
      search: ''
    }
  },
  computed: {
    tableData: function () {
      return store.state.cartList
    },
    isAdmin: function () {
      return store.state.isAdmin
    }
  },
  mounted: function(){
    store.dispatch('updateCart')
  },
  methods: {
    clearCart: function () {
      $.ajax({
        url: store.state.urlprefix + '/cart/buybook?userId=' +store.state.user.id,
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
        this.$router.push({path:'/booklist'})
      }).fail((e)=>{
        this.$message({
          showClose: true,
          message: '购买失败，' + '意外事件，本次演示到此结束',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
