const config = require('../config');

let _promise = function (api) {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, { success: resolve, fail: reject }), ...params);
    });
  }
}

let ajax = function (obj) {
  let _success = obj.success;
  delete obj.success;

  let session_id = wx.getStorageSync('PHPSESSID') || '';

  let header = typeof obj.header == 'undefined' ? {} : obj.header;
  if (session_id != "" && session_id != null) {
    header.Cookie = 'PHPSESSID=' + session_id;
  }
  //header.appid = config.appid;
  //header.uid = wx.getStorageSync('openid') || '';
  //header.signature = wx.getStorageSync('signature') || '';
  //header.signaturetime = wx.getStorageSync('signaturetime') || '';
  obj.header = header;

  obj.complete = function (res) {
    if (res.statusCode == 401) {
      /*
      wx.setStorageSync('userinfo', '');
      wx.navigateTo({
        url: '../a_login/a_login'
      });
      */
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

let _get = function (url, obj, message='') {
  wx.showNavigationBarLoading()
  if (!message && typeof message === "string") {
    wx.showLoading({
      title: message,
    })
  }

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

      wx.hideNavigationBarLoading()
      if (!message && typeof message === "string") {
        wx.hideLoading()
      }
    }
  })
}

let _post = function (url, obj, message='') {
  wx.showNavigationBarLoading();
  if (!message && typeof message === "string"){
    wx.showLoading({
      title: message,
    })
  }

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
      wx.hideNavigationBarLoading()
      if (!message && typeof message === "string"){
        wx.hideLoading()
      }
    }
  })
}

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

const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return [year, month].map(formatNumber).join('-') 
}

const formatNumber2 = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//缴费记录--未缴月份和已缴数据合并
//进行未交数据计算拼接
const getMonth = (start, end,fakeLists) => {
  console.log(start, end,fakeLists)
    var result = [];
    var starts = start.split('-');
    var ends = end.split('-');
    var staYear = parseInt(starts[0]);
    var staMon = parseInt(starts[1])-1;
    var endYear = parseInt(ends[0]);
    var endMon = parseInt(ends[1]);
    while (staYear <= endYear) {
        if (staYear === endYear) {
            while (staMon < endMon) {
                staMon++;
                if(staMon<10){
                  staMon = '0' + staMon
                }
                result.push({payyear: staYear, paymonth: staMon,paidin:0});
            }
            staYear++;
        } else {
            staMon++;
            if (staMon > 12) {
                staMon = 1;
                staYear++;
            }
            if(staMon<10){
              staMon = '0' + staMon
            }
            result.push({payyear: staYear, paymonth: staMon,paidin:0});
        }
    }

    //循环遍历两个数组 找出相同年、月的数据，进行替换
    // var fakeLists = this.data.fakeLists
    for(let i in result){
      for(let j in fakeLists){
        if(fakeLists[j].payyear == result[i].payyear){
          if(fakeLists[j].paymonth == result[i].paymonth){
            result[i] = fakeLists[j]
          }
        }
      }
    }
    // this.setData({
    //   array:result
    // })
    return result;
}

module.exports = {
  ajax: ajax,
  _get: _get,
  _post: _post,
  formatTime: formatTime,
  formatTime2: formatTime2,
  getMonth:getMonth
}
