<template>
	<view>
		<view class="wrap">
			<text>培训名称:</text>
			<input type="text" value="" placeholder="请输入培训名称"/>
		</view>
		<view class="wrap">
			<text>培训形式:</text>
			<view class="wrapchilder">
				<text class="count">视频</text>
				<text class="iconarrow-right"></text>
			</view>
		</view>
		<view class="wrap">
			<text>参训人员:</text>
			<view class="wrapchilder">
				<text class="count">技术二部</text>
				<text class="iconarrow-right"></text>
			</view>
		</view>
		<view class="wrap">
			<text>培训日期:</text>
			<view class="wrapchilder">
				<text class="count"></text>
				<text class="iconarrow-right"></text>
			</view>
		</view>
		<view class="wrap">
			<text>培训地点:</text>
			<view class="wrapchilder">
				<text class="count"></text>
				<text class="iconarrow-right"></text>
			</view>
		</view>
		<view class="wrap">
			<text>课程讲师:</text>
			<input type="text" value="" placeholder="请输入讲师名称"/>
		</view>
		<view class="wrap">
			<text>讲师介绍:</text>
			<textarea value="" placeholder="请输入讲师介绍" />
		</view>
		<view class="wrap">
			<text>详细介绍:</text>
			<textarea value="" placeholder="请输入课程详细介绍" />
		</view>
		<view class="wrap">
			<text>资料上传:</text>
			<text class="butt">上传文件</text>
		</view>
		<view class="succ">确定并邮件通知</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.wrap{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #333;
		padding: 20upx;
		border-bottom: 1upx solid #eee;
		textarea{
			border: 1upx solid #eee;
			box-sizing: border-box;
			padding: 6upx;
			border-radius: 4upx;
			height: 160upx;
			width: 550upx;
		}
		.wrapchilder{
			display: flex;
			align-items: center;
		}
		.iconarrow-right{
			font-size: 30upx;
			margin-left: 6upx;
		}
		.count{
			color: #787878;
		}
		input{
			width: 550upx;
			padding: 4upx;
			font-size: 30upx;
		}
		.butt{
			background: #0077AA;
			padding: 6upx 14upx;
			color: #fff;
			font-size: 30upx;
			border-radius: 6upx;
		}
	}
	.succ{
		width: 50%;
		margin: 40upx auto;
		background: #0077AA;
		color: #fff;
		border-radius: 6upx;
		padding: 20upx 0;
		text-align: center;
		font-size: 32upx;
	}
</style>
