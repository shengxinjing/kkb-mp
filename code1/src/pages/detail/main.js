import Vue from 'vue'
import Detail from './Detail'
// add this to handle exception
Vue.config.errorHandler = function (err) {
    if (console && console.error) {
      console.error(err)
    }
  }
  
const app = new Vue(Detail)
app.$mount()
