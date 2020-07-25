// pages/register/register.js
const app = getApp()
const network = require("../../utils/network.js");

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
    urlImg: app.globalData.backgroundUrl, //背景图
    //表单属性
    username: '',
    usercard: '',
    sms: '',
    userlocation: '',

    //承诺书属性
    checked: false,
    isdisabled: false,

    //获取验证码属性
    smsFlag: false,
    sendTime: '获取验证码',
    snsMsgWait: 60,

    //性别
    array: [{
        id: 0,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      },
    ],
    objectIndex: '', //默认显示位置

    //日期
    date: '',

    //党委
    //当前选中数组的下标值
    customIndex: [0, 0],
    //当前选中数组
    onlyArray: [
      [],
      []
    ],
    //customArray假设为我们从后台获取到的json数据
    customArray: [{
        name: '百度',
        dept: [{
            name: '搜索',
          },
          {
            name: '团购',
          },
          {
            name: '音乐',
          },
          {
            name: '问答社区',
          }
        ]
      },
      {
        name: '腾讯',
        dept: [{
            name: '社交',
          },
          {
            name: '视频',
          },

          {
            name: '短视频',
          }
        ]
      },
    ],

    xuanOne:'',
    xuanTwo:''

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
          userlocation: res.address,
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
      onlyArray = this.data.onlyArray;

    console.log('picker发送选择改变，携带值为', e.detail.value);
    //此处e.detail.value为当前选择的列的下标值数组，如[0,1,0]
    
    console.log('picker最终选择值为：', onlyArray[0][customIndex[0]], onlyArray[1][customIndex[1]]);
    var xuanPitch = onlyArray[0][customIndex[0]]  + '-' + onlyArray[1][customIndex[1]]
    this.setData({
      customIndex: e.detail.value,
      xuanOne:xuanPitch
    })
  },

  //多列自创选择器换列方法
  bindCustomPickerColumnChange: function(e) {
    var customArray = this.data.customArray,
      customIndex = this.data.customIndex,
      onlyArray = this.data.onlyArray;

    customIndex[e.detail.column] = e.detail.value;
    // console.log(onlyArray);

    var searchColumn = () => {
      for (var i = 0; i < customArray.length; i++) {
        var arr1 = [];
        if (i == customIndex[0]) {
          for (var j = 0; j < customArray[i].dept.length; j++) {
            arr1.push(customArray[i].dept[j].name);
          }
          onlyArray[1] = arr1;
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
      customIndex: customIndex
    });
  },

  

  //男女选择器
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      objectIndex: e.detail.value
    })
  },

  //日期选择器
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //所属党委选择器
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      objectIndex2: e.detail.value
    })
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
    // if (!this.data.partyBranch) {
    //   app.showToast('所属党支部不能为空！')
    //   return
    // }
    let url = app.globalData.testPool2
    var params = {}
    network.requestPostLoading(
      url,
      params,
      '加载中',
      res => {
        console.log(res)
        if (res.code == 200) {
          wx.reLaunch({
            url: '/pages/index/index',
          })
          app.showToast('完善成功！')
        }
      }
    )

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //
    var data = {
      customArray: this.data.customArray,
      customIndex: this.data.customIndex,
      onlyArray: this.data.onlyArray,
    };
    for (var i = 0; i < data.customArray.length; i++) {
      data.onlyArray[0].push(data.customArray[i].name);
    }
    for (var j = 0; j < data.customArray[data.customIndex[0]].dept.length; j++) {
      data.onlyArray[1].push(data.customArray[data.customIndex[0]].dept[j].name);
    }
  
    this.setData(data);
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