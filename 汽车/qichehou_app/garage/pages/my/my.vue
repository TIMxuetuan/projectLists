<template>
	<view class="login_container">
		<!--自定义头部导航内容-->
		<view>
			<view class="head-module">
				<view class="status_bar">
					<!-- 这里是状态栏 -->
				</view>
				<view class="head_title"></view>
				<!--LOGO-->
				<view class="logo">
					<image src="../../static/img/imgIcon.png" mode=""></image>
					<text>郑州金牛汽修厂</text>
				</view>
			</view>
		</view>

		<!--中心内容模块-->
		<view class="content-my">
			<!--余额和定单-->
			<view class="balance-order">
				<!--余额积分-->
				<view class="balance-order-money">
					<view class="balance-money border-right" @click="toMyWallet">
						<text class="balance-money-title">账户余额(元)</text>
						<text class="balance-money-number">39872</text>
					</view>

					<view class="balance-money">
						<text class="balance-money-title">我的积分</text>
						<text class="balance-money-number">3998</text>
					</view>
				</view>

				<!--我的定单-->
				<view class="order-form">
					<view class="order-form-head">
						<view class="order-head-left">
							我的订单
						</view>
						<view class="order-head-right" @click='seeOrderForm'>
							查看全部订单<u-icon style="margin-left: 20rpx;" name="arrow-right"></u-icon>
						</view>
					</view>
					<view class="order-form-content">
						<block v-for="item in myOrderFrom">
							<view class="from-content-items">
								<image :src="item.image" mode=""></image>
								<text>{{item.name}}</text>
							</view>
						</block>
					</view>
				</view>
			</view>

			<!--四个设置类-->
			<view class="four-set">
				<!-- <u-cell-group>
					<u-cell-item title="收货地址"></u-cell-item>
					<u-cell-item title="系统设置"></u-cell-item>
					<u-cell-item title="关于我们"></u-cell-item>
					<u-cell-item title="帮助中心"></u-cell-item>
				</u-cell-group> -->
				<block v-for="item in fourSetLists">
					<view class="four-set-item" @click="gotoPageClick(item)">
						<view class="">
							{{item.name}}
						</view>
						<view class="">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</block>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../common/public.js'
	import Services from '../../services/app.js';
	export default {
		data() {
			return {
				..._data,
				myOrderFrom: [{
						image: '../../static/img/My/daifukuan.png',
						name: "待付款"
					},
					{
						image: '../../static/img/My/daifahuo.png',
						name: "待发货"
					},
					{
						image: '../../static/img/My/yifahuo.png',
						name: "待收货"
					},
					{
						image: '../../static/img/My/tuikuan.png',
						name: "退款/售后"
					},
				],
				fourSetLists:[
					{
						name:'收货地址',
						id:1
					},
					{
						name:'系统设置',
						id:2
					},
					{
						name:'关于我们',
						id:3
					},
					{
						name:'帮助中心',
						id:4
					}
				]
			};
		},
		methods: {
			..._methods,
			//跳转我的钱包页面
			toMyWallet() {
				uni.navigateTo({
					url: '/pages/my/myWallet/myWallet'
				});
			},
			
			//跳转到其他页面 --1.收货地址 2.系统设置 3.关于我们 4.帮助中心
			gotoPageClick(item){
				console.log(item)
				if(item.id == 1){
					//跳转收货地址
				}else if(item.id == 2){
					//跳转系统设置
					uni.navigateTo({
						url: '/pages/system/systemSetup/systemSetup'
					});
				}else if(item.id == 3){
					//跳转关于
					uni.navigateTo({
						url: '/pages/my/aboutUs/aboutUs'
					});
				}else if(item.id == 4){
					//跳转帮助中心
					uni.navigateTo({
						url: '/pages/my/helpCenter/helpCenter'
					});
				}
			},
			
			//查看全部订单， 下面的分项可以根据状态码来进入展示
			seeOrderForm(){
				//跳转全部订单
				uni.navigateTo({
					url: '/pages/orderForm/myOrderForm/myOrderForm'
				});
			}

		}
	}
</script>

<style scoped lang="scss">
	page {
		position: relative;
		height: 100%;
	}

	.login_container {
		width: 100%;
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		background-color: rgba(238, 238, 238, 1);
	}

	//头部样式
	.head-module {
		width: 100%;
		height: 250rpx;
		padding: 0 40rpx;
		background-color: #EC3333;

		.head_title {
			text-align: center;
			height: 70rpx;
			line-height: 70rpx;
		}

		.logo {
			box-sizing: border-box;
			// margin: 20rpx 0 0;
			display: flex;
			align-items: center;

			image {
				width: 100rpx;
				height: 100rpx;
			}

			text {
				color: #fff;
				font-size: 32rpx;
				margin-left: 30rpx;
			}
		}
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	//中心内容样式
	.content-my {
		.balance-order {
			margin: 12rpx 0;
			padding: 0;

			.balance-order-money {
				width: 100%;
				height: 180rpx;
				background-color: #fff;
				border-radius: 10rpx;
				padding: 25px 0;
				display: flex;

				.balance-money-title {
					font-size: 24rpx;
					color: #5A5A5A;
				}

				.balance-money-number {
					font-size: 40rpx;
					color: #000;
				}

				.balance-money {
					width: 50%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
				}

				.border-right {
					border-right: 1px solid #D2D2D2;
				}
			}

			.order-form {
				width: 100%;
				height: 254rpx;
				background-color: #fff;
				border-radius: 10rpx;
				margin: 12rpx 0;
				padding: 0 20rpx;
			}
		}
	}

	.order-form-head {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #000;
		// border-bottom: 1px solid #D2D2D2;

		.order-head-left {
			font-size: 32rpx;
		}

		.order-head-right {
			color: #8F918F;
			display: flex;
			justify-content: space-between;
		}
	}

	.order-form-content {
		display: flex;
		justify-content: space-around;

		.from-content-items {
			width: 120rpx;
			height: 140rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			font-size: 24rpx;
			color: #5A5A5A;
			image {
				width: 60rpx;
				height: 60rpx;
				display: block;
				border-radius: 50%;
				background-color: #EC3333;
				padding: 20rpx;
			}
		}
	}
	
	.four-set{
		padding: 0 40rpx;
		background-color: #FFFFFF;
	}
	.four-set-item{
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px solid rgba(167,167,167,0.5);
		font-size: 28rpx;
		color: #444444;
	}
	.four-set-item:last-child{
		border-bottom: none;
	}
</style>
