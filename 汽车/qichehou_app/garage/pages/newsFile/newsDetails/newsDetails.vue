<template>
	<view>
		<view class="newsDetails-content">
			<view class="content-time">2020年07月10日 11:36</view>
			<view class="content-details">
				<view class="content-details-title">
					恭喜你成功注册汽修厂平台
				</view>
				<view class="content-details-text">
					<text>这里有一份新手手册了解一下</text>
					<text>这是一段消息详情描述</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {_data,_methods,util} from '../../../common/public.js'
	import Services from '../../../services/app.js';
	export default {
		data() {
			return {
			..._data,
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			const item = JSON.parse(decodeURIComponent(option.item));
			console.log(item);
		},
		methods: {
		..._methods,
		}
	}
</script>

<style>
	page {
		background:rgba(241,241,241,1);
	}
</style>

<style scoped lang="scss">

	.newsDetails-content {
		width: 100%;
		padding: 0 20rpx;
		margin-top: 30rpx;
		color: #000000;
		.content-time{
			font-size: 28rpx;
			line-height: 28rpx;
			color: #5A5A5A;
			margin-bottom: 30rpx;
			text-align: center;
		}
		.content-details{
			background-color: #fff;
			border-radius:10rpx;
			padding: 0 20rpx;
			.content-details-title{
				height: 72rpx;
				line-height: 72rpx;
				border-bottom: 1px solid #A7A7A7;
				font-size: 32rpx;
				font-weight:400;
			}
			
			.content-details-text{
				font-size: 28rpx;
				color: #5A5A5A;
				padding: 20rpx 0 40rpx;
				text{
					display: block;
				}
			}
		}
		
	}
	
</style>
