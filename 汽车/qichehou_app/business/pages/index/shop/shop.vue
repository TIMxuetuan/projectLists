<template>
	<view class="u-wrap" v-if="info!=null" :style="{'min-height':height+ 'px'}">
		<view class="shop_info">
			<view class="shop_info_content" @click="go_shopManage">
				<view class="shop_info_content_img">
					<image :src="url+info.base.business_license"></image>
				</view>
				<view class="shop_info_content_info">
					<view class="txt">
						{{info.base.company_name}}
					</view>
					<view class="txt-middle">
						主营品牌：玛吉斯
					</view>
					<view class="txt-bottom">
						主营配件：轮胎
					</view>
				</view>
				<view class="shop_icon">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="live_data" @click="go_saleStatistics">
				<view class="live_data_head">
					<view class="live_data_head_left">
						实时数据
					</view>
					<view class="live_data_head_right">
						查看完整数据分析
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="today_info">
					<view class="today_info_txt">
						今日成交客户(人)
					</view>
					<view class="today_info_txt">
						今日销量(件)
					</view>
					<view class="today_info_txt">
						今日成交额(元)
					</view>
				</view>
				<view class="today_info" style="padding-bottom: 10rpx;">
					<view class="today_info_txt">
						12
					</view>
					<view class="today_info_txt">
						35
					</view>
					<view class="today_info_txt">
						123456.78
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<u-sticky offset-top="0">
				<view class="content-wrap">
					<view>
						<u-tabs name="cate_name" :list="list_head" :is-scroll="false" :current="current_head" @change="change_head"
						 bar-width="100"></u-tabs>
					</view>
					<view class="content-icon">
						<image src="../../../static/img/index/saixuan.png"></image>
					</view>
					<view @click.stop="stateRequest">
						<u-tabs name="cate_name" :list="list_secondary" :is-scroll="false" :current="current_secondary" @change="change_secondary"
						 bar-height='0'></u-tabs>
					</view>

				</view>
			</u-sticky>

		</view>
		<view v-for="(item,index) in sell_goodsList" :key="index" @click="editGoods(item.Id)">
			<view class="sell_goods">
				<view class="sell_goods_img">
					<image src="../../../static/img/imgIcon.png"></image>
				</view>
				<view class="sell_goods_txt">
					<view class="txt-left">
						{{item.goods_name}}
					</view>
					<view class="txt-middle">
						<text class="txt-middle-front">￥</text>
						<text class="txt-middle-after">251.00</text>
					</view>
					<view class="txt-bottom">
						<view class="txt-bottom-txt">销量：5</view>
						<view style="flex: 1;">库存19</view>
						<view class="reshelf" v-if="current_head==1" @click.stop="reshelf_click(item)">重新上架</view>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 82rpx;"></view>
		<view class="shop_bottom">
			<view class="bottom_add" @click="add_click">
				添加商品
			</view>
			<view style="height: 80rpx;width: 1rpx;background-color: #E5E5E5;"></view>
			<view class="bottom_manage" @click="go_batchManage">
				批量管理
			</view>
		</view>
	</view>
</template>

<script>
	import {
		_CONFIG
	} from '../../../config.js'
	import Services_shop from '../../../services/shop.js';
	export default {
		components: {

		},
		data() {
			return {
				height: 0,
				info: null,
				list_head: [{
					cate_name: '出售中'
				}, {
					cate_name: '已下架'
				}],
				list_secondary: [{
					cate_name: '发布时间'
				}, {
					cate_name: '销量'
				}, {
					cate_name: '库存'
				}],
				current_head: 0,
				current_secondary: 0,
				sell_goodsList: [],
				url: '',
				timeState:0
			}
		},
		methods: {
			change_head(index, id) {
				this.current_head = index;
				console.log(index)
				if (index == 0) {
					var status = 2
				} else {
					var status = 1
				}
				Services_shop.get_goods_list({
					status: status
				}).then(res => {
					console.log("商品列表111")
					console.log(res)
					this.sell_goodsList = res.Data.goods
				})
			},
			change_secondary(index) {
				this.current_secondary = index;
				console.log(index)
				if(this.current_head==0){
					var status = 2
				}else{
					var status = 1
				}
				if(index ==0){
					this.timeState = 0
					// Services_shop.get_select_goods({
					// 	status: status,
					// 	by_releasetime:'desc'
					// }).then(res => {
					// 	console.log("更新")
					// 	console.log(res)
					// })
				}else if(index ==1){
					Services_shop.get_select_goods({
						status: this.current_head,
						sales_all:'desc'
					}).then(res => {
						console.log("更新")
						console.log(res)
					})
				}else{
					Services_shop.get_select_goods({
						status: this.current_head,
						repertory_all:'desc'
					}).then(res => {
						console.log("更新")
						console.log(res)
					})
				}
				
			},
			add_click() {
				this.$u.route({
					url: 'pages/index/shop/addGoods',
				})
			},
			go_batchManage() {
				this.$u.route({
					url: 'pages/index/shop/batchManage',
				})
			},
			go_shopManage() {
				this.$u.route({
					url: 'pages/index/shop/shopManage',
				})
			},
			go_saleStatistics() {
				this.$u.route({
					url: 'pages/index/shop/saleStatistics',
				})
			},
			stateRequest() {
				if(this.current_secondary==0){
					if(this.current_head==0){
						var status = 2
					}else{
						var status = 1
					}
					if(this.timeState == 0){
						this.timeState = 1
						Services_shop.get_select_goods({
							status: status,
							by_releasetime:'desc'
						}).then(res => {
							console.log("更新")
							console.log(res)
						})
					}else{
						this.timeState = 0
						Services_shop.get_select_goods({
							status: status,
							by_releasetime:'asc'
						}).then(res => {
							console.log("更新")
							console.log(res)
						})
					}
					console.log(this.timeState)
				}
				
			},
			// 编辑商品
			editGoods(id) {
				console.log(id)
				this.$u.route({
					url: 'pages/index/shop/addGoods',
					params: {
						id: id
					}
				})
			},
			// 重新上架
			reshelf_click(item) {
				console.log("重新上架")
				console.log(item)
				Services_shop.post_up_status({
					id: item.Id,
					status: 2
				}).then(res => {
					console.log("重新上架")
					console.log(res)
					Services_shop.get_goods_list({
						status: 2
					}).then(res => {
						console.log("商品列表111")
						console.log(res)
						this.sell_goodsList = res.Data.goods
					})
				})
			}
		},
		onLoad() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.height = windowHeight
			console.log("................")
			this.url = `${_CONFIG.img_url}`
			console.log(this.url)
			Services_shop.get_my_show().then(res => {
				console.log(res)
				console.log("1111")
				this.info = res.Data
			})
			Services_shop.get_goods_list({
				status: 2
			}).then(res => {
				console.log("商品列表111")
				console.log(res)
				this.sell_goodsList = res.Data.goods
			})
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		background-color: #F1F1F1;
		font-family: Source Han Sans CN;
		font-weight: 400;

		.shop_info {
			background-color: #4779F2;
			padding: 20rpx 38rpx;
		}

		.shop_info_content {
			display: flex;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #F1F1F1;

			.shop_info_content_img {
				width: 120rpx;
				height: 120rpx;

				image {
					width: 120rpx;
					height: 120rpx;
				}
			}

			.shop_info_content_info {
				flex: 1;
				padding-left: 32rpx;

				.txt {
					font-size: 32rpx;
					height: 60rpx;
					line-height: 32rpx;
					color: #FFFFFF;
				}

				.txt-middle {
					color: #FFFFFF;
					height: 36rpx;
					line-height: 24rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.80);
				}

				.txt-bottom {
					height: 60rpx;
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.80);
					line-height: 60rpx;
				}
			}

			.shop_icon {
				width: 140rpx;
				line-height: 120rpx;
				text-align: right;
				color: #FFFFFF;
			}

			.shop_info_content_go {
				width: 70px;
				height: 23px;
				line-height: 20px;
				border-radius: 7px;
				text-align: center;
			}
		}

		.live_data {
			color: #FFFFFF;

			.live_data_head {
				display: flex;

				.live_data_head_left {
					flex: 1;
					font-size: 32rpx;
					height: 72rpx;
					line-height: 72rpx;
				}

				.live_data_head_right {
					height: 72rpx;
					line-height: 72rpx;
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.80);
				}
			}
		}

		.today_info {
			display: flex;
			height: 36rpx;
			line-height: 36rpx;
			font-size: 24rpx;

			.today_info_txt {
				flex: 1;
			}
		}

		.content {
			margin-top: 12rpx;

			.content-wrap {
				position: relative;
			}

			.content-icon {
				height: 1rpx;
				background-color: #A7A7A7;
				position: absolute;
				top: 74rpx;
				width: 100%;

				image {
					position: absolute;
					top: 35rpx;
					left: 190rpx;
					width: 26rpx;
					height: 24rpx;
				}
			}
		}

		.sell_goods {
			padding: 22rpx 38rpx;
			display: flex;
			background-color: #FFFFFF;
			margin-top: 12rpx;

			.sell_goods_img {
				width: 270rpx;
				height: 270rpx;

				image {
					width: 270rpx;
					height: 270rpx;
				}
			}

			.sell_goods_txt {
				flex: 1;
				padding-left: 28rpx;
				display: flex;
				flex-flow: column;

				.txt-left {
					font-size: 28rpx;
					line-height: 40rpx;
					color: rgba(0, 0, 0, 1);
					flex: 3;
				}

				.txt-middle {
					height: 128rpx;
					flex: 4;

					.txt-middle-front {
						color: #EC3333;
						font-size: 28rpx;
						height: 28rpx;
					}

					.txt-middle-after {
						color: #EC3333;
						font-size: 50rpx;
						line-height: 100rpx;
					}
				}

				.txt-bottom {
					display: flex;
					font-size: 24rpx;
					color: rgba(0, 0, 0, 1);
					flex: 1;
					line-height: 60rpx;
					height: 60rpx;

					.txt-bottom-txt {
						padding-right: 40rpx;
					}
				}
			}
		}

		.shop_bottom {
			position: fixed;
			bottom: 0;
			display: flex;
			background-color: #FFFFFF;
			width: 100%;
			border-top: 1px solid #E5E5E5;
		}

		.bottom_add {
			text-align: center;
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
		}

		.bottom_manage {
			text-align: center;
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
		}
	}

	.reshelf {
		width: 122rpx;
		height: 60rpx;
		text-align: center;
		border: 1rpx solid rgba(112, 112, 112, 1);
		border-radius: 10rpx;
		font-size: 24rpx;
	}
</style>
