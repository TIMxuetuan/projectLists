// pages/experienceDeatil/experienceDeatil.js
var app = getApp;
var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    main: [],
    index: '',
    loadingPages: true,
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
  getInfo(){
    var that = this;
    that.data.main = [];
    util._get(config.service.getPersonalInfo, {}, (res) => {
      var str = res.data.rewardsPunishments;
      var main = that.data.main;
      main = globalFn.chaifen(str, main);

      if (res.Flag) {
        this.setData({
          list: main,
          loadingPages: false,
        })
      }

    })
  },
  goRewards() {
    wx.navigateTo({
      url: '/pages/rewards/rewards?main=' + JSON.stringify(this.data.main) + '&index=' + '',
    })
  },
  editorClick: function (e) {
    var _index = this.data.index;
    _index = e.target.dataset.index
    console.log(e)
    wx.navigateTo({
      url: '/pages/rewards/rewards?main=' + JSON.stringify(this.data.main) + '&index=' + _index,
    })
  },
  deleClick: function (e) {
    var that = this;
    var _index = e.target.dataset.index;
    var main = this.data.main;
    main.splice(_index - 1, 1)
    for (var i = 0; i < main.length; i++) {
      var _data = main[i];
      _data['index'] = i + 1;
    }
    var _main = JSON.stringify(main);
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
          })

          //获取要删除的id
          util._post(config.service.upload, { field: 'rewardsPunishments', info: _main }, function (res) {
            wx.showToast({
              title: '删除成功',
              icon: res.Flag ? 'success' : 'none'
            })
            res.Flag && that.getInfo()
          })
        }
      }
    })
  },
})