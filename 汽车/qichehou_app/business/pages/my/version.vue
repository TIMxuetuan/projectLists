<template>
	<view class="container">
		<view class="icon">
			<image src="../../static/img/imgIcon.png" mode=""></image>
			<view>当前版本1.0</view>
		</view>
		<u-button :custom-style="customStyle"  @click="show = true"  :hair-line="false" >检查更新</u-button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				customStyle:{
					marginTop:'132rpx',
					width:'674rpx',
					height:'80rpx',
					background:'rgba(71,121,242,1)',
					opacity:'1',
					borderRadius:'40rpx',
					fontSize:'16px',
					fontWeight:'500',
					color:'rgba(255,255,255,1)',
				}
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
		
	}
</style>
