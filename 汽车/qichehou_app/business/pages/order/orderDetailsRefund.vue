<template>
	<view class="container">
		<view class="header">退款中 待确认</view>
		
		<view class="loca">
			<view class="loca-header">
				<view class="loca-text"><text class="iconfont iconcoordinates_fill"></text>郑州金牛汽修厂</view>
				<view class="loca-phone">17613883553</view>
			</view>
			<view class="loca-detail">
				地址：河南省郑州市金水区 文化路街道金牛汽修厂1楼仓储售后服务中心
			</view>
		</view>
		
		<view class="matter lyMatter">
			<view class="matter-name">退款信息</view>
			<view class="plane-content">
				<view class="plane">
					<view class="plane-left">退款原因：</view> <view class="plane-right">地址填错了，重新购买</view>
				</view>
				<view class="plane">
					<view class="plane-left">退款说明：</view> <view class="plane-right">我刚才地址填错，想重新购买</view>
				</view>
				<view class="plane">
					<view class="plane-left">退款凭证：</view>
					<view class="plane-right">
						<view class="plane-refund">
							<image src="/static/img/imgIcon.png"></image>
							<u-button class="custom-style" size="mini" @click="user_login" >同意退款</u-button>
						</view>
						<view class="plane-refund">
							<image src="/static/img/imgIcon.png"></image>
							<u-button class="custom-style" size="mini" @click="user_login" >拒绝退款</u-button>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="information">
			<view class="information-name">郑州金牛汽配公司</view>
			<view class="information-content">
				<image src="/static/img/imgIcon.png"></image>
				<view class="information-detail">
					<view class="information-title">佳通轮胎155R12C 花纹VAN600 正品三包全 套</view>
					<view class="information-price">￥209.00</view>
					<view class="information-number">X2</view>
				</view>
			</view>
			<view class="plane-group">
				<view class="plane">
					<view class="plane-left">商品总价</view> <view class="plane-right">￥2042.00</view>
				</view>
				<view class="plane">
					<view class="plane-left">运费</view> <view class="plane-right">￥200.00</view>
				</view>
				<view class="plane">
					<view class="plane-left">店铺优惠</view> <view class="plane-right">-￥101.84</view>
				</view>
				<view class="lyPlane plane">
					<view class="plane-left">实付款</view> <view class="plane-right">￥2140.16</view>
				</view>
			</view>
			
		</view>
		<view class="matter">
			
			<view class="plane">
				<view class="plane-left">订单编号：</view> <view class="plane-right">cg123456789863</view>
			</view>
			<view class="plane">
				<view class="plane-left">下单时间：</view> <view class="plane-right">2020-06-13 20:19:50</view>
			</view>
			<view class="plane">
				<view class="plane-left">支付方式：</view> <view class="plane-right">微信</view>
			</view>
			<view class="plane">
				<view class="plane-left">订单备注：</view> <view class="plane-right">一定要注意包装，小心运输</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F1F1F1;
	}
	.plane-right{
		display: flex;
		.plane-refund{
			display: flex;
			flex-direction: column;
			margin-right: 20rpx;
			align-items: center;
			image{
				width:160rpx;
				height:160rpx;
			}
			.custom-style{
				margin-top:12rpx;
				/deep/.u-size-mini{
					width:150rpx;
					height:60rpx;
					border-radius: 10rpx;
					font-size:14px;
					color:#444444;
				}
				/deep/.u-hairline-border::after{
					border:1px solid rgba(90,90,90,0.5);
				}
			}
		}
	}
	.lyPlane{
		font-size:14px !important;
		color:rgba(239,116,77,1) !important;
	}
</style>
