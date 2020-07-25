var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')
Page({
  ...global,
  /**
   * 页面的初始数据
   */
  data: {
    model: {
      'pi_name_rp': '',
      'pi_time_rp': '',
      'pi_unit_rp': '',
      'pi_reasons_rp': '',
      'index': 0
    },
    type: '',
    main: [],
    mainArray: [],
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      main: JSON.parse(options.main), 
      id: options.index
    })
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
    var id = this.data.id;
    var main = this.data.main;
    if (main != []) {
      this.data.mainArray = this.data.mainArray.concat(main);
    }
    if (id != '') {
      this.getInfo();
    }
  },
  onSubmit: function () {
    var id=this.data.id;
    var mainArray = this.data.mainArray;
    if (id == '') {
      let validation = this.validation();
      if (!validation.isOk) {
        wx.showToast({
          title: validation.msg,
          icon: 'none',
          duration: 1500
        });
        return
      }

    mainArray.push(this.data.model);

    for (var i = 0; i < mainArray.length; i++) {
      var _data = mainArray[i];
      _data['index'] = i + 1;
    }
    }

    console.log(mainArray+'11111');
    let post_data = JSON.stringify(mainArray)
    util.showLoading({
      title: '保存中...',
      mask: true
    })
    if(this.data.id){
      util._post(config.service.upload, { field: 'rewardsPunishments', info: post_data, }, (res) => {
        if (res.Flag) {
          wx.showToast({
            title: res.Content,
            icon: 'none'
          });
          util.hideLoading();
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
    }else{
      util._post(config.service.upload, { field: 'rewardsPunishments', info: post_data, }, (res) => {
        if (res.Flag) {
          wx.showToast({
            title: res.Content,
            icon: 'none'
          });
          util.hideLoading();
          if(!id){
            this.onSaveSuccess()
          }
        } else {
          wx.showToast({
            title: res.Content,
            icon: 'none'
          });
        }
      })
    }
    
  },
  getInfo() {
    var id = this.data.id;
    var model = this.data.main[id - 1];
    this.setData({
      model: model,
    })
  },
  onSaveSuccess() {
    wx.showModal({
      title: '是否继续添加？',
      //content:'是否继续添加',
      success: (res) => {
        if (res.confirm) {
          let _model = {
            'pi_name_rp': '',
            'pi_time_rp': '',
            'pi_unit_rp': '',
            'pi_reasons_rp': '',
            'index': '',
          };
          this.setData({
            model: _model,
          })
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
          // wx.redirectTo({
          //   url: '/pages/rewardsDetail/rewardsDetail'
          // })
        }
      }
    })
  },
  bindDateChange: function (e) {
    let _model = this.data.model;
    _model[e.currentTarget.dataset.field] = e.detail.value;
    this.setData({
      model: _model
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      [e.currentTarget.id]: e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
    })
  },
  validation() {
    let model = this.data.model;
    let isOk = { isOk: true, 'msg': '' };
    let array = [
      { field: 'pi_name_rp', reg: /^\s*$/g, msg: '奖惩名称不能为空' },
      { field: 'pi_time_rp', reg: /^\s*$/g, msg: '奖惩时间不能为空' },
      { field: 'pi_unit_rp', reg: /^\s*$/g, msg: '奖惩单位不能为空' },
      { field: 'pi_reasons_rp', reg: /^\s*$/g, msg: '奖惩单位不能为空' },
    ]

    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (item['reg'].test(model[item['field']])) {
        isOk = { isOk: false, 'msg': item.msg };;
        break;
      }
    }
    return isOk;
  }
})