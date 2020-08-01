import {util} from '../common/util.js'
import {_CONFIG} from '../config.js'
const Services = {
	//用户登录
	userLogin(data,callback=null) {
		return util._post(`${_CONFIG.host}/bboss/o.php?url=login/login`, data,callback)
	},
	//用户注册
	
	register(data) {
		return util._post(`${_CONFIG.host}/bboss/o.php?url=login/register`, data)
	},
	//获得验证码
	getSendCode(data) {
		return util._post(`${_CONFIG.host}/publics/o.php?url=sms/send`, data)
	},
	
	get_openid(data) {
		return util._get(`${_CONFIG.host}/publics/get_openid.php`, data)
	},
	//订单信息
	getOrder(data) {
		return util._get(`${_CONFIG.host}/bboss/api.php?url=order/index`, data)
	},
	
	// 商家基本信息
	gte_businessInfo(data) {
		return util._get(`${_CONFIG.host}/bboss/api.php?url=my/getBusinessInfo`)
	},
	
	// 商家认证
	post_goods_authentication(data) {
		return util._post(`${_CONFIG.host}/bboss/api.php?url=my/certification`, data)
	},
	
	// 店铺信息设置
	post_set_shopInfo(data) {
		if(data==undefined){
			return util._post(`${_CONFIG.host}/bboss/api.php?url=my/setShopInfo`)
		}else{
			return util._post(`${_CONFIG.host}/bboss/api.php?url=my/setShopInfo`, data)
		}
	},
	
	// 获取运费模板列表
	post_freight_index(data) {
		return util._post(`${_CONFIG.host}/bboss/api.php?url=freight/index`)
	},
	// 添加运费模板
	post_freight_insert(data) {
		console.log("shuju")
		console.log(data)
		return util._post(`${_CONFIG.host}/bboss/api.php?url=freight/insert`,data)
	},
	// 获取汽车品牌列表
	get_car_brand_list(data) {
		return util._get(`${_CONFIG.host}/publics/api.php?url=classify/car_brand_list`)
	},
	// 获取配件分类列表
	get_cclassify_list(data) {
		return util._get(`${_CONFIG.host}/publics/api.php?url=classify/classify_list`)
	},
	// 获取配件品牌列表
	get_parts_brand_list(data) {
		return util._get(`${_CONFIG.host}/publics/api.php?url=classify/parts_brand_list`)
	},
	// 添加商品
	add_goods(data) {
		console.log("添加的数据")
		console.log(data)
		return util._post(`${_CONFIG.host}/bboss/api.php?url=shop/insert`,data)
	},
}

module.exports = Services;
