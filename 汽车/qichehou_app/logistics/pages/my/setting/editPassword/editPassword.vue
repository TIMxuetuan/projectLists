<template>
	<view class="login_content">
		<u-form class="uview_from" :model="model" ref="uForm">
			<u-form-item :border-bottom="true" label-width="0">
				<view class="uview_fromInput">
					<u-icon class="uview_fromInput_icom" name="account" custom-prefix="icon" size="50" color="#EF744D"></u-icon>
					<u-input v-model="model.phone" placeholder="请输入手机号" type="number" style="width: 100%;" />
				</view>
			</u-form-item>

			<u-form-item class="auth_code_style" :border-bottom="true" label-width="0">
				<view class="icon_code_input">
					<u-icon class="uview_fromInput_icom" name="verification" custom-prefix="icon" size="50" color="#EF744D"></u-icon>
					<u-input v-model="model.authCode" placeholder="请输入验证码" type="number" />
				</view>
				<u-button hover-class="none" slot="right" :custom-style="codeBtnStyle" type="warning" @click="sendCode" :disabled="smsFlag">{{sendTime}}</u-button>
			</u-form-item>
			<u-form-item :border-bottom="true" label-width="0">
				<view class="uview_fromInput">
					<u-icon class="uview_fromInput_icom" name="password" custom-prefix="icon" size="40" color="#EF744D"></u-icon>
					<u-input v-model="model.oldpassword" type="password" placeholder="请输入旧密码" :password-icon="true" style="width: 100%;" />
				</view>
			</u-form-item>
			<u-form-item :border-bottom="true" label-width="0">
				<view class="uview_fromInput">
					<u-icon class="uview_fromInput_icom" name="password" custom-prefix="icon" size="40" color="#EF744D"></u-icon>
					<u-input v-model="model.password" type="password" placeholder="请输入新密码" :password-icon="true" style="width: 100%;" />
				</view>
			</u-form-item>

			<u-form-item :border-bottom="true" label-width="0">
				<view class="uview_fromInput">
					<u-icon class="uview_fromInput_icom" name="password" custom-prefix="icon" size="40" color="#EF744D"></u-icon>
					<u-input v-model="model.newPassword" type="password" placeholder="请再次输入新密码" :password-icon="true" style="width: 100%;" />
				</view>
			</u-form-item>

		</u-form>
		<u-button class="uview_from_button" shape="circle" type="warning" @click="affirmClick">提交</u-button>
	</view>
</template>

<script>
	import {_data,_methods,util} from '@/common/public.js'
	import Services from '../../../../services/app.js';
	export default {
		data() {
			return {
				..._data,
				model: {
					phone: "18237203633",
					authCode: "",
					password: "",
					newPassword: "",
					oldpassword:'',
					verify_id:''
				},
				//获取验证码属性
				smsFlag: false,
				sendTime: "获取验证码",
				snsMsgWait: 60,
				
				//发送验证码按钮样式
				codeBtnStyle:{
					width:'200rpx',
					height:"70rpx",
					lineHeight:'70rpx',
					fontSize:'12px'
				}
			};
		},
		created() {

		},
		methods: {
			..._methods,
			//获取验证码
			sendCode() {
				if (!this.model.phone) {
					this.show_toast("手机号不能为空")
					return
				}
				if (!this.checkPhone(this.model.phone)) {
					this.show_toast("手机号格式不正确")
					return
				}
				this.smsFlag = true;
				let postObj = {
					type: "reg",
					mphone: this.model.phone
				};
				console.log("postObj:", postObj);
				console.log(Services.getSendCode)
				Services.getSendCode(postObj).then(res => {
					console.log(res)
					this.model.verify_id=res.verify_id;
					this.show_toast("发送成功")
				})
				var inter = setInterval(
					function() {
						this.sendTime = this.snsMsgWait + "秒后重发";
						this.snsMsgWait = this.snsMsgWait - 1;
						if (this.snsMsgWait < 0) {
							clearInterval(inter);
							this.sendTime = "获取验证码";
							this.snsMsgWait = 60;
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
					this.show_toast("手机号不能为空")
					return
				}
				if (!this.checkPhone(this.model.phone)) {
					this.show_toast("手机号格式不正确")
					return
				}
				if (!this.model.authCode) {
					this.show_toast("验证码不能为空")
					return
				}
				if (!this.model.password) {
					this.show_toast("新密码不能为空")
					return
				}
				if (this.model.newPassword != this.model.password) {
					this.show_toast("两次密码不一致")
					return
				}

				let postObj = {
					mphone: this.model.phone,
					password: this.model.password,
					verify_id:this.model.verify_id,
					vCode:this.model.authCode
				};
				Services.editPassword(postObj).then(res => {
					console.log(res)
					this.show_toast(res.Content)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login_content {
		padding: 60rpx 40rpx 60rpx;
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
		display: flex;
		justify-content: space-between;
		.icon_code_input {
			display: flex;
			justify-content: space-between;
			margin-right: 30rpx;
		}

		.uview_fromInput_icom {
			width: 40rpx;
			display: flex;
			justify-content: center;
			margin-right: 60rpx;
		}

	}

	//自定义icon
	.uview_fromInput {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;

		.uview_fromInput_icom {
			width: 40rpx;
			display: flex;
			justify-content: center;
			margin-right: 60rpx;
		}
	}

	//验证码样式
	.code-btn {
		display: flex;
		justify-content: space-between;

	}

	.uview_from_button {
		width: 674rpx;
		margin: 60rpx auto 0;
	}
</style>
