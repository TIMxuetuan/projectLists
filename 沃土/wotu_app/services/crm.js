import util from '../common/util.js'

let obj = {
	Dashboard(data) {
		return util.get(`api/{Key}/Dashboard/{Id}`, data);
	},
	funnel(data){
		return util.get(`api/{Key}/Dashboard/Funnel`, data);
	},
	// 责任人\跟进人  moduleName:销售每一个模块的名字 比如Customer等,id模块下对应的每一条数据id
	getOwner(moduleName,dataId){
		return util.get(`api/{Key}/${moduleName}/${dataId}`);
	},
	// 更改责任人
	changeOwner(moduleName,dataId,memberId){
		return util.post(`api/{Key}/${moduleName}/SetOwner/${dataId}?member=${memberId}`)
	},
	// 添加参与人
	addInvolve(dataId,data){
		return util.post(`api/{Key}/Contract/SetInvolve/${dataId}`,data)
	},
	// 删除参与人
	delInvolve(moduleName,dataId,memberId){
		return util.post(`api/{Key}/${moduleName}/DelInvolve/${dataId}?member=`,memberId)
	},
	// ***********************************客户接口****************************************
	// 客户列表
	customer(data){
		return util.get(`api/{Key}/Customer`,data)
	},
	// 客户标签
	customerTag(data){
		return util.get(`api/{Key}/CustomTag`,data)
	},
	// 客户详情
	customerDetail(customerId){
		return util.get(`api/{Key}/Customer/${customerId}`)
	},
	// 关注
	follow(customerId, isFollow){
		return util.post(`api/{Key}/Customer/SetFollow/${customerId}?isFollow=${isFollow}`)
	},
	// 跟进记录
	record(data){
		return util.get(`api/{Key}/TrackRecord`, data)
	},
	// 签约机会(客户下)
	Chance(data){
		return util.get(`api/{Key}/Chance`, data)
	},
	// 客户联系人 (客户下)
	Contact(data){
		return util.get(`api/{Key}/Contact`, data)
	},
	// 合同(客户下)
	Contract(data){
		return util.get(`api/{Key}/Contract`, data)
	},
	// 更改客户状态
	SetState(customerId,custTagId,oldCustTagId){
		return util.post(`api/{Key}/Customer/SetState/${customerId}?state=${custTagId}&old=${oldCustTagId}`)
	},
	// 从公海中获取客户
	getCustomer(customerId){
		return util.post(`api/{Key}/Customer/MoveOutHighSea/${customerId}`)
	},
	// 新建客户
	createCustomer(data){
		return util.post(`api/{Key}/Customer`, data)
	},
	// 客户自定义字段 
	getField(type){
		return util.get(`api/{Key}/CustomField?type=${type}`)
	},
	// 更改客户
	editCustomer(customerId,data){
		return util.put(`api/{Key}/Customer?id=${customerId}`, data)
	},
	// ***********************************联系人接口****************************************
	// 获取联系人
	getContact(data){
		return util.get(`api/{Key}/Contact` , data)
	},
	// 新建联系人
	createContact(data){
		return util.post(`api/{Key}/Contact`, data)
	},
	// 获取联系人详情
	contactDetail(contactId){
		return util.get(`api/{Key}/Contact/${contactId}`)
	},
	// 设置关联
	setAssociate(contactId, data){
		return util.post(`api/{Key}/Contact/SetCustomer/${contactId}`, data)
	},
	// 修改联系人
	editContact(contactId, data){
		return util.put(`api/{Key}/Contact/${contactId}`, data)
	},
	// ***********************************机会接口****************************************
	// 获取机会
	getChance(data){
		return util.get(`api/{Key}/Chance` , data)
	},
	// 销售阶段标签
	saleStage(){
		return util.get(`api/{Key}/saleStage/{Id}`)
	},
	// 新建机会
	createChance(data){
		return util.post(`api/{Key}/Chance`, data)
	},
	// 关注机会
	followChance(chanceId,isFollow){
		return util.post(`api/{Key}/Chance/SetFollow/${chanceId}?member={Id}&isFollow=${isFollow}`)
	},
	// 机会详情
	chanceDetail(chanceId){
		return util.get(`api/{Key}/Chance/${chanceId}`)
	},
	// 编辑机会
	editChance(chanceId, data){
		return util.put(`api/{Key}/Chance/${chanceId}`, data)
	},
	// ***********************************合同接口****************************************
	// 获取合同
	getContract(data){
		return util.get(`api/{Key}/Contract`, data)
	},
	// 新建合同
	createContract(data){
		return util.post(`api/{Key}/Contract`, data)
	},
	// 合同详情
	contractDetail(contractId){
		return util.get(`api/{Key}/Contract/${contractId}`)
	},
	// 关注合同
	followContract(contractId,isFollow){
		return util.post(`api/{Key}/Contract/SetFollow/${contractId}?member={Id}&isflw=${isFollow}`)
	},
	// 回款计划
	payPlan(data){
		return util.get(`api/{Key}/PayPlan`, data)
	},
	// 回款记录
	payRecord(data){
		return util.get(`api/{Key}/PayRecord`, data)
	},
	// 编辑合同
	editContract(contractId, data){
		return util.put(`api/{Key}/Contract/${contractId}`, data)
	},
	// ***********************************活动接口****************************************
	// 活动首页
	activity(data){
		return util.get(`api/{Key}/Market`, data)
	},
	// 新建活动
	createActivity(data){
		return util.post(`api/{Key}/Market`, data)
	},
	// 活动详情
	actDetail(actId){
		return util.get(`api/{Key}/Market/${actId}`)
	},
	// 关注活动
	followAct(actId,isFollow){
		return util.post(`api/{Key}/Market/SetFollow/${actId}?member={Id}&isFollow=${isFollow}`)
	},
	// 改变活动状态
	changeActState(actId,state){
		return util.post(`api/{Key}/MarKet/SetState/${actId}?state=${state}`)
	},
	// 编辑活动
	editActivity(actId, data){
		return util.put(`api/{Key}/MarKet/${actId}`, data)
	},
	// ***********************************竞争对手接口****************************************
	// 竞争对手首页
	competitor(data){
		return util.get(`api/{Key}/Rival`, data)
	},
	// 新建竞争对手
	createCompetitor(data){
		return util.post(`api/{Key}/Rival`, data)
	},
	// 竞争对手详情
	competitorDetail(competitorId){
		return util.get(`api/{Key}/Rival/${competitorId}`)
	},
	// 更改客户状态
	setCompetitorState(competitorId,custTagId,oldCustTagId){
		return util.post(`api/{Key}/Rival/SetState/${competitorId}?state=${custTagId}&old=${oldCustTagId}`)
	},
	//  编辑竞争对手
	editCompetitor(competitorId, data){
		return util.put(`api/{Key}/Rival/${competitorId}`, data)
	},
	// ***********************************订单接口****************************************
	// 获取订单
	crmOrder(data){
		return util.get(`api/{Key}/CrmOrder`, data)
	},
	// 新建订单
	createOrder(data){
		return util.post(`api/{Key}/CrmOrder`, data)
	},
	// 订单详情
	orderDetail(oId){
		return util.get(`api/{Key}/CrmOrder/${oId}`)
	},
	// 关注订单
	followOrder(oId,isFollow){
		return util.post(`api/{Key}/CrmOrder/SetFollow/${oId}?member={Id}&isFollow=${isFollow}`)
	},
	// 更改订单
	editOrder(oId, data){
		return util.put(`api/{Key}/CrmOrder/${oId}`, data)
	},
	// 删除订单
	delOrder(data){
		return util.post(`api/{Key}/CrmOrder/BatchDel/{Id}`,data)
	},
	// ***********************************产品接口****************************************
	// 获取产品列表
	productList(data){
		return util.get(`api/{Key}/Product`,data)
	},
	// 新建产品(需管理员)
	createProduct(data){
		return util.post(`api/{Key}/Product`, data)
	},
	// 产品详情
	productDetail(productId){
		return util.get(`api/{Key}/Product/${productId}`)
	},
	// 更改产品
	editProduct(productId, data){
		return util.put(`api/{Key}/Product/${productId}`, data)
	},
	
	
}

export default obj