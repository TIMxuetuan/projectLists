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
				<view class="left">*开始时间</view>
				<view class="right">
					<view class="right" @tap="$refs.date1.show()">
						{{model.startDate?model.startDate:'选择时间'}}
					</view>
				</view>
			</view>
			<view class="item">
				<view class="left">*结束时间</view>
				<view class="right" @tap="$refs.date2.show()">
					{{model.endDate?model.endDate:'选择时间'}}
				</view>
			</view>
			<view class="item">
				<view class="left">活动类型</view>
				<view class="right" @tap="$refs.selector.show()">
					{{model.activityType.label?model.activityType.label:'请选择'}}
				</view>
			</view>
			
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">地点</view>
				<view class="right">
					<input type="text" v-model="model.place" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">预计成本</view>
				<view class="right">
					<input type="text" v-model="model.preCost" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">实际成本</view>
				<view class="right">
					<input type="text" v-model="model.actualCost" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">预计收入</view>
				<view class="right">
					<input type="text" v-model="model.preIncome" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">实际收入</view>
				<view class="right">
					<input type="text" v-model="model.actualIncome" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">计划</view>
				<view class="right">
					<textarea v-model="model.plan" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">执行描述</view>
				<view class="right">
					<textarea v-model="model.execDesc" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">总结</view>
				<view class="right">
					<textarea v-model="model.summary" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">效果</view>
				<view class="right">
					<textarea v-model="model.effect" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">描述</view>
				<view class="right">
					<textarea v-model="model.desc" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
		</view>
		<button type="primary" @tap="sendData">添加</button>
		
		<!-- picker -->
		<w-picker
		    mode="date" 
		    startYear="2017" 
		    endYear="2030"
		    :current="true" 
		    @confirm="onConfirm($event,1)"
		    ref="date1" 
		    themeColor="#f00"
		></w-picker>
		<w-picker
		    mode="date" 
		    startYear="2017" 
		    endYear="2030"
		    :current="true" 
		    @confirm="onConfirm($event,2)"
		    ref="date2" 
		    themeColor="#f00"
		></w-picker>
		
	</view>
</template>

<script>
	import Service from '@/services/crm.js'
	import util from '@/common/util.js'
	export default {
		data() {
			return {
				model:{
					name:'',
					startDate:util.getDate(),
					endDate:util.getDate(),
					place:'',
					preCost:'',
					actualCost:'',
					preIncome:'',
					actualIncome:'',
					plan:'',
					execDesc:'',
					summary:'',
					effect:'',
					desc:'',
					activityType:{
						label:'',
						value:'',
					}
				},
				tagId:'',
				tagList:[],
			};
		},
		onLoad() {
			this.getTags()
		},
		methods:{
			sendData(){
				// 判断必填的是否填写
				if(this.model.name === ''){
					uni.showModal({
						title:'提示',
						content:'活动名称必须填写',
						showCancel:false
					})
					return;
				}
				
				// 要提交的数据
				const _data = {
					Name: this.model.name,
					BeginDate: this.model.startDate,
					EndDate: this.model.endDate,
					Address: this.model.place,
					EstCost: this.model.preCost,
					ActCost: this.model.actualCost,
					EstIncome: this.model.preIncome,
					ActIncome: this.model.actualIncome,
					Plan: this.model.plan,
					Exec: this.model.execDesc,
					summary: this.model.summary,
					Effact: this.model.effect,
					Tags: this.tagId+"|"+this.model.activityType.value,
					Description: this.model.desc
				}
				Service.createActivity(_data).then(res =>{
					if(res.Flag){
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
					}
				})
			},
			onConfirm(e,type){
				console.log(e)
				if(type === 1){
					this.model.startDate = e.result;
				}
				if(type === 2){
					this.model.endDate = e.result;
				}
				if(type === 3){
					this.model.activityType = e.checkArr;
				}
			},
			getTags(){
				Service.customerTag({
					type:5 //活动
				}).then(res =>{
					if(res.Flag){
						this.tagId = res.Content[0].Id;
						this.tagList = res.Content[0].Items.map(item =>{
							return {
								label:item.Name,
								value:item.Id
							}
						});
						console.log(this.tagList)
						// 存入本地,其他页面直接用,不用再做请求
						// uni.setStorageSync('customer_state_tags',JSON.stringify(res.Content[0]))
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.container{
		min-height: 100vh;
		padding: 10upx 20upx 50upx;
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
					width: 200upx;
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
