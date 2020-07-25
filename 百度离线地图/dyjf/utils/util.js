/**
 * 格式化日期
 * @method formatTime
 * @params {Date} data 日期对象
 * @return {String}
 */
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

/**
 * 基于微信的ajax请求
 * @method ajax
 * @params {Object} obj 请求配置
 * @return {Promise}
 */
const ajax = obj => {
  let _success = obj.success;
  delete obj.success;

  let session_id = wx.getStorageSync('PHPSESSID') || '';

  let header = typeof obj.header == 'undefined' ? {} : obj.header;
  if (session_id != "" && session_id != null) {
    header.Cookie = 'PHPSESSID=' + session_id;
  }

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
  };

  return new Promise((resolve, reject) => {
    wx.request(Object.assign({}, {
      success: function (response) {
        _success(response)
        resolve(response.data, response)
      },
      fail: function (err) {
        reject(err.errMsg, err)
        console.log('fail', err.errMsg)
      }
    }, obj));
  });
}

/**
 * 基于微信的get请求
 * @method _get
 * @params {String} url 开发者服务器接口地址
 * @params {Object} obj 请求的参数
 * @params {Function} callback 成功的回调函数
 * @return {Promise}
 */
const _get = (url, obj, callback) => {
  return ajax({
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
          title: res.title
        });
      }
      callback && callback(res);
    }
  })
}

/**
 * 基于微信的post请求
 * @method _post
 * @params {String} url 开发者服务器接口地址
 * @params {Object} obj 请求的参数
 * @params {Function} callback 成功的回调函数
 * @return {Promise}
 */
const _post = (url, obj, callback) => {
  return ajax({
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

module.exports = {
  ajax: ajax,
  _get: _get,
  _post: _post,
  formatTime: formatTime,
}
