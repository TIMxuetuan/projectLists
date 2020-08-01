/*
 * 全局通用方法
*/
import {util} from './util.js';

let methodsBase = {
	_getApp(key=''){
		let globalData = uni.getStorageSync('globalData')?JSON.parse(uni.getStorageSync('globalData')):{key:null};
		let obj = util.extend(true,this._app,globalData);

		if(key && typeof obj[key] == 'undefined'){
			return null
		}
		return key?obj[key]:obj;
	},
	_setApp(obj){
		uni.setStorageSync('globalData',JSON.stringify(obj));
		this._app = util.extend(true,this._app,obj);
	},
	AUTH(key){
		let userInfo = this._getApp('userInfo');
		let map = {
			isUploader:userInfo.m_usertype-0>=9, 	//是发布员   	只能创建
			isDirector:userInfo.m_usertype-0==10, 	//是主管			具有该部门所有权限
			isGuest:userInfo.m_usertype-0<5,		//是普通用户 	只能查看
			isAdmin:userInfo.role>=2,				//是企业管理员  	具有 /boss/api 下的操作
			isSuperAdmin:userInfo.role==3,			//是系统管理员  	内置系统管理员特殊情况会用到
			isHR:userInfo.m_s_id==2					,//是人力资源账号 发布公告与设置考勤
			isOperate:userInfo.m_s_id==3,	 		//是运营部权限   
		}
		console.log('AUTH',map[key]);
		return map[key]
	},
	_btnLoading(type=true){
		this.btnLoading = type,
		this.btnDisabled = type
	},
	toast(text, duration, success) {
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	constNum() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android" ? 300 : 0;
	},
	px(num) {
		return uni.upx2px(num) + 'px';
	},
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
	},
	jumpTo(path='',type='navigateTo'){
		uni[type]({
		    url: path
		});
	},
	_jump(e){
		let _data = e.currentTarget.dataset;
		console.log('_jump',_data)
		let type= typeof _data.type=="undefined" ? 'navigateTo' : _data.type;
		uni[type]({
		    url: _data.url.indexOf('/pages/')>-1?_data.url:'/pages/'+_data.url
		});
	},
	chooseDepartment(){
		this.drawerShow = !this.drawerShow;
		return false
	},
	//tree搜索的 @searchSubmit
	searchSubmitTree(value){
		this.filterText = value;
	},
	//tree搜索的 @searchCancel
	searchCancelTree(){
		this.filterText = '';
	},
	/*
	*判断传入的节点是不是选中节点的子节点  不要删，树搜索要用
	* 比较坑爹 tree filterNode 其中的 this 是 tree 的 Node 对象
	* 要再 vue 的方法前面 声明这个方法
	* 把 tree 对象赋值到全局 $tree = this.$refs.tree; 
	*/ 
	checkBelongToChooseNode(value, data, node,$tree){
		//console.log('checkBelongToChooseNode',value, data, node,$tree)
		const level = node.level;
		// 如果传入的节点本身就是一级节点就不用校验了
		if (level === 1) {
			return false;
		}
		// 先取当前节点的父节点
		let parentData = $tree.getNode(node.parentId);

		// 遍历当前节点的父节点
		let index = 0;
		while (index < level - 1) {
			// 如果匹配到直接返回
			if(typeof parentData=='undefined'||typeof parentData.data=='undefined'){
				return false
			}
			if (parentData.data.title.indexOf(value) !== -1) {
				return true;
			}
			// 否则的话再往上一层做匹配
			parentData = parentData.parentNode;
			index++;
		}
		// 没匹配到返回false
		return false;
	},
	//上传文件的删除 全局
	uf_del(item,type){
		uni.showModal({
		    title: '删除提示',
		    content: '确定要删除吗？',
		    success:(res)=>{
		        if (res.confirm) {
		            if(type=='images'){
		            	this.uf_delImages(item,type);
		            }else{
		            	this.uf_delFiles(item,type);
		            }
		        } else if (res.cancel) {
		            
		        }
		    }
		});
	},
	// 文件下载打开
	uf_down(src) {
		let that = this;
		let filepath = this._config.host + src;
		console.log('filepath', filepath);
		uni.downloadFile({
			url: filepath, //仅为示例，并非真实的资源
			success: ({
				statusCode,
				tempFilePath
			}) => {
				console.log('downloadFile', statusCode)
				//statusCode状态为200表示请求成功，tempFilePath 临时路径
				if (statusCode == 200) {
					//保存到本地
					console.log('temfile', tempFilePath)
					uni.saveFile({
						tempFilePath,
						success: (res) => {
							//res.savedFilePath文件的保存路径
							//保存成功并打开文件 内部存储Androiddataio.dcloud.HBuilderappsHBuilderdocuniapp_save
							console.log('savedFilePath', res.savedFilePath)
							uni.showToast({
								title: `文件路径 ${res.savedFilePath}`,
								icon:'none',
								position:'bottom',
								duration:3000
							});
	
							//预览
							this.uf_review(res.savedFilePath)
	
						},
						fail: () => console.log('下载失败')
					})
					fail: () => console.log('下载失败')
				}
			},
			fail: ((e) => {
				console.log('downloadFile-fail', e);
			})
		})
	},
	uf_review(file){
		// 获取文件扩展名
		const extension = file.substring(file.lastIndexOf('.'),file.length).toLowerCase();
		const documents = ['.doc','.xls','.ppt','.pdf','.docx','.pptx','.xlsx'];
		const imgs = ['.png','.jpg','.gif'];
		if(documents.includes(extension)){
			uni.downloadFile({
			  url: file,
			  success: function (res) {
			    let filePath = res.tempFilePath;
			    uni.openDocument({
			      filePath: filePath,
			      success: function (res) {
			        console.log('打开文档成功');
			      }
			    });
			  }
			});
		}else if(imgs.includes(extension)){
			uni.previewImage({
				current:file,
				urls:[file]
			});
		}else{
			uni.showToast({
				title:'暂时无法打开此类型文件',
				icon:'none',
				duration:2000
			})
		}
	},
	uf_delImages(item){
		let index = this.images.findIndex((value,index)=>{
			return value==item;
		});
		let file = this.images[index];
		console.log('delImages',item,index)
		
		this.images.splice(index,1);
		
		this.uf_del_sucess();
		//this.uf_delServerFile(file)
	},
	uf_delFiles(item){
		console.log(item);
		let index = this.files.findIndex((value,index)=>{
			return value.src==item.src;
		});			
		let file = this.files[index]['src'];
		this.files.splice(index,1);
		//this.uf_delServerFile(file)
	},
	uf_delServerFile(file){
		let file_host = this.uploadTo;
		appServices.delFile({file:file,file_host:file_host}).then(res=>{
			
		})
	},
	uf_del_sucess(){
		//自行实现
	},
	//这个获取方法 依赖于 树组件 的 方法和这个系统里的特殊情况而定，并不是通用的
	getTreeIdFn(id_type='uid'){
		let ids = this.$refs.tree.getCheckedKeys();
		let _ids = [];
		ids.forEach((value,index)=>{
			let _id_split = value.split('');
			let first_character = _id_split.shift();
			if(id_type=='uid'){
				if(first_character=='N'){
					_ids.push(_id_split.join(''));
				}
			}else{
				if(first_character=='B'){
					_ids.push(_id_split.join(''));
				}
			}
		});
		
		console.log('_ids',_ids);
		return _ids;
	},
	_getTreeSids(){
		return this.getTreeIdFn('sid')
	},
	_getTreeUids(){
		return this.getTreeIdFn('uid')
	},
	_getTreeUserField(field){
		let nodes = this.$refs.tree.getCheckedNodes();
		let temp = [];
		nodes.forEach((value,index)=>{
			if(value['item_type']=='user'){
				temp.push(value[field]);
			}
		});
		return temp;
	},
	_toFixed(number_value,digits=2){
		return util._toFixed(number_value,digits=2);
	},
	//消息提示窗
	toast(title,config){
		let _config = Object.assign({
			title: title,
			icon: 'none',
			duration: 2000
		},config);
		uni.showToast(_config);
	},
	show_toast(title,config) {
		this.toast(title,config);
	},
	toastSuccess(title,config){
		let _config = Object.assign({
			title: title,
			icon: 'success',
			duration: 2000
		},config);
		uni.showToast(_config);
	},
	_sleep(delay){
		return new Promise((resolve, reject) => {
			setTimeout(function(){
				resolve()
			},delay)
		});
	}
}

export {
	methodsBase,
	util
}