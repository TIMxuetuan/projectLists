import {util} from '../common/util.js'
import {_CONFIG} from '../config.js'
const myAppServices = {
	
	//获取银行卡列表  根据银行卡卡号 获得银行卡的信息
	getBankCardInfor(data){
		return util._post(`${_CONFIG.host}/gboss/o.php?url=wallet/card_list`, data)
	}
	
}

module.exports = myAppServices;
