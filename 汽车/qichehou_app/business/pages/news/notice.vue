<template>
	<view class="notice_wrap" :style="{'min-height':height+ 'px'}">
		<view class="notice_block">
			<view style="height:45px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:45px;color:rgba(90,90,90,1);text-align: center;">
				2020年07月10日 11:36
			</view>
			<view class="notice_block_content">
				<view style="height:16px;font-size:16px;font-family:Source Han Sans CN;font-weight:400;line-height:16px;color:rgba(0,0,0,1);">
					恭喜你成功注册汽配商平台
				</view>
				<view style="height: 10px;border-bottom:1px solid rgba(167,167,167,0.47843137254901963);"></view>
				<view style="padding-top: 12px;height:26px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:14px;color:rgba(90,90,90,0.55);">
					这里有一份新手手册了解一下
				</view>
				<view style="padding-top: 6px;height:28px;font-size:12px;font-family:Source Han Sans CN;font-weight:400;line-height:12px;color:rgba(90,90,90,0.55);padding-bottom: 10px;">
					这是一段消息详情描述
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
				
			};
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
		},
	}
</script>

<style lang="scss">
	.notice_wrap{
		width: 100%;
		background:rgba(241,241,241,1);
		.notice_block_content{
			margin: 0 10px;
			background:#FFFFFF;
			padding: 10px;
		}
	}
</style>
