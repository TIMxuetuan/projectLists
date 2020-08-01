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
		<view class="success_info">
			<view class="success_info_top">
				<view class="success_info_top_block">
					<view class="success_info_top_left" @click="go_myWallet">
						<view class="success_info_top_left_top">
							账户余额(元)
						</view>
						<view class="success_info_top_left_lower">
							398765.43
						</view>
					</view>
					<view style="width: 1px;background-color: #E5E5E5;"></view>
					<view class="success_info_top_left">
						<view class="success_info_top_left_top">
							我的积分
						</view>
						<view class="success_info_top_left_lower">
							3988
						</view>
					</view>
				</view>
			</view>
			<view style="height: 6px;"></view>
			<view class="success_info_lower">
				<view class="success_info_lower_top">
					<view style="color:rgba(68,68,68,1);font-size:16px;font-family:Source Han Sans CN;font-weight:400;">
						我的订单
					</view>
					<view style="flex: 1;"></view>
					<view style="font-size:12px;font-family:Source Han Sans CN;color:rgba(90,90,90,0.70);">
						查看全部订单
						<span style="padding-left: 10px;font-size: 14px;">&gt;</span>
					</view>
				</view>
				<view class="order_see">
					<view class="all_orders_wrap">
						<view class="all_orders_content">
							<view class="all_orders_content_block">
								<view class="all_orders_content_block_img">
									<img src="../../static/img/index/待付款@2x.png" style="width: 33px;height: 33px;padding-top: 8px;">
								</view>
								<view style="height: 6px;"></view>
								<view class="all_orders_content_block_txt">
									待付款
								</view>
							</view>
						</view>
						<view class="all_orders_content">
							<view class="all_orders_content_block">
								<view class="all_orders_content_block_img">
									<img src="../../static/img/index/待发货@2x.png" style="width: 33px;height: 33px;padding-top: 8px;">
								</view>
								<view style="height: 6px;"></view>
								<view class="all_orders_content_block_txt">
									待发货
								</view>
							</view>
						</view>
						<view class="all_orders_content">
							<view class="all_orders_content_block">
								<view class="all_orders_content_block_img">
									<img src="../../static/img/index/已发货@2x.png" style="width: 33px;height: 33px;padding-top: 8px;">
								</view>
								<view style="height: 6px;"></view>
								<view class="all_orders_content_block_txt">
									待收货
								</view>
							</view>
						</view>
						<view class="all_orders_content" style="width: 58px;">
							<view class="all_orders_content_block">
								<view class="all_orders_content_block_img">
									<img src="../../static/img/index/退款售后@2x.png" style="width: 33px;height: 33px;padding-top: 8px;">
								</view>
								<view style="height: 6px;"></view>
								<view class="all_orders_content_block_txt">
									退款/售后
								</view>
								
							</view>
						</view>
					</view>
					
				</view>
			</view>
			<view style="height: 6px;"></view>
			<view class="my_listinfo">
				<view class="my_listinfo_txt" @click="go_set_up">
					<view style="flex: 1;">
						系统设置
					</view>
					<view style="color: #444444;font-size: 14px;line-height: 54px;">
						&gt;
					</view>
				</view>
				<view style="height: 1px;background-color: #E5E5E5;"></view>
				<view class="my_listinfo_txt">
					<view style="flex: 1;">
						关于我们
					</view>
					<view style="color: #444444;font-size: 14px;line-height: 54px;">
						&gt;
					</view>
				</view>
				<view style="height: 1px;background-color: #E5E5E5;"></view>
				<view class="my_listinfo_txt">
					<view style="flex: 1;">
						帮助中心
					</view>
					<view style="color: #444444;font-size: 14px;line-height: 54px;">
						&gt;
					</view>
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
			go_myWallet(){
				this.$u.route({
								url: 'pages/my/myWallet'
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
		.success_info{
			padding: 6px 0;
			height: 70px;
			.success_info_top{
				background-color: #FFFFFF;
				.success_info_top_block{
					padding: 10px 0;
					display: flex;
					.success_info_top_left{
						flex: 1;
						.success_info_top_left_top{
							text-align: center;
							height:23px;
							line-height: 23px;
							color:rgba(90,90,90,0.70);
							font-size:12px;
							font-family:Source Han Sans CN;
							font-weight:400;
						}
						.success_info_top_left_lower{
							text-align: center;
							font-size:20px;
							font-family:Arial;
							font-weight:400;
							height:27px;
							line-height:23px;
						}
					}
				}
			}
			.success_info_lower{
				height: 127px;
				padding: 5px 19px;
				background-color: #FFFFFF;
				.success_info_lower_top{
					display: flex;
					height: 35px;
					line-height: 35px;
				}
				.all_orders_wrap{
					display: flex;
				}
				.all_orders_content{
					height: 68px;
					flex: 1;
					text-align: center;
					.all_orders_content_block{
						.all_orders_content_block_img{
							margin: 0 auto;
							width: 50px;
							height: 50px;
							line-height: 50px;
							background:#4779F2;
							border-radius:50%;
						}
						.all_orders_content_block_txt{
							height:12px;
							font-size:12px;
							font-family:Source Han Sans CN;
							font-weight:400;
							line-height:12px;
							color:#5A5A5A;
						}
					}
				}
			}
		}
		.my_listinfo{
			background-color: #FFFFFF;
			padding: 0 19px;
			.my_listinfo_txt{
				height: 54px;
				display: flex;
				line-height: 54px;
				font-size:14px;
				font-family:Source Han Sans CN;
				color:rgba(68,68,68,1);
			}
		}
</style>

