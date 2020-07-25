import util from '../common/util.js'

let obj = {
	//我的申批 ?page=1&type=1&size=10
	myApprove(data) {
		return util.get('api/{key}/Wf/ApproveList/{Id}', data)
	},
	// 我的审批详情
	myApproveDetail(applyId,data) {
		return util.get(`api/{key}/Wf/Detail/${applyId}`, data)
	},
	// 我的申请
	myApply(data){
		return util.get('api/{key}/Wf/MyApplyList/{Id}',data)
	},
	// 获取sublist数据
	getAttSubList(workflowId){
		return util.get(`api/{key}/Workflow/SubsetList/${workflowId}`)
	},
	// 获取list数据
	getAttList(){
		return util.get('api/{key}/Workflow/list/{Id}')
	},
	// 获取部门数据
	getDepartment(){
		return util.get('api/{key}/department?type=0')
	},
	// 获取人员数据
	getMembers(){
		return util.get('api/{key}/addressbook')
	},
	// 提交审批
	submitApprove(data){
		return util.post('api/{Key}/Wf/',data)
	},
	// 审批同意、拒绝
	approveOption(applyId,data){
		return util.post(`api/{Key}/Wf/ApprovalHandle/${applyId}`,data)
	}
}

export default obj