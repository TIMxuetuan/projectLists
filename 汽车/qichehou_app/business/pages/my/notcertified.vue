<template>
	<view>
		<view class="my_head">
			<view class="my_head_img">
				<image src="../../static/img/imgIcon.png" style="width: 48px;height: 48px;"></image>
			</view>
			<view class="my_head_txt">
				郑州金牛轮胎有限公司
			</view>
		</view>
		<view style="height: 6px;background-color: #F1F1F1;"></view>
		<view class="store_attestation" @click="go_authentication">
			<view class="store_attestation_left">
				<view style="color:rgba(68,68,68,1);font-weight:400;height:14px;font-size:14px;line-height:14px;">
					认证商家
				</view>
				<view style="height:18px;font-size:12px;font-family:Source Han Sans CN;font-weight:400;line-height:25px;color:#5A5A5A;">
					成为商家才能发布商品
				</view>
			</view>
			<view class="store_attestation_right">
				去认证
				<span style="display: inline-block;padding-left: 8px;color: #444444;font-size: 14px;font-weight: 600;">&gt;</span>
			</view>
		</view>
		<view style="height: 6px;background-color: #F1F1F1;"></view>
		<view class="my_listinfo">
			<view class="my_listinfo_txt" @click="go_set_up">
				<view style="flex: 1;">
					系统设置
				</view>
				<view>
					<span style="color: #444444;font-size: 14px;font-weight: 600;">&gt;</span>
				</view>
			</view>
			<view style="height: 1px;background-color: #F1F1F1;"></view>
			<view class="my_listinfo_txt">
				<view style="flex: 1;">
					关于我们
				</view>
				<view>
					<span style="color: #444444;font-size: 14px;font-weight: 600;">&gt;</span>
				</view>
			</view>
			<view style="height: 1px;background-color: #F1F1F1;"></view>
			<view class="my_listinfo_txt">
				<view style="flex: 1;">
					服务中心
				</view>
				<view>
					<span style="color: #444444;font-size: 14px;font-weight: 600;">&gt;</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
			}
		},
		methods: {
			go_authentication(){
				this.$u.route({
								url: 'pages/my/authenticationpage',
								params: {
									name: 'lisa'
								}
							})
			},
			go_set_up(){
				this.$u.route({
								url: 'pages/my/setUp'
							})
			}
		},
		onLoad() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.height = windowHeight
		},
	}
</script>

<style lang="scss" scoped>
		.my_head{
			height: 70px;
			display: flex;
			padding: 10px 0;
			background:#4779F2;
			.my_head_img{
				height: 48px;
				width: 58px;
				margin: 0 10px;
				padding-left: 9px;
			}
			.my_head_txt{
				flex: 1;
				padding-left: 6px;
				line-height: 50px;
				font-size:16px;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
		}
		.store_attestation{
			height: 62px;
			background-color: #FFFFFF;
			padding: 15px 19px;
			display: flex;
			.store_attestation_left{
				flex: 1;
			}
			.store_attestation_right{
				width: 61px;
				line-height: 32px;
				font-size:14px;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(236,51,51,1);
			}
		}
		.my_listinfo{
			background-color: #FFFFFF;
			padding: 0 19px;
			.my_listinfo_txt{
				height: 55px;
				display: flex;
				line-height: 55px;
				font-size:14px;
				font-family:Source Han Sans CN;
				color:rgba(68,68,68,1);
			}
		}
	
</style>

