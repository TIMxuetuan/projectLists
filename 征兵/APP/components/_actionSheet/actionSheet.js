//底部上拉层

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '提示'
    },
    contentHeight: {
      type: String,
      value: '460rpx'
    },
    footHeight:{
      type: String,
      value: '0rpx'
    },
    showFoot:{
      type: Boolean,
      value: false
    }
  },
  data: {
    isShow: false
  },
  methods: {
    open() {
      this.setData({
        isShow: true
      })
    },
    close(){
      this.setData({
        isShow: false
      })
    }
  }
})