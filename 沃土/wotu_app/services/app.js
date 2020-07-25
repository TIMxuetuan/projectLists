import util from '../common/util.js'

let obj = {
	getAddress(data) {
		return util.get('https://www.51xuediannao.com/wx/getAddress.php', data)
	}
}

export default obj
