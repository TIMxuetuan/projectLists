<template>
	<view class="login_content">
		<!--LOGO-->
		<view class="logo">
			<image src="../../static/img/imgIcon.png" mode=""></image>
		</view>
		<template>
			<u-form class="uview_from" :model="model" ref="uForm" style="margin-bottom: 40rpx;">
				<u-form-item :border-bottom="true" label-width="50" left-icon="account">
					<u-input v-model="model.phone" placeholder="请输入手机号" type="number" />
				</u-form-item>

				<u-form-item class="auth_code_style" :border-bottom="true" label-width="50" left-icon="account">
					<u-input v-model="model.authCode" placeholder="请输入验证码" type="number" />
					<u-button hover-class="none" slot="right" type="primary" @click="sendCode" :disabled="smsFlag">{{sendTime}}</u-button>
				</u-form-item>

				<u-form-item :border-bottom="true" label-width="50" left-icon="account">
					<u-input v-model="model.password" type="password" placeholder="请输入新密码" :password-icon="true" />
				</u-form-item>

			</u-form>
		</template>
		<u-button shape="circle" type="primary" @click="affirmClick">确认</u-button>
	</view>
</template>

<script>
	import MethodAll from '../../common/methodAll.js'
	import Services from '../../services/app.js';
	let method_all = new MethodAll();
	export default {
		data() {
			return {
				model: {
					phone: "18237203633",
					authCode: "",
					password: "22"
				},
				//获取验证码属性
				smsFlag: false,
				sendTime: "获取验证码",
				snsMsgWait: 10
			};
		},
		created() {

		},
		methods: {
			//获取验证码
			sendCode() {
				if (!this.model.phone) {
					method_all.show_toast("手机号不能为空")
					return
				}
				if (!method_all.checkPhone(this.model.phone)) {
					method_all.show_toast("手机号格式不正确")
					return
				}
				this.smsFlag = true;
				//60秒后重新获取验证码
				// let postObj = method_all.postApply({
				// 	type: "reg",
				// 	mphone: this.model.phone
				// });
				let postObj = {
					type: "reg",
					mphone: this.model.phone
				};
				console.log("postObj:", postObj);
				console.log(Services.getSendCode)
				Services.getSendCode(postObj).then(res => {
					console.log(res)
					method_all.show_toast("发送成功")
				})
				var inter = setInterval(
					function() {
						this.sendTime = this.snsMsgWait + "秒后重发";
						this.snsMsgWait = this.snsMsgWait - 1;
						if (this.snsMsgWait < 0) {
							clearInterval(inter);
							this.sendTime = "获取验证码";
							this.snsMsgWait = 10;
							this.smsFlag = false;
						}
					}.bind(this),
					1000
				);
				console.log(66666);
			},

			/*修改确认*/
			affirmClick() {
				if (!this.model.phone) {
					method_all.show_toast("手机号不能为空")
					return
				}
				if (!method_all.checkPhone(this.model.phone)) {
					method_all.show_toast("手机号格式不正确")
					return
				}
				if (!this.model.authCode) {
					method_all.show_toast("验证码不能为空")
					return
				}
				if (!this.model.phone) {
					method_all.show_toast("新密码不能为空")
					return
				}

				// let postObj = method_all.addApply({
				// 	idCard: "410526199806185330",
				// 	mphone: "18237203633",
				// 	password: "wsg19980607.."
				// });

				let postObj = {
					Email: 'wangshenge@keji01.com',
					Password: "wsg19980607.."
				};

				console.log("postObj:", postObj)

				Services.safetyLogin(postObj).then(res => {
					console.log(res)
					method_all.show_toast("登录成功")
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login_content {
		padding: 100rpx 80rpx 60rpx;

		.logo {
			width: 200rpx;
			height: 200rpx;
			box-sizing: border-box;
			margin: 0 auto 60rpx;

			image {
				width: 200rpx;
				height: 200rpx;
			}
		}
	}

	.u-form-item {
		padding: 0;
		height: 90rpx;
		line-height: 90rpx;
	}

	.else_content {
		display: flex;
		justify-content: center;
		margin-top: $wang-margin-index;
	}

	.cut_off {
		width: 1px;
		height: 36rpx;
		background-color: #999;
		margin: 0 $wang-margin-index;
	}

	.uview_from {
		.u-border-bottom:after {
			border-bottom: 1px solid #999;
		}
	}

	.auth_code_style {
		.u-btn {
			width: 160rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 12px;
			background-color: #fff;
			color: #39ABE8;
		}

		/deep/ .u-btn--primary {
			font-size: 12px;
			background-color: #fff;
			color: #39ABE8;
		}

		/deep/ .u-btn--primary--disabled {
			background-color: #fff !important;
			color: #39ABE8 !important;
		}
	}
</style>
