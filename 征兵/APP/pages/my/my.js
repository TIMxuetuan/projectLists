// pages/my/my.js
var app = getApp;
var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: '',
    },
    model:{
      'model':'',
      'username':'',
      'mphone':''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = JSON.parse(wx.getStorageSync('wxuserInfo'));
    this.setData({
      userInfo: userInfo,
    });
    console.log(userInfo)
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
    this.getInfo();
    
  },
 
  exit: function () {
    util._get(config.service.logout, {}, function (res) {
      wx.setStorageSync('wxopenid', '');
      wx.setStorageSync('userinfo', '');
      wx.reLaunch({
        url: '/pages/login/login'
      })
    })
  },
  getInfo(){
    util._get(config.service.getInfo, {}, (res) => {
      console.log('res', res);
      if(res.Flag){
       this.setData({
         model:res.data
       })
      }
    })
    },

    isLogin: globalFn.isLogin
})