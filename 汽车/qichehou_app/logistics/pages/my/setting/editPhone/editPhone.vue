<template>
	<view>
		<view class="binding-newphone">
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
			</u-form>
		</view>
		<u-button class="uview_from_button" shape="circle" type="warning" @click="affirmClick">立即绑定</u-button>
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
					phone: "",
					authCode: "",
					verify_id:''
				},
				//获取验证码属性
				smsFlag: false,
				sendTime: "获取验证码",
				snsMsgWait: 60,

				//发送验证码按钮样式
				codeBtnStyle: {
					width: '200rpx',
					height: "70rpx",
					lineHeight: '70rpx',
					fontSize: '12px'
				}
			};
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
				//60秒后重新获取验证码
				// let postObj = method_all.postApply({
				// 	type: "reg",
				// 	mphone: this.model.phone
				// });
				let postObj = {
					type: "reg",
					mphone: this.model.phone,
					debug:1
				};
				console.log("postObj:", postObj);
				console.log(Services.getSendCode)
				Services.getSendCode(postObj).then(res => {
					console.log(res)
					this.model.verify_id=res.verify_id
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

				let postObj = {
					mphone: this.model.mphone,
					vCode: this.model.authCode,
					verify_id:this.model.verify_id,
				};

				console.log("postObj:", postObj)
				
				Services.bindPhone(postObj).then(res => {
					console.log(res)
					this.show_toast(res.Content)					
				})
			}

		}
	}
</script>

<style>
	page {
		background-color: rgba(241, 241, 241, 1);
	}
</style>

<style lang="scss" scoped>
	.binding-newphone {
		margin-top: 10rpx;
		padding: 0 40rpx 30rpx;
		background-color: #fff;
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
