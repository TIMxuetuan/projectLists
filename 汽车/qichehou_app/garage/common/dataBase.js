/*
 * 全局通用 data
*/

let dataBase = {
	showNoData: false,
	lowerThreshold: 10, //距底部/右边多远时（单位px），触发 scrolltolower 事件
	locationInfo: '',
	coordinates: '',
	executor: '',
	userInfo:'',
	listServices: null,
	listData: [],
	page: 1,
	pageSize: 7,
	pageCount: 0,
	filterText: '', //tree 树搜索的时候用到
	hoverClass:'hover-class',
	drawerShow:false,
	pageWaitingLoading:false,
	btnLoading:false,
	btnDisabled:false
}

export {
	dataBase
}