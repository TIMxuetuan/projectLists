<template>
	<view>
		<view class="pay-result">
			<view class="pay-result-tick">
				<image src="../../static/img/product/tick.png" mode=""></image>
			</view>
			<view class="pay-result-text">
				支付成功
			</view>
			<view class="pay-result-btn">
				<u-button shape="circle" type="error" plain :custom-style="addAddressStyle" @click="gotoaddAddress">
					查看订单
				</u-button>
				<u-button shape="circle" :custom-style="addAddressStyle" @click="gotoIndex">
					返回首页
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//查看订单按钮
				addAddressStyle:{
					width:'400rpx',
					height:'80rpx',
					marginBottom:'40rpx'
				},
				
				//返回首页按钮
				payment:{
					width:'400rpx',
					height:'80rpx',
				},
				
				productLists: [{
						id: 1,
						name: '郑州金牛汽修厂',
						type: 1,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: [{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							},
							{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							}
						]
				
					}]
			};
		},
		methods:{
			
			//跳转查看订单
			gotoaddAddress(){
				let item = this.productLists[0]
				console.log(item)
				uni.navigateTo({
					url: '/pages/orderForm/orderDetails/orderDetails?productsItem=' + encodeURIComponent(JSON.stringify(item))
				});
			},
			
			//返回首页
			gotoIndex(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay-result{
		padding: 56rpx 40rpx 0;
		
		.pay-result-tick{
			margin: 0 auto 40rpx;
			width: 154rpx;
			height: 154rpx;
			background-color: #00C800;
			border-radius: 50%;
			padding: 18rpx;
			image{
				width: 120rpx;
				height: 120rpx;
			}
		}
		
		.pay-result-text{
			font-size: 32rpx;
			color: #444444;
			text-align: center;
		}
		
		.pay-result-btn{
			margin: 100rpx auto 0;
		}
	}

</style>
