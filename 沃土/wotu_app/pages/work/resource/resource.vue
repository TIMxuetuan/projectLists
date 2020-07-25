<template>
	<view class="container">
		<view class="w-panel">
			<navigator url="" class="w-panel-cell">
				<text class="icongaoduanzhuangbei" style='color:#47A3D9'></text>
				<text class="title">
					装备
				</text>
			</navigator>
			<navigator url="" class="w-panel-cell">
				<text class="iconwangluo" style="color: #FFCC00;"></text>
				<text class="title">
					网络
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

			.iconfont {
				color: #fff;
				font-size: 80upx;
			}
		}
	}
</style>
