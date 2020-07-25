//index.js
//获取应用实例
var app = getApp;
var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')

Page({
  data: {
    http: 'http://jzzb.keji01.com/plug-in/image.php?name=410105/410928199610243055_da91a917fda540ba259beeabe649432d.jpg',
    model: {
      'head': '',
    },
    imgHead: '',
    logoPath: '',
    image: '',
    school: '',
    showDialog: ""
  },

  onLoad: function (option) {
    console.log(option.src)
    // 生命周期函数--监听页面加载
    this.data.showDialog = option.src
    console.log(this.data.showDialog)

  },

  onShow: function () {
    this.getInfo();
  },
  upFileLinkTo() {
    wx.navigateTo({
      url: '/pages/cutInside/cutInside',
    })
  },
  upFile() {
    /*上传logo */
    // this.upDate()
    let that = this;
    globalFn.upFile({
      onChooseImage(tempFilePaths) {
        console.log('22', tempFilePaths);
        util.showLoading({
          title: '上传中...',
          mask: false
        })
        that.setData({
          logoPath: tempFilePaths[0],
        });
      },

      callback(res) {
        console.log(res, 'res');
        if (res.Flag) {
          let _model = that.data.model;
          console.log(_model)
          _model['head'] = res.result,
            that.setData({
              model: _model
            });
          wx.showToast({
            title: '上传成功',
            icon: res.Flag ? 'success' : 'none'
          });
          that.goInfo(res.result);
        } else {
          wx.showToast({
            title: '上传失败，稍后重试',
            icon: 'none'
          });
        }
      },
      onComplete(response) {
        console.log('globalFn.upFile-onComplete', response);
        util.hideLoading();
        if (response.statusCode == 500 || response.statusCode == '500') {
          //如果
          wx.showToast({
            title: '上传失败，稍后重试',
            icon: 'none'
          });
        }
      }
    });
  },
  goInfo(head) {
    console.log(head);
    util._post(config.service.upload, { field: 'head', info: head }, (res) => {
      console.log(res)
      if (res.Flag) {
        console.log(222)
        wx.showToast({
          title: res.Content,
          icon: res.Flag ? 'success' : 'none',
          duration: 5000,
        });
        this.getInfo()
      }

    })
  },
  getInfo() {
    util._get(config.service.getPersonalInfo, {}, (res) => {
      if (res.Flag) {
        this.setData({
          model: res.data,
          school: res.data.school
        })
      }
    })
  },
 

})
