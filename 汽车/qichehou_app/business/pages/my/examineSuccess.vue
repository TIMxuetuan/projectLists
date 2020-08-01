<template>
	<view class="">
		<view class="examine_success">
			<view class="examine_success_img">
				<image src="../../static/img/index/duigou.png" style="width: 60px;height: 60px;"></image>
			</view>
			<view style="text-align: center;font-size:16px;height:56px;font-weight:400;font-family:Source Han Sans CN;color:rgba(68,68,68,1);line-height: 56px;">
				提交成功
			</view>
			<view style="font-size:12px;line-height:18px;font-family:Source Han Sans CN;font-weight:400;color:rgba(68,68,68,1);width: 80%;margin: 0 auto;">
				您的入驻申请已提交，届时我们会在1-3个工作日对您提交的资料进行审核，并以短信方式把审核结果和后台地址给您发送到手机上，请注意查收。
			</view>
		</view>
		<view style="height: 100px;"></view>
		<view class="enter_shop">
			进入店铺
		</view>
	</view>
</template>

<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
				
			}
		},
		methods:{
			go_shop(){
				this.$u.route({
								url: 'pages/index/shop/shop',
							})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.examine_success{
		padding-top: 100px;
		.examine_success_img{
			width:77px;
			height:77px;
			padding-top: 10px;
			background:rgba(0,200,0,1);
			border-radius:50%;
			margin: 0 auto;
			text-align: center;
		}
		
	}
	.enter_shop{
		height:40px;
		background:rgba(71,121,242,1);
		border-radius:20px;
		width:200px;
		color:rgba(255,255,255,1);
		font-size:14px;
		line-height:40px;
		margin: 0 auto;
		text-align: center;
	}
</style>
