/**
 * Created by sail on 2017/6/1.
 */
import WeCropper from '../we-cropper/we-cropper.js'
const app = getApp()
const wangConfig = app.globalData.wangConfig

var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')

var myAjax = util.ajax;
var myAlert = util.myAlert;

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
  data: {
    showView:true,
    twoBtnShow:false,
    cropperOpt: {
      model: {
        'head': '',
      },
      school: '',
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        // x: (width - 295) / 2,
        // y: (height - 413) / 2,
        // width: 295,
        // height: 413
        x: (width - 180) / 2,
        y: (height - 252) / 2,
        width: 180,
        height: 252
      },
      boundStyle: {
        color: wangConfig.getThemeColor(),
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 1
      }
    }
  },

  onShow: function () {
    this.getInfo();
  },

  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage() {
    this.cropper.getCropperImage()
      .then((src) => {
        wx.showToast({
          title: '上传图片中',
          icon: 'loading',
          duration: 10000
        })
        console.log(src)
        this.upDate(src)
      })
      .catch((err) => {
        wx.showModal({
          title: '温馨提示',
          content: err.message
        })
      })
  },


  centerClick(){
    console.log("中间按钮")
    this.uploadTap()
  },

  /*------------------分割线---------------------------------*/
  //上传图片
  upDate(res) {
    console.log(res)
    let session_id = wx.getStorageSync('PHPSESSID') || '';
    var _this = this
    _this.setData({
      src: res
    })
    const tempFilePaths = res
    console.log(tempFilePaths)
    wx.uploadFile({
      url: 'https://jzzb.keji01.com/plug-in/action_webuploader/fileupload2.php?t=' + new Date().getTime(), //仅为示例，非真实的接口地址
      filePath: tempFilePaths,
      name: 'file',
      header: {
        appid: config.appid,
        uid: wx.getStorageSync('openid') || '',
        signature: wx.getStorageSync('signature') || '',
        signaturetime: wx.getStorageSync('signaturetime') || '',
        Cookie: 'PHPSESSID=' + session_id
      },
      formData: {
        'user': 'test'
      },
      success(res) {
        console.log(res)
        let _data = res.data ? JSON.parse(res.data) : { 'Flag': 0, 'Content': '上传失败，稍后重试' };
        _this.scallback(_data, res)
        //do something
      }
    })


  },

  scallback(res) {
    var that = this
    console.log(res, 'res');
    if (res.Flag) {
      let _model = that.data.model;
      console.log(_model)
      _model['head'] = res.result,
        that.setData({
          model: _model
        });
        console.log('上传成功')
      // wx.showToast({
      //   title: '上传成功',
      //   icon: res.Flag ? 'success' : 'none'
      // });
      that.goInfo(res.result);
    } else {
      wx.showToast({
        title: '上传失败，稍后重试',
        icon: 'none'
      });
    }
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
        wx.reLaunch({
          url: "/pages/index/index"
        })
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

  //请选择图片事件延伸2
  uploadTap() {
    const self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        console.log("上传图片返回的值",res)
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.cropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    const { cropperOpt } = this.data

    cropperOpt.boundStyle.color = wangConfig.getThemeColor()

    this.setData({ cropperOpt })

    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log("上传中")
        this.setData({
          showView: false,
          twoBtnShow:true
        })
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
  }
})
