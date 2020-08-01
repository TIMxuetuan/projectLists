<template>
	<view>
		<view class="balance-withdrawal">
			<!--银行卡名称-->
			<view class="balance-withdrawal-name">
				<view class="">提现至</view>
				<view class="withdrawal-name-right">
					<image src="../../../static/img/My/工商银行.png" mode=""></image>
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
						<u-input v-model="model.price" type="number" />
					</u-form-item>
				</u-form>
				<view class="cash-amount-state">
					可提现余额￥30000.00，不可全部提现
				</view>
			</view>

			<!--提现按钮-->
			<view class="balance-content-btn">
				<u-button shape="circle" type="error" :disabled=" model.price == '' ?  true : false " @click="gotoAuthentication">2小时提现, 确认提现</u-button>
			</view>
		</view>

		<!--支付密码框-->
		<u-popup border-radius="10" v-model="payShow" @close="close" :mode="payMode" length="50%" :mask="payMask"
		 :closeable="closeable" :close-icon-pos="closeIconPos">
			<view class="pay-content">
				<view class="authentication-title">
					请输入支付密码
				</view>
				<view class="authentication-input">
					<u-message-input :mode="mode" :maxlength="maxlength" :value="value" :bold="bold" @finish="finish" :dot-fill="dotFill"
					 :breathe='false'></u-message-input>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					price: ''
				},
				labelLeft: {
					fontSize: '28rpx',
					color:'#444444'
				},

				//弹出支付框的属性
				payShow: false,
				payMode: 'bottom',
				payMask: true, // 是否显示遮罩
				closeable: true,
				closeIconPos: 'top-right',

				//支付密码框属性
				mode: 'box',
				maxlength: 6,
				value: '',
				bold: true,
				dotFill: true,
			};
		},
		methods: {
			//跳转到身份验证页面
			gotoAuthentication() {
				console.log('跳转')
				this.payShow = true
			},

			//关闭支付弹窗
			close() {
				this.payShow = false;
			},

			//支付密码输入完成
			finish(value) {
				console.log(value)
				uni.navigateTo({
					url: '/pages/my/showResult/showResult'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.balance-withdrawal {
		padding: 0 40rpx;
		background-color: #fff;

		.balance-withdrawal-name {
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1px solid #D2D2D2;
			display: flex;
			justify-content: space-between;

			.withdrawal-name-right {
				display: flex;
				justify-content: space-around;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				.name-right-card {
					margin: 0 10rpx 0 20rpx;
				}
			}
		}
	}

	//提现金额样式、
	.cash-amount {
		margin-top: 30rpx;

		.cash-amount-title {
			color: #7C7C7C;
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}
	}

	.cash-amount-state {
		margin-top: 12rpx;
		color: #8E918E;
		font-size: 24rpx;
	}

	.balance-content-btn {
		margin-top: 80rpx;
	}

	.pay-content{
		height: 100%;
		margin-top: 150rpx;
		padding: 0 20rpx;
	}
	
	.authentication-title {
		color: #444444;
		font-size: 28rpx;
	}

	.authentication-input {
		margin-top: 54rpx;
	}
</style>
