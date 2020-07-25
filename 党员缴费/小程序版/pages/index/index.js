//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util')
const network = require("../../utils/network.js");
const Service = require('../../Services/services.js')

Page({
  data: {
    isLogin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    urlImg:app.globalData.backgroundUrl, //背景图
    //幻灯片属性
    background: [],
    indicatorDots: true,  //是否开启指示点
    vertical: false, //滑动方向是否为纵向
    autoplay: true, //是否自动切换
    circular: true, //是否采用衔接滑动
    interval: 5000, //自动切换时间间隔
    duration: 500, //滑动动画时长
    current: 0, //当前指示点的值
    //表单属性
    username: '测试1',
    password: '222',
    //表格属性
//     Id,
// userid,用户id
// payyear,年份
// paymonth,月份
// payable,应缴
// paidin,实缴
// paymentTime,支付时间
// salary，工资
    array:[],

    fakeLists:[
      {
        payyear:'2020',
        paymonth:'01',
        paidin:100
      },
    ],

    //第一次使用时间
    popupTime:''
  },
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  //轮播事件
  swiperChange(e) {
    let {current } = e.detail
    this.setData({
      current
    })
  },

  onLoad: function () {
    console.log('当前时间',util.formatTime2(new Date()),)
    console.log(app.globalData.systemInfo)
    this.setData({
      popupTime:app.globalData.systemInfo.sys_enabled
    })
    wx.setNavigationBarTitle({
      title: app.globalData.systemInfo.sys_name
   })
    this.paymentHistoryList()
    this.swichPhoto()
  },

  //轮播图请求
  swichPhoto(){
    Service.swichPhoto().then(res=>{
      if(res.Flag){
        console.log(res)
        console.log(res.data.data)
        this.setData({
          background:res.data.data
        })
      }
    })
  },

   //获取历史缴费记录
   paymentHistoryList(){
    let historyList = {
      payyear:'',
      paymonth:''
    }
    console.log('这里',historyList)
    Service.paymentRecords(historyList).then(res=>{
      if(res.Flag){
        console.log(res)
        //后台有真实数据后用
        this.setData({
          fakeLists:res.data
        })
        this.getUnpaidLists()
      }
    })
  },

  //获取未缴数据
  getUnpaidLists(){
    console.log(this.data.array)
    var nowDateTime = util.formatTime2(new Date())
    console.log(nowDateTime)
    var atLastLists =  util.getMonth(this.data.popupTime,nowDateTime,this.data.fakeLists)
    this.setData({
      array:atLastLists
    })
  },




  //补缴事件
  makepayment(e){
    console.log(e.currentTarget.dataset.can)
    var can = JSON.stringify(e.currentTarget.dataset.can)
    console.log(can)
    wx.reLaunch({
      url: '/pages/quota/quota?can='+ can,
    })
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

  loginClick() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  //历史缴费记录
  paymentHistory(){
    wx.navigateTo({
      url: '/pages/paymentHistory/paymentHistory',
    })
  }
})