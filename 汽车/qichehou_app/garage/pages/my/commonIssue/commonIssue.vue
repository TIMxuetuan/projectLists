<template>
	<view>
		<view class="common-issue">
			<!--标题-->
			<view class="common-issue-title">
				如何绑定银行卡？
			</view>

			<!--问题详情内容-->
			<block v-for="item in issueLists">
				<view class="common-issue-content">
					<view class="issue-content-title">
						{{item.title}}
					</view>
					<image :src="item.image" mode=""></image>
				</view>
			</block>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				issueLists: [{
					title: '1.在我的首页点击账户余额',
					image: '../../../static/img/My/我的-1@3x.png'
				},
				{
					title: '2.进入我的钱包，点击银行卡',
					image: '../../../static/img/My/我的钱包-未绑卡 – 3@3x.png'
				},
				{
					title: '3.进入绑定银行卡页面，进行绑定',
					image: '../../../static/img/My/添加银行卡 – 1@3x.png'
				},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.common-issue {
		padding: 0 40rpx;
		overflow: hidden;

		.common-issue-title {
			font-size: 32rpx;
			color: #444444;
			margin: 30rpx 0 60rpx;
			text-align: center;
		}
	}

	.common-issue-content {
		margin: 0 auto 30rpx;
		text-align: center;

		.issue-content-title {
			font-size: 28rpx;
			color: #444444;
			text-align: left;
			margin-bottom: 20rpx;
		}

		image {
			width: 500rpx;
			height: 880rpx;
		}
	}
</style>
