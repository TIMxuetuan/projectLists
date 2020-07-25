const app = getApp()

function GET(url, params) {
  app.showLoading()
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'GET',
      success: function (res) {
        app.closLoading();
        // console.log(res.data)
        resolve();
      },
      fail:function(){
        app.closLoading();
      }
    })
  });
  return promise
}
function POST(url, params,message, success, fail,has_loading) {
  if(has_loading){
    wx.showNavigationBarLoading()
    if (message != "") {
      wx.showLoading({
        title: message,
      })
    }  
  }
 
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      header: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
       },
      method: 'POST',
      success: function (res) {
        app.closLoading();
        // console.log(res.data)
        wx.setStorageSync("openid", res.data.Data.openId);
        app.globalData.session_key = res.data.Data.session_key;
        resolve();
      },
      fail: function () {
        app.closLoading();
      }
    })
  });
  return promise
}
function requestPost(url, params, success, fail) {
    this.requestPostLoading(url, params, "", success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestPostLoading(url, params, message, success, fail) {
  POST(url, params, message, success, fail,1)
  // console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url,
    data: params,
    header: {
      'Content-Type': 'application/json'
      // 'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function (res) {
      // console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}

function requestGet(url, params, success, fail) {
  this.requestGetLoading(url, params, "", success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestGetLoading(url, params, message, success, fail) {
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url,
    data: params,
    header: {
      //'Content-Type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'get',
    success: function (res) {
      // console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
    },
    complete: function (res) {

    },
  })
}
module.exports = {
  GET: GET,
  POST:POST,
  requestGet: requestGet,
  requestPost, requestPost,
  requestGetLoading: requestGetLoading,
  requestPostLoading: requestPostLoading
}