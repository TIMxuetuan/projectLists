const app = getApp()
const util = require('../../utils/util.js')
const Service = require('../../Services/services.js')
const config = require('../../config.js');
import Toast from '../../vant/toast/toast.js'

Page({
  data: {
    sys_version:'',
    urlImg: app.globalData.backgroundUrl, //背景图
    username: '',
    usercard: '',
    userphone: '',
    usersafety: '未开启',
    useraboud: 'V1.0',
    //性别
    array: [{
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      },
    ],
    objectIndex: '', //默认显示位置
    arrayLists: [],

    //修改名字弹窗
    usernameTwo: '',
    hiddenmodalput: true,

    //修改身份证号弹窗
    usercardTwo:'',
    hiddenmodalput2: true,

    //党委
    customArray: '',
    xuanOne:'', //党委名称
    xuanTwo:'', //党支部名称
    s0_id:'',  //党委id
    s_id:'', //党支部ID
  },

  getPhoneNumber(e){
    console.log(e)
    // wx.getUserInfo({
    //   success: function(res) {
    //     console.log(res)
    //     var userInfo = res.userInfo
    //     var nickName = userInfo.nickName
    //     var avatarUrl = userInfo.avatarUrl
    //     var gender = userInfo.gender //性别 0：未知、1：男、2：女
    //     var province = userInfo.province
    //     var city = userInfo.city
    //     var country = userInfo.country
    //   }
    // })
  },

  onGotUserInfo: function (e) {
    console.log(e)
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },


  //男女选择器
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e)
    let dataLists = {
      key:'sex',
      value:e.detail.value
    }
    console.log(dataLists)
    Service.changeUserInfo(dataLists).then(res=>{
      if(res.Flag){
        this.setData({
          objectIndex: e.detail.value
        })
        app.showToast('性别修改成功！')
      }else{
        app.showToast(res.Content)
      }
    })
  },

  //弹出修改名字弹窗
  amendName() {
    this.setData({
      hiddenmodalput: false
    })
  },

  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },

  //修改姓名
  getUserInfoName() {
    if (!this.data.usernameTwo) {
      app.showToast('请填写姓名！')
      return
    }
    let dataLists = {
      key:'real_name',
      value:this.data.usernameTwo
    }
    console.log(dataLists)
    Service.changeUserInfo(dataLists).then(res=>{
      if(res.Flag){
        this.setData({
          username: this.data.usernameTwo,
          hiddenmodalput: true
        })
        app.showToast('姓名修改成功！')
      }else{
        app.showToast(res.Content)
      }
    })
  },

  //修改身份证
  usercardChange() {
    this.setData({
      hiddenmodalput2: false
    })
  },

  //取消按钮
  cancel2: function () {
    this.setData({
      hiddenmodalput2: true
    });
  },

  getUserInfo2(){
    if (!app.identityCard(this.data.usercardTwo).isPass) {
      app.showToast('请填写正确的身份证号！')
      return
    }
    let dataLists = {
      key:'idCard',
      value:this.data.usercardTwo
    }
    console.log(dataLists)
    Service.changeUserInfo(dataLists).then(res=>{
      if(res.Flag){
        this.setData({
          usercard: this.data.usercardTwo,
          hiddenmodalput2: true
        })
        app.showToast('身份证号修改成功！')
      }else{
        app.showToast(res.Content)
      }
    })
  },

  //修改手机号
  amendPhone() {
    wx.navigateTo({
      url: '/pages/amendPhone/amendPhone?userphone=' + this.data.userphone,
    })
  },

  safety() {
    wx.navigateTo({
      url: '/pages/safety/safety?userphone=' + this.data.userphone,
    })
  },

  onLoad: function () {
    // Toast('加载中...');
    this.setData({
      sys_version:app.globalData.systemInfo.sys_version
    })
    this.getUserInfo()
    
  },

  //获得用户数据
  getUserInfo(){
    var that = this
    Toast.loading({
      mask: false,
      loadingType:'spinner',
      duration:500
    });
    Service.getUserInformation().then(res=>{
      console.log(res)
      if(res.Flag){
        console.log(res.data)
        let party = res.data.party
        let customArray = ''
        if(party.length == 1){
        customArray = party[0]
        }else{
        customArray = party[0] + '-' + party[1]
        console.log(customArray)
        }
        that.setData({
          username: res.data.real_name,
          usercard: res.data.idCard,
          userphone: res.data.mphone,
          objectIndex: res.data.sex,
          s0_id:res.data.s0_id,  //党委id
          s_id:res.data.s_id, //党支部ID
          customArray:customArray
        })
      }
    })
  },

})