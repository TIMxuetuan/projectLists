<template>
	<view class="big_container">
				<!--输入表单-->
					<u-form class="uview_from" :model="model" ref="uForm">

						<u-form-item class="from_item" label="旧密码">
							<u-input v-model="model.name" placeholder="请输入旧密码" />
						</u-form-item>

						<u-form-item class="from_item" label="新密码">
							<u-input v-model="model.name" placeholder="请输入新密码" />
						</u-form-item>
						
						<u-form-item class="from_item" label="确认新密码">
							<u-input v-model="model.name" placeholder="请再次输入新密码" />
						</u-form-item>

					</u-form>

					<view class="config_btn">
						<u-button :custom-style="customStyle" shape="circle"  @click="user_register">提交</u-button>
					</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '@/common/public.js'
	import Services from '@/services/app.js';
	export default {
		data() {
			return {
				..._data,
				model: {
					name: '',
					password: '',
					authCode: ''
				},
				newPassword:'',
				//发送验证码，后台返的值
				verify_id: '',
				labelStyle: {
					"margin-bottom": "0",
					"height": "40rpx"
				},
				customStyle: {
					backgroundColor:'#4779F2',
					color:'#fff'
				},
				btnDisabled: true,
				//获取验证码属性
				smsFlag: false,
				sendTime: "获取验证码",
				snsMsgWait: 60,

				//发送验证码按钮样式
				codeBtnStyle: {
					width: '200rpx',
					height: "70rpx",
					lineHeight: '70rpx',
					fontSize: '12px',
					backgroundColor:'#4779F2',
					color:'#fff'
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
					mphone: this.model.phone
				};
				console.log("postObj:", postObj);
				console.log(Services.getSendCode)
				Services.getSendCode(postObj).then(res => {
					console.log(res)
					if (res.Flag) {
						this.verify_id = res.verify_id
						this.show_toast("发送成功")
					} else {
						this.show_toast(res.Message)
					}
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

			//注册
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: auto;
	}

	.big_container {
		height: auto !important;
		padding:0 38rpx;
	}

	.config_btn {
		margin: 60rpx auto 30rpx;
	}


.uview_from{
		/deep/.u-form-item--left{
			width:147rpx!important;
			flex:none !important;
			margin:0 auto !important;
			margin-right:10rpx !important;
		}
	}
	//验证码样式
	.code-btn {
		display: flex;
		justify-content: space-between;

	}
	</style>
