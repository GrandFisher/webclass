<template>
  <div class="list book">
    <div>
      搜索
    </div>
    <table>
      <thead class="list item">
        <tr>
          <th><div>封面</div></th>
          <th><div>书名</div></th>
          <th><div>作者</div></th>
          <th><div>价格</div></th>
          <th><div>ISBN</div></th>
          <th><div>库存量</div></th>
        </tr>
      </thead>
      <tbody class="list content" >
        <tr v-for="(book,index) in books" :key="index">
          <td>{{book.bookCover}}</td>
          <td>{{book.bookName}}</td>
          <td>{{book.bookAuthor}}</td>
          <td>{{book.bookPrice}}</td>
          <td>{{book.bookISBN}}</td>
          <td>{{book.bookNum}}</td>
          <!--<td v-if="">{{book.bookNum}}</td>-->
          <!--<li v-if=""></li>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  data: function () {
    return {
      books: [{
        bookCover: '董继堂和陈俊春光乍泄',
        bookName: '物种起源',
        bookAuthor: '周拂晓',
        bookPrice: 44,
        bookNum: 6
      }, {
        bookCover: '董继堂和陈俊再续前缘',
        bookName: '生物本能',
        bookAuthor: '周拂晓',
        bookPrice: 44,
        bookNum: 6
      }, {
        bookCover: '董继堂和陈俊最终幻想',
        bookName: '不要脸',
        bookAuthor: '周拂晓',
        bookPrice: 44,
        bookNum: 6
      }]
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
    width: 100px;
    padding: 0px 20px;
    border: solid 1px black;
  }
</style>
