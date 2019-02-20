<template>
  <div>
    <table>
      <thead>
        <tr>
          <th><div>全选</div></th>
          <th><div>封面</div></th>
          <th><div>书名</div></th>
          <th><div>作者</div></th>
          <th><div>数量</div></th>
          <th><div>价格</div></th>
          <th><div>操作</div></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book,index) in books" :key="index">
          <td><div>{{book.bookCover}}</div></td>
          <td><div>{{book.bookName}}</div></td>
          <td><div>{{book.bookAuthor}}</div></td>
          <td><div>{{book.bookNum}}</div></td>
          <td><div>{{book.bookPrice}}</div></td>
          <td><div><button type="button">删除</button></div></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'Cart',
  data: function () {
    return {
      books: store.state.cartList
    }
  }
}
</script>

<style scoped>
  table{
    margin: 20px auto;
    border: 1px solid black;
  }
  th,td{
    width: 100px;
    padding: 0px 20px;
    border: solid 1px black;
  }
</style>
