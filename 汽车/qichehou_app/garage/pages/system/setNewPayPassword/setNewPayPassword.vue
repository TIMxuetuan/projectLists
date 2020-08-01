<template>
	<view>
		<view class="setpay-password">
			<view class="setpay-password-item">
				<view class="password-item-title">
					请输入支付密码
				</view>
				<view class="">
					<u-message-input :mode="mode" :maxlength="maxlength" :value="valueOne" @change="finishOne" :bold="bold" :dot-fill="dotFill"
					 :breathe='false'></u-message-input>
				</view>
			</view>
			<!--再次输入密码-->
			<view class="setpay-password-item">
				<view class="password-item-title">
					请再次输入支付密码
				</view>
				<view class="">
					<u-message-input :mode="mode" :maxlength="maxlength" :value="valueTwo" @change="finishTwo" :bold="bold" :dot-fill="dotFill"
					 :breathe='false'></u-message-input>
				</view>
			</view>

			<view class="uview_from_button">
				<u-button shape="circle" type="error" @click="affirmClick">提交</u-button>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../../common/public.js'
	import Services from '../../../services/app.js';
	export default {
		data() {
			return {
				..._data,
				//支付密码框属性
				valueOne: '',
				mode: 'box',
				maxlength: 6,
				bold: true,
				dotFill: true,

				//再次输入密码
				valueTwo: '',
			};
		},
		methods: {
			..._methods,
			//支付密码输入完成
			finishOne(value) {
				console.log(value)
				this.valueOne = value
			},

			//再次输入支付密码完成
			finishTwo(value) {
				console.log(value)
				this.valueTwo = value
			},

			/*修改确认*/
			affirmClick() {
				console.log('两个', this.valueOne, this.valueOne.length, this.valueTwo)
				if (!this.valueOne) {
					this.show_toast("支付密码不能为空")
					return
				}
				if (this.valueOne.length != 6) {
					this.show_toast("支付密码不正确")
					return
				}
				if (this.valueTwo != this.valueOne) {
					this.show_toast("两次支付密码不一致")
					return
				}

				let postObj = {
					Email: 'wangshenge@keji01.com',
					Password: "wsg19980607.."
				};

				console.log("postObj:", postObj)

				uni.switchTab({
					url: '/pages/my/my'
				});
				return

				Services.safetyLogin(postObj).then(res => {
					console.log(res)
					this.show_toast("登录成功")
					uni.switchTab({
						url: '/pages/my/my'
					});
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.setpay-password {
		padding: 20px;
	}

	.setpay-password-item {

		.password-item-title {
			margin-bottom: 40rpx;
			font-size: 28rpx;
			color: #444444;
		}
	}

	.uview_from_button {
		margin: 100rpx auto 0;
	}
</style>
