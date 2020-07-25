// pages/schoolDetail/schoolDetail.js
var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:'',
    school_location:'',
    schoolPages: true,
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
    this._goSchol();
  },
  _goSchol(){
    var schoolPages = this.data.schoolPages
    let school=this.data.school;

    let school_location = this.data.school_location;
    
    util._get(config.service.getPersonalInfo, {}, (res) => {
      var straa = res.data.school_location;
      console.log(straa)
      var str = straa.split("|");
      var strw = str.join("-")
      if (res.data.school=="") {
          schoolPages= false
      }
      if (res.Flag) {
        this.setData({
          school: res.data.school,
          school_location: strw,
          schoolPages: schoolPages
        })
        
      }
    })
  },
  goSchol(){
    wx.navigateTo({
      url: '/pages/school/school',
    })
  }
})