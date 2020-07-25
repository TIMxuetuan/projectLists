import _CONFIG from '../config.js'
import uniRequest from '../node_modules/uni-request/index.js';
uniRequest.defaults.headers.patch['Content-Type'] = 'application/json';
let util = {
	isFunction: function(obj) {
		return Object.prototype.toString.call(obj) === "[object Function]"
	},
	isArray: function(obj) {
		//return object && typeof object==='object' && Array == object.constructor;
		return Object.prototype.toString.call(obj) === "[object Array]";
	},
	isObject: function(obj) {
		return Object.prototype.toString.call(obj) === "[object Object]";
	},
	//是纯粹的对象 下面的extend用到
	isPlainObject: function(obj) {
		if (obj && Object.prototype.toString.call(obj) === "[object Object]" && obj.constructor === Object && !
			hasOwnProperty.call(obj, "constructor")) {
			let key;
			for (key in obj) {}
			return key === undefined || hasOwnProperty.call(obj, key);
		}
		return false;
	},
	//extend（jquery 3.1.1），使用和jq一样 TOOLS.extend({},{}) 或者 TOOLS.extend(true,{},{})
	extend: function() {
		let options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !this.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (this.isPlainObject(copy) ||
							(copyIsArray = this.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && this.isArray(src) ? src : [];

						} else {
							clone = src && this.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = this.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	}
};

util.ajax = function(config) {
	if (config['url'].indexOf('//') == -1) {
		config['url'] = _CONFIG.api_path + config['url'];
	}

	//统一替换部分信息
	let _userInfo = uni.getStorageSync('userInfo');
	if (_userInfo) {
		_userInfo = JSON.parse(_userInfo);
		config['url'] = config['url'].replace(/{Key}/gi, _userInfo.Key);
		config['url'] = config['url'].replace(/{Id}/gi, _userInfo.Id);
		config['url'] = config['url'].replace(/{uid}/gi, _userInfo.Id);
	}

	let _ajax = new Promise(function(resolve, reject) {
		//做一些异步操作
		// uni.showLoading({
		// 	title: '请稍后...',
		// 	mask: true
		// })
		uni.request(Object.assign({
			method: 'GET',
			url: '',
			data: {},
			success: (response) => {
				// console.log('response', response)
				// uni.hideLoading()
				if (response.statusCode == 401) {
					uni.setStorageSync('userInfo', '');
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
				resolve(response.data, response);
			},
			fail: (a) => {
				reject(a)
			}
		}, config))
	});
	return _ajax;
}

util.get = function(url, data, config) {
	let _config = Object.assign({
			method: 'GET',
			url: url,
			data: data || {},
		},
		config
	);
	return this.ajax(_config)
}

util.post = function(url, data, config) {
	let _config = Object.assign({
			method: 'POST',
			url: url,
			data: data || {}
		},
		config
	);
	return this.ajax(_config)
}

util.put = function(url, data, config) {
	let _config = Object.assign({
			method: 'put',
			url: url,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json"
		},
		config
	);
	return this.ajax(_config)
}

// patch请求  app上可以用
util.patch = function(url, data, config) {
	if (url.indexOf('//') == -1) {
		url = _CONFIG.api_path + url;
	}
	
	//统一替换部分信息
	let _userInfo = uni.getStorageSync('userInfo');
	if (_userInfo) {
		_userInfo = JSON.parse(_userInfo);
		url = url.replace(/{Key}/gi, _userInfo.Key);
		url = url.replace(/{Id}/gi, _userInfo.Id);
		url = url.replace(/{uid}/gi, _userInfo.Id);
	}
	
	return uniRequest.patch(url,data,config);
}
util.del = function(url, data, config) {
	let _config = Object.assign({
			method: 'DELETE',
			url: url,
			data: data || {}
		},
		config
	);
	return this.ajax(_config)
}

util.date2timeStamp = function(date) {
	var t = date || "2019-03-22 15:54:30"; // 月、日、时、分、秒如果不满两位数可不带0.
	var T = new Date(t); // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
	return T.getTime() // 将转换后的标准日期转换为时间戳。
}

util.formatLocation = function(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

util.date2timeStamp = function(date){
	var t = date||"2019-03-22 15:54:30";  // 月、日、时、分、秒如果不满两位数可不带0.
    var T = new Date(t);  	// 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
    return T.getTime()  	// 将转换后的标准日期转换为时间戳。
}

// 参数number为毫秒时间戳，format为需要转换成的日期格式
util.formatTime = function(number, format) {
    let time = new Date(number)
    let newArr = []
    let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
	
	// 格式化日期，如月、日、时、分、秒保证为2位数
	let formatNumber = function(n){
		n = n.toString()
		return n[1] ? n : '0' + n;
	}
	
    newArr.push(time.getFullYear())
    newArr.push(formatNumber(time.getMonth() + 1))
    newArr.push(formatNumber(time.getDate()))

    newArr.push(formatNumber(time.getHours()))
    newArr.push(formatNumber(time.getMinutes()))
    newArr.push(formatNumber(time.getSeconds()))

    for (let i in newArr) {
        format = format.replace(formatArr[i], newArr[i])
    }
    return format;
}
util.getDate = function(type) {
	const date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}

util.dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};
util.downloadFile = function(url) {
	uni.showLoading({
		title: '请稍后...',
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: url, //仅为示例，并非真实的资源
			success: (res) => {
				uni.hideLoading()
				uni.saveFile({
					tempFilePath: res.tempFilePath,
					success: function(res) {
						var savedFilePath = res.savedFilePath;
						resolve(savedFilePath)
					}
				})
			},
			fail(res) {
				reject(res)
			}
		})
	})

}

module.exports = util
