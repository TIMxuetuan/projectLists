const config = require('../config');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


var ajax = function (obj) {
  let session_id = wx.getStorageSync('PHPSESSID') || '';
  let header = typeof obj.header == 'undefined' ? {} : obj.header;

  if (session_id != "" && session_id != null) {
    header.Cookie = 'PHPSESSID=' + session_id;
  }
  header.appid = config.appid;
  header.uid = wx.getStorageSync('openid') || '';
  header.signature = wx.getStorageSync('signature') || '';
  header.signaturetime = wx.getStorageSync('signaturetime') || '';
  obj.header = header;
   obj.complete = function (res) {

    if (res.statusCode == 401) {
      wx.setStorageSync('userinfo', '');
      wx.navigateTo({
        url: '../login/login'
      });
    }

    if (typeof res.data == 'string' && res.data.indexOf('Warning') > 0) {
      if (config.debug) {
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        });
      }
    }
  };

  obj.fail = function (err) {
    console.log('fail', err.errMsg)
  }

  wx.request(obj);
}

var _get = function (url, obj, callback) {
  ajax({
    method: 'GET',
    header: {
      'cache-control': 'no-cache'
    },
    url: url,
    data: obj,
    dataType: 'json',
    success: function (response) {
      let res = response.data;
      if (res.title && typeof res.title != 'undefined') {
        wx.setNavigationBarTitle({
          title: res.title + ' - ' + config.siteName
        });
      }
      callback && callback(res);
    }
  })
}

var _post = function (url, obj, callback) {
  ajax({
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache'
    },
    url: url,
    data: obj,
    dataType: 'json',
    success: function (response) {
      let res = response.data;
      callback && callback(res);
    }
  })
}

let formatSubmitData = function (obj) {
  var _obj = {};
  for (var key in obj) {
    _obj['fields[' + key + ']'] = obj[key];
  }
  return _obj;
}

let showLoading = function (obj) {
  if (typeof wx.showLoading == "function") {
    wx.showLoading({
      title: obj.title || '加载中...',
      mask: true
    });
  }
}

let hideLoading = function () {
  if (typeof wx.hideLoading == "function") {
    wx.hideLoading();
  }
}

let getUserInfo = function () {
  let userinfo = '';
  let userinfoStorage = wx.getStorageSync('userinfo');
  if (userinfoStorage) {
    userinfo = JSON.parse(userinfoStorage);
  }
  return userinfo;
}
module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  _get: _get,
  _post: _post,
  showLoading: showLoading,
  hideLoading: hideLoading,
  getUserInfo: getUserInfo,
  formatSubmitData: formatSubmitData
}
