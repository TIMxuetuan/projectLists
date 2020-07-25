<template>
	<view class="container">
		<uni-popup ref="popup" type="bottom">
			<view class="btn-wrap">
				<view class="title">等级选择</view>
				<button style="background: #f21212;" @tap="pickerLev(4)">紧急重要</button>
				<button style="background: #ff9800;" @tap="pickerLev(3)">重要不紧急</button>
				<button style="background: #3f51b5;" @tap="pickerLev(2)">紧急不重要</button>
				<button style="background: #009688;" @tap="pickerLev(1)">不紧急不重要</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			pickerLev(num) {
				this.$emit('level', num)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-wrap {
		.title {
			text-align: center;
			color: $uni-bg-color-primary;
			padding-bottom: 20upx;
			font-size: 20px;
		}

		button {
			display: block;
			margin: 10upx auto;
			color: #fff;
		}
	}
</style>
