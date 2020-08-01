import {util} from '../common/util.js'
import {_CONFIG} from '../config.js'
let api = `${_CONFIG.host}/lboss/api.php?url=`;
let api_o = `${_CONFIG.host}/lboss/o.php?url=`;

const Services = {
	get_openid(data) {
	  return util._get(`${_CONFIG.host}/publics/get_openid.php`, data)
	},
	//获得验证码
	getSendCode(data) {
		return util._post(`${_CONFIG.host}/publics/o.php?url=sms/send`, data)
	},
	
	//用户登录
	userLogin(data,callback=function(response){}) {
		return util._post(`${api_o}login/login`, data,callback)
	},
	
	//用户注册
	userRegister(data,callback=function(response){}) {
		return util._post(`${api_o}login/register`, data,callback)
	},
	
	//忘记密码
	forgetPassword(data) {
		return util._post(`${api_o}member/forgetPassword`, data)
	},
	
	//修改密码
	editPassword(data) {
		return util._post(`${api}member/changePassword`, data)
	},
	//绑定手机号
	bindPhone(data) {
		return util._post(`${api}member/bindPhone`, data)
	},
	//退出登录
	userLogout(data) {
		return util._post(`${api}login/logout`, data)
	},	
	//认证信息
	authInfo(data){
		return util._post(`${api}login/certificationInfo`, data)
	},
	addDeposit(data){
		return util._post(`${api}login/deposit`, data)
	}
}

module.exports = Services;
