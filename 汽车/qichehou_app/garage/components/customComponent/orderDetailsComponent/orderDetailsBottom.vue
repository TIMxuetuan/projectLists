<template>
	<view class="order-details">
		<!--底部按钮部分-->
		<view class="order-details-bottom">
			
			<!--
				这里分为多种状态，不同状态展示不同的按钮 状态跟订单列表状态相互一致
				//type类型  0:待付款， 1：待发货，2：等待物流接单，3：待收货，4：退款中，5：已退款，6：交易关闭，7：交易完成
			-->
			
			<!--待付款-->
			<view v-if="stateType == 0" class="details-one">
				<u-button :custom-style="cancellationOrder" @click='cancellationOrderClick'>取消订单</u-button>
				<u-button style="margin-left: 30rpx;" :hair-line="false" :custom-style="payment">付款</u-button>
			</view>
			
			<!--待发货-->
			<view v-if="stateType == 1" class="details-one">
				<u-button :custom-style="cancellationOrder" @click="goApplyAfter">申请售后</u-button>
				<u-button style="margin-left: 30rpx;" :custom-style="cancellationOrder">提醒发货</u-button>
			</view>
			
			<!--等待物流接单-->
			<view v-if="stateType == 2" class="details-one">
				<u-button :custom-style="cancellationOrder" @click="goApplyAfter">申请售后</u-button>
			</view>
			
			<!--待收货-->
			<view v-if="stateType == 3" class="details-one">
				<u-button :custom-style="payment" :hair-line="false">确认收货</u-button>
			</view>
			
			<!--交易关闭-->
			<view v-if="stateType == 6" class="details-one">
				<u-button :custom-style="cancellationOrder">删除订单</u-button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			stateType:{
				type:Number
			}
		},
		data() {
			return {
				//取消订单按钮样式
				cancellationOrder:{
					width:'200rpx',
					height:'80rpx'
				},
				
				//付款按钮
				payment:{
					width:'200rpx',
					height:'80rpx',
					color:'#EC3333',
					border:'1px solid #EC3333'
				}
			};
		},
		methods:{
			//取消订单事件
			cancellationOrderClick(){
				this.$emit('cancellationOrderClick')
			},
			
			//跳转申请售后页面
			goApplyAfter(){
				this.$emit('goApplyAfter')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-details{
		height: 100%;
		width: 100%;
	}
	
	.order-details-bottom{
		height: 100rpx;
		background-color: #fff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 40rpx;
		border-top: 1px solid #D5D5D5;
	}
	
	.details-one{
		display: flex;
		align-items: center;
	}

</style>
