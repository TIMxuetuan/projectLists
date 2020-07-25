<template>
	<view class="container">
		<view class="header">
			<view class="top">
				<view class="title" @tap="toEdit">订单号：{{model.Name || '--'}}</view>
				<view class="sub">活动地址：{{model.Address}}</view>
				<view class="sub">开始时间：{{model.Date.Start}}</view>
				<view class="sub">结束时间：{{model.Date.End}}</view>
			</view>
			<view class="options">
				<view class="tag">
					<uni-tag :text="model.IsFollow ? '已关注' : '+关注'" :inverted='true' type='primary' size='small' @click="bindClick(1)"></uni-tag>
				</view>
				<view class="tag">
					<uni-tag :text="model.State.Name" style="margin-left: 30upx;" :inverted='true' type='primary' size='small' @click="bindClick(2)"></uni-tag>
				</view>
		
			<!-- 	<navigator :url="'../../editPrincipal/editPrincipal?id=' + oId+'&moduleName=CrmOrder'" class="tag">
					<uni-tag text="负责人、跟进人" :inverted='true' type='primary' size='small'></uni-tag>
				</navigator> -->	
			</view>
<!-- 			<view class="toptab">
				<view class="item">跟踪记录</view>
			</view> -->
		</view>
		<!-- picker -->
		<w-picker
		    v-if="tagList.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="changeState" 
		    ref="selector" 
		    themeColor="#f00"
		    :selectList="tagList">
		</w-picker>
	</view>
</template>

<script>
	import Service from '@/services/crm.js'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import wPicker from '@/components/w-picker/w-picker.vue'
	export default {
		components:{
			uniTag,
			wPicker
		},
		data() {
			return {
				actId:'', //活动Id
				model:{},
				tagList:[
					{label:'执行前',value:1},
					{label:'进行中',value:2},
					{label:'已结束',value:3},
					{label:'终止',value:4}
				]
			};
		},
		onLoad(options) {
			this.actId = options.actId;
			
		},
		onShow() {
			this.getData()
		},
		methods:{
			getData(){
				Service.actDetail(this.actId).then(res =>{
					if(res.Flag){						
						this.model = res.Content;
						
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
				})
			},
			bindClick(type){
				if(type === 1){
					this.follow()
				}
				if(type === 2){
					this.$refs.selector.show();
				}
			},
			follow(){
				this.model.IsFollow = !this.model.IsFollow;
				Service.followAct(this.actId,this.model.IsFollow?'1':'0').then(res =>{
					if(res.Flag){
						
						uni.showToast({
							title:res.Content,
							icon:'none',
							position: 'bottom'
						})
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
					}
				})
			},
			changeState(e){
				this.model.State.Name = e.checkArr.label;
				this.model.State.Id = e.checkArr.value;
				Service.changeActState(this.actId,e.checkArr.value).then(res =>{
					if(res.Flag){
						
						uni.showToast({
							title:res.Content,
							icon:'none',
							duration:2000
						})
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none',
							duration:2000
						})
					}
				})
			},
			toEdit(){
				const _data = {
					name:this.model.Name,
					startDate:this.model.Date.Start,
					endDate:this.model.Date.End,
					place:this.model.Address,
					preCost:this.model.Estcost,
					actualCost:this.model.Actcost,
					preIncome:this.model.Estincome,
					actualIncome:this.model.Actincome,
					plan:this.model.Plan,
					execDesc:this.model.Exec,
					summary:this.model.Summary,
					effect:this.model.Effact,
					desc:this.model.Desc,
					activityType:{},
				}
				if(this.model.Tags.length>0){
					_data.activityType = {
						label:this.model.Tags[0].ItemValue,
						value:this.model.Tags[0].ItemId,
					}
				}
				
				uni.navigateTo({
					url:'../editActivity/editActivity?actId='+this.actId
				})
				// 先存储到本地，修改页取
				uni.setStorageSync('act_detail',JSON.stringify(_data));
				
			}
		}
	}
</script>

<style lang="scss">
page{
	background: $uni-bg-color-grey;
}
.container{
	padding: 0 20upx;
	color: $uni-text-color;
	.header{
		position: fixed;
		top: 0;
		left: 20upx;
		right: 20upx;
		background: $uni-bg-color-grey;
		border-radius: 10upx;
		.top{
			height: 250upx;
			padding: 0 20upx;
			background: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-bottom: 1px solid #eee;
			margin-top: 10upx;
			.title{
				// color: #fff;
				font-size: $uni-font-size-lg;
				line-height: 2em;
			}
			.sub{
				font-size: $uni-font-size-base;
				line-height: 2em;
				// color: #eee;
			}
		}
		.options{
			height: 80upx;
			display: flex;
			align-items: center;
			padding: 0 20upx;
			background: #fff;
			.tag{
				margin-right: 50upx;
				&:last-child{
					margin-right: 0;
				}
			}
		}
		.toptab{
			width: 100%;
			height: 80upx;
			background: #fff;
			border-bottom: 1px solid #eee;
			margin-top: 20upx;
			.item{
				color: $uni-text-color-blue;
				font-size: $uni-font-size-lg;
				padding:15upx;
			}
		}
	}
}
</style>
