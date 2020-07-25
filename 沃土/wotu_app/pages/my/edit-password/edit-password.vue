<template>
	<view class="content">
		<view class="logo-box">
			<image class="logo" src="/static/img/logo.png"></image>
		</view>
		<view class="box">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<input class="uni-input" name="input" v-model="OldPassword" placeholder="旧密码" />
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input" name="input" v-model="NewPassword" placeholder="新密码" password="true" />
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input" name="input" v-model="ConfirmPassword" placeholder="再次输入新密码" password="true" />
				</view>
				<view class="login-item">
					<button type="default" formType="submit" class="login-submit">确认修改</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods
	} from '@/common/public.js';
	import Services from '@/services/user.js';
	export default {
		data() {
			return {
				..._data,
				NewPassword: '',
				OldPassword: '',
				ConfirmPassword: ''
			}
		},

		onLoad() {
			this.getUserInfo()
		},
		methods: {
			..._methods,
			formSubmit() {
				if(this.NewPassword == '' || this.OldPassword == '' || this.ConfirmPassword == ''){
					uni.showToast({
						title:'内容不能有空',
						duration:2000,
						icon:'none'
					})
					return;
				}
				
				
				uni.showLoading({
					title: '请稍后...'
				});
				Services.editPassword(this.userInfo.Key, this.userInfo.Id, {
					NewPassword: this.NewPassword,
					OldPassword: this.OldPassword,
					ConfirmPassword: this.ConfirmPassword
				}).then(res => {
					if (res.Flag) {
						uni.showModal({
							title: '修改提示',
							content: res.Content
						});
						uni.reLaunch({
							url: "../my"
						})
					} else {
						uni.showModal({
							title: '修改提示',
							content: res.Content
						});
					}
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: $uni-bg-color-primary;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 0 40upx;
	}

	.logo-box {
		margin-top: 150upx;
		margin-bottom: 60upx;
		text-align: center;
	}

	.logo {
		width: 220upx;
		height: 200upx;
	}

	.uni-input {
		border-radius: 8upx;
	}

	.login-item {
		margin-top: 24upx;
	}
</style>
