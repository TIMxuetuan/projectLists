<template>
	<view class="container-content">
		<view v-if="newsDataLists == ''" class="noData">
			暂无数据
		</view>
		<view v-else class="newsContainer">
			<block v-for="(item,index) in newsDataLists" :key="index">
				<view class="newsItem" @click="goToNewsDetails(item)">
					<view class="newsItem-image">
						<image src="../../../static/img/newsRemind.png" mode=""></image>
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
		import {_data,_methods,util} from '../../../common/public.js'
		import Services from '../../../services/app.js';
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
		},
		methods:{
			..._methods,
			goToNewsDetails(item){
				console.log('item',item)
				uni.navigateTo({
					url: '/pages/newsFile/newsDetails/newsDetails?item=' + encodeURIComponent(JSON.stringify(item))
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: rgba(238, 238, 238, 1);
	}
	
	.container-content{
		width: 100%;
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		background-color: rgba(238, 238, 238, 1);
	}
	
	.newsContainer:before{
		content: ' ';
		display:table;
	}

	.noData {
		text-align: center;
		margin-top: 200rpx;
	}

	.newsItem {
		width: 100%;
		height: 150rpx;
		background-color: #fff;
		margin-top: 12rpx;
		display: flex;
		align-items: center;
		padding: 0 40rpx 0 0;

		.newsItem-image {
			margin: 0 30rpx;
			image{
				width: 80rpx;
				height: 80rpx;
			}
		}

		.newsItem-text {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.text-top-content {
				font-size: 14px;
				color: #5A5A5A;
			}
		}
	}

	.newsItem-text-top {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: #5A5A5A;

		.text-top-title {
			font-size: 16px;
			color: #000;
		}

		
	}
</style>
