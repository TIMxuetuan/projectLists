<template>
	<view>
		<view class="phone-auth-code">
			<u-form :model="model" ref="uForm">
				<u-form-item label-width="0">
					<text class="phone-style">已发送至手机号{{mphone}}</text>
				</u-form-item>

				<u-form-item class="auth_code_style" :border-bottom="true" label-width="100" label="验证码">
					<u-input v-model="model.authCode" placeholder="短信验证码" type="number" />
					<u-button hover-class="none" :custom-style="codeBtnStyle" slot="right" type="error" @click="sendCode" :disabled="smsFlag">{{sendTime}}</u-button>
				</u-form-item>
			</u-form>

			<view class="addbank-card-btn">
				<u-button @click="verifyMessage" type="primary" :disabled=" model.authCode == '' ?  true : false ">验证信息</u-button>
			</view>
		</view>

		<u-popup v-model="show" mode="center" border-radius="10" mask :closeable="true" close-icon-pos="top-right" @close="closeClick">
			<view class="module-center">
				<image class="module-image" src="../../../static/img/deng.png" mode=""></image>
				<view class="module-text">绑卡成功</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {_data,_methods,util} from '@/common/public.js'
	import Services from '../../../services/app.js';
	export default {
		data() {
			return {
				..._data,
				mphone: '',
				model: {
					authCode: '',
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
				},
				//弹出框
				show: false
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			const item = JSON.parse(decodeURIComponent(option.mphone));
			console.log(item);
			this.mphone = item
		},
		methods: {
			..._methods,
			//获取验证码
			sendCode() {
				this.smsFlag = true;
				let postObj = {
					type: "reg",
					mphone: this.mphone
				};
				console.log("postObj:", postObj);
				console.log(Services.getSendCode)
				Services.getSendCode(postObj).then(res => {
					console.log(res)
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

			//点击验证信息事件
			verifyMessage() {
				this.show = true
				this.show_toast("ok")
			},
			
			//关闭弹出层
			closeClick(){
				uni.navigateBack({
					delta: 3,
					animationType: 'pop-out',
					animationDuration: 1000
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: rgba(238, 238, 238, 1);
	}
</style>

<style lang="scss" scoped>
	.phone-auth-code {
		padding: 20px 20rpx;
		background-color: #fff;

		.phone-style {
			color: #AAACA6;
		}

		.auth_code_style {
			.u-btn {
				width: 160rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 12px;
			}
		}
	}

	.addbank-card-btn {
		margin-top: 40rpx;
	}

	.module-center {
		width: 440rpx;
		height: 280rpx;
		padding: 30rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.module-image {
			width: 120rpx;
			height: 120rpx;
			display: block;
		}

		.module-text {
			margin-top: 40rpx;
		}
	}
</style>
