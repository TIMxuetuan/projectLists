// pages/beddingDetail/beddingDetail.js
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bedding: {
      'hat': '',
      'shoes': '',
      'clothes': ''
    },
    isbedding:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPersonalInfo();
  },
  getPersonalInfo(){
    var isbedding = this.data.isbedding;
    var bedding = this.data.bedding;
    util._get(config.service.getPersonalInfo, {}, (res) => {
      if (res.Flag) {
        if (!res.data.hat) {
          isbedding = false,
            console.log('sss', 111);
        }
        this.setData({
          bedding: res.data,
          isbedding: isbedding,
        })
      }
    })
  },
  bedding() {
    var bedding = this.data.bedding;
    wx.navigateTo({
      url: '/pages/bedding/bedding',
    })
  }
})