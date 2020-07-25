<template>
	<view>
		<view class="foundcopywrap">
			<view class="foundtitle">参与人员</view>
			<view class="logowrap">智业科技</view>
			<view class="foundlistwrap">
				<view class="foundlist">
					<text class="garden"></text>
					<text>人事部(3)</text>
				</view>
				<view class="foundlist">
					<text class="garden"></text>
					<text>人事部(3)</text>
				</view>
			</view>
		</view>
		<view class="foundcopywrap">
			<view class="foundtitle">添加人员</view>
			<view class="logowrap"></view>
			<view class="foundlistwrap">
				<view class="foundlist addpeople">
					<text>选择一个群</text>
					<text class="icon-icon1"></text>
				</view>
				<view class="foundlist addpeople">
					<text>人事部</text>
					<text class="icon-icon1"></text>
				</view>
				<view class="foundlist addpeople">
					<view class="">
						<text class="garden"></text>
						<text>创建一个群</text>
					</view>
					<text class="icon-icon1"></text>
				</view>
			</view>
		</view>
		<view class="succbutt">确定</view>
	</view>
</template>

<script>

</script>

<style lang="scss" scoped>
	@import '@/static/css/icon.scss';

	.foundcopywrap {
		box-sizing: border-box;
		padding: 20upx 30upx;
		font-size: 28upx;
		color: #101010;
		border-bottom: 20upx solid #F6F6F6;
		padding-bottom: 0px;

		.foundtitle {
			font-size: 34upx;
			color: #09B8F2;
			padding: 0upx 0upx;
		}

		.logowrap {
			color: #09B8F2;
			padding: 20upx 30upx;
		}

		.foundlist {
			padding: 20upx 0px;
			display: flex;
			align-items: center;
			border-bottom: 1upx solid rgba(187, 187, 187, 0.53);

			.garden {
				display: inline-block;
				width: 40upx;
				height: 40upx;
				background: rgba(9, 184, 242, 1);
				border-radius: 50%;
				margin-right: 15upx;
			}
		}

		.foundlist:last-child {
			border: none;
		}

		.foundlist:first-child {
			padding-top: 0px;
		}

		.foundlistwrap {
			.addpeople {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.icon-icon1 {
					font-size: 26upx;

				}
			}
		}
	}
	.succbutt{
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
</style>
