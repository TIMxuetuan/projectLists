// pages/quota/quota.js
const app = getApp()
const util = require('../../utils/util')
const Service = require('../../Services/services.js')
const network = require("../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // urlImg:'http://chuantu.xyz/t6/738/1591951715x2073530527.png', //背景图 20透明
    // urlImg:'http://chuantu.xyz/t6/738/1591958225x1700468761.jpg', //背景图  50
    //表单属性
    sms: '',  //月薪
    payment:'',  //金额
    oldMoney:'',  //自动计算的金额
    //日期
    currentDate: util.formatTime2(new Date()),
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
    
    //承诺书属性
    checked: false,
    isdisabled: true,

    moneyReadonly:true,
    dangYuanText:"加强党性建设，牢固树立共产主义理想信念。不忘共产党员身份，认真贯彻党和国家的教育方针政策，依法治校；实事求是，树立良好作风。要按照清正廉洁、脚踏实地的原则，实事求是地思考问题、扎实工作，积极深入群众，关注党员的思想动态和生活需要，努力成为党员队伍的思想带头人和专业发展的贴心人。开拓创新，不断提高创新能力。要紧密结合党支部组织和党员的实际，积极激活党支部组织的生活作风，切实做好对党员的生动教育，努力在思想上与时俱进，进一步激发广大党员工作的积极性和主动性。"
  },

  //查询所有日期的记录
  iconClick(){
    console.log("ccccc")
    this.setData({
      currentDate:''
    })
  },

  //修改按钮
  xiugai(){
    console.log(222)
    this.setData({
      moneyReadonly: false,
    });
    app.showToast('可以修改了')
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

   // 时间-确定按钮
   confirmFn(event) {
    var newTime = new Date(event.detail);
    console.log(newTime);
    newTime = util.formatTime2(newTime);
    console.log(newTime);
    this.setData({ 
      currentDate: newTime,
      show: false
     });
  },
  // 时间-取消按钮
  cancelFn() { 
    this.setData({ show: false });
  },

  //月薪输入完成 计算金额
  usersmsChange(){
    console.log('sms',this.data.sms)
    var smslist = this.data.sms
    var paymentlist = ''
    if(smslist <= 3000){
      paymentlist = (smslist * 0.005).toFixed(2);
    }else if(smslist <= 5000){
      paymentlist = (smslist * 0.01).toFixed(2);
    }else if(smslist <= 10000){
      paymentlist = (smslist * 0.015).toFixed(2);
    }else{
      paymentlist = (smslist * 0.02).toFixed(2);
    }
    console.log(paymentlist)
    if(paymentlist == 0){
      this.setData({
        payment:'',
      })
    }else{
      this.setData({
        payment:paymentlist,
        oldMoney:paymentlist
      })
    }
   
  },

  //勾选我已阅读
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
    if (this.data.checked) {
      console.log(this.data.checked)
      this.setData({
        isdisabled: false,
      });
    } else {
      this.setData({
        isdisabled: true,
      });
    }
  },

  //注册按钮事件
  registerTo() {
    console.log(100<50.00)
    console.log(this.data.payment,this.data.oldMoney)
    console.log(this.data.payment < this.data.oldMoney)
    if (!this.data.currentDate) {
      app.showToast('缴费日期不能为空！')
      return
    }
    if (!this.data.sms) {
      app.showToast('月薪不能为空！')
      return
    }
    if (!this.data.payment) {
      app.showToast('缴费金额不能为空！')
      return
    }
    if(this.data.payment*10 < this.data.oldMoney*10){
      app.showToast('缴费金额不正确！')
      return
    }
    let url = app.globalData.testPool2
    var params = {
      currentDate:this.data.currentDate,
      sms:this.data.sms,
      payment:this.data.payment,
    }
    network.requestPostLoading(
      url,
      params,
      '加载中',
      res=>{
        console.log(res)
        if(res.code == 200){
          app.showToast('缴费成功！')
        }
      }
    )

    // wx.reLaunch({
    //   url: '/pages/paydues/paydues',
    // })
  },

  //跳转到党员缴费承诺书
  toletterBook(){
     wx.navigateTo({
      url: '/pages/letterBook/letterBook',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.can){
        console.log(111)
        console.log(JSON.parse(options.can))
        var can = JSON.parse(options.can)
        var time = can.payyear + '-' + can.paymonth
        this.setData({
          currentDate:time
        })
    }
    this.getTextBook()
  },

  getTextBook(){
    Service.textBooks().then(res=>{
        console.log(res)
        // WxParse.wxParse('article', 'html', res.html, this, 5); 
        this.setData({
          dangYuanText:res.description
        })
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