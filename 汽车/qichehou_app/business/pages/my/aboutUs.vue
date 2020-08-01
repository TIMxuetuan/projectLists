<template>
	<view class="container">
		<view class="icon">
			<image src="../../static/img/imgIcon.png" mode=""></image>
			<view>当前版本1.0</view>
		</view>
		<view class="company-name">
			<text class="english">Copyright © 2020</text>
			<text style="margin-left:12rpx;">河南智业科技网络有限公司</text>
			<view class="english english-b">All Rights Reserved</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.container{
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		.icon{
			margin-top:98rpx;
			width:240rpx;
			height:240rpx;
			background:rgba(255,255,255,1);
			border:1px solid rgba(112,112,112,1);
			opacity:1;
			border-radius:10rpx;
			image{
				width:100%;
				height:100%;
			}
			view{
				margin-top:20rpx;
				font-size:14px;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(68,68,68,1);
				opacity:1;
			}
		}
		.company-name{
			margin-top:646rpx;
			font-size:12px;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(68,68,68,1);
			opacity:1;
			.english{
				font-family:Arial;
			}
			.english-b{
				margin-top:30rpx;
			}
		}
	}
</style>
