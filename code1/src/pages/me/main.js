import Vue from 'vue'
import Me from './me'
// add this to handle exception
Vue.config.errorHandler = function (err) {
    if (console && console.error) {
      console.error(err)
    }
  }
  
const app = new Vue(Me)
app.$mount()
