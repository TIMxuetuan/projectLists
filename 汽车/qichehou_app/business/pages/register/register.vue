<template>
	<view class="register_content">
		<!--输入表单-->
		<u-form class="uview_from" :model="model" ref="uForm" style="margin-bottom: 40rpx;">
			<u-form-item class="from_item" label="手机号" :border-bottom="true" label-width="100" label-position="top"
			 :label-style="labelStyle">
				<u-input v-model="model.mphone" placeholder="请输入手机号" type="number" />
			</u-form-item>
	
			<u-form-item class="from_item" label="验证码" :border-bottom="true" label-width="100" label-position="top"
			 :label-style="labelStyle">
				<u-input v-model="model.vCode" placeholder="请输入验证码" type="number" />
				<u-button hover-class="none" slot="right" type="primary" @click="sendCode" :disabled="smsFlag">{{sendTime}}</u-button>
			</u-form-item>
	
			<u-form-item label="登录密码" label-position="top" :border-bottom="true" label-width="100" :label-style="labelStyle">
				<u-input v-model="model.password" type="password" placeholder="请输入密码" :password-icon="false" />
			</u-form-item>
		</u-form>
	
		<view class="config_btn">
			<u-button :disabled="model.mphone == '' ? true : (model.password == '' ? true : (model.vCode == '' ? true :false)) "
			 :custom-style="customStyle" shape="circle" type="primary" @click="user_login">注册</u-button>
		</view>
	
		<view class="register-footer">
			<view>
				<text>注册即表示同意</text>
				<text style="color:#0B35F2">《用户注册协议》</text>
			</view>
			<navigator url="/pages/login/login">登录</navigator>
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
				model: {
					mphone: '',
					password: '',
					vCode: ''
				},
				sendTime: "获取验证码",
				labelStyle: {
					"margin-bottom": "0",
					"height": "40rpx"
				},
				customStyle: {
					// "background-color":"#A6C0FF"
				},
				btnDisabled: true,
				smsFlag: false,
				snsMsgWait: 10,
				verify_id: ''
			};
		},
		onLoad(option) {

		},
		methods: {
			..._methods,
			user_login() {
				if (!this.model.mphone) {
					this.show_toast("手机号不能为空")
					return
				}

				if (!this.model.password) {
					this.show_toast("密码不能为空")
					return
				}
				let postObj = {
					mphone: this.model.mphone,
					password: this.model.password,
					vCode: this.model.vCode,
					verify_id: this.verify_id
				};
				Services.register(postObj).then(res => {
					console.log(res)
					// method_all.show_toast("注册成功")
					// setTimeout(function() {
					// 	uni.reLaunch({
					// 		url: '/pages/login/login'
					// 	})
					// }, 500)


				})
			},
			//获取验证码
			sendCode() {
				if (!this.model.mphone) {
					this.show_toast("手机号不能为空")
					return
				}

				this.smsFlag = true;
				//60秒后重新获取验证码
				let postObj = {
					type: "reg",
					mphone: this.model.mphone,
					verify_id: this.verify_id
				};
				console.log("postObj:", postObj);
				console.log(Services.getSendCode)
				Services.getSendCode(postObj).then(res => {
					console.log(res)
					if (res.Flag) {
						uni.showToast({
							title: '发送成功',
							icon: "success"
						});
						this.verify_id = res.verify_id;
					}
				})
				let inter = setInterval(
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
		},
	}
</script>

<style lang="scss" scoped>
	page {
		height: auto;
	}

	.big_container {
		height: auto !important;
	}

	.register_content {
		width: 100%;
		height: auto;
		overflow: hidden;

		margin: 40rpx 0;
		padding: 0 40rpx;

		.u-border-bottom:after {
			border-bottom: 2px solid #E9E9E9;
		}
	}

	.register-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.uview_from {
		.u-form-item {
			padding: 0;
			margin: 20rpx 0;
		}
	}

	.from_item {
		.u-form-item--left {
			margin: 0 !important;
		}
	}

	.config_btn {
		margin: 100rpx 0 40rpx;
	}
</style>
