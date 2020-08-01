<template>
	<view class="hope-center-page">
		<view class="hope-center">
			<view class="hope-center-title">
				常见问题
			</view>
			<view class="hope-center-container">
				<block v-for="item in hopeLists">
					<view class="center-container-item" @click="gotoCommonIssue">
						<view class="">
							{{item.text}}
						</view>
						<view class="">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</block>
			</view>
			<!--联系客服-->
			<view class="relation-service" @click="serviceOpen">
				<image src="../../../static/img/My/customerservice.png" mode=""></image>
				<text>联系客服</text>
			</view>
		</view>

		<!--联系客服弹出层-->
		<view class="service-popup">
			<u-popup v-model="serviceShow" mask mode="center" :closeable='true' width="440rpx" height="200rpx" border-radius="10">
				<view class="service-popup-text">
					<view class="service-popup-title">客服电话：400-190910</view>
					<view class="service-popup-time">
						服务时间：08:00-21:30
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				hopeLists: [{
						text: '交易下单过程中不能付款？'
					},
					{
						text: '如何申请退款？'
					},
					{
						text: '和卖家聊天，消息发不出去？'
					},
					{
						text: '余额如何提现？'
					},
					{
						text: '余额如何提现？'
					},
				],
				serviceShow: false,
				//联系客服弹出框样式

			};
		},
		methods: {
			//显示联系客服弹出层
			serviceOpen() {
				this.serviceShow = true
			},
			
			//跳转常见问题详情页面，根据每个问题标识，来展示不同的详情内容
			gotoCommonIssue(){
				uni.navigateTo({
					url: '/pages/my/commonIssue/commonIssue'
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: rgba(241, 241, 241, 1);
	}
</style>

<style lang="scss" scoped>
	.hope-center-page {
		position: relative;
	}

	.hope-center {
		.hope-center-title {
			font-size: 28rpx;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 40rpx;
			color: #5A5A5A;
		}
	}

	.hope-center-container {
		background-color: #fff;
		padding: 0 40rpx;

		.center-container-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			border-bottom: 1px solid rgba(167, 167, 167, 0.5);
		}

		.center-container-item:last-child {
			border-bottom: none;
		}

	}

	.relation-service {
		position: fixed;
		bottom: 0;
		background-color: #fff;
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 16rpx;
		}

		text {
			font-size: 28rpx;
			color: #444444;
		}
	}

	//联系客服弹出层
	.service-popup {
		.service-popup-text {
			height: 100%;
			padding: 60rpx 0 0 0;
			text-align: center;
		}

		/deep/ .u-close--top-right {
			top: 14rpx;
			right: 14rpx;
		}

		.service-popup-title {
			color: #EC3333;
			font-size: 28rpx;
		}
		.service-popup-time{
			font-size: 24rpx;
			color: #5A5A5A;
			margin-top: 20rpx;
		}
	}
</style>
