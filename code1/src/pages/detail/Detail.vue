<template>
  <div>
    <BookInfo v-if="bookinfo._id" :info='bookinfo'></BookInfo>
  </div>
</template>

<script>
const db = wx.cloud.database()
import BookInfo from '@/components/BookInfo'
export default {
  components:{BookInfo},
    data(){
      return {
        bookinfo:{},
        bookid:''
      }
    },
    async mounted(){
      wx.showLoading({title:'加载中'})
      this.bookid = this.$root.$mp.query.id
      // 访问量自增
      await db.collection('books').doc(this.bookid).update({
        data:{
          count:db.command.inc(1)
        }
        
      })
      const bookinfo = await db.collection('books').doc(this.bookid).get()
      bookinfo.data.summary = bookinfo.data.summary.split('\n')
      this.bookinfo = bookinfo.data
      wx.hideLoading()

    }
}
</script>

<style lang='scss'>
.bookinfo{
  font-size: 14px;
  
  .badge{
    display: inline-block;
    margin:5px;
    padding:5px;
    border-radius: 10px;
    border:1px #EA5A49 solid;
    color:#EA5A49;
  }
  .summary{
    padding:0 15px;
    margin-top:10px;
    p{
      text-indent: 2em;
      font-size:14px;
    }
  }
  .right{
    float: right;
  }
  .detail{
    padding:5px 10px;
    .avatar{
      width:20px;
      height:20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb{
    width:750rpx;
    height:500rpx;
    overflow:hidden;
    position: relative;
    .back{
      filter: blur(15px);
      width:100%;
    }
    .img{
      position: absolute;
      width:100%;
      height:300rpx;
      left:0;
      top:30rpx;
    }
    .info{
      color:white;
      position: absolute;
      width:100%;
      left:0;
      top:330rpx;
      text-align: center;
      .title{
        font-size:20px;
      }
      .author{
        font-size: 14px;
      }

    }
  }
}

</style>

