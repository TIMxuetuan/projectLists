import util from '../common/util.js'

let obj = {
	// 待办任务（今日任务/为来任务）
	backLogTask(page,pageSize,data) {
		return util.get(`${page}/${pageSize}/api/{key}/todo`, data);
	},
	// 完成任务，监督任务...
	getTaskData(data){
		return util.get('api/{key}/TaskSummarize/{uid}',data);
	},
	// 任务详情
	taskDetail(taskId,data){
		return util.get(`api/{key}/task/${taskId}`,data);
	},	
	// 任务动态数据
	taskDynamic(page,data){
		return util.get(`${page}/10/api/{key}/TaskHistory`,data);
	},
	// 执行人
	memberExcutor(){
		return util.get('api/{key}/executor');
	},
	// 添加任务
	addTask(data){
		return util.post('api/{Key}/task',data);
	},
	// 上传
	upFile(data){
		return util.post('api/{Key}/attachment',data);
	},
	// 任务进度
	taskStep(taskId){
		return util.get(`api/{Key}/task/Progress/${taskId}`);
	},
	// 删除文件
	delFile(taskId,fileName){
		return util.del(`api/{Key}/attachment/${taskId}?file=${fileName}`);
	},
	// 编辑任务
	editTask(taskId,data){
		return util.put(`api/{Key}/task/${taskId}`,data);
	},
	// 删除任务
	delTask(taskId){
		return util.del(`api/{Key}/task/${taskId}`);
	},
	// 转交任务
	transferTask(taskId,data){
		return util.post(`api/{Key}/Task/Transfer/${taskId}`,data);
	},
	// 更改进度
	changeProgress(taskId,data){
		return util.patch(`api/{Key}/task/${taskId}`,data);
	}

}

export default obj