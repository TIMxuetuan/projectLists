<template>
	<view class="container">
		<view class="w-panel">
			<navigator url="" class="w-panel-cell">
				<text class="iconshuju" style='color:#47A3D9'></text>
				<text class="title">
					数据
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconmoxing" style="color: #FFCC00;"></text>
				<text class="title">
					集成
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconxinxianquan" style="color: #47A3D9;"></text>
				<text class="title">
					信息安全
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
