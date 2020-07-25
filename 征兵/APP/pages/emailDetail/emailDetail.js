// pages/emailDetail/emailDetail.js
var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    send_address:'',
    send_phone:'',
    send_name:'',
    address:'',
    send:'',
    isHide:false,
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
      this.getEmailDetail();
  },
  goToInfo(){
    if(!this.data.send_phone){
      if (!this.data.address) {
        wx.showToast({
          title: '邮寄地址不能为空',
          icon: 'none'
        });
        return
      }
      if (!this.data.send) {
        wx.showToast({
          title: '详细地址不能为空',
          icon: 'none'
        });
        return
      }
      wx.showToast({
        title: '邮寄电话不能为空',
        icon: 'none'
      });
      return
    }
    if (!this.data.send_name) {
      wx.showToast({
        title: '邮寄人姓名不能为空',
        icon: 'none'
      });
      return
    }
    let send_address = this.data.send_address;
    let obj={
      send_address : this.data.address +',' +this.data.send,
      send_phone: this.data.send_phone,
      send_name: this.data.send_name
    }
    util.showLoading({
      title: '保存中...',
      mask: true
    })
    util._post(config.service.upload, { field: 'address', info: JSON.stringify(obj)},(res)=>{
          if(res.Flag){
            wx.showToast({
              title: res.Content,
              icon: 'none'
            })
            util.hideLoading();
            setTimeout(function(){
              wx.navigateBack({ delta: 1 }) 
            },500)
          } else{
            wx.showToast({
              title: res.Content,
              icon: 'none'
            })
          }
     })
    
  },
  bindRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _address = this.data.address;
    let _value = e.detail.value;
    _address = _value
    console.log(_address);
    this.setData({
      address: _address,
      region: e.detail.value,
      isHide:true,
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      [e.currentTarget.id]: e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
    })
  },
  getEmailDetail(){
    var send_address = this.data.send_address;
    var send_phone = this.data.send_phone;
    var send_name = this.data.send_name;
    util._get(config.service.getPersonalInfo, {}, (res) => {
      
        if (res.Flag) {
          if (res.data.send_address != "") {
            var arrayTitle = res.data.send_address.split(",");
            // var arrayTitle = res.data.send_address.split("|");
            var address = arrayTitle[0] + ',' + arrayTitle[1] + ',' + arrayTitle[2];
            var send = arrayTitle[3];
            console.log(address + 'ddddd' + send);
            this.setData({
              send_address: res.data.send_address,
              address: address,
              send: send,
              send_phone: res.data.send_phone,
              send_name: res.data.send_name
            })
        }
      }
        
    })
  }
})