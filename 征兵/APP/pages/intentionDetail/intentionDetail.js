// pages/intentionDetail/intentionDetail.js
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      volunArry:[],
    volunBrry: [],
      model:{
        'volunteer1':'',
        'volunteer2':'', 
      },
      volunteer3: '',
      one_index:'',
      one_name:'',
      two_index:'',
      two_name:'',
      disabled:false,
      checked:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.name !="{}"){
      var arry = [];
      var name = JSON.parse(options.name);
      for (let i in name) {
        arry.push(name[i]);
      }
      console.log(arry)
      this.setData({
        one_name: arry[0],
        two_name: arry[1],
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
    this.getTroops();
    this.getEmailDetail();

  },
  getTroops(){
    var that=this;
    util._get(config.service.getTroops, {}, (res) => {
      console.log(res)
      if (res.Flag){
        that.setData({
          volunArry:res.data,
          volunBrry:res.data,
          // one_name: name[0].label,
          // two_name: name[1].label,
        })
      }
    })
  },
  goIntentior(){
    var v3 = this.data.volunteer3;
    if(v3){

    }else{
      if (!this.data.model.volunteer1) {
        wx.showToast({
          title: '第一志愿不能为空',
          icon: 'none'
        })
        return
      }

      if (!this.data.model.volunteer1) {
        wx.showToast({
          title: '第二志愿不能为空',
          icon: 'none'
        })
        return
      }
    }
    util.showLoading({
      title: '保存中...',
      mask: true
    })
    let obj={
      volunteer1:this.data.model.volunteer1,
      volunteer2:this.data.model.volunteer2,
      volunteer3:this.data.volunteer3,
    }
  
    util._post(config.service.upload, { field: 'volunteer', info: JSON.stringify(obj) }, (res) => { 
          if(res.Flag){
            wx.showToast({
              title: res.Content,
              icon:'none'
            })
            util.hideLoading();
            setTimeout(function(){
              wx.navigateBack({ delta: 1 }) 
            },500)
          }else{
            wx.showToast({
              title: res.Content,
              icon: 'none'
            })
          }
    })
  },
  bindPickerHat(e) {
    let volunArry = this.data.volunArry;
    let _model = this.data.model;
    let _value = this.data.volunArry[e.detail.value];
    _model.volunteer1 = _value['value']
    this.setData({
      model: _model,
      one_index: e.detail.value,
      one_name: _value['label']
    })
  },
  bindPickerClothes(e) {
    let volunBrry = this.data.volunBrry;
    let _model = this.data.model;
    let _value = this.data.volunBrry[e.detail.value];
    _model.volunteer2 = _value['value']
    this.setData({
      model: _model,
      two_index: e.detail.value,
      two_name: _value['label']
    })
  },
  switchChange: function (e) {
    console.log(e);
    var disabled = this.data.disabled;
    var that=this;
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    let volunteer3 = this.data.volunteer3;
    let model = this.data.model;
    model.volunteer1 = '';
    model.volunteer2 = '';
    let name = e.detail.value;
    if (name==true){
      name=1;
      disabled=true;
      wx.showToast({
        title: '选择此项讲不能选择志愿',
        icon:'none'
        // success: (res) => {
        //   let name = e.detail.value;
        //   if (res.cancel) {
        //     name=false
        //   }
        // }
      })
    }
    if(name == false){
      name = 0;
      disabled = false;
    }
    console.log(name)
    that.setData({
      volunteer3: name,
      model:model,
      one_name:'',
      two_name:'',
      disabled: disabled
    });
    let model1 = this.data.model;
    console.log(model1, '111');
  },
  getEmailDetail() {
    var disabled = this.data.disabled;
    var checked = this.data.checked;
    util._get(config.service.getPersonalInfo, {}, (res) => {
      if (res.Flag) {
        if (res.data.volunteer3=="1"){
          checked=true;
          disabled = true;
        }
        this.setData({
          model:res.data,
          checked: checked,
          disabled: disabled
        })
      }
    })
  }
})