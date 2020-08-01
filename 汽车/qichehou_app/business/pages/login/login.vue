<template>
	<view class="login_content">
		<!--LOGO-->
		<view class="logo">
			<image src="../../static/img/imgIcon.png" mode=""></image>
		</view>
			<u-form class="uview_from" :model="model" ref="uForm" style="margin-bottom: 40rpx;">
				<u-form-item :border-bottom="true"  label-width="0">
					<view class="uview_fromInput">
						<view class="icon-account  uview_fromInput_icom"></view>
						<u-input v-model="model.mphone" placeholder="请输入手机号" type="number" style="width: 100%;" />
					</view>
				</u-form-item>

				<u-form-item :border-bottom="true" label-width="0">
						<view class="uview_fromInput">
							<view class="icon-password  uview_fromInput_icom"></view>
							<u-input v-model="model.password" placeholder="请输入密码" type="password" style="width: 100%;" />
						</view>
				</u-form-item>

			</u-form>

		<u-button class="custom-style" shape="circle" type="primary" @click="user_login" >登录</u-button>

		<!--其他内容-->
		<view class="else_content">
			<view @click="navigateToRegister">注册账号</view>
			<view class="cut_off"></view>
			<view @click="navigateToForgetPassword">忘记密码</view>
		</view>
			<view>
				<u-toast ref="uToast" />
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
				showClearIcon: false,
				inputClearValue: '18237203633',
				showPassword: true,
				inputClearValue2: "123",
				model: {
					mphone: "17613883553",
					password: "123123"
				},
				passwordType: true

			};
		},
		methods: {
			..._methods,
			user_login() {
				if (!this.model.mphone) {
					this.show_toast("手机号不能为空")
					return
				}
				if (!this.checkPhone(this.model.mphone)) {
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
					mphone: this.model.mphone,
					password: this.model.password
				};
				Services.userLogin(postObj,(res,response)=>{
						console.log('userLogin-response',response)
						uni.setStorageSync('token', response.header.Authorization||response.header.authorization);
						console.log('123',uni.getStorageSync('token'));
					}).then(res => {
					if(res.Flag){
						this.show_toast("登录成功")
						uni.switchTab({
							url: '/pages/index/index'
						});
					}else{
						this.show_toast(res.Content)
					}
				})
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// });

				//  Services.userLogin(postObj,(res,response)=>{
				// 		uni.setStorageSync('token', response.header.Authorization||response.header.authorization);
				// 		console.log('token',uni.getStorageSync('token'));
				// 	}).then(res => {
				// 	// if(res.Flag){
				// 	// 	this.show_toast("登录成功")
				// 	// 	uni.switchTab({
				// 	// 		url: '/pages/index/index'
				// 	// 	});
				// 	// }else{
				// 	// 	this.show_toast(res.Content)
				// 	// }
				// })
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
	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_865816_17gjspmmrkti.ttf') format('truetype');
	}
		
	.test {
		font-family: iconfont;
		margin-left: 20rpx;
	}

	.login_content {
		padding: 100rpx 80rpx 60rpx;

		.logo {
			width: 200rpx;
			height: 200rpx;
			box-sizing: border-box;
			// margin: 100rpx auto 60rpx;
			margin: 0 auto 60rpx;
			image{
				width: 200rpx;
				height: 200rpx;
			}
		}
	}

	/*-----------以下是uviewUI样式*/
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
			border-bottom: 1px solid #A7A7A7;
		}
	}
	.custom-style{
			/deep/.u-size-default{
				margin-top:40rpx;
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
			color:#2e87cd;
			font-size:24px;
		}
	}
	
</style>
