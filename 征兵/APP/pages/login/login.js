// pages/login/login.js
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idCard: '1123',
    mphone: '13607651079',
    password:'123123',
    vCode:'',
    wxuserInfo:'',
    face:'',
    deviceinfo:'',
    action: 'list',
    codename:"获取验证码",
    primary:'primary',
    coPrimary:'',
    disabled:false,
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
    if (wx.getStorageSync('userinfo')) {
      let userInfo = JSON.parse(wx.getStorageSync('userinfo'));
      if (userInfo.m_id) {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    } 
    this.deviceinfo();
  },
   goReg1: function (e) {
    if (!this.data.idCard) {
      wx.showToast({
        title: "身份证号不能为空",
        icon: 'none'
      });
      return
    }

    if (!this.data.mphone) {
      wx.showToast({
        title: "手机号不能为空",
        icon: 'none'
      });
      return
    }
    if (!this.data.password) {
      wx.showToast({
        title: "密码不能为空",
        icon: 'none'
      });
      return
    }
     var wxuserInfo = this.data.wxuserInfo;
     var face = this.data.face;
     wxuserInfo = app.globalData.wxuserInfo;
     console.log(wxuserInfo,'wxuserInfo')
     
    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.setStorageSync('wxuserInfo', e.detail.rawData);
      wxuserInfo = e.detail.userInfo;
      face = wxuserInfo.avatarUrl;
        let postObj = util.formatSubmitData({
          // code_type: 'authentication',
          idCard: this.data.idCard,
          mphone: this.data.mphone,
          password: this.data.password,
          // face:face,
          // wxuserinfo: JSON.stringify(wxuserInfo),
          // deviceinfo: JSON.stringify(this.data.deviceinfo) 
        });
        console.log(postObj);
        util.showLoading({
          title: '登录中...',
          mask: true
        })
        util._post(config.service.login, postObj, function (res) {
          console.log('res', res)
          if (res.Flag) {
            wx.setStorageSync('userinfo', JSON.stringify(res.userInfo));
            util.hideLoading();
            wx.switchTab({
              url: '/pages/index/index'
            });
          } else {
            wx.showToast({
              title: res.Content,
              icon: 'none'
            });
          }
        })
      
    } else {
      wx.showToast({
        title: "您选择了拒绝，不能进行登录",
        icon: 'none'
      });
    }

   
  },
  bindKeyInput: function (e) {
    this.setData({
      [e.currentTarget.id]: e.detail.value
    })
  },
  goReg: function (e) {
    console.log(e);
    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.setStorageSync('wxuserInfo', e.detail.rawData);
      app.globalData.wxuserInfo = e.detail.userInfo;
      wx.redirectTo({
        url: '/pages/register/register'
      })
    } else {
      wx.showToast({
        title: "您选择了拒绝，不能进行注册",
        icon: 'none'
      });
    }
  },
  deviceinfo(){
    var that = this;
    var deviceinfo = that.data.deviceinfo;
    wx.getSystemInfo({
      success: function (res) {
        deviceinfo = res;
        that.setData({
          deviceinfo: deviceinfo
        })
        console.log(deviceinfo, '111')
      }
    })
  },

  list: function (e) {
    console.log(e.target.dataset.name);
    var _primary = this.data.primary;
    var _coPrimary = this.data.coPrimary;
    if (e.target.dataset.name == "1") {
      _primary = 'primary';
      _coPrimary = '';
    }
    console.log(_primary)
    this.setData({
      action: 'list',
      primary: _primary,
      coPrimary: _coPrimary
    })
  },
  edit:function(e) {
    console.log(e.target.dataset.name);
    var _primary = this.data.primary;
    var _coPrimary = this.data.coPrimary;
    if (e.target.dataset.name == "2"){
      _primary ='';
      _coPrimary ='primary';
    }
    console.log(_coPrimary)
    this.setData({
      action: 'edit',
      coPrimary: _coPrimary,
      primary: _primary,
      
    })
  },
  
 
  goRegCode:function(e){
    if (!this.data.idCard) {
      wx.showToast({
        title: "身份证号不能为空",
        icon: 'none'
      });
      return
    }
    if (!this.data.vCode) {
      wx.showToast({
        title: "验证码不能为空",
        icon: 'none'
      });
      return
    }
    var wxuserInfo = this.data.wxuserInfo;
    wxuserInfo = app.globalData.wxuserInfo;

    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.setStorageSync('wxuserInfo', e.detail.rawData);
      wxuserInfo = e.detail.userInfo;
      let postObj = util.formatSubmitData({
        code_type: 'authentication',
        idCard: this.data.idCard,
        mphone: this.data.mphone,
        vCode: this.data.vCode,
        wxuserinfo: JSON.stringify(wxuserInfo),
        deviceinfo: JSON.stringify(this.data.deviceinfo)
      });
      console.log(postObj);
      util.showLoading({
        title: '登录中...',
        mask: true
      })
      util._post(config.service.loginCode, postObj, function (res) {
        console.log('res', res)
        if (res.Flag) {
          wx.setStorageSync('userinfo', JSON.stringify(res.userInfo));
          util.hideLoading();
          wx.switchTab({
            url: '/pages/index/index'
          });
        } else {
          wx.showToast({
            title: res.Content,
            icon: 'none'
          });
        }
      })

    } else {
      wx.showToast({
        title: "您选择了拒绝，不能进行登录",
        icon: 'none'
      });
    }
  },

  getPhoneValue: function (e) {
    this.setData({
      mphone: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      vCode: e.detail.value
    })
  },
  //获取验证码
  getVerificationCode() {
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
    })
  },
  getCode: function () {
    var a = this.data.mphone;
    var that = this;
    var myreg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (this.data.mphone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.mphone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      util._post(config.service.codeName, { type: 'authentication', mphone: this.data.mphone }, (res) => {
        var num = 61;
        var timer = setInterval(function () {
          num--;
          if (num <= 0) {
            clearInterval(timer);
            that.setData({
              codename: '重新发送',
              disabled: false
            })

          } else {
            that.setData({
              codename: num + "s",
              disabled: true
            })
          }
        }, 1000)
      })
    }

  },
})