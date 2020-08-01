<template>
	<view>
		<view class="balance-withdrawal">
			<!--银行卡名称-->
			<view class="balance-withdrawal-name">
				<view class="">提现至</view>
				<view class="withdrawal-name-right">
					<image src="../../../static/img/deng.png" mode=""></image>
					<view class="name-right-card">
						中国工商银行储蓄卡（2848）
					</view>
					<view class="">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<!--提现金额-->
			<view class="cash-amount">
				<view class="cash-amount-title">提现金额</view>
				<u-form :model="model" ref="uForm">
					<u-form-item label="￥" label-width="40" :label-style="labelLeft">
						<u-input v-model="model.price" placeholder="" type="number"/>
					</u-form-item>
				</u-form>
				<view class="cash-amount-state">
					可提现余额￥30000.00，不可全部提现
				</view>
			</view>
			
			<!--提现按钮-->
			<view class="balance-content-btn">
				<u-button shape="square" type="primary" :disabled=" model.price == '' ?  true : false " @click="gotoAuthentication">2小时提现，确认提现</u-button>
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
				model:{
					price:''
				},
				labelLeft:{
					fontSize:'40rpx'
				},
			};
		},
		methods:{
		..._methods,
			//跳转到身份验证页面
			gotoAuthentication(){
				uni.navigateTo({
					url: '/pages/my/balanceWithdrawal/balanceWithdrawal'
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: rgba(238, 238, 238, 1);
	}
</style>

<style lang="scss" scoped>
.balance-withdrawal{
	padding: 0 20rpx;
	background-color: #fff;
	.balance-withdrawal-name{
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px solid #D2D2D2;
		display: flex;
		justify-content: space-between;
		.withdrawal-name-right{
			display: flex;
			justify-content: space-around;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
			}
			.name-right-card{
				margin: 0 10rpx 0 20rpx;
			}
		}
	}
}

//提现金额样式、
.cash-amount{
	margin-top: 30rpx;
	.cash-amount-title{
		color: #7C7C7C;
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}
}

.cash-amount-state{
	margin-top: 20rpx;
	color: #8E918E;
}

.balance-content-btn{
	margin-top: 80rpx;
}

</style>
