<template>
	<view class="big_container">
		<view class="register_content">
			<view style="padding:10px 10px;">
				<u-steps :list="numList" 　mode="number" :current="0"></u-steps>
			</view>
			<view class="register_from">

				<u-form class="uview_from" :model="model" ref="uForm">
					<u-form-item class="from_item" label="手机号" :border-bottom="true" label-width="150" label-position="left"
					 :label-style="labelStyle">
						<u-input v-model="model.mphone" placeholder="请输入手机号" type="number" />
					</u-form-item>
					<u-form-item class="auth_code_style" :border-bottom="true" label="验证码" label-width="150" :label-style="labelStyle">
						<view class="icon_code_input">
							<u-input v-model="model.authCode" placeholder="请输入验证码" type="number" />
						</view>
						<u-button hover-class="none" slot="right" type="warning" @click="sendCode" :disabled="smsFlag">{{sendTime}}</u-button>
					</u-form-item>
					<u-form-item label="登录密码" label-position="left" :border-bottom="true" label-width="150" :label-style="labelStyle">
						<u-input v-model="model.password" type="password" placeholder="请输入密码" :password-icon="false" />
					</u-form-item>

					<u-form-item label="确认密码" label-position="left" :border-bottom="true" label-width="150" :label-style="labelStyle">
						<u-input v-model="model.affirmPassword" type="password" placeholder="请再次输入密码" :password-icon="false" />
					</u-form-item>

				</u-form>

				<view class="config_btn">
					<u-button class="uview_from_button" :disabled="model.mphone == '' ? true : (model.password == '' ? true : (model.affirmPassword == '' ? true :false)) "
					 :custom-style="customStyle" shape="circle" type="warning" @click="submit">注册</u-button>
				</view>

				<view style="text-align:left;color:#5A5A5A;padding:10px 10px;">登录/注册即表示同意 <text style="color:#EF744D">《用户注册协议》</text></view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '@/common/public.js'
	import Services from '../../services/app.js';

	export default {
		data() {
			return {
				..._data,
				model: {
					mphone: "15038003506",
					password: "111",
					affirmPassword: "111",
					verify_id: '',
					authCode: ''
				},
				//获取验证码属性
				smsFlag: false,
				sendTime: "获取验证码",
				snsMsgWait: 10,
				labelStyle: {
					"margin-bottom": "0",
					"height": "40rpx"
				},
				customStyle: {
					// "background-color":"#A6C0FF"
				},
				numList: [{
					name: '注册信息'
				}, {
					name: '认证信息'
				}, {
					name: '缴纳保证金'
				}],
				btnDisabled: true
			};
		},
		methods: {
			..._methods,
			neststep() {
				uni.navigateTo({
					url: '/pages/register/authentication'
				});
			},
			//获取验证码
			sendCode() {
				let postObj = {
					type: "reg",
					mphone: this.model.mphone
				};

				//验证
				const rules = [
					{name: "mphone",checkType: "required",errorMsg: "手机号不能为空"},
					{name: "mphone",checkType: "phone",errorMsg: "手机号格式不正确"},
				];
				if (!util._V(postObj, rules)) {
					return
				};

				this.smsFlag = true;

				console.log("postObj:", postObj);
				console.log(Services.getSendCode)
				Services.getSendCode(postObj).then(res => {
					console.log(res)
					this.model.verify_id = res.verify_id;
					this.show_toast("发送成功")
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
			submit() {
				let postObj = {
					mphone: this.model.mphone,
					password: this.model.password,
					verify_id: this.model.verify_id,
					vCode: this.model.authCode
				};

				//验证
				const rules = [{
						name: "mphone",
						checkType: "phone",
						errorMsg: "手机号格式不正确"
					},
					{
						name: "password",
						checkType: "required",
						errorMsg: "密码不能为空"
					},
					{
						name: "vCode",
						checkType: "required",
						errorMsg: "验证码不能为空"
					},
				];
				if (!util._V(postObj, rules)) {
					return
				};

				if (this.model.affirmPassword != this.model.password) {
					this.show_toast("两次密码不一致")
					return
				}

				uni.showLoading({
					title: '注册中...',
					icon: "none"
				});
				Services.userRegister(postObj).then(res => {
					if (res.Flag) {
						console.log(res)
						this.show_toast("注册成功")
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}, 500)
					} else {
						this.show_toast(res.Content)
					}



				})
			}
		}
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

		.register_from {
			margin: 40rpx 0;
			padding: 0 40rpx;

			.u-border-bottom:after {
				border-bottom: 2px solid #E9E9E9;
			}

		}
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
		.uview_from_button {
			width: 674rpx;
			margin: 60rpx auto 30rpx;
		}
	}
</style>
