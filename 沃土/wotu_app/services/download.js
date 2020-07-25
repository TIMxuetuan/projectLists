import util from '../common/util.js'
import _config from '../config.js'

let obj = {
	download(url) {
		return util.downloadFile(url)
	}
}

export default obj
