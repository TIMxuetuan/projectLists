<template>
	<view class="container">
		<view class="w-panel">
			<navigator url="./materdails/materdails" class="w-panel-cell">
				<text class="iconchanpinsheji" style='color:#47A3D9'></text>
				<text class="title">
					原材料计划
				</text>
			</navigator>
			<navigator url="./materdails/materdails" class="w-panel-cell">
				<text class="iconplan" style="color: #FFCC00;"></text>
				<text class="title">
					库存记录
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
