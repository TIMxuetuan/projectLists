<template>
	<view>
		<view class="submit-orders">
			<!--地址模块 无地址时显示-->
			<view class="orders-adress" v-if="isAdressShow == 0" @click='gotoShippingAddress'>
				<view class="">
					<u-icon name="map-fill" size="40"></u-icon>
				</view>
				<view class="orders-adress-text">
					点击选择地址
				</view>
			</view>
			
			<!--有地址时显示-->
			<view class="adress-show" v-if="isAdressShow == 1" @click='gotoShippingAddress'>
				<view class="adress-show-top">
					<view class="">
						<u-icon name="map-fill" size="40"></u-icon>
						<text>郑州金牛汽修厂</text>
					</view>
					<view class="orders-adress-text">
						18237203633
					</view>
				</view>
				<view class="adress-show-text">
					地址：河南省郑州市金水区 文化路街道金牛汽修厂 1楼仓储售后服务中心
				</view>
			</view>

			<!--商品内容模块-->
			<view class="orders-products">
				<view class="orders-products-items" v-for="(items,index) in products" :key="index">
					<!--公司名字-->
					<view class="orders-products-company">
						{{items.name}}
					</view>

					<!--详情内容-->
					<view class="products-details-content">
						<view class="details-content-item" v-for="item in items.lists">
							<view class="item-image">
								<image :src="item.image" mode=""></image>
							</view>

							<view class="item-details">
								<view class="item-details-text">
									{{item.texts}}
								</view>
								<view class="item-details-pricce">
									￥{{item.price}}
								</view>
								<view class="item-details-count">
									x{{item.count}}
								</view>
							</view>
						</view>

						<!--价格以及备注-->
						<view class="item-money">
							<view class="item-money-freight">
								<text class="freight">运费</text>
								<text class="freight">￥100.00</text>
							</view>
							
							<view class="item-money-remark">
								<text>订单备注</text>
								<u-input v-model="items.remark" :border="false" :clearable=false :custom-style='remarkInput' placeholder="选填"/>
							</view>
							
							<view class="item-money-freight" style="line-height: 1;">
								<text></text>
								<view class="total">
									合计：<text style="color: #EF744D;"><text style="font-size:24rpx">￥</text>518.00</text>
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
			
			<!--提交订单按钮模块-->
			<view class="orders-btn">
				<view class="">
					
				</view>
				<view class="orders-btn-right">
					<view class="orders-btn-count">
						<text>应付总额：</text>
						<text style="color:#FF450D">￥1063.00</text>
					</view>
					<u-button shape="circle" :custom-style="submitOrdersStyle" @click="submitOrder">提交订单</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//提交订单按钮
				submitOrdersStyle:{
					width:'200rpx',
					height:'80rpx',
					backgroundColor:'#EC3333',
					color:'#fff'
				},
				products: [
					{
						name:'郑州金牛汽修商有限公司',
						remark:'',
						lists:[
							{
								image: '../../../static/img/deng.png',
								texts: '佳通轮胎155R12C 花纹VAN600 正品三包全包',
								price: 1088.00,
								count: 2
							},
							{
								image: '../../../static/img/deng.png',
								texts: '美孚机油 花纹VAN600 正品三包全包',
								price: 188.00,
								count: 3
							}
						]
					},
					{
						name:'郑州佳通汽修商有限公司',
						remark:'',
						lists:[
							{
								image: '../../../static/img/deng.png',
								texts: '佳通轮胎155R12C 花纹VAN600 正品三包全包',
								price: 1088.00,
								count: 2
							},
						]
					}
					
					
				],
				
				//备注输入框及值
				remarkInput:{
					width:'500rpx',
					height:'70rpx'
				},
				isAdressShow:0
			};
		},
		
		methods:{
			//跳转收货地址
			gotoShippingAddress(){
				uni.navigateTo({
					url: '/pages/product/shippingAddress/shippingAddress'
				});
			},
			
			//提交订单
			submitOrder(){
				uni.navigateTo({
					url: '/pages/product/payWay'
				});
			}
		}
	}
</script>

<style>
	page {
		background: rgba(241, 241, 241, 1);
	}
</style>

<style lang="scss" scoped>
	.submit-orders {
		position: relative;
	}
	//地址为空时
	.orders-adress {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		margin-bottom: 12rpx;

		.orders-adress-text {
			margin-left: 10rpx;
		}
	}
	
	//有地址时
	.adress-show{
		padding: 30rpx 40rpx;
		background-color: #fff;
		.adress-show-top{
			display: flex;
			justify-content: space-between;
		}
		
		.adress-show-text{
			font-size: 24rpx;
			color: #B3B4B3;
			margin-left: 40rpx;
		}
	}

	//商品模块
	.orders-products {
		margin-bottom: 100rpx;

		.orders-products-items {
			background-color: #fff;
			margin-bottom: 20rpx;
			padding: 0 40rpx 30rpx;
		}

		.orders-products-company {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			font-weight: 400;
		}
		
		.products-details-content {
			.details-content-item {
				margin-top: 10rpx;
				display: flex;
		
				.item-image {
					margin-right: 20rpx;
		
					image {
						width: 180rpx;
						height: 180rpx;
					}
				}
				
				.item-details{
					font-size: 24rpx;
					color: #000;
				}
				
				.item-details-text{
					height: 64rpx;
				}
		
				.item-details-pricce {
					margin: 20rpx 0 40rpx;
				}
		
				.item-details-count {
					color: #5A5A5A;
				}
		
			}
		
			.item-money {
				margin-top: 30rpx;
		
				.item-money-freight{
					display: flex;
					justify-content: space-between;
					color: #919391;
					.freight{
						font-size: 24rpx;
					}
				}
				
				.item-money-remark{
					display: flex;
					align-items: center;
					margin: 20rpx 0;
					text{
						height: 70rpx;
						line-height: 70rpx;
						margin-right: 20rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	}
	
	.total{
		font-size: 28rpx;
		color: #444444;
	}
	
	//提交订单模块
	.orders-btn{
		width: 100%;
		height: 100rpx;
		padding: 0 40rpx;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;
		
		.orders-btn-right{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.orders-btn-count{
			margin-right: 80rpx;
		}
	}
</style>
