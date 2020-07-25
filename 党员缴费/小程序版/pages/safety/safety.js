const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    urlImg:app.globalData.backgroundUrl, //背景图
    username:'张美美',
    usersex:'女',
    usercard:'410526199866666666',
    userphone:'',
    usersafety:'未开启',
    useraboud:'V1.0',
  },

  amendPhone(){
    wx.navigateTo({
      url: '/pages/amendPhone/amendPhone',
    })
  },

  safety(){
    wx.navigateTo({
      url: '/pages/safety/safety',
    })
  },

  onLoad: function (options) {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    console.log(options)
    if (options.userphone) {
      console.log(111)
      this.setData({
        userphone: options.userphone,
      })
    }
  }
})
