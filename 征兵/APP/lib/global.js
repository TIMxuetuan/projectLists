var config = require('../config')
var util = require('../utils/util.js')
var myAjax = util.ajax;
var myAlert = util.myAlert;
module.exports = {
  onLaunchCallback: function (callback) {
    
    callback && callback();
  },
  getClass: function (service_url, obj, onSuccess) {
    let that = this;
    let page = this.data.currentPage + 1;
    that.setData({
      loadingPages: true,
      loadMoreLoading: true
    })
    //发起网络请求
    myAjax({
      url: config.service[service_url],
      data: obj,
      success: function (response) {
        let res = response.data;
        let _list = res.data;
        if (that.data.currentPage > 1) {
          _list = that.data.list.concat(_list);
        }
        
        that.setData({
          count: res.count,
          pageNum: Math.ceil(res.count / config.pageSize),
          currentPage: page,
          list: _list,
          loadingPages: false,
          loadMoreLoading: false
        });

      }
    })
  },
  getList: function (service_url,data,onSuccess) {
      let that = this;
      that.setData({
        loadingPages: that.data.currentPage==1?true:false,
        loadMoreLoading:true
      });

      //发起网络请求
      myAjax({
        url: config.service[service_url],
        data: data,
        success: function (response) {
          let res = response.data;
          let _list = res.model;

          let page = that.data.currentPage + 1;

          if (that.data.currentPage>1){
            _list = that.data.list.concat(_list);
          } 
  
          that.setData({
            curClass:res.class,
            count: res.count,
            pageNum: Math.ceil(res.count / config.pageSize),
            currentPage: page,
            list: _list,
            loadingPages: page == 1 ? true : false,
            loadMoreLoading:false,
            imageMode: typeof res.class.imageMode == 'undefined' ? 'aspectFill' : res.class.imageMode
          });

          if (that.data.currentPage > that.data.pageNum) {
            that.setData({
              pageEnd: true
            })
          }
          
          if (!that.data.pClass) {
            if (res.class) {
              that.setData({
                pClass: res.class
              });
            }
          }

          if (!that.data.subtopic.length) {
            if (res.otherList.subtopic) {
              that.setData({
                subtopic: res.otherList.subtopic
              });
            }
          }
         
          //面包屑导航  +' - '+ config.siteName
          let bread_crumbs = res.title||res.class['typename'];                                                                                                
          if (typeof res.class['p_class'] != "undefined"){
            if (typeof res.class['p_class']['typename'] != "undefined"){
              bread_crumbs += ' - '+res.class['p_class']['typename'];
            }
          }
          bread_crumbs += ' - ' + config.siteName;
          if (res.title !='undefined'){
            wx.setNavigationBarTitle({
              title: bread_crumbs
            });
          }

          onSuccess && onSuccess(res);
        }
      })
  },
  isLogin: function (callback) {
    let userInfo = wx.getStorageSync('userinfo');
    if (userInfo){
      callback && callback(JSON.parse(userInfo));
    }else{
      callback && callback({}, '');
    }
    
  },
  isLogin2:function(callback){
    let userInfo = wx.getStorageSync('userinfo');
    if (userInfo) {
      if (this.data.pageCount > 0) {
        this.data.pageCount--;
      }
      callback && callback(JSON.parse(userInfo));
    }else{
      if (this.data.pageCount > 0) {
        this.data.pageCount--;
        wx.switchTab({
          url: "/pages/index/index"
        })
      }else{
        this.data.pageCount++;
        wx.navigateTo({
          url: "/pages/login/login"
        })
      }
    }
  },
  testLogin(callback){
    let userInfo = wx.getStorageSync('userinfo');
    if (userInfo) {
      util._get(config.service.testLogin, {}, (res) => {
        if (res.Flag) {
          callback && callback.call(this,JSON.parse(userInfo));
        }
      })
    } else {
      this.notLoginJump()
    }
  },
  notLoginJump(){
    wx.setStorageSync('wxopenid', '');
    wx.setStorageSync('userinfo', '');
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  upFile(parameter={}){
    let data = parameter.data||{};
    let onComplete = parameter.onComplete||null;
    let callback = parameter.callback || null;
    let onChooseImage = parameter.onChooseImage || null;
    let session_id = wx.getStorageSync('PHPSESSID') || '';
    wx.chooseImage({
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths;
        onChooseImage(tempFilePaths);
        let tempFilesSize = res.tempFiles[0].size;
        console.log('tempFilesSize1', tempFilesSize);
        if (tempFilesSize <= 1000000) { 
          console.log('tempFilesSize2', tempFilesSize);
          wx.uploadFile({
            url: config.host + '/plug-in/action_webuploader/fileupload2.php?t='+new Date().getTime(), // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              appid: config.appid,
              uid: wx.getStorageSync('openid') || '',
              signature: wx.getStorageSync('signature') || '',
              signaturetime: wx.getStorageSync('signaturetime') || '',
              Cookie: 'PHPSESSID=' + session_id
            },
            formData: data,
            success(res) {
              console.log('upFile-success', res);
              let _data = res.data ? JSON.parse(res.data) : {'Flag':0,'Content':'上传失败，稍后重试'};
              callback && callback(_data, res);
            },
            complete(res) {
              console.log('upFile-complete', res);
              onComplete && onComplete(res)
            }
          }) 
        
      }else{    //图片大于1M，弹出一个提示框
        wx.showToast({
          title: '上传图片不能大于1M!',  //标题
          icon: 'none'       //图标 none不使用图标，详情看官方文档
        })
      }
        
      }
    })
  },
  // dataList: 数据数组, userLocation 定位数组: [latitude, longitude]
  calculationDistanceToList(dataList, userLocation) {
    let _list = dataList;
    for (let i = 0; i < _list.length; i++) {
      let item_location_array = _list[i]['location'] ? _list[i]['location'].split(',') : [0, 0];
      _list[i]['distance'] = (util._getDistance(userLocation[0], userLocation[1], item_location_array[0] - 0, item_location_array[1] - 0) / 1000).toFixed(2);
    }
    return _list;
  },
  bindKeyInput(e){
    this.setData({
      [e.currentTarget.id]: e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
    });
  },
  chaifen: function (str, main) {
    if (str != '') {
      var strarr = str.split("|");
      for (var i = 0; i < strarr.length; i++) {
        var stra = strarr[i].split("#");
        var chafen = {};
        for (var j = 0; j < stra.length; j++) {
          var dicArray = stra[j].split(":");
          chafen[dicArray[0]] = dicArray[1];
        }
        main.push(chafen);
      }
    }
    return main;
  },
}