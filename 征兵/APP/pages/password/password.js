// pages/password/password.js
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    repassword: '',
    loadingPages: true,
    loadMoreLoading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  submitForm: function (e) {
    if (!this.data.password) {
      wx.showToast({
        title: "新密码不能为空",
        icon: 'none'
      });
      return
    }
    if (this.data.password != this.data.repassword) {
      wx.showToast({
        title: "两次密码不一致",
        icon: 'none'
      });
      return
    }
    let postObj = {
      password: this.data.password,
      repassword: this.data.repassword
    };
    util._post(config.service.setPassword, postObj, function (res) {
      console.log(res, 'res')
      if (res.Code == 202) {
        wx.setStorageSync('userinfo', '');
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
      wx.showToast({
        title: res.Content,
        icon: 'none'
      });
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      [e.currentTarget.id]: e.detail.value
    })
  },
})