<template>
	<view class="">
		<view class="examine_success">
			<view class="examine_success_img">
				<image src="../../static/img/index/叉号@2x.png" style="width: 40px;height: 40px;"></image>
			</view>
			<view style="text-align: center;font-size:16px;height:56px;font-weight:400;font-family:Source Han Sans CN;color:rgba(68,68,68,1);line-height: 56px;">
				审核失败
			</view>
			<view style="text-align: center;font-size:12px;font-family:Source Han Sans CN;font-weight:400;color:rgba(68,68,68,1);">
				您的入驻申请未通过，具体原因请联系客服。
			</view>
			<view style="font-size:12px;line-height: 40px;font-family:Source Han Sans CN;font-weight:400;color:#444444;text-align: center;">
				客服电话:<span style="color: #4779F2;">400190190</span>
			</view>
		</view>
		<view style="height: 100px;"></view>
		<view class="enter_shop" @click="go_qualifications">
			重新提交
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
			go_qualifications(){
				this.$u.route({
								url: 'pages/my/authenticationpage',
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
			padding-top: 20px;
			background:rgba(236,51,51,1);
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
