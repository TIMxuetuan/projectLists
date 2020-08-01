<template>
	<view>
		<view v-if="newsDataLists == ''" class="noData">
			暂无数据
		</view>
		<view v-else class="newsContainer">
			<block v-for="(item,index) in newsDataLists" :key="index">
				<view class="newsItem">
					<view class="newsItem-image">
					</view>
					<view class="newsItem-text">
						<view class="newsItem-text-top">
							<view class="text-top-title">
								{{item.title}}
							</view>
							<view class="text-top-time">
								{{item.time}}
							</view>
						</view>
						<view class="text-top-content">
							{{item.content}}
						</view>
					</view>
				</view>
			</block>

		</view>
	</view>
</template>

<script>
	import {_data,_methods,util} from '@/common/public.js'
	export default {
		data() {
			return {
				..._data,
				newsDataLists: [{
						title: '消息通知',
						time: '一天前',
						content: '恭喜你成功注册汽修厂平台'
					},
					{
						title: '消息通知',
						time: '一天前',
						content: '恭喜你成功注册汽修厂平台'
					},
					{
						title: '消息通知',
						time: '一天前',
						content: '恭喜你成功注册汽修厂平台'
					},
				]
			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: rgba(238, 238, 238, 1);
	}

	.noData {
		text-align: center;
		margin-top: 200rpx;
	}

	.newsItem {
		width: 100%;
		height: 120rpx;
		background-color: #fff;
		margin-top: 20rpx;
		display: flex;
		padding: 0 30rpx 0 0;

		.newsItem-image {
			width: 120rpx;
			height: 100%;
			background: url('../../../static/img/tabbar/remind.png') no-repeat 5px center;

		}

		.newsItem-text {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}

	.newsItem-text-top {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: #999;
		font-weight: bold;

		.text-top-title {
			font-size: 16px;
			color: #000;
		}

		.text-top-content {
			font-size: 13px;
		}
	}
</style>
