import {DataValidation} from './dataValidation.js'
import {_CONFIG} from '../config.js'

let util = {};

util._V = function(data,rules){
	let dataValidation = new DataValidation();
	let v = dataValidation.validate(data, rules);
	console.log('v',v);
	if (!v.isOK) {
	  uni.showToast({ title: v.errorMsg, icon: 'none' });
	}
	return v.isOK;
}

util._promise = function(api) {
	return (options, ...params) => {
		return new Promise((resolve, reject) => {
			api(Object.assign({}, options, {
				success: resolve,
				fail: reject
			}), ...params);
		});
	}
}

util.ajax = function(obj) {
	let _success = obj.success;
	delete obj.success;

	let session_id = uni.getStorageSync('PHPSESSID') || '';

	let header = typeof obj.header == 'undefined' ? {} : obj.header;
	if (session_id != "" && session_id != null) {
		header.Cookie = 'PHPSESSID=' + session_id;
	}
	
	//token
	header.Authorization = uni.getStorageSync('token')||0;
	
	//header.appid = config.appid;
	//header.uid = wx.getStorageSync('openid') || '';
	//header.signature = wx.getStorageSync('signature') || '';
	//header.signaturetime = wx.getStorageSync('signaturetime') || '';
	obj.header = header;

	obj.complete = function(res) {
		if (res.statusCode == 401) {
			uni.setStorageSync('token', '');
			uni.navigateTo({
			  url: '../login/login'
			});
		}

		if (typeof res.data == 'string' && res.data.indexOf('Warning') > 0) {
			if (_CONFIG.debug) {
				uni.showToast({
					title: res.data,
					icon: 'none',
					duration: 2000
				});
			}
		}
	};

	return new Promise((resolve, reject) => {
		uni.request(Object.assign({}, {
			success: function(response) {
				_success(response)
				resolve(response.data, response)
			},
			fail: function(err) {
				reject(err.errMsg, err)
				console.log('fail', err.errMsg)
			}
		}, obj));
	});
}

util._get = function(url, obj,callback) {
	// uni.showNavigationBarLoading()

	return util.ajax({
		method: 'GET',
		header: {
			'cache-control': 'no-cache'
		},
		url: url,
		data: obj,
		dataType: 'json',
		success: function(response) {
			let res = response.data;
			if (res.title && typeof res.title != 'undefined') {
				uni.setNavigationBarTitle({
					title: res.title
				});
			}
			
			callback&&callback(res,response);
			// uni.hideNavigationBarLoading()
		}
	})
}

util._post = function(url, obj, callback) {
	// uni.showNavigationBarLoading();

	return util.ajax({
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded',
			// 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'cache-control': 'no-cache'
		},
		url: url,
		data: obj,
		dataType: 'json',
		success: function(response) {
			let res = response.data;
			// uni.hideNavigationBarLoading()
			callback&&callback(res,response);
		}
	})
}


export {
	util
}