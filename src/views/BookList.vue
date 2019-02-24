<template>
  <div class="list book">
    <el-table :data="tableData.filter(data=>!search || data.name.includes(search))" border stripe>
      <el-table-column>
        <template slot="header" scope="scope" >
          <el-input v-model="search" style="width: 300px"
                      placeholder="请输入书名" prefix-icon="el-icon-search"/>
          <div><el-button v-if="isAdmin" @click="dialogFormVisible=true" >新增</el-button></div>
        </template>
        <el-table-column
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="图书编号"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="图书名称"
        >
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="图书价格"
        >
        </el-table-column>
        <el-table-column
          prop="isbn"
          label="ISBN"
        >
        </el-table-column>
        <el-table-column v-if ="isAdmin"
          prop="stock"
          label="库存量"
        >
        </el-table-column>
        <el-table-column label="数量" v-else>
          <template scope="scope">
            <el-input-number size="small" v-model="scope.row.quantity"  :min="1" :max="scope.row.stock"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          v-if="isAdmin"
          label="操作"
        >
          <template scope="scope">
            <el-button size="small" @click="editBook(scope.row)">编辑</el-button>
            <el-button size="small" @click="deleteBook(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          label="操作"
        >
          <template scope="scope">
            <el-button @click="addcart(scope.row)">添加到购物车</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <template>

      <el-dialog title="增改书籍" :visible.sync="dialogFormVisible">
        <el-form :model="newBook" ref="newBook" label-width="30%">
          <el-form-item label="作者" :label-width="formLabelWidth">
            <el-input class="dialog"  v-model="newBook.author" autocomplete="isEdit"></el-input>
          </el-form-item>
          <el-form-item label="图书价格" :label-width="formLabelWidth">
            <el-input class="dialog" v-model="newBook.price" autocomplete="isEdit"></el-input>
          </el-form-item>
          <el-form-item label="ISBN" :label-width="formLabelWidth">
            <el-input class="dialog" v-model="newBook.isbn" autocomplete="isEdit"></el-input>
          </el-form-item>
          <el-form-item label="图书名称" :label-width="formLabelWidth">
            <el-input class="dialog" v-model="newBook.name" autocomplete="isEdit"></el-input>
          </el-form-item>
          <el-form-item label="图书id" :label-width="formLabelWidth" disabled>
            <el-input class="dialog" v-model="newBook.id" autocomplete="isEdit"></el-input>
          </el-form-item>
          <el-form-item label="库存" :label-width="formLabelWidth">
            <el-input class="dialog" v-model="newBook.stock" autocomplete="isEdit"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>

    </template>
  </div>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'BookList',
  data: function () {
    return {
      search: '',
      dialogFormVisible: false,
      labelWidth: '120px',
      formLabelWidth: '120px',
      isEdit: false,
      newBook: [],
      //   [{
      //   author: 'DawnChau',
      //   price: 10.5,
      //   isbn: '11-122132',
      //   name: 'Code',
      //   id: 1,
      //   stock: 10
      // }],
      tableData: []
      //   [{
      //   author: 'DawnChau',
      //   price: 10.5,
      //   isbn: '11-122132',
      //   name: 'Code',
      //   id: 1,
      //   stock: 10
      // }]
    }
  },
  mounted: function () {
    this.getBooks()
  },
  computed: {
    isAdmin: function () {
      return store.state.isAdmin
    }
  },
  methods: {
    submit(){
      if(this.isEdit){
        this.editSubmit()
      }else {
        this.addSubmit()
      }
    },
    addSubmit: function () {
      let addData = {
        "author": this.newBook.author,
        "price": this.newBook.price,
        "isbn": this.newBook.isbn,
        "name": this.newBook.name,
        "stock": this.newBook.stock
      }
      $.ajax({
        url: store.state.urlprefix+'/admin/book/add',
        data: JSON.stringify(addData) ,
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'POST',
      }).done((e)=>{
        this.$refs['newBook'].resetFields()
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })
        this.dialogFormVisible=false
      }).fail().always(()=>{
        this.getBooks()
      })
    },
    getBooks: function () {
      $.ajax({
        url: store.state.urlprefix+'/book/all',
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'GET',
      }).done((e)=>{
        this.tableData= e.data
      }).fail(()=>{

      })
    },
    editBook: function (row) {
      this.isEdit=true
      this.newBook = row
      this.dialogFormVisible =true;
    },
    editSubmit: function(){
      let editData = {
        "author": this.newBook.author,
        "price": this.newBook.price,
        "isbn": this.newBook.isbn,
        "name": this.newBook.name,
        "id": this.newBook.id,
        "stock": this.newBook.stock
      }
      $.ajax({
        url: store.state.urlprefix+'/admin/book/edit',
        data: JSON.stringify(editData) ,
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'POST',
      }).done((e)=>{
        this.$refs['newBook'].resetFields()
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })
        this.dialogFormVisible=false
      }).fail().always(()=>{
        this.getBooks()
      })
      this.isEdit = false
    },
    deleteBook: function (row) {

      $.ajax({
        url: store.state.urlprefix+ '/admin/book/delete/'+ row.id,
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'DELETE',
      }).done((e)=>{
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })
      }).always(()=>{
        this.getBooks()
      })

    },

    addcart: function (row) {
      let cartData={
        "userid": store.state.user.id,
        "bookid": row.id,
        "quantity": row.quantity
      }
      $.ajax({
        url: store.state.urlprefix +'/user/addcart',
        data: JSON.stringify(cartData) ,
        headers:{'Authorization': store.state.token },
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        async: false, // 请求是否异步，默认为异步
        type: 'POST',
      }).done((e)=>{
        this.$message({
          showClose: true,
          message: e.msg,
          type: 'success'
        })
      }).fail((e)=>{
        this.$message({
          showClose: true,
          message: "添加购物车出错",
          type: 'error'
        })
      })

      // store.dispatch('updateCart')
    }
  }
}
</script>

<style scoped>
  .dialog{
    width: 60%;
  }
  label{
     display: inline-block;
     width: 120px;
     text-align: right;
   }
</style>
