<template>
	<view class="version-updating-center">
		<view class="version-updating">
			<view class="version-updating-centent">
				<image src="../../../static/img/timg.png" mode=""></image>
				<text>当前版本1.0</text>
			</view>
		</view>
		<view class="version-updating-bottom">
			<view class="updating-bottom-text">
				Copyright © 2020 河南智业科技网络有限公司
			</view>
			<view>
				All Rights Reserved
			</view>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../../common/public.js'
	import Services from '../../../services/app.js';
	export default {
		data() {
			return {
				..._data,
			};
		},
		methods: {
			..._methods,
			
		}
	}
</script>

<style lang="scss" scoped>
	.version-updating-center{
		position: relative;
		height: 100%;
	}
	
	.version-updating {
		padding: 100rpx 40rpx 0;

		.version-updating-centent {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			margin-bottom: 132rpx;

			image {
				width: 240rpx;
				height: 240rpx;
			}

			text {
				margin-top: 20rpx;
			}
		}
	}
	
	.version-updating-bottom{
		position: fixed;
		left: 50%;
		margin-left: -250rpx;
		bottom: 70rpx;
		text-align: center;
		font-size: 24rpx;
		color: #444444;
		
		.updating-bottom-text{
			margin-bottom: 30rpx;
		}
	}
</style>
