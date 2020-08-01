<template>
	<view>
		<!--为空时展示-->
		<view v-if="addressLists == '' " class="address-lists-hide">
			<view class="lists-hide-icon">
				<image src="../../../static/img/address/coordinates.png" mode=""></image>
			</view>
			<view class="lists-hide-text">你还没有收货地址呦，添加一个吧</view>
			<view class="lists-hide-btn">
				<u-button shape="circle" type="error" @click="gotoaddAddress(0)" :custom-style="addressHideStyle">创建收货地址</u-button>
			</view>
		</view>

		<!--有地址时 展示-->
		<view v-else class="address-show">
			<view class="">
				<view class="address-show-item" v-for="item in addressLists">
					<!--地址详情-->
					<view class="show-item-content">
						<view class="item-content-details">
							<text class="details-name">{{item.name}}</text>
							<text>{{item.phone}}</text>
							<view v-if="item.isShow" class="details-default">默认</view>
						</view>
						<view class="item-content-address">
							{{item.addressText}}
						</view>
					</view>

					<!--操作事件-->
					<view class="show-item-event" @click='gotoCompile(item,1)'>
						<image src="../../../static/img/address/compile.png" mode=""></image>
					</view>
				</view>
			</view>

			<!--新增地址按钮 固定-->
			<view class="addAddressBtn">
				<u-button shape="circle" type="error" :custom-style="addAddressStyle" @click="gotoaddAddress(0)">
					<u-icon name="plus" size="32"></u-icon>
					<text>新增地址</text>
				</u-button>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressLists: [
					{
						name: '张小娴',
						phone: '18237203633',
						isShow: true,
						addressText: '河南省郑州市金水区 文化路街道金牛汽修厂 1楼仓储售后服务中心',
						city: '河南省郑州市金水区',
					},
					{
						name: '张小娴',
						phone: '18237203633',
						isShow: false,
						city: '河南省郑州市金水区',
						addressText: '河南省郑州市金水区 文化路街道金牛汽修厂 1楼仓储售后服务中心'
					},
				],
				addressHideStyle: {
					width: '400rpx',
					height: '80rpx',
				},

				//新增按钮
				addAddressStyle: {
					width: '674rpx',
					height: '80rpx',
					color: '#fff'
				},
				
			};
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			
			//跳转添加添加地址页面 				区别是否新增或编辑：0：新增，1：编辑
			gotoaddAddress(stateType){
				uni.navigateTo({
					url: '/pages/product/addAddress/addAddress?stateType=' + stateType
				});
			},
			
			//编辑事件
			gotoCompile(item,stateType){
				uni.navigateTo({
					url: '/pages/product/addAddress/addAddress?stateType=' + stateType + '&item=' + encodeURIComponent(JSON.stringify(item))
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-lists-hide {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.lists-hide-icon {
			margin-top: 200rpx;

			image {
				width: 160rpx;
				height: 160rpx;
			}
		}

		.lists-hide-text {
			font-size: 28rpx;
			color: #5A5A5A;
			margin-top: 20rpx;
		}

		.lists-hide-btn {
			margin-top: 60rpx;
		}
	}

	//有地址时的样式

	.address-show {
		position: relative;
		padding: 0 0 120rpx;

		.address-show-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 40rpx;
			background-color: #fff;
			border-bottom: 1px solid #D5D5D5;
		}

		.address-show-item:last-child {
			border: none;
		}

		.show-item-content {
			margin-right: 56rpx;

			.item-content-details {
				font-size: 28rpx;
				color: #000;
				margin-bottom: 10rpx;
				display: flex;
				align-items: center;

				.details-name {
					font-size: 32rpx;
					margin-right: 50rpx;
				}

				.details-default {
					height: 32rpx;
					padding: 0 12rpx;
					background-color: #EF744D;
					font-size: 24rpx;
					color: #fff;
					border-radius: 4rpx;
					margin-left: 20rpx;
				}
			}

			.item-content-address {
				font-size: 28rpx;
				color: #686A68;
			}
		}

		.show-item-event {
			image {
				width: 40rpx;
				height: 40rpx;
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
			
			text{
				font-size: 32rpx;
				margin-left: 10rpx;
				line-height: 82rpx;
			}
		}
	}
</style>
