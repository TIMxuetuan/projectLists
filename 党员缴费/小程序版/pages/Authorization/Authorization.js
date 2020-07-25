// pages/Authorization/Authorization.js
const app = getApp();
const util = app.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    CustomBar: app.globalData.CustomBar,
    modalopen: false,
    phone: "",
    userInfo: [],
    isjump: true, //默认获取用户信息后执行跳转
    modalopen: false,
    phone: "",
    userInfo: [],
    lastPath: "",
    routerUrl: "", //需要跳转的页面
    wangState:0, //控制登录后跳到那里
  },
  hideModal() {
    this.setData({
      modalopen: false
    })
  },
  getPhoneNumber(e) {
    var that = this;
    console.log(e)
    if (!e.detail.encryptedData && !e.detail.iv) {
      wx.showToast({
        title: '拒绝获取授权信息将无法执行之后的操作',
        icon: 'none'
      })
      return;
    }
    console.log('encryptedData',e.detail.encryptedData)
    that.setData({
      modalopen: true,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    })
  },
  routerTo() {
    if (getCurrentPages().length >= 10) {
      wx.redirectTo({
        url: "/pages/login/login",
      })
    } else {
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }
  },
  bindGetUserInfo: function(e) {
    var that = this;
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      this.routerTo()
    } else if (e.detail.errMsg == "getUserInfo:ok") {
      this.setData({
        userInfo: e.detail.userInfo
      })
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.routerTo()
    }
  },
  getUserInfo(e) {
    var that = this;
    console.log(e)
    console.log(app.globalData)
    wx.setStorageSync("userInfo", e.detail.userInfo);
    wx.login({
      success(res) {
      console.log(222,res)
        wx.request({
          method: "POST",
          url: app.globalData.netPool1 + "/api/ComPlatForm/WxCustomerOneKeyLogin",
          data: {
            encryptedData: that.data.encryptedData,
            iv: that.data.iv,
            code: res.code,
            NickName: e.detail.userInfo.nickName ? app.filterNickName(e.detail.userInfo.nickName) : "",
            AvatarUrl: e.detail.userInfo.avatarUrl || "",
            City: e.detail.userInfo.province || "",
            Sex: e.detail.userInfo.gender || 2
          },
          success(res) {
            console.log(res)
            let infoData = res.data
            if (infoData.ResponseStatus == 1) {
              let phone = infoData.Data.PhoneNumber
              let openId = infoData.Data.Open_ID
              let userId = infoData.Data.F_Id
              wx.setStorageSync('phone', phone)
              wx.setStorageSync('openId', openId)
              wx.setStorageSync('userId', userId)
              app.globalData.phone = phone
              app.globalData.openId = openId
              app.globalData.userId = userId
              app.globalData.isLogin = true
              wx.showToast({
                title: '登陆成功',
                icon: 'success',
                duration: 1000,
              })
              setTimeout(() => {
                console.log(that.data.routerUrl)
                if(this.data.wangState == 1){
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                }else{
                  wx.navigateTo({
                    url: '/pages/register/register',
                  })
                }
              }, 1000)
            } else if (infoData.ResponseStatus == -1) {
              wx.showToast({
                title: infoData.Message,
                icon: 'none',
                mask: true,
              })
            }
          },
          fail(err) {
            console.log(err)
          },
          complete() {
            that.setData({
              modalopen: false
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      lastPath: "/" + wx.getStorageSync("lastPath") || "/pages/index/index"
    })

    console.log(wx.getStorageSync("lastPath"))
    this.setData({
      routerUrl: wx.getStorageSync("lastPath")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})