<template>
	<view>
		<view class="list">
			<text>申请人</text>
			<input type="text" value="" />
		</view>
		<view class="list">
			<text>会议主题</text>
			<input type="text" value="" />
		</view>
		<view class="list">
			<text>参会人员</text>
			<text>请选择</text>
		</view>
		<view class="list">
			<text>参会人数</text>
			<text>请选择</text>
		</view>
		<view class="list">
			<text>会议时间</text>
			<text>请选择</text>
		</view>
		<view class="list">
			<text>会议地点</text>
			<text>请选择</text>
		</view>
		<view class="count">
			<text>一号楼101</text>
			<text>二号楼101</text>
			<text>三号楼101</text>
			<text>一号楼201</text>
			<text>二号楼201</text>
			<text>三号楼201</text>
			<text>一号楼301</text>
			<text>二号楼301</text>
			<text>三号楼301</text>
		</view>
		<view class="butt">发送邮件</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.list{
		font-size: 28upx;
		color: #000;
		box-sizing: border-box;
		padding: 20upx 40upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #eee;
	}
	.list input{
		width: 540upx;
	}
	.count{
		width: 700upx;
		margin: 30upx auto;
		border: 1upx solid #eee;
		box-sizing: border-box;
		padding: 10upx;
		border-radius: 8upx;
		font-size: 28upx;
		color: #2C405A;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.count text{
		display: inline-block;
		width: 25%;
		box-sizing: border-box;
		padding: 4upx 10upx;
		border: 1upx solid #eee;
		border-radius: 4upx;
		text-align: center;
		margin: 10upx 20upx;
	}
	.butt{
		width: 80%;
		padding: 20upx 0;
		text-align: center;
		font-size: 30upx;
		color: #fff;
		background: #10AEFF;
		border-radius: 10upx;
		margin: 50upx auto;
	}
</style>
