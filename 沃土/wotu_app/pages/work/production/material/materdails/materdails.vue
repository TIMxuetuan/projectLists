<template>
	<view class='matewrap'>
		<view class='matetitle'>
			<text class="matetext">大类型一</text>
			<text>大类型二</text>
			<text>大类型三</text>
			<text>大类型四</text>
		</view>
		<view class='matetitle matetitlechild'>
			<text class="matetext">类型一</text>
			<text>类型二</text>
			<text>类型三</text>
			<text>类型四</text>
		</view>
		<view class="namewap">
			<view class="namewapchild">
				<text>原材料名称:</text>
				<text>物料名称</text>
			</view>
			<view class="namewapchild">
				<text>原材料库存:</text>
				<text>物料名称</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.matewrap{
		font-size: 30upx;
		padding:20upx 40upx;
		.matetitle{
			display: flex;
			width: 100%;
			justify-content: space-between;
			color: #708090;
			text{
				height: 60upx;
				line-height: 60upx;
			}
			.matetext{
				border-bottom: 4upx solid #36a8fe;
				color: #36a8fe;
			}
		}
		.matetitlechild{
			margin: 20upx 0;
			font-size: 26upx;
		}
		.namewap{
			color: #333;
			margin-top: 40upx;
			.namewapchild{
				margin: 20upx 0;
				text:nth-child(2){
					color: #708090;
					margin-left: 6upx;
				}
			}
		}
	}
</style>
