<template>
	<view class="news_wrap" :style="{'min-height':height+ 'px'}">
		<view v-for="(itme,i) in information_list" :key="i">
			<view style="height: 6px;">
				
			</view>
			<view class="information">
				<view class="information_photo">
					<img src="../../static/img/index/remind@2x.png">
				</view>
				<view class="information_content" @click="information_click">
					<view style="height:16px;font-size:16px;font-family:Source Han Sans CN;font-weight:400;line-height:16px;color:rgba(0,0,0,1);">
						{{itme.type}}
					</view>
					<view style="height:14px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:30px;color:rgba(90,90,90,0.80);">
						{{itme.content}}
					</view>
				</view>
				<view style="height:16px;font-size:12px;line-height:16px;color:rgba(90,90,90,0.80);font-family:Source Han Sans CN;font-weight:400;padding-right: 6px;">
					{{itme.date}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
				information_list:[
					{
						'type':"系统通知",
						'content':"恭喜你成功注册汽配商平台",
						'date':'一天前'
					},
					{
						'type':"系统通知",
						'content':"恭喜你成功注册汽配商平台",
						'date':'一天前'
					},
					{
						'type':"系统通知",
						'content':"恭喜你成功注册汽配商平台",
						'date':'一天前'
					},
					{
						'type':"系统通知",
						'content':"恭喜你成功注册汽配商平台",
						'date':'一天前'
					},
					{
						'type':"系统通知",
						'content':"恭喜你成功注册汽配商平台",
						'date':'一天前'
					},
					{
						'type':"系统通知",
						'content':"恭喜你成功注册汽配商平台",
						'date':'一天前'
					},
				]
			};
		},
		methods:{
			information_click(){
				this.$u.route({
								url: 'pages/news/notice',
								params: {
									name: 'lisa'
								}
							})
			}
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
		},
	}
</script>

<style lang="scss">
	.news_wrap{
		width: 100%;
		background:rgba(241,241,241,1);
		.information{
			height:75px;
			background:rgba(255,255,255,1);
			padding: 17px 13px;
			display: flex;
			.information_photo{
				width: 40px;
				height: 40px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.information_content{
				margin-left: 13px;
				flex: 1;
			}
		}
	}
</style>
