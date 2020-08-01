<template>
	<view class="container">
		<view class="tips">为了保护您的账户安全请验证手机</view>
		<view class="register_from">
			<!--输入表单-->
				<u-form class="uview_from" :model="model" ref="uForm">
					<u-form-item :border-bottom="true" label-width="0">
						<view class="uview_fromInput">
							<u-icon class="uview_fromInput_icom" name="account" custom-prefix="icon" size="50" color="#2e87cd"></u-icon>
							<u-input v-model="model.phone" placeholder="请输入手机号" type="number" style="width: 100%;" />
						</view>
					</u-form-item>
			
					<u-form-item class="auth_code_style" :border-bottom="true" label-width="0">
						<view class="icon_code_input">
							<u-icon class="uview_fromInput_icom" name="verification" custom-prefix="icon" size="50" color="#2e87cd"></u-icon>
							<u-input v-model="model.authCode" placeholder="请输入验证码" type="number" />
						</view>
						<u-button hover-class="none" slot="right" :custom-style="codeBtnStyle" @click="sendCode" :disabled="smsFlag">{{sendTime}}</u-button>
					</u-form-item>
			
			
				</u-form>
			
				<view class="config_btn">
					<u-button :custom-style="customStyle" shape="circle"  @click="nextStep">下一步</u-button>
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
	import Services from '@/services/app.js';
	export default{
		data(){
			return{
				..._data,
				model:{
					phone:'',
					authCode:''
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
					fontSize: '12px',
					backgroundColor:'#4779F2',
					color:'#fff'
				},
				//按钮样式
				customStyle: {
					backgroundColor:'#4779F2',
					color:'#fff'
				},
			}
		},
		methods:{
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
			nextStep(){
				uni.navigateTo({
					url:'/pages/my/settings/paymentPassword'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	//提示样式
	.tips{
		text-align: center;
		height:100rpx;
		background:rgba(134,168,251,0.3);
		font-size:14px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(0,0,0,1);
		line-height: 100rpx;
		opacity:1;
	}
	//表单样式
	.register_from {
		padding: 0 40rpx;
		/deep/.u-border-bottom:after {
			border-bottom: 2px solid rgba(167,167,167,0.47);
		}
	
	}
	
	.from_item {
		.u-form-item--left {
			margin: 0 !important;
		}
	}
	
	.config_btn {
		margin: 60rpx auto 30rpx;
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
</style>
