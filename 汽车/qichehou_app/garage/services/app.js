import {util} from '../common/util.js'
import {_CONFIG} from '../config.js'
const Services = {
	//用户登录
	userLogin(data,callback=function(response){}) {
		// return util._post(`${config.host}/index.php?url=slide/index`,data)
		return util._post(`${_CONFIG.host}/gboss/o.php?url=login/login`, data,callback)
	},
	
	//用户注册
	userRegister(data,callback=function(response){}) {
		// return util._post(`${_CONFIG.host}/bboss/o.php?url=login/register`, data,callback)
		return util._post(`${_CONFIG.host}/gboss/o.php?url=login/register`, data,callback)
	},

	//获得验证码  
	getSendCode(data) {
		return util._post(`${_CONFIG.host}/publics/o.php?url=sms/send`, data)
	},

	//修改密码--测试接口
	forgetPassword(data) {
		return util._post(`${_CONFIG.host}/gboss/o.php?url=login/forget`, data)
	},
	
	//首页管理 - 获取分类
	homeTypeList(data){
		return util._get(`${_CONFIG.host}/gboss/api.php?url=home/type_list`, data)
	},
	
	//首页管理 - 获取推荐配件商品
	homeRecommend(data){
		return util._get(`${_CONFIG.host}/gboss/api.php?url=home/recommend`, data)
	}

}

module.exports = Services;
