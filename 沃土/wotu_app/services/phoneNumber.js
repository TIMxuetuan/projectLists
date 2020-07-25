import util from '../common/util.js'

let obj = {
	addressBook() {
		return util.get('api/{key}/addressbook')
	},
	/* 个人信息 */
	memberDetail(uid) {
		return util.get(`api/{key}/Member/${uid}`)
	}
}

export default obj