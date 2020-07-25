// pages/register/register.js
const app = getApp()
const Service = require('../../Services/services.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlImg:app.globalData.backgroundUrl, //背景图
    //表单属性
    userphone: '',
    userpassword: '',
    userNewpassword:'',
  },

  //注册按钮事件
  registerTo() {
    if (!this.data.userphone) {
      app.showToast('手机号不能为空！')
      return
    }
    if (!app.checkPhone(this.data.userphone)) {
      app.showToast('手机号格式错误！')
      return
    }
    if (!this.data.userpassword) {
      app.showToast('密码不能为空！')
      return
    }
    if (!this.data.userNewpassword || this.data.userNewpassword != this.data.userpassword) {
      app.showToast('两次输入密码不一致，请重新输入！')
      return
    }
    let dataList = {
      mphone:this.data.userphone,
      password:this.data.userpassword,
      repassword:this.data.userNewpassword,
    }
    console.log(222,dataList)
    Service.setPassword(dataList).then(res=>{
      if(res.Flag){
        console.log(res)
        wx.reLaunch({
          url: '/pages/my/my',
        })
        app.showToast('密码设置成功！')
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.userphone) {
      console.log(111)
      this.setData({
        userphone: options.userphone,
      })
    }
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