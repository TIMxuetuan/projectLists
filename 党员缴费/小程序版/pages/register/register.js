// pages/register/register.js
const Service = require('../../Services/services.js')
const app = getApp()
const network = require("../../utils/network.js");

import Toast from '../../vant/toast/toast.js';
import {
  _CONFIG,
  _data,
  _methods,
  util
} from '../../common/public.js';

Page({
  /**
   * 页面的初始数据
   */
  ..._methods,
  data: {
    ..._data,
    urlImg:app.globalData.backgroundUrl, //背景图
    //表单属性
    mphone: '',
    sms: '',
    //获取验证码属性
    smsFlag: false,
    sendTime: '获取验证码',
    snsMsgWait: 60,
    wxUserInfo:null,

    urlImg:app.globalData.backgroundUrl, //背景图
    //表单属性
    username: '',
    usercard: '',
    address:'',
    address_name:'',
    lnglat:'',

    //承诺书属性
    checked: false,
    isdisabled: false,

    //获取验证码属性
    smsFlag: false,
    sendTime: '获取验证码',
    snsMsgWait: 60,

    //性别
    array: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      },
    ],
    sex: '',//默认显示位置

    //入党日期
    jion_party_time: '',

    //所属党委
    partyCommittee:'',
    partyBranch:'',
    array2: [
      {
        id: 0,
        name: '党委'
      },
      {
        id: 2,
        name: '党支部'
      },
    ],
    objectIndex2: '',//默认显示位置

    //党委
    //当前选中数组的下标值
    customIndex: [0, 0],
    //当前选中数组
    onlyArray: [
      [],
      []
    ],
    //customArray假设为我们从后台获取到的json数据
    customArray: [],

    onlyArrayId:[
      [],
      []
    ],

    xuanOne:'',
    s0_id:'',  //党委id
    s_id:'', //党支部ID
  },

  //地图选择
  bindChooseLocation(e) {
    let obj = {
      longitude: this.data.longitude,
      latitude: this.data.latitude,
    };

    this._getSetting().then(res => {

      this._chooseLocation(obj).then(res => {
        console.log('_chooseLocation', res);
        this.setData({
          address: res.address,
          address_name: res.name,
          lnglat: `${res.longitude},${res.latitude}`,
        })
      })

    });

  },

  //多级选择器
  //多列自定义选择器改变value的方法
  bindCustomPickerChange: function(e) {
    var customArray = this.data.customArray,
      customIndex = this.data.customIndex,
      onlyArray = this.data.onlyArray,
      onlyArrayId = this.data.onlyArrayId


    console.log('picker发送选择改变，携带值为', e.detail.value);
    //此处e.detail.value为当前选择的列的下标值数组，如[0,1,0]
    
    console.log('picker最终选择值为：', onlyArray[0][customIndex[0]], onlyArray[1][customIndex[1]]);
    var xuanPitch = onlyArray[0][customIndex[0]]  + '-' + onlyArray[1][customIndex[1]]
    var s0_id = onlyArrayId[0][customIndex[0]]
    var s_id = onlyArrayId[1][customIndex[1]]
    this.setData({
      customIndex: e.detail.value,
      xuanOne:xuanPitch,
      s0_id:s0_id,
      s_id:s_id,
    })
    console.log("sid",this.data.s0_id,this.data.s_id)
  },

  //多列自创选择器换列方法
  bindCustomPickerColumnChange: function(e) {
    var customArray = this.data.customArray,
      customIndex = this.data.customIndex,
      onlyArray = this.data.onlyArray,
      onlyArrayId = this.data.onlyArrayId;

    customIndex[e.detail.column] = e.detail.value;
    // console.log(onlyArray);

    var searchColumn = () => {
      for (var i = 0; i < customArray.length; i++) {
        var arr1 = [];
        var arr2 = [];
        if (i == customIndex[0]) {
          for (var j = 0; j < customArray[i].child.length; j++) {
            arr1.push(customArray[i].child[j].title);
            arr2.push(customArray[i].child[j].Id);
          }
          onlyArray[1] = arr1;
          onlyArrayId[1] = arr2
        }
      };
    }

    switch (e.detail.column) {
      case 0:
        customIndex[1] = 0;
        searchColumn();
        break;
      case 1:
        searchColumn();
        break;
    }
    this.setData({
      onlyArray: onlyArray,
      customIndex: customIndex,
      onlyArrayId:onlyArrayId
    });
  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.partyOrganization()
    
    // this.setData({
    //   customIndex: this.data.customIndex,
    //   onlyArray: this.data.onlyArray,
    // });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取验证码
  sendCode() {
    // var that = this;
    if (this.data.mphone == "") {
      app.showToast('手机号不能为空！')
      return;
    }
    if (!app.checkPhone(this.data.mphone)) {
      app.showToast('手机号格式错误！')
      return
    }
    this.setData({
      smsFlag: true,
    })
    // 60秒后重新获取验证码
    console.log('smsFlag', this.data.smsFlag)
    Service.sendCode({type:'reg',mphone:this.data.mphone})
      .then(res=>{
        app.showToast('短信发送成功！')
      })

    var inter = setInterval(function () {
      this.setData({
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + '秒后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendTime: '获取验证码',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
    console.log(66666)
  },

  //注册按钮事件
  registerTo() {
    console.log(this.data.onlyArray)
    console.log(this.data.xuanOne)
    if (!this.data.userphone) {
      app.showToast('手机号不能为空！')
      return
    }
    if (!app.checkPhone(this.data.userphone)) {
      app.showToast('手机号格式错误！')
      return
    }
    if (!this.data.sms) {
      app.showToast('短信验证码不能为空！')
      return
    }
    if (!this.data.username) {
      app.showToast('姓名不能为空！')
      return
    }
    if (!this.data.objectIndex) {
      app.showToast('性别不能为空！')
      return
    }
    console.log(app.identityCard(this.data.usercard))
    if (!app.identityCard(this.data.usercard).isPass) {
      console.log(this.data.usercard)
      app.showToast('请填写正确的身份证号！')
      return
    }
    if (!this.data.date) {
      app.showToast('入党时间不能为空！')
      return
    }
    if (!this.data.userlocation) {
      app.showToast('目前所在地不能为空！')
      return
    }
    if (!this.data.xuanOne) {
      app.showToast('所属党委/党支部不能为空！')
      return
    }
    console.log(111)
    let url = app.globalData.testPool2
    var params = {}
    network.requestPostLoading(
      url,
      params,
      '加载中',
      res=>{
        console.log(res)
        if(res.code == 200){
          wx.switchTab({
            url: '/pages/index/index'
          })
          app.showToast('验证成功！')
        }
      }
    )
  },

  //男女选择器
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      sex: e.detail.value
    })
  },

  //日期选择器
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jion_party_time: e.detail.value
    })
  },

  //所属党委选择器
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      objectIndex2: e.detail.value
    })
  },

  _v(){
    if (!this.data.mphone) {
      app.showToast('手机号不能为空！')
      return
    }
    if (!app.checkPhone(this.data.mphone)) {
      app.showToast('手机号格式错误！')
      return
    }
    if (!this.data.sms) {
      app.showToast('短信验证码不能为空！')
      return
    }
    if (!this.data.username) {
      app.showToast('姓名不能为空！')
      return false
    }
    if (!this.data.sex) {
      app.showToast('性别不能为空！')
      return false
    }
    console.log(app.identityCard(this.data.usercard))
    if (!app.identityCard(this.data.usercard).isPass) {
      console.log(this.data.usercard)
      app.showToast('请填写正确的身份证号！')
      return false
    }
    if (!this.data.jion_party_time) {
      app.showToast('入党时间不能为空！')
      return false
    }
    if (!this.data.address) {
      app.showToast('目前所在地不能为空！')
      return false
    }
    // if (!this.data.partyCommittee) {
    //   app.showToast('所属党委不能为空！')
    //   return false
    // }
    // if (!this.data.partyBranch) {
    //   app.showToast('所属党支部不能为空！')
    //   return false
    // }
    console.log(this.data.onlyArray)
    console.log(this.data.xuanOne)
    if (!this.data.xuanOne) {
      app.showToast('所属党委/党支部不能为空！')
      return
    }

    return true
  },

  bindGetUserInfo: function(e) {
    if(!this._v()){
      return
    }
    
    let that = this;
    console.log('bindGetUserInfo',e)
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      // 错了
    } else if (e.detail.errMsg == "getUserInfo:ok") {
      let wx_user_info = e.detail.userInfo;
      let postData = {
        sms:this.data.sms,
        real_name:this.data.username,
        sex:this.data.sex,
        idCard:this.data.usercard,
        mphone:this.data.mphone,
        jion_party_time:this.data.jion_party_time,
        face:wx_user_info.avatarUrl,
        nickname:wx_user_info.nickName,
        wxuserinfo:e.detail.rawData,
        address:this.data.address,
        address_name:this.data.address_name,
        lnglat:this.data.lnglat,
        s0_id:this.data.s0_id,
        s_id:this.data.s_id,
      }
      Service.register(postData).then(res=>{
        if(res.Flag){
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
        Toast[res.Flag?'success':'fail'](res.Content);
      })
    }
  },

  //从后台获得党组织数据
  partyOrganization(){
    Service.partyOrganization().then(res=>{
      console.log(res)
      if(res.Flag){
        this.setData({
          customArray:res.data
        })
        var data = {
          customArray: this.data.customArray,
          customIndex: this.data.customIndex,
          onlyArray: this.data.onlyArray,
          onlyArrayId:this.data.onlyArrayId
        };
        for (var i = 0; i < data.customArray.length; i++) {
          console.log(data.customArray[i])
          data.onlyArray[0].push(data.customArray[i].title);
          data.onlyArrayId[0].push(data.customArray[i].Id);
        }
        for (var j = 0; j < data.customArray[data.customIndex[0]].child.length; j++) {
          console.log(data.customArray[data.customIndex[0]].child[j])
          data.onlyArray[1].push(data.customArray[data.customIndex[0]].child[j].title);
          data.onlyArrayId[1].push(data.customArray[data.customIndex[0]].child[j].Id);
        }
      
        this.setData(data);
        console.log(this.data.onlyArray)
        console.log(this.data.onlyArrayId)
      }
    })
  }
})