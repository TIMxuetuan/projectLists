//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    images: [{path:'/static/images/img01.jpg',url:''}, {path:'/static/images/img02.jpg',url:''}, {path:'/static/images/img03.jpg',url:''},{path:'/static/images/img04.jpg',url:''}],
  },
  onLoad: function () {
    
  },
  getUserInfo() {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  jumpTo(e){
    console.log(e)
    const _url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url:_url
    })
  }

})
