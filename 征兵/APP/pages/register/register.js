// pages/register/register.js
var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')
Page({
  ...global,
  /**
   * 页面的初始数据
   */
  data: {
    codename: '获取验证码',
    typeArray: [
      { id: 410102,name: '中原区（高新区）'},
      { id: 410103,name: '二七区'},
      { id: 410104,name: '管城区（经开区）'},
      { id: 410105, name: '金水区（郑东新区）'},
      { id: 410106, name: '上街区'},
      { id: 410108, name: '惠济区'},
      { id: 410122, name: '中牟县' },
      { id: 410181, name: '巩义市' },
      { id: 410182, name: '荥阳市' },
      { id: 410183, name: '新密市' },
      { id: 410184, name: '新郑市（航空港区）' },
      { id: 410185, name: '登封市' },
    ],
    model:{
      'location_code':''
    },
      username:'',
      idCard:'',
      mphone:'',
      vCode:'',
      familyPhone: '',
      password: '',
      confirmPassword:'',
      face: '',
      nickname: '',
      wxuserInfo: '',
      fam_index:'',
      fam_name:'',
      deviceinfo:'',
      disabled:false

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
    var that=this;
    var deviceinfo = that.data.deviceinfo;
    wx.getSystemInfo({
      success:function(res){
        deviceinfo=res;
        that.setData({
          deviceinfo: deviceinfo
        })
        console.log(deviceinfo,'111')
      }
    })
    let wxuserInfo = JSON.parse(wx.getStorageSync('wxuserInfo'));
    that.setData({
      wxopenid: wx.getStorageSync('wxopenid'),
      wxuserInfo: wxuserInfo,
      face: wxuserInfo.avatarUrl,
    });
    console.log(wxuserInfo, 'wxuserInfo')
  },
  submitForm: function (e) {
    var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!myreg.test(this.data.idCard)){
      wx.showToast({
        title: "身份证号不正确",
        icon: 'none'
      });
      return
    }
    if (!this.data.username) {
      wx.showToast({
        title: "真实姓名不能为空",
        icon: 'none'
      });
      return
    }
    if (this.data.password != this.data.confirmPassword) {
      wx.showToast({
        title: "两次密码不一致",
        icon: 'none'
      });
      return
    }

    let postObj = util.formatSubmitData({
      code_type: 'reg',
      username: this.data.username,
      idCard: this.data.idCard,
      mphone: this.data.mphone,
      vCode: this.data.vCode,
      familyPhone: this.data.familyPhone,
      password: this.data.password,
      location_code: this.data.model.location_code,
      face: this.data.face,
      wxuserinfo: JSON.stringify(this.data.wxuserInfo),
      deviceinfo: JSON.stringify(this.data.deviceinfo) 
    });
    util.showLoading({
      title: '注册中...',
      mask: true
    });
    util._post(config.service.register, postObj, (res) => {
      if (res.Flag) {
        wx.showToast({
          title: res.Content,
          icon: 'none',
        });
        wx.navigateTo({
          url: '/pages/login/login'
        })
      } else {
        wx.showToast({
          title: res.Content,
          icon: 'none'
        });
      }
    });
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
      util._post(config.service.codeName, { type: 'reg', mphone: this.data.mphone }, (res) => {
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
              disabled:true
            })
          }
        }, 1000)
      })
    }

  },
  
  //获取验证码
  getVerificationCode() {
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
    })
  },

  goLogin:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  bindPickerChangeType(e) {
    console.log(e)
    let _model = this.data.model;
    let _value = this.data.typeArray[e.detail.value];
    _model.location_code = _value['id']
    console.log(_model.location_code)
    this.setData({
      model: _model,
      fam_index: e.detail.value,
      fam_name: _value['name']
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      [e.currentTarget.id]: e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
    })
  },
 
})