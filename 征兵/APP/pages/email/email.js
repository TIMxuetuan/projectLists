// pages/email/email.js
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send_address:'',
    send_name:'',
    send_phone:'',
    isInfo:true,
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
    this.getEmail();
  },
  getEmail(){
    var isInfo = this.data.isInfo;
    var send_address = this.data.send_address;
    var send_name = this.data.send_name;
    var send_phone = this.data.send_phone;
    var model = this.data.model;
    util._get(config.service.getPersonalInfo, {}, (res) => {
      var straa = res.data.send_address;
      var str = straa.split(",");
      var strw = str.join("-")
      console.log(str)
        if(res.Flag){
          if (res.data.send_address == "") {
            isInfo = false
          }else{
            isInfo = true
          }

          this.setData({
            send_address: strw,
            send_name: res.data.send_name,
            send_phone: res.data.send_phone,
            isInfo: isInfo,
            model:res.data,
          })
          
        }
    })
  },
  goEmail(){
    var model={
      send_address: this.data.send_address,
      send_name: this.data.send_name,
      send_phone: this.data.send_phone
    }
    wx.navigateTo({
      url: '/pages/emailDetail/emailDetail',
    })
  }
})