// pages/register/register.js
const app = getApp()
const network = require("../../utils/network.js");
const Service = require('../../Services/services.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlImg: app.globalData.backgroundUrl, //背景图
    //表单属性
    userphone: '',
    sms: '',
    userNewphone: '',

    //获取验证码属性
    smsFlag: false,
    sendTime: '获取验证码',
    snsMsgWait: 60
  },

  //获取验证码
  sendCode() {
    // var that = this;
    if (this.data.userNewphone == "") {
      app.showToast('新手机号不能为空！')
      return;
    }
    if (!app.checkPhone(this.data.userNewphone)) {
      app.showToast('新手机号格式错误！')
      return
    }
    this.setData({
      smsFlag: true,
    })
    // 60秒后重新获取验证码
    console.log('smsFlag', this.data.smsFlag)
    Service.sendCode({type:'infoChanges',mphone:this.data.userNewphone})
    .then(res=>{
      if(res.Code){
        app.showToast('发送成功！')
      }
    })
    var inter = setInterval(function () {
      this.setData({
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + '秒后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendTime: '获取验证码',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
    console.log(66666)
  },

  //注册按钮事件
  registerTo() {
    if (!this.data.sms) {
      app.showToast('短信验证码不能为空！')
      return
    }
    if (!this.data.userNewphone) {
      app.showToast('新手机号不能为空！')
      return
    }
    if (!app.checkPhone(this.data.userNewphone)) {
      app.showToast('新手机号格式错误！')
      return
    }
    let dataLists = {
      mphone:this.data.userNewphone,
      vCode:this.data.sms,
      sms_type:'infoChanges',
    }

    Service.amendPhone(dataLists).then(res=>{
      if(res.Flag){
        console.log(res)
        wx.reLaunch({
          url: '/pages/my/my',
        })
        app.showToast('修改完成！')
      }else{
        app.showToast(res.Content)
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