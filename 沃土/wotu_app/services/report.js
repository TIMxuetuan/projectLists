import util from '../common/util.js'
import _config from '../config.js'
let obj = {
	getOAdata(data) {
		return util.get('api/{Key}/Share/{Id}', data)
	},
	getCRMdata(data) {
		return util.get('api/{Key}/dashboard/GetCrmBriefing/{Id}', data)
	}

}
export default obj
