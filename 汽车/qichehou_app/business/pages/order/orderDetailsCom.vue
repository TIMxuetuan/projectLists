<template>
	<view class="container">
		<view class="header">交易完成</view>
		
		<view class="loca">
			<view class="loca-header">
				<view class="loca-text">郑州金牛汽修厂</view>
				<view class="loca-phone">17613883553</view>
			</view>
			<view class="loca-detail">
				地址：河南省郑州市金水区 文化路街道金牛汽修厂1楼仓储售后服务中心
			</view>
		</view>
		
		<view class="matter lyMatter">
			<view class="matter-name">四只物流</view>
			<view class="plane">
				<view class="plane-left">承运司机：</view> <view class="plane-right">彭于晏</view>
			</view>
			<view class="plane">
				<view class="plane-left">车辆号码：</view> <view class="plane-right">A99999</view>
			</view>
			<view class="plane">
				<view class="plane-left">车辆型号：</view> <view class="plane-right">重卡</view>
			</view>
			<view class="plane ly-plane">
				<view class="plane-left">标准载重：</view> <view class="plane-right">五十吨</view>
			</view>
			<view class="plane">
				<view class="plane-left">运单编号：</view> <view class="plane-right">2020011612580003</view>
			</view>
			<view class="plane">
				<view class="plane-left">开始时间：</view> <view class="plane-right">2020-07-10</view>
			</view>
			<view class="plane">
				<view class="plane-left">出发地点：</view> <view class="plane-right">河南省管城区 南三环街道 郑州公牛汽配</view>
			</view>
			<view class="plane">
				<view class="plane-left">目的地点：</view> <view class="plane-right">河南省郑州市金水区 文化路街道金牛汽修 厂 1楼仓储售后服务中心</view>
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
</style>
