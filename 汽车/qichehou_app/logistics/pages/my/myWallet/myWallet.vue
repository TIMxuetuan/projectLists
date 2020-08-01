<template>
	<view>
		<view class="myWalet-content">

			<!--账户银行卡和借钱-->
			<view class="account-money">

				<!--余额与银行卡-->
				<view class="balance-bank">
					<view class="balance-bank-top">
						<view class="balance-money">
							<text class="balance-money-title">账户余额(元)</text>
							<text class="balance-money-number">39872</text>
						</view>

						<view class="balance-money">
							<text class="balance-money-title">银行卡</text>
							<text v-if="bankCardNumber != '' &&  bankCardNumber != 0" @click="gotoBankCard">1</text>
							<text class="bank-card-binding" v-else @click="gotoAddCard">去绑定一张</text>
						</view>
					</view>

					<view class="color-wire"></view>

					<view class="can-borrow">
						<text class="can-borrow-title">授信额度</text>
						<text class="can-borrow-second">可借</text>
						<text>15000.00</text>
					</view>

				</view>
				<!--借钱模块-->
				<view class="lend-money">
					<view class="lend-money-title">
						借钱
					</view>
					<view class="lend-money-content">
						<view class="money-content-number">
							<text class="residue-money">15000.00</text>
							<text>剩余可借（元）</text>
						</view>
						<view class="">
							<u-button :custom-style="promptlyMoney" :hair-line="false" shape="circle">立即借款</u-button>
						</view>
					</view>
				</view>
			</view>
			<!--销售-->
			<view class="market">
				<view class="market-title">
					<view>销售</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="market-details">
					
					<view class="market-details-item">
						<view class="market-details-module">
							<view class="width-fill">
								今日总销售额（元）
							</view>
							<view class="width-fill details-module-price">
								2770.00
							</view>
						</view>
						<view class="">
							
						</view>
					</view>
					
					<view class="market-details-item">
						<view class="market-details-module">
							<view class="width-fill">
								销售金额（元）
							</view>
							<view class="width-fill details-module-price">
								2987.00
							</view>
						</view>
						<view class="market-details-module">
							<view class="width-fill">
								退款金额（元）
							</view>
							<view class="width-fill details-module-price">
								209.00
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--统计-->
			<view class="statistics">
				<view class="market-title">
					<view>销售</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="statistics-items">
					<view class="statistics-items-one">
						<text class="items-one-top">75.2%</text>
						<text>今日回款率</text>
					</view>
					<view class="statistics-items-one">
						<text class="items-one-top">2089.50</text>
						<text>今日已收款（元）</text>
					</view>
					<view class="statistics-items-one">
						<text class="items-one-top">689.00</text>
						<text>今日未收款（元）</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {_data,_methods,util} from '@/common/public.js'
	export default {
		data() {
			return {
			..._data,
				promptlyMoney: {
					width: '160rpx',
					height: '60rpx',
					fontSize: '24rpx',
					border: 'none'
				},
				bankCardNumber:1
			};
		},
		methods:{
			..._methods,
			//跳转 绑定银行卡页面
			gotoAddCard(){
				uni.navigateTo({
					url: '/pages/my/addBankCard/addBankCard'
				});
			},
			
			//跳转 银行卡页面
			gotoBankCard(){
				uni.navigateTo({
					url: '/pages/my/bankCards/bankCards'
				});
			},
		}
	}
</script>


<style>
	page {
		background-color: rgba(238, 238, 238, 1);
	}
</style>

<style lang="scss" scoped>
	.myWalet-content {
		padding: 0 40rpx;
		margin-bottom: 40rpx;
	}

	.account-money {
		margin-top: 20rpx;

		.balance-bank {
			width: 100%;
			padding: 40rpx;
			background-color: #fff;
			border-radius: 10rpx;

			.balance-bank-top {
				height: 100rpx;
				display: flex;
			}

			.balance-money {
				width: 50%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
			}
		}
	}

	.balance-money-title {
		font-size: 28rpx;
		color: #ABACAB;
	}

	.balance-money-number {
		font-size: 32rpx;
		color: #000;
	}

	.bank-card-binding {
		font-size: 32rpx;
		color: #479FF6;
	}

	.color-wire {
		width: 100%;
		height: 1px;
		background-color: #DBDBDB;
		margin: 15px 0 40rpx;
	}

	.can-borrow {
		font-size: 24rpx;
		color: #000;

		.can-borrow-title {
			font-size: 32rpx;
		}

		.can-borrow-second {
			font-size: 28rpx;
			color: #ABACAB;
			margin: 0 10rpx 0 40rpx;
		}
	}

	.lend-money {
		background-color: #4779F2;
		border-radius: 10rpx;
		padding: 20rpx;
		margin: 20rpx 0;
		height: 180rpx;
		color: #fff;
		font-size: 24rpx;

		.lend-money-title {
			font-size: 28rpx;
			margin-bottom: 30rpx;
		}

		.lend-money-content {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			.money-content-number {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.residue-money {
					font-size: 36rpx;
					font-weight: bold;
				}
			}
		}
	}

	
	//销售样式
	.market {
		height: 420rpx;
		padding: 40rpx 20rpx;
		background-color: #fff;
		border-radius: 20rpx;

		.market-title {
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			border-bottom: 1px solid #D2D2D2;
		}
		.market-details{
			height: 250rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-top: 20rpx;
			.market-details-item{
				display: flex;
				justify-content: space-between;
			}
			.market-details-module{
				display: flex;
				width: 50%;
				height: 100rpx;
				flex-wrap: wrap;
				align-content: space-between;
				font-size: 24rpx;
				color: #888888;
				.width-fill{
					width: 100%;
				}
				.details-module-price{
					font-size: 30rpx;
					color: #000;
				}
			}
		}
		
	}
	
	//收支统计样式
	.module-style{
		padding: 40rpx 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}
	
	.statistics{
		height: 260rpx;
		margin-top: 20rpx;
		@extend .module-style;
		.market-title {
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			border-bottom: 1px solid #D2D2D2;
		}
		.statistics-items{
			height: 80rpx;
			margin-top: 40rpx;
			display: flex;
			justify-content: space-around;
			.statistics-items-one{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				color: #D2D2D2;
				.items-one-top{
					color: #000;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
