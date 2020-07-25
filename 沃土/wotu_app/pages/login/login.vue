<template>
	<view class="content">
		<view class="logo-box">
			<image class="logo" src="/static/img/logo.png"></image>
		</view>
		<view class="box">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<input class="uni-input" name="input" v-model="Email" placeholder="企业邮箱" />
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input" name="input" v-model="Password" placeholder="密码" password="true" />
				</view>
				<view class="login-item">
					<button type="default" formType="submit" class="login-submit">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods
	} from '../../common/public.js';
	import Services from '../../services/user.js';

	export default {
		data() {
			return {
				..._data,
				Email: '', //changzheng@keji01.com
				Password: '', //191221838
				userInfo: null,

			};
		},
		onLoad() {
			let self = this;
			if (this.getUserInfo()) {
				uni.reLaunch({
					url: '/pages/work/work'
				});
			}
			uni.getStorage({
			    key: 'user_pass',
			    success(res) {

			        let user_pass = res.data.split('&');
					self.Email = user_pass[0];
					self.Password = user_pass[1];
					
			    }
			});
		},
		methods: {
			..._methods,
			checkLogout(data){
				console.log('我知道，用户自己点了推出 logout='+data.logout)
				this.isLogout = data.logout;
			},
			formSubmit() {
				uni.showLoading({
					title: '登录中...'
				});
				Services.login({
					Email: this.Email,
					Password: this.Password
				}).then(res => {
					uni.hideLoading();
					if (typeof res.Flag != 'undefined') {
						uni.showModal({
							title: '登录提示',
							content: res.Content
						});
						return;
					}
					res['IMEI'] = this.getUuid(); //只有真机或者模拟器才有uuid
					uni.setStorageSync('userInfo', JSON.stringify(res));
					uni.reLaunch({
						url: '/pages/work/work'
					});
		
					uni.setStorage({
						key: 'user_pass',
						data: this.Email+'&'+this.Password,
					});
					
					
				});
			},
		}
	};
</script>

<style lang="scss">
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
