<template>
	<view class="login_container">
		<!--头部内容-->
		<view>
			<view class="head-module">
				<view class="status_bar">
					<!-- 这里是状态栏 -->
				</view>
				<view class="head_title"></view>
				<image class="background_head" src="../../static/img/login_background.jpg" mode=""></image>
				<!--LOGO-->
				<view class="logo">
					<image src="../../static/img/imgIcon.png" mode=""></image>
				</view>
			</view>
		</view>

		<!--下面表单及按钮-->
		<view class="login_content">
			<view>
				<u-form class="uview_from" :model="model" ref="uForm">
					<u-form-item :border-bottom="true" label-width="0">
						<view class="uview_fromInput">
							<u-icon class="uview_fromInput_icom" name="ziyuan26" custom-prefix="icon" size="40" color="#EF744D"></u-icon>
							<u-input v-model="model.phone" placeholder="请输入手机号" type="number" style="width: 100%;" />
						</view>
					</u-form-item>

					<u-form-item :border-bottom="true" label-width="0">
						<view class="uview_fromInput">
							<u-icon class="uview_fromInput_icom" name="ziyuan25" custom-prefix="icon" size="30" color="#EF744D"></u-icon>
							<u-input v-model="model.password" type="password" placeholder="请输入密码" :password-icon="true" style="width: 100%;" />
						</view>
					</u-form-item>

				</u-form>
				<u-button class="uview_from_button" shape="circle" type="error" @click="user_login">登录</u-button>
			</view>
			<!--其他内容-->
			<view class="else_content">
				<view @click="navigateToRegister">注册账号</view>
				<view class="cut_off"></view>
				<view @click="navigateToForgetPassword">忘记密码</view>
			</view>

			
			<!--toast站位-->
			<view>
				<u-toast ref="uToast" />
			</view>
		</view>
		<view class="agreement">登录/注册即表示同意 <text style="color:#EF744D">《用户协议》</text></view>
	</view>
</template>

<script>
	import {_data,_methods,util} from '../../common/public.js'
	import Services from '../../services/app.js';
	export default {
		data() {
			return {
				..._data,
				showClearIcon: false,
				inputClearValue: '18237203633',
				showPassword: true,
				inputClearValue2: "123",
				model: {
					phone: "18237203633",
					password: "123456"
				},
				passwordType: true

			};
		},
		methods: {
			..._methods,
			/*	登录事件
				传参： 手机号、密码
				例子： value: "18237203633",
					   value2: "22"
			 */
			user_login() {
				if (!this.model.phone) {
					this.show_toast("手机号不能为空")
					return
				}
				if (!this.checkPhone(this.model.phone)) {
					this.show_toast("手机号格式不正确")
					return
				}
				if (!this.model.password) {
					this.show_toast("密码不能为空")
					return
				}
				
				uni.showLoading({
					title: '登录中...',
					icon: "none"
				});
				let postObj = {
					mphone: this.model.phone,
					password: this.model.password
				};
				console.log("postObj:", postObj)
				Services.userLogin(postObj,(res,response)=>{
						uni.setStorageSync('token', response.header.Authorization);
					})
					.then((res)=>{
						if(res.Flag){
							console.log('userLogin',res)
							this.show_toast(res.Content)
							setTimeout(function() {
								uni.switchTab({
									url: '/pages/index/index'
								});
							}, 500)
						}else{
							this.show_toast(res.Content)
							
						}
					})
			},

			/* 注册账号跳转---- register页面 */
			navigateToRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},

			/* 忘记密码跳转---- forgetPassword页面 */
			navigateToForgetPassword() {
				uni.navigateTo({
					url: '/pages/forgetPassword/forgetPassword'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		position: relative;
		height: 100%;
	}
	.head-module {
		width: 100%;
		height: 400rpx;

		.head_title {
			text-align: center;
			height: 50rpx;
			line-height: 75rpx;
		}

		.background_head {
			position: absolute;
			width: 100%;
			height: 400rpx;
			z-index: -1;
			top: 0;
			left: 0;
		}

		.logo {
			width: 200rpx;
			height: 200rpx;
			box-sizing: border-box;
			// margin: 100rpx auto 60rpx;
			margin: 40rpx auto 0;

			image {
				width: 200rpx;
				height: 200rpx;
			}
		}
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.login_content {
		padding: 0 40rpx 60rpx;
	}

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

	.uview_from_button {
		width: 674rpx;
		margin: 60rpx auto 0;
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
	.agreement{
		width: 432rpx;
		text-align: center;
		position: absolute;
		bottom: 40rpx;
		left: 50%;
		margin-left: -216rpx;
	}
</style>
