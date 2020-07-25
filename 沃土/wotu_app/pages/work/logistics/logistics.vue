<template>
	
	<view class="content">
		<view class="w-panel">
			<view class="w-panel-title">系统集成</view>
			<view class="w-panel-cell">
				<view class="iconfont"><text style='color:#47A3D9' class="iconshengchanguanli"></text></view>
				<text class="title">生产制造执行管理</text>
			</view>
			<view class="w-panel-cell">
				<view class="iconfont">	<text style="color: #FFCC00;" class="iconcangchuguanli"></text></view>
				<text class="title">仓库管理</text>
			</view>
			<view class="w-panel-cell">
				<view class="iconfont"><text style='color:#47A3D9' class="iconyunshuguanli-"></text></view>
				<text class="title">运输管理</text>
			</view>
		</view>
		
		<view class="w-panel">
			<view class="w-panel-title">信息跟踪 轨迹异常报警</view>
			<view class="w-panel-cell">
				<view class="iconfont"><text style='color:#FFCC00' class="iconzhuangbei"></text></view>
				<text class="title">物流装备</text>
			</view>
			<view class="w-panel-cell">
				<view class="iconfont"><text style="color: #47A3D9;" class="iconwuliu"></text></view>
				<text class="title">物流状态</text>
			</view>
			<view class="w-panel-cell">
				<view class="iconfont"><text style='color:#FFCC00' class="iconwuliuguanli"></text></view>
				<text class="title">物料信息</text>
			</view>
		</view>
		
		<view class="w-panel">
			<view class="w-panel-title">优化</view>
			<view class="w-panel-cell">
				<view class="iconfont"><text style='color:#47A3D9' class="iconzhuangzai"></text></view>
				<text class="title">装载能力</text>
			</view>
			<view class="w-panel-cell">
				<view class="iconfont"><text style="color: #FFCC00;" class="iconluxian"></text></view>
				<text class="title">物流路线</text>
			</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.content{
		background: $uni-bg-color-grey;
		padding: 10upx 15upx;
		.w-panel-title{
			font-size: 30upx;
		}
	}
</style>
