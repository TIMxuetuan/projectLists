import util from '../common/util.js'
import _config from '../config.js'

let obj = {
	login(data) {
		return util.post('api/android/login/v2', data)
	},
	editPassword(key, id, data) {
		return util.post('api/{Key}/Member/Password/{Id}', data)
	},
	changeUserInfo(data){
		return util.post(`api/{Key}/Member/`, data)
	},
	feedback(data){
		return util.post(`api/{Key}/FeedBack/`,data)
	}
}

export default obj
