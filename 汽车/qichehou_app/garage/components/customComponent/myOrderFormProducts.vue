<template>
	<view>
		<view class="order-products">
			<view class="order-products-item" v-for="(item,index) in productLists" :key="index" @click="gotoOrderDetails(item)">
				<!--标题头部 公司名字、状态-->
				<view class="products-item-head">
					<view class="item-head-merchant">
						<image src="../../static/img/product/merchant.png" mode=""></image>
						<text>{{item.name}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<text style="color:#EF744D">{{ item.type | filterIsLoginState(item.type)}}</text>
				</view>
				<!--主要内容-->
				<view class="products-item-content">
					<!--此处有两种排版
						1.只有一种商品时，左右是图文展示
						2.当大于等于两种商品时，全部为商品图片展示
					-->
					<view v-if="item.image.length == 1" class="item-content-one">
						<block v-for="imageUrl in item.image">
							<image :src="imageUrl.url" mode=""></image>
						</block>
						<text>{{item.text}}</text>
						<!--价格-->
						<view class="item-content-price">
							<view class="">
								<text style="font-size: 32rpx;font-weight:400;"> <text style="font-size: 24rpx;">￥</text>{{item.price}}</text>
							</view>
						</view>
					</view>

					<view v-if="item.image.length > 1" class="item-content-one" style="justify-content: space-between;">
						<view class="two-image">
							<image v-for="imageUrl in item.image" :src="imageUrl.url" mode=""></image>
						</view>
						<!--价格-->
						<view class="item-content-price">
							<text style="font-size: 32rpx;font-weight:400;"> <text style="font-size: 24rpx;">￥</text>{{item.price}}</text>
							<view class="">
								<text style="color: #5A5A5A;font-size: 24rpx;">共{{item.count}}件</text>
							</view>
						</view>
					</view>

				</view>

				<!--按钮-->
				<view class="">
					<view class="uview_from_button">
						<view></view>
						<view class="button-two">
							<u-button :custom-style="oneBtn" @click="affirmClick">{{ item.type | filterIsLoginState2(item.type)}}</u-button>
							<u-button v-if="item.type == 0" :custom-style="toPay" @click="affirmClick">去付款</u-button>
						</view>
					</view>
				</view>
			</view>
			<view class="footer">
				——— 没有更多了 ———
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			productListsIndex: {
				type: Number
			},
			productLists: {
				type: Array
			}
		},
		data() {
			return {
				//第一个按钮
				oneBtn: {
					width: '170rpx',
					height: '60rpx',
					lineHeight: '60rpx',
					fontSize: '28rpx',
				},

				//去付款按钮
				toPay: {
					width: '170rpx',
					height: '60rpx',
					lineHeight: '60rpx',
					fontSize: '28rpx',
					color: '#EC3333',
					marginLeft: '20rpx'
				}
			};
		},
		filters: {
			//type类型  0:待付款， 1：待发货，2：等待物流接单，3：待收货，4：退款中，5：已退款，6：交易关闭，7：交易完成
			filterIsLoginState(val, key) {
				var newVal = val
				if (key == 0) {
					newVal = '待付款'
				} else if (key == 1) {
					newVal = '待发货'
				} else if (key == 2) {
					newVal = '等待物流接单'
				} else if (key == 3) {
					newVal = '待收货'
				} else if (key == 4) {
					newVal = '退款中'
				} else if (key == 5) {
					newVal = '已退款'
				} else if (key == 6) {
					newVal = '交易关闭'
				} else if (key == 7) {
					newVal = '交易完成'
				}
				return newVal
			},

			//type类型  0:取消订单， 1：提醒发货，2：查看详情，3：确认收货，4：查看详情，5：查看详情，6：查看详情，7：查看详情
			filterIsLoginState2(val, key) {
				var newVal = val
				if (key == 0) {
					newVal = '取消订单'
				} else if (key == 1) {
					newVal = '提醒发货'
				} else if (key == 2) {
					newVal = '查看详情'
				} else if (key == 3) {
					newVal = '确认收货'
				} else if (key == 4) {
					newVal = '查看详情'
				} else if (key == 5) {
					newVal = '查看详情'
				} else if (key == 6) {
					newVal = '查看详情'
				} else if (key == 7) {
					newVal = '查看详情'
				}
				return newVal
			},
		},
		methods: {
			gotoOrderDetails(item) {
				this.$emit('gotoOrderDetails', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-products {
		.order-products-item {
			padding: 0 40rpx;
			height: 340rpx;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			background-color: #fff;

			.item-head-merchant {
				display: flex;
				align-items: center;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}

				text {
					font-weight: 500;
					font-size: 28rpx;
					color: #000;
					margin-right: 10rpx;
				}
			}

			.products-item-head {
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.products-item-content {
				padding: 0 0 20rpx;

				.item-content-one {
					display: flex;
					align-items: center;

					image {
						width: 130rpx;
						height: 130rpx;
						display: block;
						margin-right: 20rpx;
					}

					text {
						flex: 1;
						font-size: 24rpx;
					}
				}
				
				.two-image{
					display: flex;
					image{
						margin-right: 30rpx;
					}
				}
				
				.item-content-price {
					display: flex;
					flex-direction: column;
					text-align: right;
					margin-left: 30rpx;
				}
			}
		}

		.uview_from_button {
			padding: 10rpx 0 0;
			display: flex;
			justify-content: flex-end;

			.button-two {
				display: flex;
			}
		}
	}

	.footer {
		margin: 0 0 16rpx;
		text-align: center;
		font-size: 28rpx;
		color: #5A5A5A;
	}
</style>
