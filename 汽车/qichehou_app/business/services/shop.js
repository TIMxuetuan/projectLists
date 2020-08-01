import {util} from '../common/util.js'
import {_CONFIG} from '../config.js'
const Services_shop = {
	// 我的店铺
	get_my_show(data={}) {
		return util._get(`${_CONFIG.host}/bboss/api.php?url=shop/index`,data)
	},
	// 商品列表
	get_goods_list(data={}) {
		return util._get(`${_CONFIG.host}/bboss/api.php?url=shop/select_goods`,data)
	},
	// 获取单个商品
	get_one_goods(data) {
		return util._get(`${_CONFIG.host}/bboss/api.php?url=shop/get_one_goods`,data)
	},
	// 获取单个运费模板
	get_one_freight(data) {
		return util._get(`${_CONFIG.host}/bboss/api.php?url=freight/get_one`,data)
	},
	// 更新运费模板
	post_freight_update(data) {
		return util._post(`${_CONFIG.host}/bboss/api.php?url=freight/update`,data)
	},
	// 重新上架
	post_up_status(data) {
		console.log(data)
		return util._post(`${_CONFIG.host}/bboss/api.php?url=shop/up_status`,data)
	},
	// 商品排序
	get_select_goods(data={}) {
		console.log("请求数据")
		console.log(data)
		return util._get(`${_CONFIG.host}/bboss/api.php?url=shop/select_goods`,data)
	},
}
module.exports = Services_shop;