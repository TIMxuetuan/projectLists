<template>
	<view class="container">
		<view class="header">交易关闭</view>
		
		<view class="loca">
			<view class="loca-header">
				<view class="loca-text">郑州金牛汽修厂</view>
				<view class="loca-phone">17613883553</view>
			</view>
			<view class="loca-detail">
				地址：河南省郑州市金水区 文化路街道金牛汽修厂1楼仓储售后服务中心
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
			<view class="cell-group">
				<u-cell-group>
					<u-cell-item  title="商品总价" :arrow="false" >￥2042.00</u-cell-item>
					<u-cell-item  title="运费" :arrow="false">200.00</u-cell-item>
					<u-cell-item  title="店铺优惠" :arrow="false" >-￥101.84</u-cell-item>
					<u-cell-item class="real"  title="实付款" :arrow="false">￥2140.16</u-cell-item>
				</u-cell-group>
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
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f1f1f1;
	}
</style>
