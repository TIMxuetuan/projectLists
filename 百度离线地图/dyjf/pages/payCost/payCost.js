// pages/payCost/payCost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'选择日期',
    formData:{},
    error:'',
    rules: [{
      name: 'date',
      rules: {required: true, message: '缴费月份必须填写'},
      }, {
      name: 'salary',
      rules: {required: true, message: '最近工资不能为空'},
    },{
      name:'money',
      rules:{required: true, message:'缴费金额不能为空'}
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //日期更改
  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value,
        [`formData.date`]: e.detail.value
    })
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
              this.setData({
                  error: errors[firstError[0]].message
              })
            }
        } else {
            wx.showToast({
                title: '校验通过'
            })
        }
    })
}

})