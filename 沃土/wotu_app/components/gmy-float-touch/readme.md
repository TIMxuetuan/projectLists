#  仿苹果悬浮按钮
## 只需再页面中调用插件，在监听menuClick事件即可，该事件返回五个小按钮的索引从上往下索引一次是1，2，3，4，5。具体事件由用户根据索引自定义
## 如果需要使用图标请在使用时传入,数据说明
* mainImg:主图标，不可隐藏，图片单独设置。
* imgLists:弹出菜单图标，共5个菜单，故需5个图标，以数组形式设置

### 使用
    * import gmyFloatTouch from "../../../components/gmy-float-touch/gmy-float-touch.vue"                                          //引用
	* <gmy-float-touch :imgLists="imgLists" :mainImg="mainImg" @menuClick="floatTouchClick"></gmy-float-touch>                     //页面使用
	* floatTouchClick:function(e){                                                                                                 //事件
		console.log(e);
	},
	* mainImg:"../../static/main.png",                                                                                             //数据格式
	  imgLists:["../../static/home.png","../../static/approve.png","../../static/match.png","../../static/send.png","../../static/return.png"],