<template>
	<view class="container">
		<view class="header">
			<view class="top">
				<view class="title" @tap="toEdit">订单号：{{model.OrderId || ''}}</view>
			</view>
			<view class="options">
				<view class="tag">
					<uni-tag :text="model.IsFollow ? '已关注' : '+关注'" :inverted='true' type='primary' size='small' @click="bindClick"></uni-tag>
				</view>

				<navigator :url="'../../editPrincipal/editPrincipal?id=' + oId+'&moduleName=CrmOrder'" class="tag">
					<uni-tag text="负责人、跟进人" :inverted='true' type='primary' size='small'></uni-tag>
				</navigator>	
			</view>
			<view class="toptab">
				<view class="item">跟踪记录</view>
			</view>
		</view>
		
		<view class="content">
			<view class="record-item" v-for="(item, index) in recordList" :key='index'>
				<view class="tags" v-if="item.Tags.length > 0">
					<block v-for="(tag, i) in item.Tags" :key='i'>
						<uni-tag :text="tag.Name" type='primary' :circle="true" size="small"></uni-tag>
					</block>
				</view>
				<view class="text">
					<!-- 后台返回有html标签，通过富文本解析 -->
					<rich-text :nodes="item.Text"></rich-text>
				</view>
				<view class="info">
					<text class="user">{{item.CreatorName}}</text>
					<text class="time">{{item.Date}}</text>
				</view>
			</view>
			<!-- <uni-load-more :status="loadingStatus"></uni-load-more> -->
		</view>
		
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="center" :custom="true">
			<view class="w-popup-sm">
				<view class="w-popup-item" @tap='delOrder'>
					<text class="iconshanchuwenjianjia"></text>删除
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Service from '@/services/crm.js'
	import util from '@/common/util.js'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	let timer;
	export default {
		components:{
			uniLoadMore,
			uniTag,
			uniPopup
		},
		data() {
			return {
				oId:'',//订单id(不是订单号)
				model:{},
				recordList:[],
				loadingStatus:'loading',
			};
		},
		onLoad(options) {
			this.oId = options.oId;	
			this.getData()
		},
		onShow() {
			uni.showLoading({
				title:'请求中',
				mask:true,
			})
			timer = setTimeout(()=>{
				uni.hideLoading()
			},3000)
			this.getData()
			this.getRecordData();
		},
		onNavigationBarButtonTap() {
			this.$refs.popup.open();
		},
		methods:{
			// 获取跟踪记录数据
			getRecordData(){
				if(this.recordList.length === 0){
					this.loadingStatus = 'loading';
				}
				
				// 一次性获取全部数据
				let _sendData = {
					relid: this.oId,
					kw: '',
					page: 1,
					size: 10000,
				}
				Service.record(_sendData).then(res =>{
					if(res.Flag){
						// 处理返回的html标签
						this.recordList = res.Content.List;
						this.recordList.forEach((item) =>{
							item.Text = item.Text.replace(/<th/g, "<td");
							let _time = (new Date(item.Date)).getTime();
							item.Date = util.formatTime(_time, 'Y-M-D h:s:m');
						})
					}else{
						uni.showToast({
							title:'请求失败',
							icon: 'none'
						})
					}
					this.loadingStatus = 'noMore'
				})
			},
			getData(){
				Service.orderDetail(this.oId).then(res =>{
					if(res.Flag){
						this.model = res.Content;
						// 存入缓存
						const _data = {
								tel:this.model.Tel,
								address:this.model.Address,
								orderTime:this.formatTime(this.model.OrderDate), //格式更改
								predictTime:this.formatTime(this.model.DeliveryDate),
								remark:this.model.Desc,
								payment:{
									label:this.model.PayType.Name,
									value:this.model.PayType.Id,
								},
								customer:{
									label:this.model.Customer.Name,
									value:this.model.Customer.Id,
								},
								contact:{
									label:this.model.Contact.Name,
									value:this.model.Contact.Id,
								}
							}
							
						if(this.model.Tags.length>0){
							_data.state = {
								label:this.model.Tags[0].ItemValue,
								value:this.model.Tags[0].ItemId
							}
						}
						if(this.model.Products.length>0){
							let products = this.model.Products.map(item =>{
								return {
									name:item.Name,
									price:item.Price,
									unit:item.Unit,
									id: item.Id,
									count: item.Count,
								}
							})
							_data.products = products;
						}
						uni.setStorageSync('order_data', JSON.stringify(_data))
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
					uni.hideLoading()
				})
			},
			toEdit(){ 
				let that = this;
				
				
				uni.navigateTo({
					url:'../editOrder/editOrder?oId='+that.oId
				})
			},
			follow(){
				this.model.IsFollow = !this.model.IsFollow;
				Service.followOrder(this.oId,this.model.IsFollow?'1':'0').then(res =>{
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
			bindClick(){
				this.follow()
			},
			formatTime(srcDate){
				let timestamp = (new Date(srcDate)).getTime();
				return util.formatTime(timestamp, 'Y-M-D');
			},
			delOrder(){
				this.$refs.popup.close();
				Service.delOrder(' ='+ this.oId).then(res =>{
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
			}
			
		}
	}
</script>

<style lang="scss">
page{
	background: $uni-bg-color-grey;
}

.w-popup-sm{
	position: fixed;
	right: 10upx;
	top: 10upx;
	width: 30%;
	border-radius: 10upx;
	padding: 20upx;
	background: #fff;
	color: #333;
	.w-popup-item{
		font-size: 28upx;
		width: 100%;
		padding-bottom: 20upx;
		border-bottom: 1upx solid #EEEEEE;
		&:last-child{
			border: none;
			padding: 0;
		}
		[class^='icon']{
			font-size: 28upx;
			margin-right: 10upx;
			color: #007AFF;
		}
	}
	
}
.container{
	.header{
		position: fixed;
		top: 0;
		left: 20upx;
		right: 20upx;
		background: $uni-bg-color-grey;
		border-radius: 10upx;
		.top{
			height: 150upx;
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
	
	.content{
		padding: 20upx;
		&:before{
			content: '';
			display: block;
			height: 360upx;
		}
		.record-item{
			padding: 10upx 20upx;
			background: #FFFFFF;
			border-radius: 10upx;
			margin-bottom: 20upx;
			.tags{
				height: 50upx;
				@include custom-flex(flex-start, center)
			}
			.text{
				color: $uni-text-color;
				font-size: $uni-font-size-base;
				padding: 20upx 0;
			}
			.info{
				color: $uni-text-color-grey;
				font-size: $uni-font-size-sm;
				.user{
					margin-right: 30upx;
				}
			}
		}
	}
}
</style>
