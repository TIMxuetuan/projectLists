// pages/school/school.js
var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[],
    model:{
      'P1':'',
      'C1':'',
      'A1':'',
      'school':''
    },
    id:'',
    isHide: false,
    school_location:''
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
    this.getInfo();
  },
  goSchool(){

    if (!this.data.model.P1) {
      wx.showToast({
        title: '地区不能为空',
        icon: 'none'
      });
      return
    }
    if(!this.data.model.school){
      wx.showToast({
        title: '学校不能为空',
        icon: 'none'
      });
      return
    }
    let _model = this.data.model;
    var p = _model.P1,
      c = _model.C1;
    if (p.indexOf("市") >= 0) {
      p = p.replace('市', '');
    }
    if (p.indexOf("省") >= 0) {
      p = p.replace('省', '');
    }
    if (p.indexOf("壮族自治区") >= 0) {
      p = p.replace('壮族自治区', '');
    }
    if (p.indexOf("维吾尔自治区") >= 0) {
      p = p.replace('维吾尔自治区', '');
    }
    if (p.indexOf("回族自治区") >= 0) {
      p = p.replace('回族自治区', '');
    }
    if (p.indexOf("自治区") >= 0) {
      p = p.replace('自治区', '');
    }
    if (p.indexOf("特别行政区") >= 0) {
      p = p.replace('特别行政区', '');
    }

    if (c.indexOf("市") >= 0) {
      c = c.replace('市', '');
    }
    if (c.indexOf("特别行政区") >= 0) {
      c = c.replace('特别行政区', '');
    }
    _model.P1 = p;
    _model.C1 = c;
    console.log(_model);
    util._post(config.service.upload, { field: 'school', info: JSON.stringify(_model)}, (res) => {
        if(res.Flag){
          wx.showToast({
            title: res.Content,
            icon: 'none',
            duration:2000
          });
          setTimeout(function(){
            wx.navigateBack({ delta: 1 }) 
        },500)
        } else {
          wx.showToast({
            title: res.Content,
            icon: 'none'
          });
        }
    })
  },

  getInfo(){
    let school_location = this.data.school_location;
    let model=this.data.model;
    let school=this.data.school
    console.log(model)
    util._get(config.service.getPersonalInfo,{},(res)=>{
        if(res.Flag){
          let _school=res.data.school;
          model.school = _school;
          if( res.data.school_location!=''){
            let _value = res.data.school_location.split("|");
                model["P1"] = _value[0];
                model["C1"] = _value[1];
                model["A1"] = _value[2];
          let school_location = model["P1"] + ',' + model["C1"] + ',' + model["A1"];
              let school = res.data.school;
              this.setData({
                model:model,
                school: school ,
                school_location: school_location
             })
          }else{
          let school_location =res.data.school_location;
              let school = res.data.school;
              this.setData({
                model:model,
                school: school ,
                school_location: school_location
             })
          }
          
            
        }
    })
  },

  bindRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _model = this.data.model;
    console.log(_model);
    let _value = e.detail.value;
    _model["P1"] = _value[0]
    _model["C1"] = _value[1]
    _model["A1"] = _value[2]
    console.log(_model["P1"])
    console.log(_value);
    this.setData({
      model: _model,
      region: e.detail.value,
      isHide: true,
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      [e.currentTarget.id]: e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
    })
  },

})