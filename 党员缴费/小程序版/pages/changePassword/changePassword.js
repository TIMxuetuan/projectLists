// pages/register/register.js
const app = getApp()
const network = require("../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlImg:app.globalData.backgroundUrl, //背景图
    //表单属性
    userpassword: '',
    userNewpassword:'',
  },

  //注册按钮事件
  registerTo() {
    if (!this.data.userpassword) {
      app.showToast('新密码不能为空！')
      return
    }
    if (!this.data.userNewpassword || this.data.userNewpassword != this.data.userpassword) {
      app.showToast('两次输入密码不一致，请重新输入！')
      return
    }
    var url = app.globalData.testPool2
    var params = {}
    network.requestPostLoading(
      url,
      params,
      '',
      res=>{
        console.log(res)
        if(res.code == 200){
          // wx.reLaunch({
          //   url: '/pages/my/my',
          // })
          wx.switchTab({
            url: '/pages/index/index'
          })
          app.showToast('修改成功！')
        }
      }
    )
  
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})