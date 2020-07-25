// pages/paydues/paydues.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //幻灯片属性
    background: [
      'http://image.biaobaiju.com/uploads/20191101/13/1572586737-PZEYoGweIt.jpg',
      'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1212/06/c0/16390570_1354773414872.jpg',
      'http://img2.template.cache.wps.cn/wps/cdnwps/upload/official/template/2013-1-25/5101f5621e243.png',
    ],
    indicatorDots: false,  //是否开启指示点
    vertical: false, //滑动方向是否为纵向
    autoplay: true, //是否自动切换
    circular: true, //是否采用衔接滑动
    interval: 2000, //自动切换时间间隔
    duration: 500, //滑动动画时长
    current: 0, //当前指示点的值
  },

  //轮播事件
  swiperChange(e) {
    let {current } = e.detail
    this.setData({
      current
    })
  },

  //跳转定额
  loginClick() {
    wx.navigateTo({
      url: '/pages/quota/quota',
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})