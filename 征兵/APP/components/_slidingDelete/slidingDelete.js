//滑动打开
/*
调用：
<view>
  <slidingDelete
    wx:for="{{testData}}" wx:for-index="index" wx:for-item="item" wx:key='item.id'
    bindSdOpen="sdOpen"
    isTouchMove="{{item.isTouchMove}}" data-index="{{index}}">
    <view slot="content">{{item.content}}</view>
    <view slot="tools" data-index="{{index}}" bindtap=''>删除</view>
  </slidingDelete>
</view>
=====================
  //父页面中 绑定sdOpen
  sdOpen(e){
    let index = util._data(e,'index');
    let _testData = this.data.testData;
    for (let i = 0; i < _testData.length;i++){
      if (i == index){
        _testData[i]['isTouchMove'] = true;
      }else{
        _testData[i]['isTouchMove'] = false;
      }
    }
    this.setData({
      testData: _testData
    })
  }
*/


Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '提示'
    },
    isTouchMove:{
      type: Boolean,
      value: false
    }
  },
  data: {
    startX: 0, //开始坐标
    startY: 0,
  },
  methods: {
    //手指触摸动作开始 记录起点X坐标
    touchstart: function(e) {       
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY
      })
    },
    //滑动事件处理
    touchmove: function(e) {
      let startX = this.data.startX, //开始X坐标
        startY = this.data.startY, //开始Y坐标
        touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
        touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
        //获取滑动角度
        angle = this.angle({
          X: startX,
          Y: startY
        }, {
          X: touchMoveX,
          Y: touchMoveY
        });
        
      //滑动超过30度角 return
      if (Math.abs(angle) > 30){
         return
      }

      if (touchMoveX > startX){
        //右滑
        this.setData({
          isTouchMove: false
        });
      }else{
        //左滑
        this.setData({
          isTouchMove: true
        });
      }
    },
    touchend: function (e) {
      this.triggerEvent('SdOpen', e);
    },
    /**
     * 计算滑动角度
     * @param {Object} start 起点坐标
     * @param {Object} end 终点坐标
     */
    angle: function(start, end) {
      var _X = end.X - start.X,
        _Y = end.Y - start.Y
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    }
  }
})