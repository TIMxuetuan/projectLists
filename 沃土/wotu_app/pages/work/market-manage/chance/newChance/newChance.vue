<template>
	<view class="container">
		<view class="w-card">
			<view class="item">
				<view class="left">*机会名称</view>
				<view class="right">
					<input type="text" v-model="model.name" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">*预计金额</view>
				<view class="right">
					<input type="text" v-model="model.price" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">*客户名称</view>
				<view class="right" @tap="$refs.selector1.show()">
					{{model.customer.label?model.customer.label:'请选择'}}
				</view>
			</view>
			
			<view class="item">
				<view class="left">*发现时间</view>
				<view class="right" @tap="$refs.date1.show()">
					{{model.findTime?model.findTime:'选择时间'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*预计成交日期</view>
				<view class="right" @tap="$refs.date2.show()">
					{{model.predictTime?model.predictTime:'选择时间'}}
				</view>
			</view>
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">需求说明</view>
				<view class="right">
					<textarea v-model="model.demand" placeholder="请输入备注信息" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">描述</view>
				<view class="right">
					<textarea v-model="model.description" placeholder="请输入备注信息" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			
			<view class="item">
				<view class="left">*销售阶段</view>
				<view class="right" @tap="$refs.selector2.show()">
					{{model.saleStage.label ? model.saleStage.label : '请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">机会来源</view>
				<view class="right" @tap="$refs.selector3.show()">
					{{model.chanceSource.label ? model.chanceSource.label : '请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">机会类型</view>
				<view class="right" @tap="$refs.selector4.show()">
					{{model.chanceType.label ? model.chanceType.label : '请选择'}}
				</view>
			</view>
		</view>

		<button type="primary" @tap="sendData">添加</button>
		
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
		
		<!-- picker  选择标签 销售阶段-->
		<w-picker 
		    v-if="tagList2.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 1)" 
		    ref="selector2" 
		    themeColor="#f00"
		    :selectList="tagList2">
		</w-picker>
		
		<!-- picker  选择标签 机会来源-->
		<w-picker 
		    v-if="tagList3.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 2)" 
		    ref="selector3" 
		    themeColor="#f00"
		    :selectList="tagList3">
		</w-picker>
		
		<!-- picker  选择标签 机会类型-->
		<w-picker 
		    v-if="tagList4.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 3)" 
		    ref="selector4" 
		    themeColor="#f00"
		    :selectList="tagList4">
		</w-picker>
		<!-- 时间picker -->
		<w-picker 
		    mode="date" 
		    startYear="2017" 
		    endYear="2030"
		    :current="true" 
		    @confirm="onConfirm($event,4)"
		    ref="date1" 
		    themeColor="#f00"
		></w-picker>
		<w-picker
		    mode="date" 
		    startYear="2017" 
		    endYear="2030"
		    :current="true" 
		    @confirm="onConfirm($event,5)"
		    ref="date2" 
		    themeColor="#f00"
		></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import Service from "@/services/crm.js"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				model:{
					name:'',
					price:'',
					findTime:'',
					predictTime:'',
					demand:'',
					description:'',
					customer:{label:'',value:''},
					saleStage:{label:'',value:''},
					chanceSource:{label:'',value:''},
					chanceType:{label:'',value:''},
				},
				tagId3:'', //机会来源列表Id
				tagId4:'', //机会类型列表Id
				tagList1:[], //客户列表
				tagList2:[], //销售阶段列表
				tagList3:[], //机会来源列表
				tagList4:[], //机会类型列表
				
			};
		},
		onLoad() {
			this.getSaleStage();
			this.getStorage();
			this.getCustomers();
		},
		methods:{
			getStorage(){
				let _tags;
				// 获取本地存储的标签数据,并格式化
				_tags = JSON.parse(uni.getStorageSync('chance_source_tags'));
				this.tagList3 = _tags.Items.map(item =>{
					return {
						label: item.Name,
						value: item.Id
					}
				})
				this.tagId3 = _tags.Id;		//这个Id是一个类的标签Id(角色关系)
				this.model.chanceSource = this.tagList3[0] //设置默认值
						
				// 获取本地存储的标签数据,并格式化
				_tags = JSON.parse(uni.getStorageSync('chance_type_tags'));
				this.tagList4 = _tags.Items.map(item =>{
					return {
						label: item.Name,
						value: item.Id
					}
				})
				this.tagId4 = _tags.Id;		//这个Id是一个类的标签Id(亲密程度)
				this.model.chanceType = this.tagList4[0] //设置默认值
			},
			getSaleStage(){
				Service.saleStage().then(res =>{
					if(res.Flag){
						this.tagList2 = [];
						res.Content.filter(item =>{
							if(item.Name){
								this.tagList2.push({
									label: item.Name+'('+item.Value+'%)',
									value: item.Id,
								})
							}
						})
					}
				})
			},
			onConfirm(e, type){
				if(type === 0){
					this.model.customer = e.checkArr;
				}
				if(type === 1){
					this.model.saleStage = e.checkArr;
				}
				if(type === 2){
					this.model.chanceSource = e.checkArr;
				}
				if(type === 3){
					this.model.chanceType = e.checkArr;
				}
				if(type === 4){
					this.model.findTime = e.result;
				}
				if(type === 5){
					this.model.predictTime = e.result;
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
						content:'机会名称必须填写',
						showCancel:false,
					})
					return;
				}
				
				if(this.model.price === ''){
					uni.showModal({
						title:'提示',
						content:'预计金额必须填写',
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
				if(this.model.findTime === ''){
					uni.showModal({
						title:'提示',
						content:'发现时间必须填写',
						showCancel:false,
					})
					return;
				}
				if(this.model.predictTime === ''){
					uni.showModal({
						title:'提示',
						content:'预计成交日期必须填写',
						showCancel:false,
					})
					return;
				}
				if(this.model.saleStage.label === ''){
					uni.showModal({
						title:'提示',
						content:'销售阶段必须填写',
						showCancel:false,
					})
					return;
				}
				// 格式化数据
				const _stageList = this.model.saleStage.value + '|' +this.model.saleStage.label.split('(')[0]+'|'+ this.model.saleStage.label.replace(/[^0-9]/ig,"");
				
				let _postData = {
					Name:this.model.name,
					CustName:this.model.customer.label,
					CustId: this.model.customer.value,
					Price: this.model.price,
					StageList: _stageList,
					StageId:this.model.saleStage.value,
					StageName: this.model.saleStage.label.split('(')[0],
					StageVal: this.model.saleStage.label.replace(/[^0-9]/ig,""),
					FindDate: this.model.findTime,
					EstDate: this.model.predictTime,
					Text: this.model.demand,
					Tags: this.tagId3 + '|' + this.model.chanceSource.value+ '^' + this.tagId4 + '|' + this.model.chanceType.value,
					Desc: this.model.description
				}
			
				Service.createChance(_postData).then(res =>{
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
	width: 100vw;
	min-height: 100vh;
	padding: 10upx 20upx;
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
