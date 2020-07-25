<template>
	<!-- 市场动态 -->
	<view class="container">
		<!-- 轮播 -->
		<view class="swiper-wrap">
			<swiper class="swiper" :indicator-dots="true" indicator-color='#000' indicator-active-color='#fff' :autoplay="true" :circular='true'>
				<swiper-item v-for="(image,index) in images" :key='index'>
					<image :src="image" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 列表 -->
		<view class="content">
			<view class="item">
				<view class="title">市场信息名称</view>
				<view class="info">市场信息简介，市场信息简介,市场信息简介，市场信息简介,市场信息简介，市场信息简介,</view>
				<view class="date">2019-11-19 12:35</view>
			</view>
			<view class="item">
				<view class="title">市场信息名称</view>
				<view class="info">市场信息简介，市场信息简介,市场信息简介，市场信息简介,市场信息简介，市场信息简介,</view>
				<view class="date">2019-11-19 12:35</view>
			</view>
			<view class="item">
				<view class="title">市场信息名称</view>
				<view class="info">市场信息简介，市场信息简介,</view>
				<view class="date">2019-11-19 12:35</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images:[
					'https://tse4-mm.cn.bing.net/th?id=OIP.TqDHCU9hJ3VqE32xCE_RmAHaE8&w=288&h=192&c=7&o=5&dpr=1.25&pid=1.7',
					'https://tse2-mm.cn.bing.net/th?id=OIP.gDBse-qY-avLuUUvDU7YnAHaE8&w=288&h=192&c=7&o=5&dpr=1.25&pid=1.7',
					'https://tse3-mm.cn.bing.net/th?id=OIP.OYphqK5r-0iRFYUWEkenhQHaE8&w=288&h=192&c=7&o=5&dpr=1.25&pid=1.7'
				]
			};
		},
		onLoad() {
			

		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color-grey;
	}
	
	// 轮播
	.swiper-wrap{
		width: 100%;
		.swiper{
			height: 400upx;
			image{
				width: 100%;				
			}
		}
	}
	.content{
		padding: 20upx;
		color: $uni-text-color;
		.item{
			padding: 20upx;
			margin-bottom: 20upx;
			border-radius: 10upx;
			background: #fff;
			&:last-child{
				margin-bottom: 0;
			}
			.title{
				font-size: $uni-font-size-lg;
				line-height: 2;
				// 单行超出省略
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.info{
				font-size: $uni-font-size-base;
				line-height: 1.5;
				height: 3em;
				color: $uni-text-color-grey;
				// 两行超出省略
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				word-wrap: break-word;
				white-space: normal !important;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.date{
				text-align: right;
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
			}
		}
	}
</style>
