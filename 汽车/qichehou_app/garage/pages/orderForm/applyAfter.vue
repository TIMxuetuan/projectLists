<template>
	<view>
		<!--商品信息-->
		<view class="products-details">
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
		</view>

		<!--退款原因-->
		<view class="refund-reason">
			<view class="">
				退款原因
			</view>
			<view class="refund-reason-right" @click="cancellationOrderClick">
				<text>请选择退款原因</text>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>

		<!--退款说明-->
		<view class="refund-instructions">
			<view class="refund-instructions-title">退款说明</view>
			<view class="">
				<u-input v-model="value" :clearable='false' maxlength='800' type="textarea" :border="true" height="260" :auto-height="false" placeholder="请在此描述申请退款的原因"/>
			</view>
		</view>
		
		<!--分割条-->
		<view class="splitter-bar"></view>
		
		<!--上传图片-->
		<view class="upload-pictures">
			<view style="margin-bottom: 20rpx;">上传凭证</view>
			<view class="">
				<u-upload :custom-btn="true" max-count='3' width='160'>
					<view slot="addBtn" class="slot-btn" hover-stay-time="150">
						<image src="../../static/img/product/photo.png" mode=""></image>
						<text>上传凭证</text>
						<text>(最多3张)</text>
					</view>
				</u-upload>
			</view>
		</view>
		
		<!--分割条-->
		<view class="splitter-bar" style="margin-bottom: 100rpx;"></view>
		
		<!--新增地址按钮 固定-->
		<view class="addAddressBtn">
			<u-button shape="circle" type="error" :custom-style="addAddressStyle" @click="gotoaddAddress">
				提交
			</u-button>
		</view>
		
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
					<u-button style="margin-right: 40rpx;" :custom-style="cancellationOrder" @click="stopCancel">取消</u-button>
					<u-button :hair-line="false" :custom-style="payment" @click="confirmCancel">确定</u-button>
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
	} from '../../common/public.js'
	import Services from '../../services/app.js';
	export default {
		data() {
			return {
				//新增按钮
				addAddressStyle: {
					width: '674rpx',
					height: '80rpx',
				},
				
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
				
				value: '',
				products: [{
						image: '../../static/img/deng.png',
						text: '佳通轮胎155R12C 花纹VAN600 正品三包全包',
						price: 1088.00,
						count: 2
					},
					{
						image: '../../static/img/deng.png',
						text: '美孚机油 花纹VAN600 正品三包全包',
						price: 188.00,
						count: 3
					}
				],
				
				//单选框组的属性
				list: [{
						name: '1',
						disabled: false,
						text:'信息填写错了，重新拍'
					},
					{
						name: '2',
						disabled: false,
						text:'拍错/多拍/不想要'
					},
					{
						name: '3',
						disabled: false,
						text:'协商一致退款'
					},
					{
						name: '4',
						disabled: false,
						text:'卖家缺货'
					},
					{
						name: '5',
						disabled: false,
						text:'未按约定时间发货'
					},
					{
						name: '6',
						disabled: false,
						text:'价格太贵，先不买了'
					},
					{
						name: '7',
						disabled: false,
						text:'其他原因'
					},
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radioValue: '',
				cancellationOrderShow:false, 
			};
		},
		methods:{
			..._methods,
			//点击取消订单按钮，弹出取消订单弹窗
			cancellationOrderClick() {
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
		}
	}
</script>

<style lang="scss" scoped>
	
	//商品信息
	.products-details {
		padding: 30rpx 40rpx 0;

		.details-content-item {
			margin-bottom: 30rpx;
			display: flex;

			.item-image {
				margin-right: 20rpx;

				image {
					width: 180rpx;
					height: 180rpx;
				}
			}

			.item-details {
				color: #5A5A5A;
				font-size: 24rpx;
			}

			.item-details-text {
				height: 64rpx;
				color: #000;
			}

			.item-details-pricce {
				margin: 20rpx 0;
			}

		}

	}

	//退款原因
	.refund-reason {
		padding: 0 40rpx;
		font-size: 28rpx;
		color: #444444;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.refund-reason-right {
			color: #5A5A5A;

			text {
				margin-right: 20rpx;
			}
		}
	}

	//退款说明
	.refund-instructions {
		margin: 30rpx 0;
		padding: 0 40rpx;
		.refund-instructions-title {
			font-size: 28rpx;
			color: #444444;
			margin-bottom: 20rpx;
		}
	}
	
	//分隔条
	.splitter-bar{
		width: 100%;
		height: 20rpx;
		background-color: #F3F0F3;
	}
	
	//上传图片
	.upload-pictures{
		padding: 30rpx 40rpx;
		font-size: 28rpx;
		color: #444444;
	}
	
	.slot-btn {
		width: 160rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
		
		image{
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 8rpx;
		}
		text{
			font-size: 24rpx;
			color: #5A5A5A;
		}
	}
	
	//新增按钮
	.addAddressBtn {
		background-color: #fff;
		width: 100%;
		height: 100rpx;
		position: fixed;
		z-index: 2;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
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
</style>
