/*
 * 公用的
 */
let _data = {
	showNoData: false,
	lowerThreshold: 10, //距底部/右边多远时（单位px），触发 scrolltolower 事件
	locationInfo: '',
	userInfo: '',
	coordinates: '',
	executor: '',
	listServices: null,
	listData: [],
	page: 1,
	pageSize: 7,
	pageCount: 0,
	hoverClass:'hover-class'
}
let _methods = {
	getUserInfo() {
		let _userInfo = uni.getStorageSync('userInfo');
		if (_userInfo) {
			this.userInfo = JSON.parse(_userInfo)
		}
		return this.userInfo;
	},
	getUuid() {
		//测试的 IMEI  3282284254@qq.com  #Zz123456
		let _imei = this._config.debug ? '94a480c60da3817' : '';
		//#ifdef APP-PLUS  
		let _imei_array = (plus.device.imei).split(','); //如果多卡，会有多个出现，取第一个
		_imei = _imei_array[0];
		this.IMEI = _imei;
		//#endif

		return _imei;
	},
	getLocationInfo() {
		let _locationInfo = uni.getStorageSync('locationInfo');
		if (_locationInfo) {
			this.locationInfo = JSON.parse(_locationInfo)
		}
		return this.locationInfo;
	},
	resetPageParameters() {
		this.pageLoadingShow = true;
		this.loadMoreLoadingShow = false;
		this.loadMoreLoading = false;
		this.showNoMoreData = false;
		this.showNoData = false;
		this.listData = [];
		this.page = 1;
		this.pageSize = 7;
		this.pageCount = 0;
	},
	inputValue(e) {
		this.val = e.detail.value
	}
}
module.exports = {
	_data: _data,
	_methods: _methods
}
