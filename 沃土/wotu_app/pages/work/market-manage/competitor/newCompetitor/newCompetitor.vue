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
				<view class="left">规模</view>
				<view class="right" @tap="$refs.selector1.show()">
					{{model.scale.label?model.scale.label:'请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">竞争力</view>
				<view class="right" @tap="$refs.selector2.show()">
					{{model.compete.label?model.compete.label:'请选择'}}
				</view>
			</view>
			
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">优势</view>
				<view class="right">
					<textarea v-model="model.advantage" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">劣势</view>
				<view class="right">
					<textarea v-model="model.disadvantaged" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">应对策略</view>
				<view class="right">
					<textarea v-model="model.strategy" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">销售分析</view>
				<view class="right">
					<textarea v-model="model.saleAnalyze" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">市场分析</view>
				<view class="right">
					<textarea v-model="model.marketAnalyze" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			<view class="item">
				<view class="left">联系信息</view>
				<view class="right">
					<textarea v-model="model.contactMsg" placeholder="点击填写" style="width: 100%;" :auto-height="true" />
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
		
		<w-picker
		    v-if="tagList1.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 1)" 
		    ref="selector1" 
		    themeColor="#f00"
		    :selectList="tagList1">
		</w-picker>
		<w-picker
		    v-if="tagList2.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 2)" 
		    ref="selector2" 
		    themeColor="#f00"
		    :selectList="tagList2">
		</w-picker>
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
					advantage:'',
					disadvantaged:'',
					strategy:'',
					saleAnalyze:'',
					marketAnalyze:'',
					contactMsg:'',
					desc:'',
					scale:{
						label:'',
						value:'',
					},
					compete:{
						label:'',
						value:'',
					}
				},
				tagId1:'',
				tagId2:'',
				tagList1:[],
				tagList2:[],
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
					Tags: this.tagId1+"|"+this.model.scale.value+'^'+this.tagId2+'|'+this.model.compete.value,
					Adv: this.model.advantage,
					DisAdv: this.model.disadvantaged,
					Strategy: this.model.strategy,
					Sale: this.model.saleAnalyze,
					Market: this.model.marketAnalyze,
					Link: this.model.contactMsg,
					Description: this.model.desc
				}
				Service.createCompetitor(_data).then(res =>{
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
					this.model.scale = e.checkArr;
				}
				if(type === 2){
					this.model.compete = e.checkArr;
				}
			},
			getTags(){
				Service.customerTag({
					type:6 //竞争对手
				}).then(res =>{
					if(res.Flag){
						this.tagId1 = res.Content[0].Id;
						this.tagList1 = res.Content[0].Items.map(item =>{
							return {
								label:item.Name,
								value:item.Id
							}
						});
						this.tagId2 = res.Content[1].Id;
						this.tagList2 = res.Content[1].Items.map(item =>{
							return {
								label:item.Name,
								value:item.Id
							}
						});

					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $uni-bg-color-grey;
	}
	.container{
		padding: 10upx 20upx 50upx;
		
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
