/*
 * 公用的
 */
import {dataBase} from './dataBase.js';
import {methodsBase,util} from './methodsBase.js';
let _data = {
	...dataBase,
	
	
}

let _methods = {
	...methodsBase,
	//传输数据格式传化
		postApply(obj) {
		  let params = new URLSearchParams();
		  for (let key in obj) {
		    params.append(key, obj[key]);
		  }
		  return params;
		},
		
		addApply(obj) {
		  console.log(obj)
		  let params = new URLSearchParams();
		  for (let key in obj) {
		    params.append("fields[" + key + "]", obj[key]);
		  }
		  return params
		},
		
		//消息提示窗
		show_toast(datas) {
			uni.showToast({
				title: datas,
				icon: "none",
				duration: 2000
			});
		},
		
		//验证手机号
		checkPhone(phone) {
			if (!(/^1[3456789]\d{9}$/.test(phone))) {
				return false;
			} else {
				return true;
			}
		},
}

export {
	_data,
	_methods,
	util
}
