<template>
	<view class="content">
		<image class="logo" src="/static/img/logo.png"></image>
		<view>
			<text class="title">{{ title }}</text>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods
	} from '../../common/public.js';
	export default {
		data() {
			return {
				..._data,
				title: ''
			};
		},
		onLoad() {

			this.title = this._config.app_name;

			this.getUserInfo();
			console.log(this.userInfo)
			if (this.userInfo) {
				uni.reLaunch({
					url: '/pages/work/work'
				});
			} else {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		},
		methods: {
			..._methods
		}
	};
</script>

<style lang="scss">
	.content {
		background: $uni-bg-color-primary;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		padding: 0 40upx;
		color: #fff;
	}

	.logo {
		width: 220upx;
		height: 200upx;
		margin-bottom: 20upx;
	}
</style>
