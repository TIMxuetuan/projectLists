import util from '../common/util.js'

let obj = {
	// 订单管理
	original(data) {
		return util.get(`api/{Key}/WorkflowRuntime/GetList`, data);
	},
	statistics(data) {
		return util.get(`api/{Key}/ProductionStatistic`,data);
	},
}

export default obj