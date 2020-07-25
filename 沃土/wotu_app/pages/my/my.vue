<template>
	<view class="content">
		<view class="w-card margin-bottom">
			<view class="item" @tap="jumpTo('./user-info/user-info')">
				<view class="left"><text class="iconfont icongerenziliao" style="color: #28AEFF;"></text>个人资料</view>
				<view class="right right-end">
					<text class="iconfont">&#xe65c;</text>
				</view>
			</view>
			<view class="item" @tap="jumpTo('./facial/facial')">
				<view class="left"><text class="iconfont iconrenlianshibie" style="color: #807FF6;"></text>人脸识别</view>
				<view class="right right-end">
					<text class="iconfont">&#xe65c;</text>
				</view>
			</view>

			<view class="item">
				<view class="left"><text class="iconfont icontongzhitixing" style="color: #EAC35E;"></text>通知提醒</view>
				<view class="right right-end">
					<switch @change="switch1Change" />
				</view>
			</view>
			<view class="item">
				<view class="left"><text class="iconfont icontishiyin" style="color: #43E38B;"></text>消息提示音</view>
				<view class="right right-end">
					<switch @change="switch2Change" />
				</view>
			</view>
		</view>
		<view class="w-card margin-bottom">
			<view class="item">
				<view class="left"><text class="iconfont iconqingchuhuancun" style="color: #AABFEE;"></text>清除缓存</view>
				<view class="right right-end">
					<text class="log">0.0M</text>
					<text class="iconfont">&#xe65c;</text>
				</view>
			</view>
		</view>
		<view class="w-card margin-bottom">
			<view class="item" @tap="jumpTo('./share-card/share-card')">
				<view class="left"><text class="iconfont iconmingpian" style="color: #EAC35E;"></text>电子名片</view>
				<view class="right right-end">
					<text class="iconfont">&#xe65c;</text>
				</view>
			</view>
			<view class="item" @tap="jumpTo('./edit-password/edit-password')">
				<view class="left"><text class="iconfont iconxiugaimima" style="color: #2CAEFA;"></text>修改密码</view>
				<view class="right right-end">
					<text class="iconfont">&#xe65c;</text>
				</view>
			</view>
		</view>
		<view class="w-card margin-bottom">
			<view class="item" @tap='checkVersion'>
				<view class="left"><text class="iconfont iconziyuan" style="color: #AABFEC;"></text>检查更新</view>
				<view class="right right-end">
					<text class="iconfont">&#xe65c;</text>
				</view>
			</view>
			<view class="item" @tap="jumpTo('./feedback/feedback')">
				<view class="left"><text class="iconfont iconyijianfankui" style="color: #40E388;"></text>意见反馈</view>
				<view class="right right-end">
					<text class="iconfont">&#xe65c;</text>
				</view>
			</view>
			<view class="item" @tap="jumpTo('./about/about')">
				<view class="left"><text class="iconfont iconwodedingdan37" style="color: #ACBEEC;"></text>关于</view>
				<view class="right right-end">
					<text class="iconfont">&#xe65c;</text>
				</view>
				</navigator>
			</view>	
		</view>
		<view class="w-card margin-bottom">
			<view class="item" @tap="logout">
				<view class="left"><text class="iconfont icontuichudenglu" style="color: #29B1FB;"></text>退出账号</view>
				<view class="right right-end">
					<text class="iconfont">&#xe65c;</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods
	} from '@/common/public.js'
	import config from '@/config.js'
	export default {
		data() {
			return {
				..._data,
				header: '',
				title: ''
			}
		},
		onLoad() {
			this.userInfo = this.getUserInfo();
			// 判断是否设置头像，否则显示默认头像
			this.header = this.userInfo.Header.indexOf('/Backbone/') > -1 ? config.api_path + this.userInfo.Header : this.userInfo
				.Header;

		},
		mounted() {

		},
		methods: {
			..._methods,
			jumpTo(url) {
				uni.navigateTo({
					url
				})
			},
			logout() {
				uni.removeStorage({
					key: 'userInfo',
					success() {
						uni.$emit('logout',{logout:true})
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				})
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			switch2Change: function(e) {
				// console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},

			checkVersion() {
				uni.showToast({
					title: '已经是最新版本！',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		min-height: 100vh;
		padding: 20upx;
		box-sizing: border-box;
		background: $uni-bg-color-grey;
	}

	.margin-bottom {
		margin-bottom: 20upx;
	}

	.align-center {
		align-items: center;
	}

	.item {
		display: flex;
		align-items: center;
		height: 100upx;
		padding: 0 20upx;
		color: $uni-text-color;
		box-sizing: border-box;
		border-bottom: 1px solid $uni-border-color-gray;

		.left {
			width: 400upx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			display: flex;
			align-items: center;

			.iconfont {
				font-size: 36upx;
				margin-right: 30upx;
			}
		}

		.right {
			flex: 1;
			display: flex;
			align-items: center;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;

			.iconfont {
				font-size: 36upx;
				color: #B7B7B7;
			}

			.log {
				color: #B7B7B7;
			}
		}

		// 对right的补充
		.right-end {
			display: flex;
			justify-content: flex-end;
		}

		&:last-child {
			border: none;
		}
	}
</style>
