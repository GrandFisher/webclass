<template>
  <div>
    <div>
      <span>起始日期<input type="date" v-model="startTime"/></span>
      <span>结束日期<input type="date" v-model="endTime"/></span>
      <span>书名<input type="text" v-model="search" /><button type="button">搜索</button></span>
    </div>
    <table>
      <thead>
        <tr>
          <th><div>封面</div></th>
          <th><div>书籍</div></th>
          <th><div>作者</div></th>
          <th><div>单价</div></th>
          <th><div>数量</div></th>
          <th><div>花费</div></th>
        </tr>
        <!--<tr><th><div>总价</div></th></tr>-->
      </thead>
      <tbody v-for="(order,index) in orderList" :key="index">
        <tr>
          <th><div>{{order.orderId}}</div></th>
          <th><div>{{order.orderTime}}</div></th>
        </tr>
        <tr v-for="(book,ind) in order.books" :key="ind">
          <td><div>{{book.bookCover}}</div></td>
          <td><div>{{book.bookName}}</div></td>
          <td><div>{{book.bookAuthor}}</div></td>
          <td><div>{{book.bookPrice}}</div></td>
          <td><div>{{book.bookNum}}</div></td>
          <td><div>{{book.bookNum * book.bookPrice}}</div></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <th>总价</th>
          <th><div>{{totalPrice(order.books)}}</div></th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  // 顾客和管理员分别加载不同的list
  name: 'OrderList',
  data: function () {
    return {
      search: '',
      startTime: '2015-01-31',
      endTime: new Date().toISOString().slice(0, 10),
      orderList: [{
        orderId: 1,
        orderTime: '2019-1-31',
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
        // totalPrice: function () {
        //   var total = 0
        //   this.books.forEach(function (book) {
        //     total += book.bookNum * book.bookPrice
        //   })
        //   return total
        // }
      }, {
        orderId: 2,
        orderTime: '2019-1-31',
        books: [{
          bookCover: '董继堂和陈俊春光乍泄',
          bookName: '物种起源',
          bookAuthor: '周拂晓',
          bookPrice: 44,
          bookNum: 10
        }, {
          bookCover: '董继堂和陈俊再续前缘',
          bookName: '生物本能',
          bookAuthor: '周拂晓',
          bookPrice: 44,
          bookNum: 1
        }]
        // totalPrice: function () {
        //   var total = 0
        //   this.books.forEach(function (book) {
        //     total += book.bookNum * book.bookPrice
        //   })
        //   return total
        // }
      }]
    }
  },
  methods: {
    totalPrice: function (books) {
      var total = 0
      books.forEach(function (book) {
        total += book.bookNum * book.bookPrice
      })
      return total
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
