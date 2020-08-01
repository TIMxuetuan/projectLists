<template>
	<view class="login_container">
		<!--自定义头部导航内容-->
		<view>
			<view class="head-module">
				<!--LOGO-->
				<view class="logo">
					<image src="../../static/img/imgIcon.png" mode=""></image>
					<text>四知物流</text>
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
						<text>39872</text>
						<text>账户余额(元)</text>
					</view>

					<view class="balance-money">
						<text>3998</text>
						<text>我的积分</text>
					</view>
				</view>				
			</view>

			<!--四个设置类-->
			<view class="four-set">				
				<view class="four-set-item" @click="GotoPage(1)">
					<view class="">系统设置</view>
					<view class=""><u-icon name="arrow-right"></u-icon></view>
				</view>
				<view class="four-set-item">
					<view class="">关于我们</view>
					<view class=""><u-icon name="arrow-right"></u-icon></view>
				</view>
				<view class="four-set-item">
					<view class="">帮助中心</view>
					<view class=""><u-icon name="arrow-right"></u-icon></view>
				</view>				
			</view>
		</view>

	</view>
</template>

<script>
    import {_data,_methods,util} from '@/common/public.js'
	import Services from '../../services/app.js';
	export default {
		data() {
			return {
				..._data
			};
		},
		methods: {
			..._methods,
			GotoPage(item)
			{
				if(item=='1')
				uni.navigateTo({
					url: '/pages/my/setting/setting'
				});
			},
			//跳转我的钱包页面
			toMyWallet(){
				uni.navigateTo({
					url: '/pages/my/myWallet/myWallet'
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
		height: 200rpx;
		padding: 0 40rpx;
		background-color: #EF744D;		
		.logo {
			box-sizing: border-box;
			// margin: 20rpx 0 0;
			display: flex;
			align-items: center;

			image {
				width: 130rpx;
				height: 130rpx;
			}

			text {
				color: #fff;
				margin-left: 20rpx;
			}
		}
	}

	//中心内容样式
	.content-my {
		.balance-order {
			margin: 20rpx 0;

			.balance-order-money {
				width: 100%;
				height: 180rpx;
				background-color: #fff;
				border-radius: 10rpx;
				padding: 20px 0;
				display: flex;

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
