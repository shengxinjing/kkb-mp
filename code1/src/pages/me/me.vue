<template>
<div class='user-container'>
  <button @click="scanBook" type="warn">添加图书</button>
</div>
</template>

<script>
const db = wx.cloud.database()
export default {

// 图书代码 从豆瓣，获取图书信息
    methods:{
      async addBook(isbn){
        console.log('addbook',isbn)
        // 如何调用云函数
        let {result} = await wx.cloud.callFunction({
          name:'getDoubanByIsbn',
          data:{
            isbn,
            num1:4,
            num2:5
          }
        })
        if(result.isbn){

          wx.showModal({
            title:'搜索完毕',
            content:result.bookinfo.title
          })
          const add = await db.collection('openclass').add({
            data:result.bookinfo
          })
          console.log(add)
        }
        console.log(result)
      },
      scanBook(){
        wx.scanCode({
          success: res=>{
            if(res.result){
              this.addBook(res.result)
            }
            // 使用云函数，制作一个爬虫  数据入库
          }
        })
      }
    }
}
</script>

<style>
.user-container{
  text-align: center;
  padding:20px;
}
.avatar{
  width:100px;
  height:100px;
  border-radius: 50%;
}
</style>
