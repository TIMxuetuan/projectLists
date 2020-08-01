<template>
	<view>
		<view class="balance-content">
			<view class="balance-content-title">账户余额（元）</view>
			<view class="balance-content-money">￥<text>9999.99</text></view>
			<view class="balance-content-btn">
				<u-button :custom-style="balanceBtn" shape="square" type="error" @click="withdrawClick">提现</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balanceBtn:{
					width:'400rpx',
					height:'80rpx',
					borderRadius:'10rpx'
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

<style lang="scss" scoped>
.balance-content{
	display: flex;
	flex-direction: column;
	align-items: center;
	.balance-content-title{
		font-size: 24rpx;
		margin-top: 132rpx;
	}
	.balance-content-money{
		font-size: 40rpx;
		margin-top: 40rpx;
		text{
			font-size: 60rpx;
		}
	}
	.balance-content-btn{
		margin-top: 80rpx;
	}
}
</style>
