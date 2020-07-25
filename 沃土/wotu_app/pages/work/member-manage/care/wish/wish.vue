<template>
	<view class="foundwrap">
		<view class="found_list">
			<text>收件人：</text>
			<view class="choose">
				<text>请选择</text>
				<text class="iconarrow-right"></text>
			</view>
		</view>
		<view class="found_list">
			<text>收件内容：</text>
			<view class="line inputwrap">
				<textarea value="" placeholder="" />
				</view>
		</view>
		<view class="add_butt">发送</view>
	</view>
</template>
<script>
export default {
	data(){
		return{
			
		}
	},
	onLoad(e) {
		console.log(e)
		if(e.tab=='true'){
			uni.setNavigationBarTitle({
				title: '生日关怀'
			});
		}else{
			uni.setNavigationBarTitle({
				title: '特殊日期祝福'
			});
		}
	}
}
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
			justify-content: space-between;
			padding: 20upx 0upx;
			border-bottom: 1upx solid #eee;
			.line {
				width: 530upx;
				input {
					display: inline-block;
				}
			}
			.inputwrap textarea{
				display: block;
				border: 1upx solid #eee;
				width: 100%;
				height: 140upx;
				box-sizing: border-box;
				padding: 10upx;
				font-size: 28upx;
			}
			.choosewrap {
				display: flex;
				width: 530upx;
				justify-content: space-between;
			}
			.choose {
				display: flex;
				align-items: center;
				.iconarrow-right {
					font-size: 24upx;
					color: #101010;
				}
			}
		}
		.add_butt {
			display: block;
			width: 70%;
			font-size: 32upx;
			color: #fff;
			font-weight: bold;
			background: #00D3B8;
			text-align: center;
			padding: 20upx 0px;
			border-radius: 12upx;
			margin: 50upx auto;
		}
	}
</style>
