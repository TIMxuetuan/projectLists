// pages/bedding/bedding.js
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    hatArry:[
      { id: 54, name: '54' },
      { id: 55, name: '55' },
      { id: 56, name: '56' },
      { id: 57, name: '57' },
      { id: 58, name: '58' },
      { id: 59, name: '59' },
      { id: 60, name: '60' },
      { id: 61, name: '61' },
      { id: 62, name: '62' },
      { id: 63, name: '63' },
      { id: 64, name: '64' },
      { id: 65, name: '65' },
    ],
    clothesArray:[
      { id: '165以下', name: '165以下' },
      { id: '165/84/70', name: '165/84/70' },
      { id: '165/88/74', name: '165/88/74' },
      { id: '165/92/80', name: '165/92/80' },
      { id: '165/96/86', name: '165/96/86' },
      { id: '165/100/92', name: '165/100/92' },
      { id: '165/104/98' , name: '165/104/98' },
      { id: '170/88/74', name: '170/88/74' },
      { id: '170/92/80', name: '170/92/80' },
      { id: '170/96/86', name: '170/96/86' },
      { id: '170/100/92', name: '170/100/92' },
      { id: '170/104/98', name: '170/104/98' },
      { id: '170/108/104', name: '170/108/104' },
      { id: '175/88/74', name: '175/88/74' },
      { id: '175/92/80', name: '175/92/80' },
      { id: '175/96/86', name: '175/96/86' },
      { id: '175/100/92', name: '175/100/92' },
      { id: '175/104/98', name: '175/104/98' },
      { id: '175/108/104' , name: '175/108/104' },
      { id: '180/92/80', name: '180/92/80' },
      { id: '180/96/86', name: '180/96/86' },
      { id: '180/100/92', name: '180/100/92' },
      { id: '180/104/98', name: '180/104/98' },
      { id: '180/108/104', name: '180/108/104' },
      { id: '185/96/86' , name: '185/96/86' },
      { id: '185/100/92', name: '185/100/92' },
      { id: '185/104/98', name: '185/104/98' },
      { id: '185/108/104', name: '185/108/104' },
      { id: '190/96/86', name: '190/96/86' },
      { id: '190/100/92', name: '190/100/92' },
      { id: '190/104/98' , name: '190/104/98' },
      { id: '190/108/104', name: '190/108/104' },
      { id: '190以上', name: '190以上' },
    ],
    shoesArray:[
      { id: '230/36', name: '230/36' },
      { id: '235/37', name: '235/37' },
      { id: '240/38', name: '240/38' },
      { id: '245/39', name: '245/39' },
      { id: '250/40', name: '250/40' },
      { id: '255/41', name: '255/41' },
      { id: '260/42', name: '260/42' },
      { id: '265/43', name: '265/43' },
      { id: '270/44', name: '270/44' },
      { id: '275/45', name: '275/45' },
      { id: '280/46', name: '280/46' },
      { id: '285/47', name: '285/47' },
      { id: '290/48', name: '290/48' },
     ],
    model:{
      'hat':'',
      'clothes':'',
      'shoes':'',
    },
    hat_index: '',
    clothes_index: '',
    shoes_index: '',
    hat_name: '',
    clothes_name: '',
    shoes_name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
  goBedding:function(){
    if (!this.data.model.hat){
      wx.showToast({
        title: '帽子不能为空',
        icon:'none'
      })
      return
    }
    if (!this.data.model.clothes) {
      wx.showToast({
        title: '衣服不能为空',
        icon: 'none'
      })
      return
    }
    if (!this.data.model.shoes) {
      wx.showToast({
        title: '鞋子不能为空',
        icon: 'none'
      })
      return
    }
    let _data =JSON.stringify({
      hat: this.data.model.hat,
      clothes: this.data.model.clothes,
      shoes: this.data.model.shoes
    })
    console.log(_data)
    util.showLoading({
      title: '保存中...',
      mask: true
    })
    util._post(config.service.upload, { field: 'clothing', info: _data}, (res) => { 
      if (res.Flag) {
        wx.showToast({
          title: res.Content,
          icon: 'none',
        });
        util.hideLoading();
        setTimeout(function(){
          wx.navigateBack({ delta: 1 }) 
        },500)
        // var that = this;
        // let hat_index = that.data.hatArry.findIndex((value, index, arr) => {
        //   return value.id == res.data.hat
        // });
        // let clothes_index = that.data.clothesArray.findIndex((value, index, arr) => {
        //   return value.id == res.data.clothes
        // });
        // let shoes_index = that.data.shoesArray.findIndex((value, index, arr) => {
        //   return value.id == res.data.shoes
        // });
        // let hat_name = that.data.hatArry[hat_index]['name'];
        // let clothes_name = that.data.clothesArray[clothes_index]['name'];
        // let shoes_name = that.data.shoesArray[shoes_index]['name'];
        // that.setData({
        //   model: res.data,
        //   hat_index: hat_index,
        //   hat_name: hat_name,
        //   clothes_index: clothes_index,
        //   clothes_name: clothes_name,
        //   shoes_index: shoes_index,
        //   shoes_name:shoes_name
        // })
        
      } else {
        wx.showToast({
          title: res.Content,
          icon: 'none',
          duration: 3000
        });
      }
    })
  },
  bindPickerHat(e) {
    let _model = this.data.model;
    let _value = this.data.hatArry[e.detail.value];
    _model.hat = _value['id']
    console.log(_model.hat)
    this.setData({
      model: _model,
      hat_index: e.detail.value,
      hat_name: _value['name']
    })
  },
  bindPickerClothes(e) {
    let _model = this.data.model;
    let _value = this.data.clothesArray[e.detail.value];
    _model.clothes = _value['id']
    console.log(_model.clothes)
    this.setData({
      model: _model,
      clothes_index: e.detail.value,
      clothes_name: _value['name']
    })
  },
  bindPickerShoes(e) {
    let _model = this.data.model;
    let _value = this.data.shoesArray[e.detail.value];
    _model.shoes= _value['id']
    this.setData({
      model: _model,
      shoes_index: e.detail.value,
      shoes_name: _value['name']
    })
  },

  getInfo() {
    let model=this.data.model;
    let hat_name = this.data.hat_name;
    let clothes_name = this.data.clothes_name;
    let shoes_name = this.data.shoes_name;
    util._get(config.service.getPersonalInfo, {}, (res) => {
      if (res.Flag) {
        this.setData({
          hat_name: res.data.hat,
          clothes_name: res.data.clothes,
          shoes_name: res.data.shoes,
          model:res.data
        })
      }
    })
  },
  detailed(){
    wx.navigateTo({
      url: '/pages/detailed/detailed',
    })
  }
})