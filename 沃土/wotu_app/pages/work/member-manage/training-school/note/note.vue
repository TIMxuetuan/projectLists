<template>
	<view>
		<view class="listwrap">
			<view class="title">课程名字</view>
			<view class="count">第一张第一节内容</view>
			<view>
				<view class="list">
					<text class="content">第一条笔记内容</text>
					<text class="iconarrow-right"></text>
				</view>
				<view class="list">
					<text class="content">第二条笔记内容</text>
					<text class="iconarrow-right"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.listwrap{
		font-size: 32upx;
		color: #787878;
		border-bottom: 4upx solid #eee;
		padding: 10upx 20upx;
		.title{
			color: #333;
		}
		.count{
			font-size: 28upx;
			color: #666;
			padding: 10upx 0;
		}
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			box-sizing: border-box;
			padding: 14upx 0;
			padding-left: 40upx;
			border-top: 1upx dashed #eee;
			.content{
				display: inline-block;
				width: 650upx;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.iconarrow-right{
				font-size: 26upx;
			}
		}
	}
</style>
