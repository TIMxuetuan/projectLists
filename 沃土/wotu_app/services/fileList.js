import util from '../common/util.js'

let obj = {
	// 获取根目录数据
	myFile(data) {
		return util.get(`api/{key}/Netdisk`, data)
	},
	// 获取子文件夹数据
	childFolder(folderId, data){
		return util.get(`api/{key}/Netdisk/${folderId}`,data)
	},
	// 新建文件夹
	newFolder(data){
		return util.post(`api/{key}/Netdisk`,data)
	},
	// 文件重命名
	reName(fileId,data){
		return util.put(`api/{key}/Netdisk/${fileId}`,data)
	},
	// 删除文件
	deleteFile(fileId){
		return util.del(`api/{key}/Netdisk/${fileId}`)
	},
	// 共享文件
	// 获取根目录数据
	getAllShareFiles(data){
		return util.get(`api/{key}/Netdisk/Share/all`,data)
	},
	getChildShareFiles(folderId,data){
		return util.get(`api/{key}/Netdisk/Share/${folderId}`,data)
	}
}

export default obj