import {
	util
} from '../common/util.js'
import {
	_CONFIG
} from '../config.js'
const productServices = {

	//分类管理 - 获取商品列表
	classifyGoods(data) {
		return util._get(`${_CONFIG.host}/gboss/api.php?url=classify/classify_goods`, data)
	},

	//获取商品详情
	classifyGoodsDetail(data) {
		return util._get(`${_CONFIG.host}/gboss/api.php?url=classify/goods_detail`, data)
	},

	//获取汽车品牌列表
	classifyCarBrandList(data) {
		return util._get(`${_CONFIG.host}/publics/api.php?url=classify/car_brand_list`, data)
	},
	
	//获取配件品牌列表
	classifyPartsBrandList(data) {
		return util._get(`${_CONFIG.host}/publics/api.php?url=classify/parts_brand_list`, data)
	},
	
	//获取配件分类列表
	classifyClassifyList(data) {
		return util._get(`${_CONFIG.host}/gboss/api.php?url=classify/classify_list`, data)
	},
	
	//添加购物车
	shopAdd(data) {
		return util._post(`${_CONFIG.host}/gboss/api.php?url=shop/add`, data)
	},
	
	//获取购物车列表
	getShopList(data) {
		return util._get(`${_CONFIG.host}/gboss/api.php?url=shop/shop_list`, data)
	},

}

module.exports = productServices;
