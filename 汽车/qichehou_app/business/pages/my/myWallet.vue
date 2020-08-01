<template>
	<view class="container">
		<view class="balance">
			<view class="balance-t">
				<view class="balance-c">
					<view>账户余额(元)</view>
					<view class="card">39872.67</view>
				</view>
				<view class="balance-c bot">
					<view>银行卡</view>
					<view class="card cardd">去绑定一张</view>
				</view>
			</view>
			
			<view class="balance-b">
				<text style="font-size:14px;color:rgba(0,0,0,1);">授信额度</text>
				<text style="margin-left:60rpx;color:rgba(90,90,90,0.70);">可借</text>
				<text style="margin-left:10rpx;">150000.00</text>
			</view>
		</view>
		<view class="borrow">
			<view class="borrow-money">
				<view class="borrow-jq">借钱</view>
				<view class="borrow-number">150000.00</view>
				<view class="borrow-text">剩余可借(元)</view>
			</view>
			<u-button :custom-style="customStyle" shape="circle"  @click="user_register">提交</u-button> 
		</view>
		<view class="sale">
			<view class="sale-text">
				<view>销售</view>
				<view class="icon-arrow-right"></view>
			</view>
				<view class="balance-c">
					<view>今日销售总额(元)</view>
					<view class="card">39872.67</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle:{
				width:'220rpx',
				height:'70rpx',
				background:'rgba(255,255,255,1)',
				opacity:1,
				borderRadius:'18px',
				color:'#000'
				},
			}
		},
		methods: {
			goBinding(){
				uni.navigateTo({
					url:'/pages/my/myWallet/bankCard'
				})
			}
		},
		onLoad() {
		
		},
	}
</script>

<style lang="scss" scoped>
	.container{
		height:100vh;
		background-color:rgba(241,241,241,1);
		padding:18rpx;
	}
	.balance{
		background:rgba(255,255,255,1);
		opacity:1;
		border-radius:5px;
		padding:30rpx 18rpx;
		&-t{
			display:flex;
			align-items: center;
		}
		&-c{
			text-align: left;
			font-size:12px;
			color:rgba(90,90,90,0.70);
			opacity:1;
			.card{
				margin-top: 12rpx;
				font-size:16px;
				color:rgba(0,0,0,1);
			}
			.cardd{
				color:rgba(236,51,51,1);
			}
		}
		&-b{
			margin-top:30rpx;
			padding-top:20rpx;
			font-size:12px;
			color:rgba(0,0,0,1);
			opacity:1;
			border-top:1px solid rgba(167,167,167,0.47);
		}
		.bot{
			margin-left:158rpx;
		}
	}
	.borrow{
		border-radius:5px;
		margin-top: 16rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background:rgba(71,121,242,1);
		padding:30rpx 18rpx;
		&-money{
			color:rgba(255,255,255,1);
			opacity:1;
		}
		&-jq{
			font-size:12px;
		}
		&-number{
			font-size:16px;
			margin-top: 20rpx;
		}
		&-text{
			font-size:12px;
			margin-top: 10rpx;
			color:rgba(255,255,255,0.7);
			font-size:12px;
		}
	}
	.sale{
		padding:18rpx 30rpx;
		background-color: #fff;
		&-text{
			font-size:14px;
			display: flex;
			justify-content: space-between;
			color:#000;
		}
	}
	
</style>
