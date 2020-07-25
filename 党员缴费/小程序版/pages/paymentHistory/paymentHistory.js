// pages/quota/quota.js
const app = getApp()
const util = require('../../utils/util')
const Service = require('../../Services/services.js')
import Toast from '../../vant/toast/toast.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlImg:app.globalData.backgroundUrl, //背景图
    //表单属性
    sms: '',
    payment:'',
    //日期
    currentDate: '',
    showDate:new Date().getTime(),
    maxDate: new Date().getTime(),
    show: false,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    //表格属性
    array:[],
    //另外保存一份总数据（已缴+未缴）
    totalData:[],
    //假数据
    fakeLists:[
      {
        payyear:'2020',
        paymonth:'01',
        paidin:100
      },
    ],

    isIconClick:false,
    popupTime:""
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  

   // 时间查询-确定按钮
   confirmFn(e) {
    var newTime = new Date(e.detail);
    newTime = util.formatTime2(newTime);
    this.setData({ currentDate: newTime });
    console.log(newTime);
    var payyear = newTime.split("-")[0]
    var paymonth = newTime.split("-")[1]
    console.log(payyear,paymonth)
    
    let totalData = this.data.totalData
    let arrayTwo = []
    totalData.map(item=>{
      if(payyear == item.payyear && paymonth == item.paymonth){
        console.log(item)
        arrayTwo.push(item)
      }
    })
    this.setData({ 
      show: false,
      isIconClick:true,
      array:arrayTwo
     });
   

   
    
  },
  // 时间查询-取消按钮
  cancelFn() { 
    this.setData({ show: false });
  },

  //查询所有日期的记录--查询全部
  iconClick(){
    let totalData = this.data.totalData
    this.setData({
      currentDate:'',
      isIconClick:false,
      array:totalData
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.systemInfo.sys_enabled)
    this.setData({
      popupTime:app.globalData.systemInfo.sys_enabled
    })
    this.paymentHistoryList('','')
  },

  //获取历史缴费记录
  paymentHistoryList(payyear,paymonth){
    let historyList = {
      payyear:payyear,
      paymonth:paymonth
    }
    console.log('这里',historyList)
    Service.paymentRecords(historyList).then(res=>{
      if(res.Flag){
        console.log(res)
        this.setData({
          fakeLists:res.data
        })
        this.getUnpaidLists()
      }
      Toast[res.Flag?'success':'fail'](res.Content);
    })
  },

  //获取未缴数据+已缴
  getUnpaidLists(){
    console.log(this.data.array)
    var nowDateTime = util.formatTime2(new Date())
    console.log(nowDateTime)
    var atLastLists =  util.getMonth(this.data.popupTime,nowDateTime,this.data.fakeLists)
    console.log(atLastLists)
    this.setData({
      array:atLastLists,
      totalData:atLastLists
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