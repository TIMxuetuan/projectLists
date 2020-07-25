var config = require('../../config')
var util = require('../../utils/util.js')
const globalFn = require('../../lib/global.js')
Page({
  ...global,
  /**
   * 页面的初始数据
   */
  data: {
    typeArray: [
      { id: '父亲', name: '父亲' },
      { id: '母亲', name: '母亲' },
      { id: '哥哥未结婚', name: '哥哥未结婚' },
      { id: '姐姐未出嫁', name: '姐姐未出嫁' },
      { id: '弟弟未结婚', name: '弟弟未结婚' },
      { id: '妹妹未出嫁', name: '妹妹未出嫁' },
    ],
    model: {
      'pi_appellation_fm': '',
      'pi_fullName_fm': '',
      'pi_IDNumber_fm': '',
      'pi_unitPosition_fm': '',
      'index': 0
    },
    type: '',
    main: [],
    mainArray: [],
    fam_index:'',
    fam_name:'',
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      main: JSON.parse(options.main),
      id: options.index
    })
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
    var main = this.data.main;
    var id = this.data.id;
    if (main != []) {
      this.data.mainArray = this.data.mainArray.concat(main);
    }
    if (id != '') {
      this.getInfo();
    }
  },
  onSubmit: function () {

    var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!myreg.test(this.data.model.pi_IDNumber_fm)) {
      wx.showToast({
        title: "身份证号不正确",
        icon: 'none'
      });
      return
    }
    var id=this.data.id;
    var mainArray = this.data.mainArray;
    if (id == '') {
      let validation = this.validation();
      if (!validation.isOk) {
        wx.showToast({
          title: validation.msg,
          icon: 'none',
          duration: 1500
        });
        return
      }
    
    mainArray.push(this.data.model);

    for (var i = 0; i < mainArray.length; i++) {
      var _data = mainArray[i];
      _data['index'] = i + 1;
    }

    }
    let post_data = JSON.stringify(mainArray)
    util.showLoading({
      title: '保存中...',
      mask: true
    })
    if(this.data.id){
      util._post(config.service.upload, { field: 'familyMembership', info: post_data, }, (res) => {
        if (res.Flag) {
          util.hideLoading();
          wx.showToast({
            title: res.Content,
            icon: 'none',
            duration:2000,
          });
          util.hideLoading();
          setTimeout(function(){
            wx.navigateBack({ delta: 1 }) 
          },500)
        } else {
          wx.showToast({
            title: res.Content,
            icon: 'none'
          });
        }
      })
    }else{
      util._post(config.service.upload, { field: 'familyMembership', info: post_data, }, (res) => {
        if (res.Flag) {
          util.hideLoading();
          wx.showToast({
            title: res.Content,
            icon: 'none',
            duration:2000,
          });
          if (!id) {
            this.onSaveSuccess()
          }
        } else {
          wx.showToast({
            title: res.Content,
            icon: 'none'
          });
        }
      })
    }
    
  },
  getInfo() {
    var id = this.data.id;
    var model = this.data.main[id - 1];
    this.setData({
      model: model,
      fam_name: model.pi_appellation_fm
    })
  },
  onSaveSuccess() {
    wx.showModal({
      title: '是否继续添加？',
      //content:'是否继续添加',
      success: (res) => {
        if (res.confirm) {
          let _model = {
            'pi_appellation_fm': '',
            'pi_fullName_fm': '',
            'pi_IDNumber_fm': '',
            'pi_unitPosition_fm': '',
            'index': '',
          };
          let fam_index='',fam_name='';
          this.setData({
            model: _model,
            fam_index: fam_index,
            fam_name: fam_name,
          })
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
          // wx.redirectTo({
          //   url: '/pages/家庭成员情况/家庭成员情况'
          // })
        }
      }
    })
  },
  bindDateChange: function (e) {
    let _model = this.data.model;
    _model[e.currentTarget.dataset.field] = e.detail.value;
    this.setData({
      model: _model
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      [e.currentTarget.id]: e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
    })
  },
  validation() {
    let model = this.data.model;
    let isOk = { isOk: true, 'msg': '' };
    let array = [
      { field: 'pi_appellation_fm', reg: /^\s*$/g, msg: '称谓不能为空' },
      { field: 'pi_fullName_fm', reg: /^\s*$/g, msg: '姓名不能为空' },
      { field: 'pi_IDNumber_fm', reg: /^\s*$/g, msg: '身份证号不能为空' },
      { field: 'pi_unitPosition_fm', reg: /^\s*$/g, msg: '工作单位及职务不能为空' },
    ]

    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (item['reg'].test(model[item['field']])) {
        isOk = { isOk: false, 'msg': item.msg };;
        break;
      }
    }
    return isOk;
  },
  bindPickerChangeType(e) {
    console.log(e)
    let _model = this.data.model;
    let _value = this.data.typeArray[e.detail.value];
    _model.pi_appellation_fm = _value['id']
    console.log(_model.pi_appellation_fm)
    this.setData({
      model: _model,
      fam_index: e.detail.value,
      fam_name: _value['name']
    })
  },
})