<template>
	<view class="container">
		<view class="w-panel">
			<navigator url="./regulate/regulate" class="w-panel-cell">
				<text class="iconfont iconshengchanguanli1" style='color:#FFCC00'></text>
				<text class="title">
					生产
				</text>
			</navigator>
			<navigator url="./material/material" class="w-panel-cell">
				<text class="iconwuliaoxuqiujihua" style='color:#47A3D9'></text>
				<text class="title">
					物料需求计划
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconplan" style="color: #FFCC00;"></text>
				<text class="title">
					生产计划与展示
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconyunpan" style="color: #47A3D9;"></text>
				<text class="title">
					工艺设计云平台
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconfangzhenmoni" style="color: #FFCC00;"></text>
				<text class="title">
					模拟仿真
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconyaoping" style="color: #47A3D9;"></text>
				<text class="title">
					生产瓶颈分析
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconjm4" style="color: #FFCC00;"></text>
				<text class="title">
					人因及工位分析
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconzhiliang2" style="color: #47A3D9;"></text>
				<text class="title">
					全面质量管理
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconshengmingzhouqi" style="color: #FFCC00;"></text>
				<text class="title">
					生命周期
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconliuchengguanli" style="color: #47A3D9;"></text>
				<text class="title">
					流程管理
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconkehuxuqiu" style="color: #FFCC00;"></text>
				<text class="title">
					客户需求管理
				</text>
			</navigator>
		</view>
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
					self.height = (a.screenHeight - 300) + 'px'
				}
			})
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		padding: 10upx 20upx;
		box-sizing: border-box;
		min-height: 100vh;
		background: $uni-bg-color-grey;
	}

	.hint {
		color: #708090;
		font-size: $uni-font-size-base;
		line-height: 1.8em;

		.iconfont {
			font-size: $uni-font-size-lg;
			margin-right: 10upx;
		}
	}
</style>
