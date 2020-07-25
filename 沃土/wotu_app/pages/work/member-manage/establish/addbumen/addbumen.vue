<template>
	<view class="foundwrap">
		<view class="found_list">
			<text>部门名称：</text>
			<view class="line inputwrap">
				<input type="text" value="" />
			</view>
		</view>
		<view class="found_list">
			<text>上级部门：</text>
			<view class="line choosewrap">
				<input type="text" value="" />
				<view class="choose">
					<text>请选择</text>
					<text class="iconarrow-right"></text>
				</view>
			</view>
		</view>
		<view class="add_butt">添加</view>
	</view>
</template>

<script>

</script>

<style lang="scss" scoped>
	@import '@/static/css/icon.scss';

	.foundwrap {
		margin-top: 20upx;
		font-size: 28upx;
		color: #101010;
		box-sizing: border-box;
		padding: 0 30upx;

		.found_list {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20upx 0upx;

			.line {
				width: 530upx;
				border-bottom: 1upx solid #bbbbbb;

				input {
					display: inline-block;
				}
			}

			.inputwrap input {
				display: block;
			}

			.choosewrap {
				display: flex;
				width: 530upx;
				justify-content: space-between;

				input {
					width: 400upx;
				}
			}

			.choose {
				display: block;

				.iconarrow-right {
					font-size: 24upx;
					color: #101010;
				}
			}
		}
		.add_butt {
			display: block;
			width: 90%;
			font-size: 30upx;
			color: #fff;
			background: #09B8F2;
			text-align: center;
			padding: 30upx 0px;
			border-radius: 12upx;
			margin: 50upx auto;
		}
	}
</style>
