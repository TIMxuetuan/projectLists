// pages/specialtyDetail/specialtyDetail.js
var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    speciality:[],
    items: {},
    loadingPages: true,
    isNoll:true,
    bedding:'',
    bedding: {
      'hat': '',
      'shoes': '',
      'clothes': ''
    },
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
    this.getSpecialityMap();
    this.getPersonalInfo();
    
  },
  getSpecialityMap() {
    let that = this;
    util._get(config.service.getSpecialityMap, {}, (res) => {
      if (res.Flag) {
        console.log(res,'res')
        this.setData({
          items: res.speciality,
        })
      }
    })
  },
  getPersonalInfo(){
    var bedding = this.data.bedding;
    var speciality = this.data.speciality;
    console.log(speciality)
    var isNoll = this.data.isNoll;
    speciality=[];
    util._get(config.service.getPersonalInfo, {}, (res) => {
      if (res.Flag) {
        var shuzu = res.data.speciality.split(",");
        var items = this.data.items;
        console.log(shuzu)
        console.log(items)
        for (var i = 0; i < shuzu.length; i++) {
          var shuzu1 = shuzu[i];
          speciality.push(items[shuzu1]);
        } 
        if (speciality == "" || speciality == [""]){
          isNoll = false;
          console.log('sss');
        }
        console.log(speciality)
        this.setData({
          speciality: speciality,
          loadingPages:false,
          isNoll: isNoll,
          bedding: res.data
        })
    
      }
    })
  },
  specialty() {
    var bedding = this.data.bedding;
    var shuzu = bedding.speciality.split(",");
    console.log(shuzu)
    wx.navigateTo({
      url: '/pages/specialty/specialty?main=' + JSON.stringify(shuzu) ,
    })
  },
  specialtyA(){
    wx.navigateTo({
      url: '/pages/specialty/specialty',
    })
  },
  
})