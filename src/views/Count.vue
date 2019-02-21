<template>
    <div>
      <div>
        <div>
          <span>起始日期<input type="date" v-model="startTime"/></span>
          <span>结束日期<input type="date" v-model="endTime"/></span>
        </div>
        <div>
          <span v-if="!isBook">用户<input type="text" v-model="user"/></span>
          <span><el-button>搜索</el-button></span>
        </div>
        <div v-if="isBook">
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
                <td>{{book.bookNum}}</td>
                <!--<td v-if="">{{book.bookNum}}</td>-->
                <!--<li v-if=""></li>-->
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <table>
            <thead>
            <tr>
              <th><div>用户编号</div></th>
              <th><div>用户名称</div></th>
              <th><div>花费</div></th>
            </tr>
            </thead>
            <tbody >
            <tr v-for="(user,index) in userList" :key="index">
              <td>{{user.userId}}</td>
              <td>{{user.userName}}</td>
              <td>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Count',
  data: function () {
    return {
      isBook: true,
      user: '0110',
      startTime: '2019-01-31',
      endTime: new Date().toISOString().slice(0, 10),
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
  }
  td,th{
    width: 100px;
    padding: 0 20px;
  }
</style>
