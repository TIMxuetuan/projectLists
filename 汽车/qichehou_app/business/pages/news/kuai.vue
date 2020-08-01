<template>
	<view class="logistics_info_details">
		<view class="logistics_name">
			四知物流
		</view>
		<view style="height: 10px;border-bottom:1px solid rgba(167,167,167,0.47843137254901963);"></view>
		<view class="truck_info">
			<view class="driver_info">
				<view class="info_label">
					承运司机:
				</view>
				<view style="height:24px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:14px;color:rgba(68,68,68,1);flex: 1;">
					彭于晏
				</view>
				<view style="height:24px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:14px;">
					<image src="../../static/img/index/联系@2x.png" style="width: 14px;height: 14px;vertical-align: top;"></image>
					<span style="color:rgba(68,68,68,1);">联系司机</span>
				</view>
			</view>
			<view class="driver_info">
				<view class="info_label">
					车辆号码:
				</view>
				<view style="height:24px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:14px;color:rgba(68,68,68,1);flex: 1;">
					域A9999
				</view>
			</view>
			<view class="driver_info">
				<view class="info_label">
					车辆型号:
				</view>
				<view style="height:24px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:14px;color:rgba(68,68,68,1);flex: 1;">
					重卡
				</view>
			</view>
			<view class="driver_info" style="border-bottom:1px solid rgba(167,167,167,0.47843137254901963);">
				<view class="info_label">
					标准载重:
				</view>
				<view style="height:24px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:14px;color:rgba(68,68,68,1);flex: 1;">
					50T
				</view>
			</view>
		</view>
		<view class="truck_info" style="padding-top: 0;">
			<view class="driver_info">
				<view class="info_label">
					运单编号:
				</view>
				<view style="height:24px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:14px;color:rgba(68,68,68,1);flex: 1;">
					2020011612580003
				</view>
			</view>
			<view class="driver_info">
				<view class="info_label">
					开始时间:
				</view>
				<view style="height:24px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:14px;color:rgba(68,68,68,1);flex: 1;">
					2020-07-10
				</view>
			</view>
			<view class="driver_info">
				<view class="info_label">
					出发地点:
				</view>
				<view style="height:24px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:14px;color:rgba(68,68,68,1);flex: 1;">
					河南省管城区南三环街道郑州公牛汽配
				</view>
			</view>
			<view class="driver_info">
				<view class="info_label">
					目的地点:
				</view>
				<view style="height:24px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:18px;color:rgba(68,68,68,1);flex: 1;">
					河南省郑州市金水区 文化路街道金牛汽修 厂 1楼仓储售后服务中心
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.logistics_info_details{
		height: 272px;
		background:rgba(255,255,255,1);
		margin: 0 19px;
		padding: 10px 0;
		.logistics_name{
			height:16px;
			font-size:16px;
			font-family:Source Han Sans CN;
			font-weight:400;
			line-height:16px;
			color:rgba(68,68,68,1);
		}
		.truck_info{
			padding: 10px 0;
			.driver_info{
				display: flex;
				.info_label{
					width:80px;
					height:24px;
					font-size:14px;
					font-family:Source Han Sans CN;
					font-weight:400;
					line-height:14px;
					color:rgba(90,90,90,0.70);
				}
			}
		}
	}
</style>
