//app.js
const config = require('./config');

App({

  //提示语抽取
  showToast(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1000,
      mask: true
    })
  },

  onLaunch: function(e) {
    var that = this;
    console.log(that.globalData)
    //小程序加载 先获取openid
    wx.login({
      success: (res) => {
        wx.request({
          url: config.service.wxLogin,
          data: {
            code: res.code
          },
          method: 'get',
          dataType: 'json',
          success: (response) => {
            let res = response.data;
            wx.setStorageSync('PHPSESSID', res.PHPSESSID)
            wx.setStorageSync('openId', res.openid)
            wx.setStorageSync('userInfo', JSON.stringify(res.user_info))

            that.globalData.openId = res.openid;
            that.globalData.userInfo = res.user_info;
            that.globalData.systemInfo = res.system_info;
            that.globalData.phone = res.user_info.mphone;
            that.globalData.userId = res.user_info.Id;
            if (res.user_info.Id){
              //跳首页
              wx.switchTab({
                url: '/pages/index/index'
              })
            }else{
              //跳注册侧授权
              wx.redirectTo({
                url: '/pages/register/register'
              })
            }
          },
          
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        this.globalData.lon = res.longitude || 113.62;
        this.globalData.lat = res.latitude || 34.75;
      },
    })
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  onLoad() {},
  onShow: function(e) {
    // console.log(e)
    // console.log((e.scene == 1001 || e.scene == 1089) && e.path.indexOf("pages/my/my") == -1)
    // if ((e.scene == 1001 || e.scene == 1089) && e.path.indexOf("pages/my/my") == -1 && e.path.indexOf("pages/Evaluate/Evaluate") == -1) {
    //   if (e.path.indexOf("pages/index/index") > -1) {
    //     return;
    //   }
    //   wx.reLaunch({
    //     url: '/pages/index/index',
    //   })
    // }
    wx.showShareMenu()
  },

  util: require('./utils/util.js'),
  plug: {
    regeneratorRuntime: require('./utils/regeneratorRuntime.js')
  },

  showLoading: function() {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  closLoading: function() {
    wx.hideLoading()
  },
  checkPhone(phone) {
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      return false;
    } else {
      return true;
    }
  },

  //校验身份证
  identityCard(identitycard){
    //身份证号前两位代表区域
    var city = {
      11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
      21: "辽宁", 22: "吉林", 23: "黑龙江 ",
      31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
      41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
      50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ",
      61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
      71: "台湾",
      81: "香港", 82: "澳门",
      91: "国外 "
    };
    var code = identitycard
    //身份证格式正则表达式
    var idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
    var errorMess = "";//错误提示信息
    var isPass = true;//身份证验证是否通过（true通过、false未通过）

    //如果身份证不满足格式正则表达式
    if (!code || !idCardReg.test(code)) {
      errorMess = "您输入的身份证号格式有误！";
      isPass = false;
    }

    //区域数组中不包含需验证的身份证前两位
    else if (!city[code.substr(0, 2)]) {
      errorMess = "您输入的身份证地址编码有误！";
      isPass = false;
    }
    else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          errorMess = "您输入的身份证号不存在！";
          isPass = false;
        }
      }
    }
    var returnParam = {
      'errorMess': errorMess,
      'isPass': isPass
    }
    return returnParam;
  },

  networkFault() {
    wx.showToast({
      icon: 'none',
      title: '网络连接错误',
      duration: 2000,
    })
    setTimeout(function() {
      wx.hideToast()
    }, 2000)
  },
  routerTo(url) {
    var that = this;
    this.globalData.isClick = true;
    this.globalData.count = this.globalData.count + 1;
    if (this.globalData.count > 1) {
      return;
    }
    if (url.indexOf("pages/index/index") >= 0) {
      wx.reLaunch({
        url: url,
        success() {
          that.globalData.isClick = false;
          that.globalData.count = 0;
        }
      })
      return;
    }
    if (getCurrentPages().length >= 10) {
      wx.redirectTo({
        url: url,
        success() {
          that.globalData.isClick = false;
          that.globalData.count = 0;
        }
      })
      return;
    }
    wx.navigateTo({
      url: url,
      success() {
        that.globalData.isClick = false;
        that.globalData.count = 0;
      }
    })
  },
  redirectTo(url) {
    var that = this;
    this.globalData.isClick = true;
    this.globalData.count = this.globalData.count + 1;
    if (this.globalData.count > 1) {
      return;
    }
    wx.redirectTo({
      url: url,
      success() {
        that.globalData.isClick = false;
        that.globalData.count = 0;
      }
    })
  },
  routerBack(e) {
    var that = this;
    this.globalData.isClick = true;
    this.globalData.count = this.globalData.count + 1;
    if (this.globalData.count > 1) {
      return;
    }
    if (getCurrentPages().length == 1) {
      wx.reLaunch({
        url: '/pages/index/index',
        success() {
          that.globalData.isClick = false;
          that.globalData.count = 0;
        }
      })
      return;
    }
    wx.navigateBack({
      delta: 1,
      success() {
        that.globalData.isClick = false;
        that.globalData.count = 0;
      }
    })
  },
  myRequest(url, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: params,
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err);
        }
      })
    })
  },

  myPostRequest(url, params) {
    return new Promise((resolve, reject) => {
      if (params == 0) {
        wx.request({
          method: "POST",
          url: url,
          success(res) {
            resolve(res.data)
          },
          fail(err) {
            reject(err);
          }
        })
      } else {
        wx.request({
          method: "POST",
          url: url,
          data: params,
          success(res) {
            resolve(res.data)
          },
          fail(err) {
            reject(err);
          }
        })
      }
    })
  },
  filterNickName(nameStr) {
    var str = nameStr;

    // 将名称拆分为数组,注意: 这样会将表情拆分为两项,其值为代理对.
    // 并且因为,代理对无法被浏览器识别,所以它们的值可能会被转化为 U+feff
    var strArr = str.split(""),
      result = "",
      totalLen = 0;

    for (var idx = 0; idx < strArr.length; idx++) {
      // 超出长度,退出程序
      if (totalLen >= 16) break;
      var val = strArr[idx];
      // 英文,增加长度1
      if (/[a-zA-Z]/.test(val)) {
        totalLen = 1 + (+totalLen);
        result += val;
      }
      // 中文,增加长度2
      else if (/[\u4e00-\u9fa5]/.test(val)) {
        totalLen = 2 + (+totalLen);
        result += val;
      }
      // 遇到代理字符,将其转换为 "口", 不增加长度
      else if (/[\ud800-\udfff]/.test(val)) {
        // 代理对长度为2,
        if (/[\ud800-\udfff]/.test(strArr[idx + 1])) {
          // 跳过下一个
          idx++;
        }
        // 将代理对替换为 "口"
        result += "口";
      }
    }
    return result;
  },
  checkLogin(notBack) {
    var that = this;
    if (!this.globalData.userId) {
      wx.hideLoading();
      wx.showModal({
        title: '未登录提醒',
        content: '检测到您尚未登录，暂无法参与',
        confirmText: "登录",
        confirmColor: "#00A2EA",
        success(res) {
          if (res.confirm) {
            var pages = getCurrentPages() //获取加载的页面
            var currentPage = pages[pages.length - 1] //获取当前页面的对象
            var params = "?";
            for (var o in currentPage.options) {
              params += o + "=" + currentPage.options[o] + "&"
            }
            wx.setStorageSync("lastPath", currentPage.route + params);
            console.log(wx.getStorageSync("lastPath"))
            that.redirectTo("/pages/Authorization/Authorization");
          } else if (res.cancel) {
            if (notBack) {
              return;
            }
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
      return false;
    }
    return true;
  },
  onShareAppMessage() {

  },
  globalData: {
    // backgroundUrl:"https://s1.ax1x.com/2020/06/16/Ni3m0e.jpg", //所有页面背景图片
    backgroundUrl:"/images/itemBeijing.jpg", //所有页面背景图片
    testUrl:'https://www.fastmock.site/mock/7489cc368afde6c6e4aeaa1b2271d2d9/PaymentSystem/api',
    testPool1:"https://www.fastmock.site/mock/7489cc368afde6c6e4aeaa1b2271d2d9/PaymentSystem/api/paymentHistoryList", //获得历史缴费记录
    testPool2:"https://www.fastmock.site/mock/7489cc368afde6c6e4aeaa1b2271d2d9/PaymentSystem/api/addPayment", //添加缴费

    url: "http://www.zytdsj.com/images/WeChatImg", //
    devWidth: wx.getSystemInfoSync().windowWidth,
    devheight: wx.getSystemInfoSync().windowHeight,
    defaultLogo: "http://111.6.79.1:21301/upload/headportrait/default.png  ", // 用户默认头像

    netPool1: "http://111.6.79.14:21601" || "https://cszc.lehelper.com" || "http://111.6.79.1:21301", // 21301  公共项目         

    lon: 113.62,
    lat: 34.75,
    phone: "", //当前登录手机号
    openId: "",
    userId: "", //用户id
    isLogin: false, //登录状态
    userInfo: {},
    isClick: false,
    count: 0,
    mainCardDetail: []
  }
})