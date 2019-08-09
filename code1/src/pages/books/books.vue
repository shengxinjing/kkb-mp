<template>
<div>
  <TopSwiper :tops="tops"></TopSwiper>
  <Card v-for="book in books" :book="book"></Card>
</div>
</template>

<script>
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
const db = wx.cloud.database()
// 云数据库可以直接在小程序短调用
// 体验云开发
export default {
  components:{
    TopSwiper,
    Card
  },
  data(){
    return {
      title:"开课吧",
      page:1,
      tops:[],
      books:[]
    }
  },
  onReachBottom(){
    // 小程序触底会执行这个函数
    // 触底加载
    this.page += 1
    this.getList()
  },
  methods:{
    async getTop(){
      // 排行榜 
      // 访问量前9
       let tops =  await db.collection('books')
                         .orderBy('count', 'desc')
                         .limit(9)
                         .get()
      console.log(tops)
       this.tops = tops.data
    },
    async getList(init){
      wx.showLoading()
      // init是不是首次加载
      if(init){
        this.page = 1
      }
      // 直接查库
      // 第一页， 0-10跳数据
      // 第二页 是10-20跳数据
      let PAGER = 10
      let books = await db.collection('books')
                          .limit(PAGER)
                          .get()
              
      // let books = await db.collection('books').get()
      console.log(books)
      if(init){
        this.books = books.data
      }else{
        this.books = [...this.books, ...books.data]
      }
      wx.hideLoading()

    }
  },
  mounted(){
    // 首次加载
    this.getList(true)
    this.getTop()
  }
}
</script>

<style scoped>
</style>
