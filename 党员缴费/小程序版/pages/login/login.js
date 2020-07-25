//index.js
//获取应用实例
const app = getApp()
const Service = require('../../Services/services.js')
import Toast from '../../vant/toast/toast.js';
Page({
  data: {
    urlImg:'../../images/index.jpg', //背景图
    isLogin: false,
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    //表单属性
    userphone: '',
    userpassword:''
  },
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  
  onLoad: function () {
    console.log(app.globalData)
    if (app.globalData.phone && app.globalData.userId) {
      this.setData({
        isLogin: true
      })
       wx.getUserInfo({
        success: res => {
        console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // wx.getUserInfo({
      //   success: res => {
      //   console.log(res)
      //     app.globalData.userInfo = res.userInfo
      //     this.setData({
      //       userInfo: res.userInfo,
      //       hasUserInfo: true
      //     })
      //   }
      // })
  },
  onChange(event) {
    console.log(event.detail);
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //登录事件
  loginAuthorization(){
    console.log(this.data)
    console.log(this.data.userphone,this.data.userpassword)
    if(!this.data.userphone){
      app.showToast('手机号不能为空！')
      return
    }
    if (!app.checkPhone(this.data.userphone)) {
      app.showToast('手机号格式错误！')
      return
    }
    if(!this.data.userpassword){
      wx.showToast({
        title: '密码不能为空！',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    let dataLists = {
      mphone:this.data.userphone,
      password:this.data.userpassword,
      type:'wx',
    }
    Service.safetyLogin(dataLists).then(res=>{
      if(res.Flag){
        console.log(res)
        wx.switchTab({
          url: '/pages/index/index'
        })
        Toast[res.Flag?'success':'fail'](res.Content);
      }
    })
    // wx.navigateTo({
    //   url: '/pages/Authorization/Authorization',
    // })
  },

  //跳转注册页面
  registerTo(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  //忘记密码
  wangPassword(){
    wx.navigateTo({
      url: '/pages/phoneVerify/phoneVerify',
    })
    
  }

})