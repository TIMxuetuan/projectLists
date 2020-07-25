// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rules: [{
      name: 'mobile',
      rules: [{ required: true, message: '手机号必填' }, { mobile: true, message: '手机号格式不对' }]
    }, {
      name: 'password',
      rules: [{ required: true, message: '密码不能为空' }]
    },{
      name:'agree',
      rules:{required:true, message:'请阅读相关条款，并选择同意'}
    }],
    isAgree:false,//是否同意条款
    formData:{},
    error:'',//表单错误信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // input改变
  formInputChange(e){
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  // checkbox 改变
  bindAgreeChange(e) {
    console.log(e)
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value[0] || '',
        isAgree: !!e.detail.value.length
    });
  },
  // 提交数据
  submitForm(e) {
    console.log(this.data.formData)
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
        // 校验通过 执行相应逻辑
        wx.showToast({
          title: '校验通过'
        })
        wx.reLaunch({
          url: '../index/index'
        })
      }
    })
  }


})