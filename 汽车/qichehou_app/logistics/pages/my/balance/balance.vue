<template>
	<view>
		<view class="balance-content">
			<view class="balance-content-title">账户余额（元）</view>
			<view class="balance-content-money">99999.99</view>
			<view class="balance-content-btn">
				<u-button :custom-style="balanceBtn" shape="square" type="primary" @click="withdrawClick">提现</u-button>
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
				balanceBtn:{
					width:'400rpx',
					height:'90rpx'
				}
			};
		},
		methods:{
			//跳转提现金额页面
			withdrawClick(){
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
.balance-content{
	display: flex;
	flex-direction: column;
	align-items: center;
	.balance-content-title{
		font-size: 24rpx;
		margin-top: 120rpx;
	}
	.balance-content-money{
		font-size: 48rpx;
		margin-top: 60rpx;
	}
	.balance-content-btn{
		margin-top: 100rpx;
	}
}
</style>
