<template>
	<view class="bankcards-content">
		<block v-for="item in bankCardLists">
			<view class="bank-cards">
				<view class="bank-cards-img">
					<image src="../../../static/img/My/工商银行.png" mode=""></image>
				</view>
				<view class="">
					<view class="bank-cards-name">
						中国工商银行
					</view>
					<view class="bank-cards-sort">
						储蓄卡
					</view>
					<view class="bank-cards-id">
						<view class="bank-cards-items">
							<block v-for="item in dotLists">
								<view class="bank-cards-omit"></view>
							</block>
						</view>
						<view class="bank-cards-items">
							<block v-for="item in dotLists">
								<view class="bank-cards-omit"></view>
							</block>
						</view>
						<view class="bank-cards-items">
							<block v-for="item in dotLists">
								<view class="bank-cards-omit"></view>
							</block>
						</view>
						<text>2848</text>
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankCardLists: [{}],
				dotLists: [{}, {}, {}, {}]
			};
		},
		methods: {

		}
	}
</script>


<style>
	page {
		background-color: rgba(238, 238, 238, 1);
	}
</style>

<style lang="scss" scoped>
	.bankcards-content {
		padding: 0 20rpx;
		overflow: hidden;
	}

	.bank-cards {
		width: 710rpx;
		height: 240rpx;
		background-color: #BF1920;
		margin-top: 12rpx;
		padding: 26rpx 40rpx 40rpx;
		display: flex;

		.bank-cards-img {
			margin-right: 20rpx;

			image {
				background-color: #fff;
				border-radius: 50%;
				width: 60rpx;
				height: 60rpx;
				padding: 5rpx;
			}
		}

		.bank-cards-name {
			font-size: 36rpx;
			color: #fff;
		}

		.bank-cards-sort {
			font-size: 32rpx;
			color: rgba(255, 255, 255, 0.6);
		}

		.bank-cards-id {
			margin-top: 50rpx;
			font-size: 40rpx;
			color: #fff;
			display: flex;
			align-items: center;
		}
		
		.bank-cards-items{
			margin-right: 30rpx;
			display: flex;
		}

		.bank-cards-omit {
			width: 10rpx;
			height: 10rpx;
			background-color: #fff;
			border-radius: 50%;
			margin-right: 8rpx;
		}
	}
</style>
