// pages/intention/intention.js
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      model:{
        'volunteer1':'',
        'volunteer2': '',
        'volunteer3': '',
      },
      toInfo:true,
      emailInfo:true,
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
    this.getIntention();
  },
  getTroops() {
    let that = this;
    util._get(config.service.getTroops, {}, (res) => {
      if (res.Flag) {
        console.log(res,'res');
        var _data=res.data;
       var array={};
       for(let key in _data){
         let model = _data[key];
         array[model.value] = model.label;
       }
        var model = that.data.model;
        model.volunteer1 = array[model.volunteer1];
        model.volunteer2 = array[model.volunteer2];
        that.setData({
          model:model
      })
      }
    })
  },
  getIntention(){
    let that = this;
    let toInfo = this.data.toInfo;
    let emailInfo = this.data.emailInfo;
    let model=this.data.model;
    util.showLoading({
      title: '更新中...',
      mask: true
    })
    util._get(config.service.getPersonalInfo, {}, (res) => {
      if (res.Flag) {
        util.hideLoading();
        if (res.data.volunteer3 == "1"){
          toInfo=false;
        } else {
          toInfo = true;
        }
         if (res.data.volunteer3 != "" ||res.data.volunteer2 != "" || res.data.volunteer1 != "" ){
          emailInfo=false;
        }
          this.setData({
            model:res.data,
            toInfo: toInfo,
            emailInfo: emailInfo
          });
        that.getTroops();
      }
    })
  },
  goIntention() {
    var volunteer = { volunteer1: this.data.model.volunteer1, volunteer2: this.data.model.volunteer2}
    wx.navigateTo({
      url: '/pages/intentionDetail/intentionDetail?name=' + JSON.stringify(volunteer) ,
    })
  }
})