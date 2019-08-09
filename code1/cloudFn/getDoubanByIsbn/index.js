// 云函数入口文件
// 云函数就是一个node工程
// 想象空间
const cloud = require('wx-server-sdk')
let axios = require('axios')
let doubanbook = require('doubanbook')
cloud.init()

async function getDouban(isbn){
  //  通过isbn 获取图书信息 
  const url = 'https://book.douban.com/subject_search?search_text='+isbn
  const searchData = await axios.get(url)
  let reg = /window\.__DATA__ = "(.*)"/
  if(reg.test(searchData.data)){
    let searchRet = doubanbook(RegExp.$1)[0]
    console.log(searchRet)
    return searchRet
  }
}
getDouban('9787521701425')
// 云函数入口函数
exports.main = async (event)=>{
    let {isbn,num1,num2} = event
    
    let bookinfo = await getDouban(isbn)
    return {
      bookinfo,
      isbn,
      kaikebaxx: num1 * num2
    }
}