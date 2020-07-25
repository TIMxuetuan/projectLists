// import GlobalConfig from './config/index'
import GlobalConfig from './wangConfig/index'

const globalConfig = new GlobalConfig()

globalConfig.init()

//app.js
const config = require('./config');
const util = require('./utils/util.js');
App({

  wxLogin: function (onOk) {
    let that = this;
    // 登录
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        util._get(config.service.wxLogin, { code: res.code, curPath: that.curPath }, function (res) {
          //服务器的session_id值
          if (!wx.getStorageSync('PHPSESSID')) {
            wx.setStorageSync('PHPSESSID', res.PHPSESSID);
          }
          wx.setStorageSync('wxopenid', res.openid);
          wx.setStorageSync('id', res.id)
          onOk && onOk(res);
        })
      }
    });
  },
  onLaunch: function (e) {
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs);
    // console.log('onLaunch');
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // });

    wx.onAppRoute((res) => {
      var that = this;
      that.curPath = res.path;
      that.wxLogin((obj) => {
        that.setTitle(res.title);
      });
    })
  },
  setTitle: function (title) {
    if (title) {
      wx.setNavigationBarTitle({
        title: title + ' - ' + config.siteName
      });
    }
  },
  globalData: {
    userInfo: null,
    wxuserInfo: null,
    wangConfig: globalConfig

  }
  
})