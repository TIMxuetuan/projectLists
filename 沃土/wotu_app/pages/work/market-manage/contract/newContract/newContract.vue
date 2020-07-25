<template>
	<view class="container">
		<view class="w-card">
			<view class="item">
				<view class="left">*名称</view>
				<view class="right">
					<input type="text" v-model="model.name" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">*客户名称</view>
				<view class="right">
					<view class="right" @tap="$refs.selector1.show()">
						{{model.customer.label?model.customer.label:'请选择'}}
					</view>
				</view>
			</view>
		<!-- 	<view class="item">
				<view class="left">机会名称</view>
				<view class="right" @tap="$refs.selector2.show()">
					{{model.chance.label?model.chance.label:'请选择'}}
				</view>
			</view> -->
			<view class="item">
				<view class="left">*总金额</view>
				<view class="right">
					<input type="number" v-model="model.totalPrice" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">*折扣</view>
				<view class="right">
					<input type="number" v-model="model.discount" placeholder="请输入1-10的数字" style="width: 100%;" />
				</view>
			</view>
			
			
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">*签约日期</view>
				<view class="right" @tap="$refs.date1.show()">
					{{model.signDate?model.signDate:'选择时间'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*开始日期</view>
				<view class="right" @tap="$refs.date2.show()">
					{{model.startDate?model.startDate:'选择时间'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*结束日期</view>
				<view class="right" @tap="$refs.date3.show()">
					{{model.endDate?model.endDate:'选择时间'}}
				</view>
			</view>
			<view class="item">
				<view class="left">客户签约人</view>
				<view class="right">
					<input type="text" v-model="model.signer" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">合同编号</view>
				<view class="right">
					<input type="text" v-model="model.contractNo" placeholder="为空时,系统自动生成" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">正文</view>
				<view class="right">
					<textarea v-model="model.content" placeholder="请输入正文" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">产品说明</view>
				<view class="right">
					<textarea v-model="model.introduction" placeholder="请输入产品说明" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">描述</view>
				<view class="right">
					<textarea v-model="model.description" placeholder="请输入描述信息" style="width: 100%;" :auto-height="true" />
				</view>
			</view>

		</view>
		<view class="w-card">
		
			<view class="item">
				<view class="left">*付款方式</view>
				<view class="right" @tap="$refs.selector4.show()">
					{{model.payment.label ? model.payment.label : '请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*合同负责人</view>
				<view class="right" @tap="$refs.selector5.show()">
					{{model.principal.label ? model.principal.label : '请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*我方签约人</view>
				<view class="right" @tap="$refs.selector6.show()">
					{{model.mySigner.label ? model.mySigner.label : '请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*合同状态</view>
				<view class="right" @tap="$refs.selector7.show()">
					{{model.contractState.label ? model.contractState.label : '请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">合同类型</view>
				<view class="right" @tap="$refs.selector3.show()">
					{{model.contractType.label ? model.contractType.label : '请选择'}}
				</view>
			</view>
		</view>

		<button type="primary" class="btn" @tap="sendData">添加</button>
		
		<!-- picker  选择标签  客户名称-->
		<w-picker 
		    v-if="tagList1.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 0)" 
		    ref="selector1" 
		    themeColor="#f00"
		    :selectList="tagList1">
		</w-picker>
		

		<w-picker 
		    v-if="tagList2.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 1)" 
		    ref="selector2" 
		    themeColor="#f00"
		    :selectList="tagList2">
		</w-picker>
		

		<w-picker 
		    v-if="tagList3.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 2)" 
		    ref="selector3" 
		    themeColor="#f00"
		    :selectList="tagList3">
		</w-picker>
		

		<w-picker 
		    v-if="tagList4.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 3)" 
		    ref="selector4" 
		    themeColor="#f00"
		    :selectList="tagList4">
		</w-picker>

		<w-picker 
		    v-if="tagList5.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 4)" 
		    ref="selector5" 
		    themeColor="#f00"
		    :selectList="tagList5">
		</w-picker>
		<w-picker
		    v-if="tagList5.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 5)" 
		    ref="selector6" 
		    themeColor="#f00"
		    :selectList="tagList5">
		</w-picker>
		<w-picker
		    v-if="tagList6.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 6)" 
		    ref="selector7" 
		    themeColor="#f00"
		    :selectList="tagList6">
		</w-picker>

		<!-- 时间picker -->
		<w-picker 
		    mode="date" 
		    startYear="2017" 
		    endYear="2030"
		    :current="true" 
		    @confirm="onConfirm($event,7)"
		    ref="date1" 
		    themeColor="#f00"
		></w-picker>
		<w-picker
		    mode="date" 
		    startYear="2017" 
		    endYear="2030"
		    :current="true" 
		    @confirm="onConfirm($event,8)"
		    ref="date2" 
		    themeColor="#f00"
		></w-picker>
		<w-picker
		    mode="date" 
		    startYear="2017" 
		    endYear="2030"
		    :current="true" 
		    @confirm="onConfirm($event,9)"
		    ref="date3" 
		    themeColor="#f00"
		></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import Service from "@/services/crm.js"
	import Service2 from "@/services/approve.js"
	import {_data, _methods} from "@/common/public.js"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				..._data,
				model:{
					name:'',
					totalPrice:'',
					discount:'',
					signDate:'',
					startDate:'',
					endDate:'',
					signer:'',
					contractNo:'',
					content:'',
					introduction:'',
					description:'',
					chance:{label:'',value:''},
					customer:{label:'',value:''},
					payment:{label:'支票',value:1},
					principal:{label:'',value:''},
					mySigner:{label:'',value:''},
					contractType:{label:'',value:''},
					contractState:{label:'执行前',value:0},
				},
				tagId3:'', //合同类型Id
				tagId4:'', //
				tagList1:[], //客户列表
				tagList2:[], //机会名称列表
				tagList3:[], //合同类型列表
				tagList4:[
					{label:'支票',value:1},
					{label:'现金',value:2},
					{label:'邮政汇款',value:3},
					{label:'电汇',value:4},
					{label:'网上转账',value:5},
					{label:'其他',value:6},
				], //付款方式列表
				tagList5:[], //人员列表
				tagList6:[
					{label:'执行前',value:0},
					{label:'执行中',value:1},
					{label:'结束',value:2},
					{label:'意外终止',value:3},
				], //合同状态列表
			};
		},
		onLoad() {
			this.getMembers();
			this.getCustomers();
			this.getTags();
			this.getChance();
			this.userInfo = this.getUserInfo();
			// 给我方负责人，我方签约人赋初值
			this.model.principal = {
				label:this.userInfo.Name,
				value:this.userInfo.Id
			}
			 
			this.model.mySigner = {
				label:this.userInfo.Name,
				value:this.userInfo.Id
			}
		},
		methods:{
			..._methods,
			// 获取合同类型列表
			getTags(){
				Service.customerTag({
					type:4 //合同
				}).then(res =>{
					if(res.Flag){
						this.tagId3 = res.Content[0].Id;
						this.tagList3 = res.Content[0].Items.map(item =>{
						
							return {
								label: item.Name,
								value: item.Id,
							}
						})
						this.model.contractType = this.tagList3[0]
					}
				})
			},
			getChance(){
				const _data = {
					kind:2, // 客户类型（默认等于2）， 1：我关注的，2：我的机会，3：下属机会，4：我审核的机会，5：作废的机会
					kw:'', // 搜索值 ，不做搜索时，等于空
					lowers:'',  //无（默认为空）
					stage:'',
					startdate:'',
					enddate:'',
					sort: 0,   //筛选条件（默认等于0
					page:1,
					size: 100,
				}
				Service.getChance(_data).then(res =>{
					if(res.Flag){
						this.tagList2 = res.Content.List.map(item =>{
							return {
								label: item.Name,
								value: item.Id
							}
						})
					}
				})
			},
			getMembers(){
				Service2.getMembers().then(res =>{
					if(res.Flag){
						this.tagList5 = res.Content.map(item =>{
							
							return {
								label: item.Name,
								value: item.Id,
							}
						})
					}
				})
			},
			onConfirm(e, type){
				if(type === 0){
					this.model.customer = e.checkArr;
				}else if(type === 1){
					this.model.chance = e.checkArr;
					
				}else if(type === 2){
					this.model.contractType = e.checkArr;
				}else if(type === 3){
					this.model.payment = e.checkArr;
				}else if(type === 4){
					this.model.principal = e.checkArr;
				}else if(type === 5){
					this.model.mySigner = e.checkArr;
				}else if(type === 6){
					this.model.contractState = e.checkArr;
				}else if(type === 7){
					this.model.signDate = e.result;
				}else if(type === 8){
					this.model.startDate = e.result;
				}else if(type === 9){
					this.model.endDate = e.result;
				}
			},
			// 选择客户时列表
			getCustomers(){
				const _data = {
					kind: 2,
					kw: '',
					tagids: '',
					sort: 0,
					page:1,
					size:100,
				}
				Service.customer(_data).then(res =>{
					if(res.Flag){
						this.tagList1 = res.Content.List.map(item =>{
							
							return {
								label: item.Name,
								value: item.Id,
							}
						})
					}
				})
			},
			sendData(){
				if(this.model.name === ''){
					uni.showModal({
						title:'提示',
						content:'合同名称必须填写',
						showCancel:false,
					})
					return;
				}

				if(this.model.customer.label === ''){
					uni.showModal({
						title:'提示',
						content:'客户名称必须填写',
						showCancel:false,
					})
					return;
				}
				// if(this.model.findTime === ''){
				// 	uni.showModal({
				// 		title:'提示',
				// 		content:'发现时间必须填写',
				// 		showCancel:false,
				// 	})
				// 	return;
				// }
				// if(this.model.predictTime === ''){
				// 	uni.showModal({
				// 		title:'提示',
				// 		content:'预计成交日期必须填写',
				// 		showCancel:false,
				// 	})
				// 	return;
				// }
				// if(this.model.saleStage.label === ''){
				// 	uni.showModal({
				// 		title:'提示',
				// 		content:'销售阶段必须填写',
				// 		showCancel:false,
				// 	})
				// 	return;
				// }
				// 格式化数据
				
				let _postData = {
					State:this.model.contractState.value,
					Name:this.model.name,
					ChanceName: this.model.chance.label,
					ChanceId:this.model.chance.value,
					CustomerName:this.model.customer.label,
					CustomerId: this.model.customer.value,
					Price: this.model.totalPrice,
					SaleChk: 1,
					Sale:this.model.discount,
					SignDate: this.model.signDate,
					StartDate: this.model.startDate,
					EndDate: this.model.endDate,
					OwnerName: this.model.principal.label,
					OwnerId: this.model.principal.value,
					SignerName: this.model.mySigner.label,
					SignerId: this.model.mySigner.value,
					CustSigner: this.model.signer,
					PayType: this.model.payment.value,
					Text: this.model.content,
					Tags: this.tagId3 + '|' + this.model.contractType.value,
					ContractNo: this.model.contractNo,
					GoodsDesc: this.model.introduction,
					Description: this.model.description
					
				}
			
				Service.createContract(_postData).then(res =>{
					if(res.Flag){
						
						uni.showToast({
							title:res.Content,
							icon:'none',
							duration:2000
						})
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none',
							duration:2000
						})
					}
				})

			}
			
		}
		
	}
</script>

<style lang="scss">
.container{
	min-height: 100vh;
	padding: 10upx 20upx 50upx;
	box-sizing: border-box;
	background: $uni-bg-color-grey;
	.w-card{
		margin-bottom: 20upx;
		.item{
			display: flex;
			padding: 20upx;
			color: #333;
			box-sizing: border-box;
			border-bottom: 1px solid $uni-border-color-gray;
			.left{
				width: 220upx;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
			}
			.right{
				flex: 1;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				display: flex;
				justify-content: flex-end;
				.iconfont{
					font-size: 36upx;
					color: #B7B7B7;
				}
			}
			&:last-child{
				border: none;
			}
		}
	}
}

</style>
