<template>
	<view class="container">
		<scroll-view id="tab-bar" class="menu" :scroll-x="true" :show-scrollbar="false" :scroll-with-animation='true' :scroll-into-view="scrollInto">
			<view  class="uni-tab-item" v-for="(item, index) in tabBars" :key='item.id' :id='item.id' @tap="ontabtap(item, index)">
				<text class="uni-tab-item-title" :class="[tabIndex === index ? 'uni-tab-item-title-active': '']">{{item.name}}</text>
			</view>
		</scroll-view>
		<view class="content">
			<view class="item" v-for="(item, index) in dataList" :key='index' @tap='jumpTo(item.id)'>
				<view class="row">
					<view class="title">订单号：{{item.orderId}}</view>
					<view><uni-tag :text="item.state" :inverted='true' type='primary' size='small'></uni-tag></view>
				</view>
				<view class="info">
					<text>负责人：{{item.owner}}</text>
					<text>客户：{{item.customer}}</text>
					<text>联系人：{{item.contact}}</text>
					<text>总金额：{{item.price}}</text>
					<text>发货日期：{{item.date}}</text>
				</view>
			</view>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</view>
		
		<navigator url="./newOrder/newOrder" class="add-button" ><text class="iconfont text">&#xe654;</text></navigator>
	</view>
</template>

<script>
	import Service from '@/services/crm.js'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	export default {
		components:{
			uniLoadMore,
			uniTag
		},
		data() {
			return {
				tabBars: [{
					id: "tab01",
					name: '我关注的',
					type:1   //type值对应的，不能错
				}, {
					id: "tab02",
					name: '我的订单',
					type:2
				}, {
					id: "tab03",
					name: '下属订单',
					type:3
				}],
				scrollInto:'',
				tabIndex:1,
				dataList:[],
				loadingStatus:'more',
				params:{
					tagid:'',
					page:1,
					kind:2,
					kw:'',
					size:10,
					sort:0,
					lowers:'',
				}
			};
		},
		onShow() {
			this.params.page = 1;
			this.dataList = [];
			this.getDataList()
		},
		onReachBottom() {
			this.getDataList()
		},
		methods:{
			ontabtap(item, index){
				this.scrollInto = item.id;
				this.tabIndex = index;
				this.params.kind = item.type;
				// 切换类型，dataList要清空，页数也要从1开始
				this.params.page = 1;
				this.dataList = [];
				this.getDataList()
			},
			getDataList(){
				
				if(this.params.page === 1 && this.dataList.length > 0){
					return;
				}
				this.loadingStatus = 'loading'
				Service.crmOrder(this.params).then(res =>{
					if(res.Flag){
						const _dataArr = res.Content.List.map(item =>{
							return {
								id:item.Id,
								orderId: item.OrderId,
								state: item.State.ItemValue,
								owner: item.Owner.Name,
								customer: item.Customer.Name,
								contact: item.Contact.Name,
								price: item.TotalPrice,
								date: item.DeliveryDate
							}
						})
						this.dataList = this.dataList.concat(_dataArr);
						
						// 请求成功，判断数据是否请求完了
						if(res.Content.List.length < this.params.size){
							this.loadingStatus = 'noMore';
						}else{
							this.loadingStatus = 'more';
							this.params.page++;
						}
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
				})
			},
			jumpTo(id){
	
				uni.navigateTo({
					url:'./orderDetail/orderDetail?oId='+id
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: $uni-bg-color-grey;
}
.container{
	.menu{
		white-space: nowrap;
		height: 100upx;
		background: #fff;
		border-bottom: 1px solid #eee;
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		view{
			display: inline-block;
			padding: 0 20upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 36upx;
			.uni-tab-item-title {
				color: #333;
				font-size: 30upx;
				height: 100upx;
				line-height: 100upx;
				flex-wrap: nowrap;
				/* #ifndef APP-PLUS */
				white-space: nowrap;
				/* #endif */
			}
			.uni-tab-item-title-active {
				color: #007AFF;
			}
		}
	}
	.content{
		padding: 20upx;
		&:before{
			content: '';
			display: block;
			height: 100upx;
		}
		.item{
			padding: 20upx;
			background: #FFFFFF;
			border-radius: 10upx;
			margin-bottom: 20upx;
			color: $uni-text-color;
			
			.row{
				display: flex;
				justify-content: space-between;
				.title{
					font-size: $uni-font-size-lg;
					font-weight: bold;
				}
			}
			.info{
				margin-top: 30upx;
				display: flex;
				flex-direction: column;
				text{
					font-size: $uni-font-size-base;
					color: $uni-text-color-grey;
				}
			}
		}
		
	}
	
	// 新建按钮
	.add-button {
		background: $uni-text-color-blue;
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
		position: fixed;
		bottom: 130upx;
		right: 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 87;
		.text {
			color: #ffffff;
			font-size: 40upx;
		}
	}
}
</style>
