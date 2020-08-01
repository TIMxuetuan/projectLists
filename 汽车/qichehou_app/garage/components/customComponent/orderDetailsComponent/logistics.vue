<template>
	<view class="logistics">
		<view class="logistics-title">四知物流</view>
		
		<!--车辆信息-->
		<view class="car-message">
			<view class="car-message-item">
				<view class="car-name">承运司机:</view>
				<view class="car-item-content">
					<view>彭于晏</view>
					<view class="car-one-right">
						<image src="../../../static/img/product/relation.png" mode=""></image>
						<text>联系司机</text>
					</view>
				</view>
			</view>
			
			<view class="car-message-item">
				<view class="car-name">车辆号码:</view>
				<view>豫B99999</view>
			</view>
			
			<view class="car-message-item">
				<view class="car-name">车辆型号:</view>
				<view>重卡</view>
			</view>
			
			<view class="car-message-item">
				<view class="car-name">标准载重:</view>
				<view>50吨</view>
			</view>
		</view>
		
		<!--物流信息-->
		<view class="car-message none-border">
			<view class="car-message-item">
				<view class="car-name">运单编号:</view>
				<view>123456789</view>
			</view>
			
			<view class="car-message-item">
				<view class="car-name">开始日期:</view>
				<view>2020-06-14</view>
			</view>
			
			<view class="car-message-item" v-if="stateType == 7">
				<view class="car-name">结束日期:</view>
				<view>2020-06-14</view>
			</view>
			
			<view class="car-message-item">
				<view class="car-name">出发地点:</view>
				<view class="car-text">河南省管城区 南三环街道 郑州公牛汽打撒奥大大萨达配商</view>
			</view>
			
			<view class="car-message-item">
				<view class="car-name">目的地点:</view>
				<view class="car-text">河南省郑州市金水区 文化路街道 郑州公牛大叔大婶多大萨达</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		props:{
			stateType: {
				type: Number
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.logistics{
		background-color: #fff;
		padding: 0 20rpx 30rpx;
	}
	
	.logistics-title{
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #D5D5D5;
	}

	.car-message{
		padding: 20rpx 0 0 0;
		border-bottom: 1px solid #D5D5D5;
		font-size: 28rpx;
		.car-message-item{
			display: flex;
			margin-bottom: 20rpx;
			.car-name{
				width: 122rpx;
				color: #8A8A8A;
				margin-right: 40rpx;
			}
			.car-text{
				flex: 1;
			}
		}
		
		.car-item-content{
			flex: 1;
			display: flex;
			justify-content: space-between;
			
			.car-one-right{
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
	
	.none-border{
		border: none;
	}

</style>
