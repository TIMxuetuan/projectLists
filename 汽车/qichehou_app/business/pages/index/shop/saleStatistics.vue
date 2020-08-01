<template>
	<view class="wrap" :style="{'min-height':height+ 'px'}">
		<u-tabs name="cate_name" :list="list" :is-scroll="false" :current="current" @change="change" bar-height="12" height="110"
		 font-size="28" bar-width="148" :bold="bold"></u-tabs>

		<view class="kong"></view>
		<view class="order_trend">
			下单趋势
		</view>
		<view style="height: 6px;background-color: #F1F1F1;"></view>
		<view style="display: flex;padding: 7px 0;text-align: center;background-color: #FFFFFF;">
			<view style="flex: 1;">
				<view style="font-size:16px;height: 28px;line-height:28px;color:rgba(68,68,68,1);">848.17</view>
				<view style="font-size:10px;height:14px;color:rgba(90,90,90,0.60);line-height: 10px;">
					销售额(万元)
				</view>
				<view style="height:23px;font-size:16px;color:rgba(68,68,68,1);font-weight:400;font-family:Arial;">
					256.89
				</view>
				<view style="font-size:10px;height: 17px;color:rgba(90,90,90,0.60);font-weight:400;font-family:Source Han Sans CN;line-height: 10px;">
					利润额(万元)
				</view>
			</view>
			<view style="flex: 1;">
				<view style="font-size:16px;height: 28px;line-height:28px;color:rgba(68,68,68,1);">848.17</view>
				<view style="font-size:10px;height:14px;color:rgba(90,90,90,0.60);line-height: 10px;">
					订单量(单)
				</view>
				<view style="height:23px;font-size:16px;color:rgba(68,68,68,1);font-weight:400;font-family:Arial;">
					256.89
				</view>
				<view style="font-size:10px;height: 17px;color:rgba(90,90,90,0.60);font-weight:400;font-family:Source Han Sans CN;line-height: 10px;">
					笔单价
				</view>
			</view>
			<view style="flex: 1;">
				<view style="font-size:16px;height: 28px;line-height:28px;color:rgba(68,68,68,1);">848.17</view>
				<view style="font-size:10px;height:14px;color:rgba(90,90,90,0.60);line-height: 10px;">
					销售客户数
				</view>
				<view style="height:23px;font-size:16px;color:rgba(68,68,68,1);font-weight:400;font-family:Arial;">
					256.89
				</view>
				<view style="font-size:10px;height: 17px;color:rgba(90,90,90,0.60);font-weight:400;font-family:Source Han Sans CN;line-height: 10px;">
					客单价
				</view>
			</view>
		</view>
		<view style="height: 6px;background-color: #F1F1F1;"></view>
		<view style="display: flex;padding: 7px 0;text-align: center;background-color: #FFFFFF;">
			<view style="flex: 1;">
				<view style="font-size:16px;height: 28px;line-height:28px;color:rgba(68,68,68,1);">848.17</view>
				<view style="font-size:10px;height:14px;color:rgba(90,90,90,0.60);line-height: 10px;">
					总支付订单数
				</view>
				<view style="height:23px;font-size:16px;color:rgba(68,68,68,1);font-weight:400;font-family:Arial;">
					256.89
				</view>
				<view style="font-size:10px;height: 17px;color:rgba(90,90,90,0.60);font-weight:400;font-family:Source Han Sans CN;line-height: 10px;">
					总退款率
				</view>
			</view>
			<view style="flex: 1;">
				<view style="font-size:16px;height: 28px;line-height:28px;color:rgba(68,68,68,1);">848.17</view>
				<view style="font-size:10px;height:14px;color:rgba(90,90,90,0.60);line-height: 10px;">
					总退款订单数
				</view>
				
			</view>
			<view style="flex: 1;">
				<view style="font-size:16px;height: 28px;line-height:28px;color:rgba(68,68,68,1);">848.17</view>
				<view style="font-size:10px;height:14px;color:rgba(90,90,90,0.60);line-height: 10px;">
					总支付转化率
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				height:0,
				list: [{
					cate_name: '按销售客户'
				}, {
					cate_name: '按产品分类'
				}],
				current: 0,
				bold: false
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		background-color: #F1F1F1;
		.kong{
			background-color: #F1F1F1;
			height: 6px;
			position: absolute;
			top: 54px;
			width: 100%;
		}
		.order_trend{
			height: 250px;
		}
	}
</style>
