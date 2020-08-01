<template>
	<view class="refund">
		<!--退款完成时，在显示退款后的信息-->
		<view class="refund-complete" v-if='stateType == 5'>
			<view class="refund-complete-content">
				<view class="complete-content-item">
					<text>退款金额：</text>
					<view class="">￥128.00</view>
				</view>
				<view class="complete-content-item">
					<text>退款账户：</text>
					<view class="">账户余额</view>
				</view>
				<view class="complete-content-item">
					<text>退款时间：</text>
					<view class="">2019-06-13 15:54</view>
				</view>
			</view>
			<view class="refund-complete-modul"></view>
		</view>
		
		
		<!--退款信息详情-->
		<view class="refund-details">
			<view class="refund-title">
				退款信息
			</view>
			<view class="refund-content">
				<view class="refund-content-item">
					<text>退款原因：</text>
					<view class="">
						信息填错了，重新拍
					</view>
				</view>
				<view class="refund-content-item">
					<text>退款说明：</text>
					<view class="">
						我刚才地址填错了，想从拍
					</view>
				</view>
				<view class="refund-content-item">
					<text>退款凭证：</text>
					<view class="content-item-image">
						<view class="">
							<image src="../../../static/img/deng.png" mode=""></image>
							<image src="../../../static/img/deng.png" mode=""></image>
							<image src="../../../static/img/deng.png" mode=""></image>
						</view>
						<view class="item-image-btn">
							<u-button v-if="stateType != 5" :custom-style="repealStyle">撤销申请</u-button>
						</view>
					</view>
				</view>
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
				repealStyle:{
					width:'150rpx',
					height:'60rpx',
					margin:'20rpx 0 0 0'
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
	.refund{
		background-color: #fff;
		
		.refund-details{
			padding: 0 20rpx 20rpx;
		}
		
		.refund-title{
			height: 80rpx;
			line-height: 80rpx;
			color: #000;
			font-size: 32rpx;
			font-weight: 400;
		}
		
		.refund-content{
			margin-top: 20rpx;
			.refund-content-item{
				display: flex;
				margin-bottom: 20rpx;
				line-height: 1;
				text{
					color: #ACADAC;
					margin-right: 10rpx;
				}
				
				.content-item-image{
					display: flex;
					flex-direction: column;
					image{
						width: 160rpx;
						height: 160rpx;
						margin-right: 20rpx;
					}
					
					.item-image-btn{
						display: flex;
						justify-content: flex-start;
					}
				}
			}
		}
	}
	
	//退款完成
	.refund-complete{
		
		.refund-complete-modul{
			width: 100%;
			height: 20rpx;
			background-color: #F2F2F2;
		}
		
		.refund-complete-content{
			padding: 30rpx 20rpx 0 20rpx;
		}
		
		.complete-content-item{
			display: flex;
			margin-bottom: 20rpx;
			text{
				margin-right: 10rpx;
			}
		}
	}

</style>
