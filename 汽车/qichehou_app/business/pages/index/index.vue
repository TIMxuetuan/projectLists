<template>
	<view style="heigth:auto" class="container">
		<!-- 头 -->
		<view class="container_head">
			<view class="head_img">
				<image src="../../static/img/imgIcon.png"></image>
			</view>
			<view class="head_content">
				<view class="head_content_top_txt">
					郑州金牛轮胎有限公司
				</view>

				<view class="head_content_lower_txt">
					主营品牌：玛吉斯
				</view>
			</view>
			<view class="icon-arrow-right head_right"></view>
		</view>
		<!-- 销售详情 -->
		<view class="sell_see">
			<view class="date_show" @click="show_click">
				<text class="choice">
					{{today==0?"今天":today==1?"近7天":today==2?"本月":"本年"}}&nbsp&nbsp
				</text>
				<text class="choice">▾</text>
			</view>
			<view class="date_show_block" :style="show==1?'display:inline':'display:none'">
				<view class="drop-down" @click="today_click(0)">
					今天
				</view>
				<view class="drop-down" @click="today_click(1)">
					近7天
				</view>
				<view class="drop-down" @click="today_click(2)">
					本月
				</view>
				<view class="drop-down" @click="today_click(3)">
					本年
				</view>
			</view>
			<view class="sell_price">
				总销售额（元）
			</view>
			<view class="sell_number">
				6168416.52
			</view>
			<view class="sell_money_txt">
				<view class="sell_money_txt_left">
					销售金额（元）
				</view>
				<view class="sell_money_txt_right">
					退款金额（元）
				</view>
			</view>
			<view class="sell_money_number">
				<view class="sell_money_number_left">
					<text class="left">68416.52</text>
					<text class="right">共35笔</text>
				</view>
				<view class="sell_money_number_right">
					<text class="left">416.52</text>
					<text class="right">共3笔</text>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 全部订单 -->
			<view class="all_orders">
				<view class="head">
					<view class="head_text">
						全部订单
					</view>
					<view class="head_right">
						<u-icon name="arrow-right" color="#5A5A5A" size="28"></u-icon>
					</view>
				</view>

				<view class="order-form-content">
					<block v-for="item in myOrderFrom">
						<view class="from-content-items">
							<image :src="item.image" mode=""></image>
							<text>{{item.name}}</text>
						</view>
					</block>
				</view>

			</view>
			<view style="height: 244rpx;"></view>
			<!-- 收支统计 -->
			<view class="income_statistics">
				<view class="all_orders_head">
					<view class="all_orders_head_text">
						收支统计
					</view>
					<view class="all_orders_head_right">
						<u-icon name="arrow-right" color="#5A5A5A" size="28"></u-icon>
					</view>
				</view>
				<view class="income_statistics_content">
					<!-- 上 -->
					<view class="income_statistics_content_top income_statistics-fill">
						<view class="">
							<view class="head-number">
								29087.50
							</view>
							<view class="head-text">
								今日成交额
							</view>
						</view>
						<view style="flex: 1;"></view>
						<view class="">
							<view class="head-number">
								9598.87
							</view>
							<view class="head-text">
								今日毛利额(元)
							</view>
						</view>
						<view style="flex: 1;"></view>
						<view class="">
							<view class="head-number">
								33.00%
							</view>
							<view class="head-text">
								今日毛利率
							</view>
						</view>
					</view>
					<!-- 下 -->
					<view class="income_statistics_content_top">
						<view class="">
							<view class="head-number">
								75.2%
							</view>
							<view class="head-text">
								今日回款率
							</view>
						</view>
						<view style="flex: 1;"></view>
						<view class="">
							<view class="head-number">
								28398.50
							</view>
							<view class="head-text">
								今日已收款(元)
							</view>
						</view>
						<view style="flex: 1;"></view>
						<view class="">
							<view class="head-number">
								689.00
							</view>
							<view class="head-text">
								今日未收款(元)
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 销售 -->
			<view class="sale">
				<view class="sale_head">
					<view class="sale_head_txt">
						销售
					</view>
					<view class="sale_head_right">
						<view :class="date==0?'sale_head_right_select':'sale_head_right_noselect'" @click="sale_head_click(0)">
							今天
						</view>
						<view :class="date==1?'sale_head_right_select':'sale_head_right_noselect'" @click="sale_head_click(1)">
							本月
						</view>
						<view :class="date==2?'sale_head_right_select':'sale_head_right_noselect'" @click="sale_head_click(2)">
							本年
						</view>
					</view>
				</view>
				<view class="sale_content">
					<view class="sale_content_txt">
						<view style="height:17px;font-size:16px;font-weight:400;line-height:18px;color:rgba(0,0,0,1);text-align: center;">
							29087.50
						</view>
						<view style="text-align: center;color:rgba(90,90,90,0.70);height:13px;font-size:12px;font-family:Source Han Sans CN;font-weight:400;line-height:20px">
							销售金额(元)
						</view>
					</view>
					<view style="flex: 1;"></view>
					<view class="sale_content_txt">
						<view style="text-align: center;height:17px;font-size:16px;font-weight:400;line-height:18px;color:rgba(0,0,0,1);">
							35
						</view>
						<view style="text-align: center;color:rgba(90,90,90,0.70);height:13px;font-size:12px;font-family:Source Han Sans CN;font-weight:400;line-height:20px">
							销售数量(单)
						</view>
					</view>
				</view>
				<view style="height: 20px;"></view>
				<view class="sale_content_choice">
					<view :class="mycustomer==0?'sale_content_choice_txt_select':'sale_content_choice_txt_noselect'" @click="customer_click(0)">
						按销售客户
					</view>
					<view style="flex: 1;"></view>
					<view :class="mycustomer==1?'sale_content_choice_txt_select':'sale_content_choice_txt_noselect'" @click="customer_click(1)">
						按销售客户
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../common/public.js'
	export default {
		data() {
			return {
				..._data,
				date: 0,
				mycustomer: 0,
				show: 0,
				today: 0,
				myOrderFrom: [{
						image: '../../static/img/My/dfk1.png',
						name: "待付款"
					},
					{
						image: '../../static/img/My/dfh1.png',
						name: "待发货"
					},
					{
						image: '../../static/img/My/yfh1.png',
						name: "待收货"
					},
					{
						image: '../../static/img/My/tk1.png',
						name: "退款/售后"
					},
				],
			}
		},
		onLoad() {
			//util._post(this._config.host+'/bboss/api.php?url=shop/delete_batch',{ids:'21'})
		},
		methods: {
			// 日期切换
			sale_head_click(data) {
				console.log(data)
				this.date = data
			},
			//客户切换
			customer_click(data) {
				this.mycustomer = data
			},
			// 日期显示
			show_click() {
				this.show = 1
			},
			// 日期切换
			today_click(data) {
				this.today = data
				this.show = 0
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		background: rgba(241, 241, 241, 1);
	}

	.container_head {
		background-color: #4779F2;
		padding: 0 38rpx;
		padding-top: 30rpx;
		padding-bottom: 18rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.head_img>image {
		width: 96rpx;
		height: 96rpx;
	}
	.content {
		padding-bottom: 30rpx;
	}

	.head_content {
		flex: 1;
		height: 96rpx;
		margin-left: 32rpx;
		color: rgba(255, 255, 255, 1);
		.head_content_top_txt {
			font-size: 32rpx;
			height: 32rpx;
			line-height: 32rpx;
		}

		.head_content_lower_txt {
			padding-top: 34rpx;
			font-size: 24rpx;
			height: 24rpx;
			line-height: 24rpx;
		}
	}
	.head_right {
		font-size:38rpx;
		color: rgba(255, 255, 255, 0.8);
	}
	.sell_see {
		height: 300rpx;
		background-color: #4779F2;
		padding-left: 38rpx;
		padding-top: 34rpx;
		position: relative;
		.date_show {
			position: absolute;
			top: 34rpx;
			right: 38rpx;
			width: 110rpx;
			height: 50rpx;
			background: rgba(255, 255, 255, 0.31);
			box-shadow: 0px 2rpx 6rpx rgba(0, 0, 0, 0.16);
			border-radius: 10rpx;
			text-align: center;
		}

		.choice {
			font-size: 24rpx;
			line-height: 50rpx;
			color: rgba(255, 255, 255, 1);
		}

		.date_show_block {
			position: absolute;
			top: 84rpx;
			right: 38rpx;
			width: 110rpx;
			background: rgba(255, 255, 255, 0.31);
			box-shadow: 0px 2rpx 6rpx rgba(0, 0, 0, 0.16);
			border-radius: 10rpx;
			z-index: 999;

			.drop-down {
				font-size: 24rpx;
				line-height: 50rpx;
				color: rgba(255, 255, 255, 1);
				text-align: center;
			}
		}
		.sell_price {
			font-size: 28rpx;
			height: 28rpx;
			line-height: 28rpx;
			color: rgba(255, 255, 255, 0.80);
		}

		.sell_number {
			font-size: 20px;
			line-height: 22px;
			height: 30px;
			color: rgba(255, 255, 255, 1);
			padding-top: 8px;
			margin-bottom: 34rpx;
		}

		.sell_money_txt {
			padding-right: 38rpx;
			display: flex;
			margin-bottom: 24rpx;
			.sell_money_txt_left {
				flex: 1;
				height: 28rpx;
				line-height: 28rpx;
				font-size: 28rpx;
				color: rgba(255, 255, 255, 0.80);
			}

			.sell_money_txt_right {
				flex: 1;
				height: 28rpx;
				font-size: 28rpx;
				line-height: 28rpx;
				color: rgba(255, 255, 255, 0.80);
			}
		}

		.sell_money_number {
			height: 32rpx;
			display: flex;
			color: rgba(255, 255, 255, 1);
			padding-right: 38rpx;

			.sell_money_number_left {
				flex: 1;
				display: flex;
			}
			.sell_money_number_right {
				flex: 1;
				display: flex;
			}
			.left {
				font-size: 32rpx;
				height: 32rpx;
				line-height: 32rpx;
				padding-right: 24rpx;
			}
			.right {
				line-height: 22px;
				font-size: 12px;
				height: 12px;
			}
		}
	}

	.content {
		margin: 0 19px;
		position: relative;
		.all_orders {
			width: 100%;
			height: 264rpx;
			background: rgba(255, 255, 255, 1);
			opacity: 1;
			border-radius: 10px;
			position: absolute;
			top: -18px;

			.head {
				margin: 20rpx 24rpx;
				display: flex;

				.head_text {
					flex: 1;
					height: 32rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					color: rgba(68, 68, 68, 1);
				}

				.head_right {
					font-size: 16px;
					color: #5A5A5A;
				}
			}
		}

		.order-form-content {
			display: flex;
			justify-content: space-around;

			.from-content-items {
				width: 120rpx;
				height: 140rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				color: #5A5A5A;

				image {
					width: 60rpx;
					height: 60rpx;
					display: block;
					border-radius: 50%;
					background-color: #4779F2;
					padding: 20rpx;
				}
			}
		}


		.income_statistics {
			height: 153px;
			background: rgba(255, 255, 255, 1);
			border-radius: 10px;

			.all_orders_head {
				padding-top: 11px;
				margin: 0 12px;
				display: flex;

				.all_orders_head_text {
					flex: 1;
					height: 16px;
					font-size: 16px;
					line-height: 16px;
					color: rgba(68, 68, 68, 1);
				}

				.all_orders_head_right {
					width: 16px;
					height: 16px;
					line-height: 16px;
					font-size: 16px;
					color: #5A5A5A;
				}
			}
			
			.income_statistics-fill{
				padding-bottom: 60rpx;
			}
			
			.income_statistics_content {
				padding-left: 74rpx;
				padding-top: 36rpx;
				padding-bottom: 38rpx;
				padding-right: 72rpx;

				.income_statistics_content_top {
					display: flex;

					.head-number {
						height: 34rpx;
						font-size: 32rpx;
						line-height: 32rpx;
						color: rgba(0, 0, 0, 1);
						text-align: center;
					}

					.head-text {
						height: 20rpx;
						font-size: 20rpx;
						line-height: 34rpx;
						color: rgba(90, 90, 90, 0.70);
						text-align: center;
					}
				}
			}
		}

		.sale {
			margin-top: 15rpx;
			padding-bottom: 34rpx;
			height: 292rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20rpx;
			padding: 0 24rpx;

			.sale_head {
				display: flex;
				padding-top: 22rpx;

				.sale_head_txt {
					height: 32rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					color: rgba(68, 68, 68, 1);
					flex: 1;
				}

				.sale_head_right {
					width: 256rpx;
					height: 50rpx;
					border: 2rpx solid rgba(18, 150, 219, 1);
					border-radius: 26rpx;
					overflow: hidden;
					display: flex;

					.sale_head_right_select {
						width: 94rpx;
						font-size: 28rpx;
						line-height: 46rpx;
						text-align: center;
						color: rgba(255, 255, 255, 1);
						background: rgba(18, 150, 219, 1);
						border-radius: 26rpx;
					}

					.sale_head_right_noselect {
						width: 84rpx;
						font-size: 28rpx;
						line-height: 46rpx;
						text-align: center;
						color: rgba(18, 150, 219, 1);
					}
				}
			}

			.sale_content {
				padding: 0 80rpx;
				display: flex;
			}

			.sale_content_choice {
				height: 50rpx;
				padding: 0 106rpx;
				display: flex;

				.sale_content_choice_txt_select {
					width: 186rpx;
					height: 50rpx;
					border: 2rpx solid rgba(18, 150, 219, 1);
					border-radius: 22rpx;
					font-size: 28rpx;
					line-height: 48rpx;
					color: rgba(18, 150, 219, 1);
					text-align: center;
				}

				.sale_content_choice_txt_noselect {
					width: 176rpx;
					height: 50rpx;
					border: 2rpx solid rgba(112, 112, 112, 1);
					border-radius: 22rpx;
					font-size: 18rpx;
					line-height: 48rpx;
					color: rgba(90, 90, 90, 1);
					text-align: center;
				}
			}
		}
	}
</style>
