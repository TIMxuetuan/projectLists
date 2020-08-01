<template>
	<view>
		<!--头部部分-->
		<view class="order-details-head">
			<!--
				这里分为多种状态，不同状态展示不同的内容 状态跟订单列表状态相互一致
				//type类型  0:待付款， 1：待发货，2：等待物流接单，3：待收货，4：退款中，5：已退款，6：交易关闭，7：交易完成
			-->

			<view class="order-details-one">
				
				<!--待付款状态-->
				<block v-if="stateType == 0">
					<view class="details-one-left">
						等待买家付款
					</view>
					<view class="details-one-right">
						<text>剩余时间11:30:25</text>
						<text>24小时内未支付，订单将自动取消</text>
					</view>
				</block>

				<!--待发货-->
				<block v-if="stateType == 1">
					<view class="details-one-left">
						待发货
					</view>
				</block>
				
				<!--等待物流接单-->
				<view v-if="stateType == 2">
					<view class="details-one-left">
						等待物流接单
					</view>
				</view>
				
				<!--待收货-->
				<view v-if="stateType == 3">
					<view class="details-one-left">
						待收货
						<text style="margin-left: 40rpx; font-size: 24rpx;">运输中</text>
					</view>
				</view>
				
				<!--退款中-->
				<view v-if="stateType == 4">
					<view class="details-one-left">
						退款中
						<text style="margin-left: 40rpx; font-size: 24rpx;">待确认</text>
					</view>
				</view>
				
				<!--退款完成-->
				<view v-if="stateType == 5">
					<view class="details-one-left">
						退款完成
					</view>
				</view>
				
				<!--退款完成-->
				<view v-if="stateType == 6">
					<view class="details-one-left">
						交易关闭
					</view>
				</view>
				
				<!--交易完成-->
				<view v-if="stateType == 7">
					<view class="details-one-left">
						交易完成
					</view>
				</view>
				
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			stateType: {
				type: Number
			}
		},
		data() {
			return {
				type: 0
			};
		}
	}
</script>

<style lang="scss" scoped>
	.order-details-head {
		background-color: #EC3333;
		padding: 0 20rpx;

		.order-details-one {
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;

			.details-one-left {
				font-size: 28rpx;
			}

			.details-one-right {
				height: 120rpx;
				padding: 20rpx 0;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-end;

				text {
					font-size: 24rpx;
				}
			}
		}
	}
</style>
