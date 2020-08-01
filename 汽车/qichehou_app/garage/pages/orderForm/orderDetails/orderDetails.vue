<template>
	<view class="order-details">
		<!--头部部分-->
		<view style="margin-bottom: 10rpx;">
			<orderDetailsHead :stateType='stateType'></orderDetailsHead>
		</view>
		
		<!--退款信息 当状态为退款中显示-->
		<view v-if="stateType == 4 || stateType ==5" style="margin-bottom: 20rpx;">
			<refund :stateType='stateType'></refund>
		</view>

		<!--中间内容部分-->
		<view class="order-details-content">

			<!--地址模块-->
			<view class="address-module">
				<view class="address-module-top">
					<view class="module-top-title">
						<image src="../../../static/img/product/coordinatesFill.png" mode=""></image>
						郑州金牛汽修厂
					</view>
					<view style="margin-left: 20rpx;font-size: 28rpx;">
						18237203633
					</view>
				</view>

				<view class="address-module-bottom">
					地址：河南省郑州市金水区 文化路街道金牛汽修厂 1楼仓储售后服务中心
				</view>
			</view>
			
			<!--物流模块、当商品为待收货状态中显示-->
			<view v-if="stateType == 3 || stateType == 7" style="margin: 20rpx 0;">
				<logistics :stateType='stateType'></logistics>
			</view>
			
			<!--商品信息模块-->
			<view class="products-details">
				<view class="products-details-title">
					郑州金牛汽修厂
				</view>

				<!--详情内容-->
				<view class="products-details-content">
					<view class="details-content-item" v-for="(item,index) in products" :key="index">
						<view class="item-image">
							<image :src="item.image" mode=""></image>
						</view>

						<view class="item-details">
							<view class="item-details-text">
								{{item.text}}
							</view>
							<view class="item-details-pricce">
								￥{{item.price}}
							</view>
							<view class="item-details-count">
								x{{item.count}}
							</view>
						</view>
					</view>

					<!--价格以及优惠-->
					<view class="item-money">
						<view class="item-money-item">
							<text>商品总价</text>
							<text>￥1088.00</text>
						</view>
						<view class="item-money-item">
							<text>运费</text>
							<text>￥200.00</text>
						</view>
						<view class="item-money-item">
							<text>店铺优惠</text>
							<text>-￥40.00</text>
						</view>
						<view class="item-money-item">
							<text style="color: #444;font-size: 28rpx;">实付款</text>
							<text style="color: #EF744D;">￥<text style="font-size: 28rpx;">1248.00</text></text>
						</view>
					</view>

					<!--联系卖家-->
					<view class="item-contact-seller" @click="contactSellerClick">
						<image src="../../../static/img/product/relation.png" mode=""></image>
						<text>联系卖家</text>
					</view>
				</view>
			</view>

			<!--订单编号以及备注信息等-->
			<view class="number-remark">
				<view class="number-remark-item">
					<text class="remark-item-name">订单编号：</text>
					<text>cg123456789</text>
				</view>
				<view class="number-remark-item">
					<text class="remark-item-name">下单时间：</text>
					<text>2020-06-13 20:19:50</text>
				</view>
				<view class="number-remark-item">
					<text class="remark-item-name">支付方式：</text>
					<text>微信</text>
				</view>
				<view class="number-remark-item">
					<text class="remark-item-name">订单备注：</text>
					<text>一定注意包装，小心运输</text>
				</view>
			</view>
			
			<view class="hawk" v-if="stateType != 4 && stateType != 5 && stateType != 7">
				
			</view>

		</view>

		<!--底部按钮部分-->
		<view class="order-details-bottom" v-if="stateType != 4 && stateType != 5 && stateType != 7">
			<orderDetailsBottom :stateType='stateType' @cancellationOrderClick='cancellationOrderClick' @goApplyAfter='goApplyAfter'></orderDetailsBottom>
		</view>
		
		<!--联系卖家弹窗-->
		<u-popup v-model="contactSellerShow" mode="center" border-radius="10" mask>
			<view class="contact-seller">
				<view class="contact-seller-title">
					将使用该号码加密呼出
				</view>
				<view class="contact-seller-phone">
					18237203633
				</view>
				<view class="contact-seller-btn">
					<view class="seller-btn-one" @click="nocallOutClick">
						取消
					</view>
					<view class="seller-btn-two" @click="callOutClick">
						呼叫
					</view>
					<!-- <u-button :custom-style="nocallOut" @click="nocallOutClick">取消</u-button>
					<u-button :hair-line="false" :custom-style="callOut" @click="callOutClick">呼叫</u-button> -->
				</view>
			</view>
		</u-popup>

		<!--取消订单弹出窗-->
		<u-popup v-model="cancellationOrderShow" mode="bottom" border-radius="10" :mask-close-able='false'>
			<view class="cancel-cause">
				<view class="cancel-cause-title">取消订单</view>
				<view class="cancel-cause-text">请选择取消订单原因</view>
				<view class="cancel-cause-radio">
					<u-radio-group v-model="radioValue" class="radio-group">
						<view class="radio-item" v-for="(item, index) in list">
							<text>{{item.text}}</text>
							<u-radio @change="radioChange(item)" shape="circle" active-color="#EC3333" :key="index" :name="item.text" :disabled="item.disabled"></u-radio>
						</view>
					</u-radio-group>
				</view>
				<view class="cancel-cause-btn">
					<u-button style="margin-right: 40rpx;" :custom-style="cancellationOrder" @click="stopCancel">暂不取消</u-button>
					<u-button :hair-line="false" :custom-style="payment" @click="confirmCancel">确定取消</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../../common/public.js'
	import Services from '../../../services/app.js';
	
	import orderDetailsHead from '../../../components/customComponent/orderDetailsComponent/orderDetailsHead.vue';  //头部状态信息
	import orderDetailsBottom from '../../../components/customComponent/orderDetailsComponent/orderDetailsBottom.vue';  //底部按钮
	import logistics from '../../../components/customComponent/orderDetailsComponent/logistics.vue';  //物流信息
	import refund from '../../../components/customComponent/orderDetailsComponent/refund.vue';  //退款信息
	
	export default {
		components: {
			orderDetailsHead,
			orderDetailsBottom,
			logistics,
			refund
		},
		data() {
			return {
				..._data,
				//控制页面状态码类型  0:待付款， 1：待发货，2：等待物流接单，3：待收货，4：退款中，5：已退款，6：交易关闭，7：交易完成
				stateType:6,
				
				//暂不取消按钮样式
				cancellationOrder:{
					width:'320rpx',
					height:'80rpx'
				},
				
				//确定取消按钮
				payment:{
					width:'320rpx',
					height:'80rpx',
					color:'#EC3333',
					border:'1px solid #EC3333'
				},
				products: [{
						image: '../../../static/img/deng.png',
						text: '佳通轮胎155R12C 花纹VAN600 正品三包全包',
						price: 1088.00,
						count: 2
					},
					{
						image: '../../../static/img/deng.png',
						text: '美孚机油 花纹VAN600 正品三包全包',
						price: 188.00,
						count: 3
					}
				],

				//联系卖家取消按钮
				nocallOut:{
					width:'220rpx',
					height:'90rpx',
				},
				
				//联系卖家呼叫按钮
				callOut:{
					width:'220rpx',
					height:'90rpx',
					color:'#FF450D',
					border:'1px solid #FF450D'
				},
				
				//取消订单弹窗
				cancellationOrderShow: false,

				//单选框组的属性
				list: [{
						name: '1',
						disabled: false,
						text:'我不想买了'
					},
					{
						name: '2',
						disabled: false,
						text:'信息填错了，重新拍'
					},
					{
						name: '3',
						disabled: false,
						text:'卖家缺货'
					},
					{
						name: '4',
						disabled: false,
						text:'其他原因'
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radioValue: '',
				contactSellerShow:false, //联系卖家弹窗属性
				
			};
		},
		onLoad: function (option) {
		    const productsItem = JSON.parse(decodeURIComponent(option.productsItem));
			console.log('productsItem',productsItem)
			this.stateType = productsItem.type
		},
		methods: {
			..._methods,
			
			//点击弹出联系卖家弹窗
			contactSellerClick(){
				this.contactSellerShow = true
			},
			
			//联系卖家弹窗 取消事件
			nocallOutClick(){
				this.contactSellerShow = false
			},
			
			//联系卖家弹窗 呼叫事件
			callOutClick(){
				this.show_toast("呼叫成功")
				this.contactSellerShow = false
			},
			
			//点击取消订单按钮，弹出取消订单弹窗
			cancellationOrderClick() {
				console.log(111)
				this.cancellationOrderShow = true
			},
			
			// 选中某个单选框时，由radio时触发
			radioChange(item) {
				console.log(item);
				this.radioValue = item.text
			},
			
			//暂不取消事件
			stopCancel(){
				this.cancellationOrderShow = false
			},
			
			//确定取消
			confirmCancel(){
				if(this.radioValue == ''){
					this.show_toast("请选择一项原因")
					return
				}
				this.show_toast("取消成功")
				this.cancellationOrderShow = false
			},
			
			//跳转到申请售后页面
			goApplyAfter(){
				uni.navigateTo({
					url: '/pages/orderForm/applyAfter'
				});
			}
			
			
			
		}
	}
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order-details {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.order-details-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	//中间内容部分
	.order-details-content {

		.address-module {
			height: 180rpx;
			padding: 20rpx;
			background-color: #fff;

			.address-module-top {
				display: flex;
				align-items: center;
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 6rpx;
				}
				
				.module-top-title{
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-weight: 400;
					color: #000;
				}
			}

			.address-module-bottom {
				margin: 20rpx 0 0 30rpx;
				font-size: 28rpx;
				color:#5A5A5A;
			}
		}
	}

	//商品详细信息模块
	.products-details {
		margin: 20rpx 0;
		padding: 0 40rpx;
		background-color: #fff;

		.products-details-title {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #000;
		}

		.products-details-content {
			.details-content-item {
				margin-top: 30rpx;
				display: flex;

				.item-image {
					margin-right: 20rpx;

					image {
						width: 180rpx;
						height: 180rpx;
					}
				}
				
				.item-details{
					color: #5A5A5A;
					font-size: 24rpx;
				}
				
				.item-details-text{
					height: 64rpx;
					color: #000;
				}

				.item-details-pricce {
					margin: 20rpx 0;
				}

				.item-details-count {
				}

			}

			.item-money {
				margin-top: 30rpx;

				.item-money-item {
					display: flex;
					justify-content: space-between;
					color: #919391;
					font-size: 24rpx;
					margin-bottom: 30rpx;
				}
			}

			.item-contact-seller {
				height: 90rpx;
				border-top: 1px solid #D5D5D5;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 28rpx;
					height: 28rpx;
					margin-right: 8rpx;
				}
			}

		}
	}


	.number-remark {
		// margin-top: 20rpx;
		background-color: #fff;
		padding: 30rpx 40rpx;
		overflow: hidden;
		font-size: 28rpx;
		color: #444444;

		.number-remark-item {
			margin-top: 20rpx;

			.remark-item-name {
				margin-right: 20rpx;
				color: #5A5A5A;
			}
		}

	}

	//取消订单弹窗属性
	.cancel-cause {
		padding: 40rpx 20rpx;

		.cancel-cause-title {
			font-size: 28rpx;
			text-align: center;
			font-weight: bold;
		}

		.cancel-cause-text {
			margin: 40rpx 0;
			color: #A9A9A9;
		}

		.cancel-cause-radio {
			.radio-item{
				width: 700rpx;
				display: flex;
				justify-content: space-between;
				margin-bottom: 30rpx;
			}
		}
		
		.cancel-cause-btn{
			display: flex;
			margin-top: 60rpx;
		}
	}
	
	//联系卖家弹窗样式
	.contact-seller{
		width: 440rpx;
		height: 270rpx;
		padding: 30rpx 20rpx 0;
		text-align: center;
		.contact-seller-title{
			color: #8F918F;
		}
		.contact-seller-phone{
			margin: 40rpx 0;
			color: #FF450D;
		}
		.contact-seller-btn{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #A7A7A7;
			font-size: 28rpx;
			height: 80rpx;
			.seller-btn-one{
				width: 50%;
				border-right: 1px solid #A7A7A7;
				color: #5A5A5A;
				height: 80rpx;
				line-height: 80rpx;
			}
			
			.seller-btn-two{
				width: 50%;
				color: #EF744D;
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}
	
	.hawk{
		width: 100%;
		height: 20rpx;
		background-color: #f2f2f2;
		margin-bottom: 100rpx;
	}
</style>
