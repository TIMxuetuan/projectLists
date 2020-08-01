<template>
	<view>

		<view class="show-result">
			<!--中间提示内容-->
			<view class="content-hint">
				<image src="../../../static/img/duihao.png" mode=""></image>
				<view class="content-hint-text">提交申请成功，等待银行处理</view>
				<view class="content-hint-second">预计2小时内到账</view>
			</view>

			<!--金额和方式-->
			<view class="money-may">
				<view class="money-may-item">
					<view class="">提现金额</view>
					<view class="">￥<text style="font-size: 32rpx;">20000</text></view>
				</view>
				<view class="money-may-item">
					<view class="">提现方式</view>
					<view class="">中国工商银行储蓄卡(2848)</view>
				</view>
			</view>
			
			<!--完成按钮-->
			<view class="accomplish-btn">
				<u-button shape="circle" type="error" @click="accomplish">完成</u-button>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneyNumber: '',
				moneyMay: ''
			};
		},
		methods:{
			accomplish(){
				uni.navigateBack({
					delta: 3,
					animationType: 'pop-out',
					animationDuration: 1000
				});
			}
		}
	}
</script>

<style lang="scss">
	.show-result {
		padding: 0 40rpx;
		margin-top: 90rpx;

		.content-hint {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 92rpx;
				height: 92rpx;
				background-color: #00C800;
				border-radius: 50%;
				padding: 14rpx;
			}

			.content-hint-text {
				margin: 40rpx 0 20rpx;
				font-size: 32rpx;
				color: #444444;
			}

			.content-hint-second {
				color: #5A5A5A;
				font-size: 24rpx;
			}
		}
	}

	.money-may {
		margin-top: 80rpx;
		.money-may-item{
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid rgba(167,167,167,0.5);
			font-size: 28rpx;
			color: #444444;
		}
	}
	
	.accomplish-btn{
		margin-top: 60rpx;
	}
</style>
