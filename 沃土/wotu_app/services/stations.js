import util from '../common/util.js'

let obj = {
	jobDescription(data={}) {
		return util.get('api/{key}/CompanyPosition?key=&page=1&size=16', data)
	},
}

export default obj
