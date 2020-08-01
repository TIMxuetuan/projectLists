<template>
	<view class="u-wrap">
		<view class="shop_info">
			<view class="shop_info_head">
				我的店铺
			</view>
			<view class="shop_info_content" @click="go_shop">
				<view class="shop_info_content_img">
					<image src="../../static/img/imgIcon.png"></image>
				</view>
				<view class="shop_info_content_info">
					<view class="info-head">
						郑州金牛轮胎有限公司
					</view>
					<view class="info-middle">
						主营品牌：玛吉斯
					</view>
					<view class="info-bottom info-middle">
						主营配件：轮胎
					</view>
				</view>
				<view class="go-store" style="width: 70px;">
					<view class="shop_info_content_go">
						进店
					</view>
				</view>
			</view>
		</view>
		<view class="peers_txt">
			———— 同行店铺 ————
		</view>
		<view class="peer_shop">
			<view class="tabsSwitch">
				<u-tabs :list="list" :is-scroll="true" :current="current" @change="tabsChange" active-color="#fff" inactive-color="#000"
				 height="60" :show-bar="false" :active-item-style="acstye" font-size="24" duration="0"></u-tabs>
			</view>
			<view class="tabsContent">
				<view v-for="(item,i) in tabsxian" class="tabsContent-item" :key="i">
					<view class="tabsContent-item-image">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="">{{item.text}}</view>
				</view>
			</view>
			<!--推荐店铺-->
			<view class="recommend-parts">
				<view class="recommend-parts-left">推荐店铺</view>
				<view class="recommend-parts-right">更多<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view v-for="(item,i) in recommend_shop_list" :key="i">
			<view class="recommend_shop_tet">
				<view class="recommend_shop_img">
					<image src="../../static/img/imgIcon.png" style="width: 120rpx;height: 120rpx;"></image>
				</view>
				<view class="txt">
					<view class="txt-head">
						{{item}}
					</view>
					<view class="txt-middle">
						主营品牌：玛吉斯，佳通
					</view>
					<view class="txt-bottom">
						主营配件：轮胎
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
				//tabs切换
				list: [{
						name: '轮胎'
					}, {
						name: '保养件'
					},
					{
						name: '车型件'
					}, {
						name: '4s滞销件'
					}

				],
				current: 0,
				//tabs选中的样式
				acstye: {
					"background-color": '#298CF7',
					"border-radius": "30px"
				},
				tabsxian: [{
						image: "../../static/img/imgIcon.png",
						text: "普利司通"
					},
					{
						image: "../../static/img/imgIcon.png",
						text: "普利司通"
					},
					{
						image: "../../static/img/imgIcon.png",
						text: "普利司通"
					},
					{
						image: "../../static/img/imgIcon.png",
						text: "普利司通"
					},
					{
						image: "../../static/img/imgIcon.png",
						text: "普利司通"
					},
					{
						image: "../../static/img/imgIcon.png",
						text: "普利司通"
					},
					{
						image: "../../static/img/imgIcon.png",
						text: "普利司通"
					},
					{
						image: "../../static/img/imgIcon.png",
						text: "普利司通"
					},
				],
				recommend_shop_list:[
					"郑州金牛轮胎有限公司1",
					"郑州金牛轮胎有限公司2",
					"郑州金牛轮胎有限公司3",
					"郑州金牛轮胎有限公司4",
					"郑州金牛轮胎有限公司5",
					"郑州金牛轮胎有限公司6",
					"郑州金牛轮胎有限公司7"
				]
			}
		},
		computed: {

		},
		methods: {
			//tabs切换事件
			tabsChange(index) {
				this.current = index;
				console.log(this.current)
				if (index == 0) {
					// this.tabsxian = '轮胎'
				} else if (index == 1) {
					// this.tabsxian = '保养件'
				} else if (index == 2) {
					// this.tabsxian = '车型件'
				} else if (index == 3) {
					// this.tabsxian = '4s滞销件'
				}
				// method_all.show_toast("切换成功")
			},
			go_shop(){
				this.$u.route({
								url: 'pages/index/shop/shop',
							})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		// height: calc(100vh);
		// /* #ifdef H5 */
		// height: calc(100vh - var(--window-top));
		// /* #endif */
		font-family:Source Han Sans CN;
		font-weight:400;
		background-color: #F1F1F1;
		.shop_info{
			background-color: #4779F2;
			padding: 0 38rpx;
			color: #FFFFFF;
			.shop_info_head{
				display: flex;
				height: 68rpx;
				line-height: 68rpx;
				font-size:14px;
			}
		}
		.shop_info_content{
			display: flex;
			padding: 10rpx 0 30rpx 0;
			.shop_info_content_img{
				width: 120rpx;
				height: 120rpx;
				image{
					width: 120rpx;
					height: 120rpx;
				}
			}
			.shop_info_content_info{
				flex: 1;
				padding-left: 32rpx;
				.info-head{
					font-size:32rpx;
					height: 60rpx;
				}
				.info-middle{
					font-size:24rpx;
					height:36rpx;
					line-height:24rpx;
					color:rgba(255,255,255,0.80);
				}
				.info-bottom{
					height:24rpx;
				}
			}
			.go-store{
				width: 100rpx;
				height: 50rpx;
				line-height: 50rpx;
				border-radius: 26rpx;
				text-align: center;
				background-color: #FFFFFF;
				color: #4779F2;
				font-size:28rpx;
				margin-top: 35rpx;
			}
		}
		.peers_txt{
			text-align: center;
			height: 68rpx;
			font-size:28rpx;
			color:rgba(68,68,68,1);
			line-height: 68rpx;
		}
		.peer_shop{
			background-color: #FFFFFF;
			padding: 20rpx 38rpx;
			.tabsSwitch {
				// width: 620rpx;
				width: 670rpx;
			
				/deep/ .u-tabs {
					border: 1px solid #D0D0D0;
					border-radius: 30px;
			
					.u-scroll-box {
						display: flex;
						justify-content: space-between;
			
						.u-tab-item {
							width: 140rpx;
							padding: 0;
						}
					}
			
				}
			}
			.tabsContent {
				border: 1px solid #dddddd;
				border-right: 0;
				border-bottom: 0;
				width: 670rpx;
				height: 360rpx;
				margin: 10rpx auto 0;
				display: flex;
				flex-wrap: wrap;
				box-sizing: border-box;
			
				.tabsContent-item {
					width: 167.5rpx;
					height: 180rpx;
					padding: 20rpx 0;
					border: 1px solid #dddddd;
					border-top: 0;
					border-left: 0;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;
				}
			
				.tabsContent-item-image {
					image {
						width: 80rpx;
						height: 80rpx;
					}
				}
			}
			.recommend-parts {
				width: 670rpx;
				margin: 20rpx auto 10rpx;
				display: flex;
				justify-content: space-between;
			
				.recommend-parts-left {
					font-size: 14px;
					color: #444444;
				}
			
				.recommend-parts-right {
					font-size: 12px;
					color: #5A5A5A;
				}
			}
		}
		.recommend_shop_tet{
			margin-top: 20rpx;
			display: flex;
			background-color: #FFFFFF;
			padding: 30rpx 38rpx;
			.recommend_shop_img{
				width: 120rpx;
				height: 120rpx;
			}
			.txt{
				padding-left: 32rpx;
				.txt-head{
					font-size:32rpx;;
					height: 60rpx;
					line-height: 60rpx;
					color:rgba(0,0,0,1);
				}
				.txt-middle{
					color:rgba(90,90,90,0.70);
					font-size:24rpx;
					height: 36rpx;
					line-height: 24rpx;
				}
				.txt-bottom{
					color:rgba(90,90,90,0.70);
					font-size:24rpx;
					line-height: 24rpx
				}
			}
		}
	}


</style>
