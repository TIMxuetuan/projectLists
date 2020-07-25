import util from '@/common/util.js'
import _config from '@/config.js'

///api/'+key+'/Attendance/
let obj = {
	//签到列表  参数 {date:'年-月-日'}
	attendanceList(data) {
		return util.get('api/{key}/attendance/{Id}', data)
	},
	//获取考勤地址
	attendanceAddress(){
		return util.get('api/{key}/Attendance/GetMemberAddress/{Id}')
	},
	//获取轨迹  参数 {member:'',date:'年-月-日'}  ?member=${member}&date=${date}
	attenceTrack(data){
		return util.get('api/{key}/Location',data)
	},
	// 打卡签到
	clockIn(data){
		return util.post('api/{Key}/Attendance',data)
	}
	
}

export default obj
