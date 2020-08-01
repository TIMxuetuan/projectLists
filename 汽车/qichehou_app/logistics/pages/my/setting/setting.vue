<template>
	<view>
		<view class="system-setup">
			<!--修改密码-->
			<view class="four-set-item" @click="gotoChangePassword">
				<view class="">
					修改密码
				</view>
				<view class="">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>

			<!--修改绑定手机号-->
			<view class="four-set-item" @click="gotoBindingNewPhone">
				<view class="">
					修改绑定手机号
				</view>
				<view class="">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>

			<!--支付密码-->
			<view class="four-set-item" @click="gotoPageClick(item)">
				<view class="">
					支付密码
				</view>
				<view class="">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>

			<!--清除缓存-->
			<view class="four-set-item" @click="gotoClearCache">
				<view class="">
					清除缓存
				</view>
				<view class="four-set-right">
					<view class="set-right-number">
						2.45M
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>

			<!--版本更新-->
			<view class="four-set-item" @click="gotoPageClick(item)">
				<view class="">
					版本更新
				</view>
				<view class="four-set-right">
					<view class="set-right-number">
						1.0.0
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>

		<!--按钮-->
		<view class="balance-content-btn">
			<u-button :custom-style="balanceBtn" shape="circle" type="warning" @click="logOut">退出登录</u-button>
		</view>

		<!--清除缓存弹窗-->
		<u-modal v-model="clearCacheShow" :content="content" :show-cancel-button="true" @confirm="confirmClear"></u-modal>
	</view>
</template>

<script>
	import {_data,_methods,util} from '@/common/public.js'
	import Services from '../../../services/app.js';
	export default {
		data() {
			return {
				..._data,
				balanceBtn: {
					height: '80rpx'
				},
				clearCacheShow: false,
				content: '确定要清除缓存吗？'
			};
		},
		methods: {
			..._methods,
			//跳转修改密码页面
			gotoChangePassword() {
				uni.navigateTo({
					url: '/pages/my/setting/editPassword/editPassword'
				});
			},

			//跳转到绑定新手机号页面
			gotoBindingNewPhone() {
				uni.navigateTo({
					url: '/pages/my/setting/editPhone/editPhone'
				});
			},

			//弹出清除缓存弹窗
			gotoClearCache() {
				this.clearCacheShow = true
			},
			logOut(){
				uni.setStorageSync('token', '');
				uni.navigateTo({
					url: '../../login/login',
				});
			},
			//清除弹窗确定事件
			confirmClear(){
				uni.setStorageSync('token', '');
				this.show_toast("清除成功")
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
	.system-setup {
		margin-top: 12rpx;
		background-color: #fff;
		padding: 0 40rpx;
	}

	.four-set {
		padding: 0 40rpx;
		background-color: #FFFFFF;
	}

	.four-set-item {
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px solid rgba(167, 167, 167, 0.5);
		font-size: 28rpx;
		color: #444444;
	}

	.four-set-item:last-child {
		border-bottom: none;
	}

	.four-set-right {
		display: flex;

		.set-right-number {
			font-size: 28rpx;
			color: #444444;
			margin-right: 20rpx;
		}
	}

	.balance-content-btn {
		margin-top: 60rpx;
		padding: 0 40rpx;
	}
</style>
