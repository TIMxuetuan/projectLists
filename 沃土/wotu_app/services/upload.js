import util from '../common/util.js'
import _config from '../config.js'
let obj = {
	uploadFile1(data) {
		return util.post('attachment/Upload', data)
	},
	uploadFile2(data) {
		return util.post('api/{Key}/attachment', data)
	},
	delFile(taskId, imgName) {
		return util.del(`api/{Key}/attachment/${taskId}?file=${imgName}`)
	}
}

export default obj
