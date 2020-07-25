import util from '../common/util.js'
import _config from '../config.js'
let obj = {
	getdaily(date) {
		return util.get(`api/{Key}/summary/{Id}`+date)
	},
	// 获取工作变化内容
	getTaskData(data){
		return util.get(`api/{Key}/task/ReportChange/{Id}`, data);
	},
	submitbutt(date,data){
		return util.post(`api/{Key}/Summary/{Id}${date}`, data)
	},
	organization(data){
		return util.get(`api/{Key}/department`,data)
	},
	getpeaple(Id){
		return util.get(`api/{Key}/department/getinfo/`+Id)
	},
	seach(data){
		return util.get(`api/{Key}/TaskSearch`,data)
	},
	mood(data){
		return util.get(`api/{Key}/Mood/{Id}`,data)
	},
	meeting(data){
		return util.get(`api/{Key}/Project/`,data)
	},
	details(id){
		return util.get(`api/{Key}/Project/Items/`+id)
	},
	xifendetails(id){
		return util.get(`api/{Key}/Task/GetByProject/`+id)
	}
}
export default obj
