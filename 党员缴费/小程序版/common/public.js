/*
 * 公用的
 */
const _CONFIG = require('../config')
const util = require('../utils/util.js')

const app = getApp();

let _data = {
  showPop: false,
  showNoData: false,
  listServices: null,
  listData: [],
  page: 1,
  pageSize: 10,
  pageCount: 1,
  currentPage: 1,
  loadingPages: true,
  loadMoreLoading: true,
  dataInit: true,
  pageEnd: false,
  hoverClass: 'hover-class'
}

let _methods = {
  _init() {
    this.setData({
      sysInfo: wx.getStorageSync('sysInfo')
    })
  },
  bindKeyInput(e) {
    console.log(e)
    //注意：input 必须要有 id id的值和
    this.setData({
      [e.currentTarget.id]: e.detail.value
    })
  },
  //针对 data 中的 对象数据更新，对象中的数据无法直接更新，只能更新整个对象
  _upObjData(target_obj_name = '', item_obj = {}) {
    let _new_obj = {};
    let join_obj = Object.assign({}, this.data[target_obj_name], item_obj);
    //_new_obj[target_obj_name] = _new_obj;
    this.setData({
      [target_obj_name]: join_obj
    })
  },

  /*
  route 为数字或者字符串 
  route: -1 取上一页对象, _getPageObj(-1)
  字符串传页面路径 pages/index/index 不带 / _getPageObj('pages/index/index')
  */
  _getPageObj(route) {
    let pageObj = null;
    //getCurrentPages微信内置方法
    let pages = getCurrentPages();

    if (isNaN(parseInt(route, 10))) {
      //route 是字符串
      let _index = pages.findIndex(item => {
        return item.route == route
      });

      pageObj = _index > -1 ? pages[_index] : null;
    } else {
      //route 数字
      pageObj = pages[pages.length + (route - 1)];  //上一个页面
      console.log(pages.length, route, 1, pages.length + (route - 1));
    }

    return pageObj;
  },
  getHoroscope(date) {
    let cur_m = util._formatTime(date, 'MM');
    let cur_d = util._formatTime(date, 'DD');
    //let shoroscope_string = "摩羯20 水瓶19 双鱼21 白羊21  金牛21 双子22 巨蟹23 狮子23 处女23 天秤24 天蝎23 射手22 摩羯"; 对比用

    let shoroscope_string = "摩羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯";
    let shoroscope_day = [20, 19, 21, 21, 21, 22, 23, 23, 23, 24, 23, 22];
    let horoscope_zh = shoroscope_string.substr(cur_m * 2 - (cur_d < shoroscope_day[cur_m - 1] ? 2 : 0), 2);

    let data_horoscope = this.data.horoscope;
    let _horoscope = this.data.horoscope.find((value, index, arr) => {
      return value['name'] == horoscope_zh + '座'
    });

    console.log('_horoscope', horoscope_zh, _horoscope);

    return _horoscope;
  },
  getList(service_url, data={}, onSuccess) {
    if (this.data.pageEnd) {
      return
    }

    let page = this.data.currentPage + 1;
    this.setData({
      loadingPages: true,
      loadMoreLoading: true
    })
    //发起网络请求
    return util._get(service_url, data)
      .then(res => {
        let _list = res.data.data;
        if (this.data.currentPage > 1) {
          _list = _list.concat(this.data.list);
        }

        this.setData({
          curClass: res.class,
          count: res.data.count,
          pageCount: Math.ceil(res.count / this.data.pageSize),
          currentPage: page,
          list: _list,
          subtopic: res.subtopic,
          loadingPages: false,
          loadMoreLoading: false
        });

        if (this.data.pageCount <= this.data.currentPage - 1) {
          this.setData({
            pageEnd: true
          });
        }

        if (!this.data.pClass) {
          if (res.class) {
            this.setData({
              pClass: res.class
            });
          }
        }
        /*
                if (!this.data.subtopic.length) {
                  if (res.subtopic) {
                    this.setData({
                      subtopic: res.subtopic
                    });
                  }
                }
        */
      })
  },
  _getList (service_url, data = {}) {
    if (this.data.pageEnd) {
      return
    }

    let page = this.data.currentPage + 1;
    this.setData({
      loadingPages: true,
      loadMoreLoading: true
    })
    //发起网络请求
    return util._get(service_url, data)
      .then(res => {
        let _list = res.data;
        if (this.data.currentPage > 1) {
          _list = _list.concat(this.data.list);
        }

        this.setData({
          count: res.count,
          pageCount: Math.ceil(res.count / this.data.pageSize),
          currentPage: page,
          list: _list,
          loadingPages: false,
          loadMoreLoading: false
        });

        if (this.data.pageCount <= this.data.currentPage - 1) {
          this.setData({
            pageEnd: true
          });
        }

        return res;
      });
  },
  // 上拉加载更多
  loadMore: function() {
    if (this.data.currentPage >= this.data.pageNum) {
      this.setData({
        pageEnd: true
      })
      return
    }
    if (!this.data.loadingPages) {
      //这个方法来自于 儿子
      this.queryData();
    }
  },
  // 上传文件 
  async uploadFile(chooseConfig, uploadConfig) {
    let _chooseConfig = Object.assign({}, {
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {}
    }, chooseConfig);


    let chooseImageRes = await util._promise(wx.chooseImage)(_chooseConfig).catch(error => {
      console.log('chooseImageRes-error', error);
    });

    if (typeof chooseImageRes == 'undefined') {
      return '';
    }

    let tempFilePaths = chooseImageRes.tempFilePaths;
    let _uploadConfig = Object.assign({}, {
      url: _CONFIG.host + "/plug-in/action_webuploader/fileupload2.php",
      filePath: tempFilePaths[0],
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        "uploadTo": "ali"
      },
      success(res) {},
      fail(e) {

      }
    }, uploadConfig)

    console.log('chooseImageRes', chooseImageRes);

    // let uploadFileRes = await util._promise(wx.uploadFile)(_uploadConfig);

    return
  },
  /**
   * 下载文件并预览
   */
  downloadPreview(type, url) {
    wx.downloadFile({
      url: url,
      header: {},
      success: function(res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.openDocument({
          filePath: filePath,
          success: function(res) {
            console.log('打开文档成功')
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {
            console.log(res);
          }
        })
      },
      fail: function(res) {
        console.log('文件下载失败');
      },
      complete: function(res) {},
    })
  },
  logout(e) {
    let role = e.currentTarget.dataset['role'];
    let url = role == 2 ? `${_CONFIG.host}/boss/api.php?url=admin/logout` : `${_CONFIG.host}/member/api.php?url=me/logout`;
    console.log(role);
    util._get(url)
      .then(res => {
        wx.setStorageSync('m_userInfo', {
          "m_id": "",
          "m_role": ""
        });
        wx.setStorageSync('userInfo', {
          "m_id": "",
          "m_role": ""
        });
        wx.redirectTo({
          url: '/pages/m_login/m_login'
        })
      })
  },

  authentication(pagePath = '') {
    if (!app.globalData.userInfo.m_uid) {
      wx.navigateTo({
        url: `/pages/authentication/authentication?from=${pagePath}`
      });
    }
    return !!app.globalData.userInfo.m_uid;
  },
  /*
   获取个地址不容易呀，注意授权操作必须在 进入页面之前用按钮触发授权
   this._getSetting().then(res=>{
     
    })

    this._getLocation().then(res=>{
      console.log('_getLocation',res)
    })
  */
  _getSetting() {
    return new Promise((resolve, reject) => {

      wx.getSetting({
        success(res) {
          // 1. scope.userLocation 为真， 代表用户已经授权
          console.log('getSetting', res, res.authSetting["scope.userLocation"]);
          if (res.authSetting["scope.userLocation"] || typeof res.authSetting["scope.userLocation"] == 'undefined') {
            console.log('getSetting:ok', res);
            //that.getLocationWx();
            resolve(res);
          } else {
            console.log('openSetting');
            wx.showToast({
              title: '用户没有授权获取地理信息',
            });
            // 2. 用户未授权的情况下， 打开授权界面， 引导用户授权.
            wx.openSetting({
              success(res) {
                console.log('openSetting', res);
                // 2.1 如果二次授权允许了 userLocation 权限， 就再次执行获取位置的接口
                if (res.authSetting["scope.userLocation"]) {
                  //that.getLocationWx();
                  resolve(res);
                }
              }
            })
          }
        }
      })

    })
  },
  _getLocation(isGetAddress=0) {
    let that = this;
    return new Promise((resolve, reject) => {
      // 1.1 使用 getlocation 获取用户 经纬度位置
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          // 1.2 获取用户位置成功后，将会返回 latitude, longitude 两个字段，代表用户的经纬度位置
          console.log(res)
          let latitude = res.latitude;
          let longitude = res.longitude;

          // 1.3 将获取到的 经纬度传值给 getAddress 解析出 具体的地址
          if (isGetAddress){
            that.getAddress(latitude, longitude, (res) => {
              let result = res.data;
              resolve({ latitude: latitude, longitude: longitude, address_info: result })
            })
          }else{
            resolve({ latitude: latitude, longitude: longitude})
          }
          
        },
        fail(res) {
          console.log('fail', res)
          wx.showModal({
            title: '错误提示',
            content: '定位信息获取失败，检查 GPS 是否开启',
          });

          reject(res)
        },
        complete(res) {
          console.log('complete', res)
        }
      })

    });
  },
  getAddress(latitude, longitude, callback) {
    util._get(_CONFIG.host + '/plug-in/getAddressQQ.php', {
        lat: latitude,
        lng: longitude
      })
      .then(res => {
        console.log('getAddress', res)
        callback && callback(res);
      })
  },
  //地图选择
  _chooseLocation(obj = { longitude: '', latitude:''}) {
    return new Promise((resolve, reject) => {

      wx.chooseLocation({
        longitude: obj.longitude,
        latitude: obj.latitude,
        success(res) {
          console.log('chooseLocation-success', res);
          resolve(res)
        },
        complete(res) {
          console.log('chooseLocation-complete', res);
        },
        fail(res) {
          console.log('chooseLocation-fail', res);
          reject(res)
        }
      });

    });
  },
  _jump(e) {
    let _data = e.currentTarget.dataset;
    console.log('_data', _data);
    let type = _data['type'] || 'navigateTo';
    let url = _data['url'] || '/pages/index/index';
    wx[type]({
      url: url
    });
  },
  authorizedLocationJump(e) {
    this._getSetting().then(res => {
      this._jump(e);
    });
  },
}

export {
  _CONFIG,
  _data,
  _methods,
  util
}