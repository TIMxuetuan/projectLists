<template>

	<view class="container" :style="{height:height}">
		<navigator url="./member-manage/member-manage" open-type="navigate" class="box" style="background: #C677CA;">
			<text class="iconfont iconrenyuanguanli"></text>
			<text class="font">
				人员
			</text>
		</navigator>
		<navigator url="./technology/technology" open-type="navigate" class="box" style="background: #F17662;">
			<text class="iconfont iconjishupingtai"></text>
			<text class="font">
				技术
			</text>
		</navigator>
		<navigator url="./resource/resource" open-type="navigate" class="box" style="background: #E85667;">
			<text class="iconfont iconziyuanweihu"></text>
			<text class="font">
				资源
			</text>
		</navigator>
		<navigator url="./design/design" open-type="navigate" class="box" style="background: #03A9F4;">
			<text class="iconfont iconsheji2"></text>
			<text class="font">
				设计
			</text>
		</navigator>
		<navigator url='./production/production' class="box" style="background: #6D93F5;">
			<text class="iconfont iconshengchanguanli1"></text>
			<text class="font">
				生产
			</text>
		</navigator>
		<navigator url='./logistics/logistics' class="box" style="background: #94CB53;">
			<text class="iconfont iconwuliu3"></text>
			<text class="font">
				物流
			</text>
		</navigator>
		<navigator url="./market-manage/market-manage" class="box" style="background: #26A4D0;">
			<text class="iconfont iconxiaoshou01"></text>
			<text class="font">
				销售
			</text>
		</navigator>
		<navigator url="./service/service" class="box" style="background: #01BCF3;">
			<text class="iconfont iconfuwu"></text>
			<text class="font">
				服务
			</text>
		</navigator>
		<navigator url="./file/file" class="box" style="background: #00D8CB;">
			<text class="iconfont iconziyuanguanli"></text>
			<text class="font">
				智库
			</text>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: 0
			}
		},
		mounted() {
			let self = this;
			uni.getSystemInfo({
				success(a) {
					self.height = a.windowHeight + 'px'
				}
			})
		},
	}
</script>

<style lang="scss" >
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		width: 100vw;
		// height: 100vh;
		box-sizing: border-box;
		.box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			display: flex;
			justify-content: center;
			align-items: center;
			width: calc(100% / 3);
			height: calc(100% / 3);
			.font {
				color: #fff;
				font-size: 36upx;
				margin-top: 10upx;
			}
			.iconfont{
				color:#fff;
				font-size: 80upx;	
			}
		}
	}
</style>
