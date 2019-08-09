import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
// 入口main.js 初始化云开发
wx.cloud.init()

const app = new Vue(App)
app.$mount()
