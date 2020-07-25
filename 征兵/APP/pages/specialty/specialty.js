// pages/specialty/specialty.js
var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
      // { name: '1', value: '无' },
      // { name: '13', value: '体育运动' },
      // { name: '14', value: '跑步' },
      // { name: '2', value: '篮球' },
      // { name: '3', value: '足球' },
      // { name: '4', value: '排球' },
      // { name: '16', value: '羽毛球' },
      // { name: '15', value: '高尔夫' },
      // { name: '30', value: '射击' },
      // { name: '9', value: '跆拳道' },
      // { name: '17', value: '游泳' },
      // { name: '23', value: '摄影' },
      // { name: '5', value: '围棋' },
      // { name: '6', value: '国际象棋' },
      // { name: '8', value: '古典音乐' },
      // { name: '10', value: '演讲' },
      // { name: '11', value: '辩论' },
      // { name: '12', value: '舞蹈' },
      // { name: '18', value: '小提琴' },
      // { name: '19', value: '笛子' },
      // { name: '20', value: '琵琶' },
      // { name: '21', value: '古筝' },
      // { name: '22', value: '美声' },
      // { name: '24', value: '插花' },
      // { name: '25', value: '茶艺' },
      // { name: '26', value: '编制' },
      // { name: '27', value: '剪纸' },
      // { name: '7', value: '阅读' },
      // { name: '28', value: '小品主持' },
      // { name: '29', value: '文案写作' },
    
      name:[],
      nameArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSpecialityMap(options);

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
    // this.getSpecialityMap();
  },
  getSpecialityMap(options){
    let that = this;
    util._get(config.service.getSpecialityMap, {}, (res) => {
      if (res.Flag) {
        let array = [];
        let _shuZu = res.speciality;
        console.log(res)
        for (let key in _shuZu) {
          array.push({ name: key, value: _shuZu[key] });
        }
      
        that.setData({
          items: array
        });
        that.getData(options);
      }
    })
  },
  getData: function (options){
    var _items = this.data.items
    var nameArray = this.data.nameArray;
    var shuzu = JSON.parse(options.main);
    console.log(_items)
    console.log(shuzu)

    for (var i = 0; i < shuzu.length; i++) {
      for (var j = 0; j < _items.length; j++) {
        var obj = _items[j];
        if (obj.name == shuzu[i]) {
          obj['checked'] = true;
          console.log(obj);
          break;
        }
      }
    }
    this.setData({
      nameArray: shuzu,
      items: _items,
      name: shuzu
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var item = e.detail.value;
    var items = this.data.items;
    console.log(item)
    console.log(this.data.items)
    var isHave = false;
    var index = 0;
    var last = item[item.length-1];
    for(var i=0;i<item.length;i++){
      console.log(item[i])
      if(item[i]=="1"){
        isHave = true;
        index = i;
        break;
      }
    }
      if (last == "1") {
        item = ["1"];
      } else {
        if (isHave) {
          item.splice(index, 1);
        }
      }

    for (var i = 0; i < items.length; i++) {
      var _items = items[i];
      for (var j = 0; j < item.length; j++) {
        var _item = item[j];

        if (_item == _items['name']) {
          _items["checked"] = true;
          break;
        }
        _items["checked"] = false;
      }
    }

    var name = this.data.name;
    this.setData({
      name :item,
      items:items,
    })

  },
  goInfo:function(){
    var name = this.data.name;
    console.log(name)
    if(name==''){
      wx.showToast({
        title:'至少选择一项',
        icon: 'none'
      })
      return
    }
    util.showLoading({
      title: '保存中...',
      mask: true
    })
    util._post(config.service.upload, { field: 'speciality',info:name},(res)=>{
        if(res.Flag){
          wx.showToast({
            title: res.Content,
            icon: 'none'
          });
          util.hideLoading();
          setTimeout(function(){
            wx.navigateBack({ delta: 1 }) 
          },500)
        }else{
          wx.showToast({
            title: res.Content,
            icon: 'none'
          });
        }
    })
  }

})