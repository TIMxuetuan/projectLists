<template>
	<view style="heigth:auto" class="container">

		<!--搜索框-->
		<view class="searchStyle">
			<u-search placeholder="请输入商品名称或商品类别" border-color="#EF744D" bg-color="#fff" v-model="searchWord" shape="round"
			 :clearabled="true" :show-action="true" search-icon-color="#EF744D" action-text="搜索" :animation="true" @search="searchClick"
			 @custom="searchClick"></u-search>
		</view>

		<!--轮播swiper-->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" indicator-color="#EC3333" indicator-active-color="#fff" :indicator-dots="indicatorDots"
					 circular="true" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="item in imgLists">
							<view class="swiper-item uni-bg-red">
								<image :src="item" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!--tabs切换-->
		<view class="tabsSwitch">
			<u-tabs :list="list" :is-scroll="true" :current="current" @change="tabsChange" active-color="#fff" inactive-color="#000"
			 height="60" :show-bar="false" :active-item-style="acstye" font-size="24" duration="0"></u-tabs>
		</view>

		<!--tabs切换内容-->
		<view class="tabsContent" v-if="tabsxian.length">
			<view v-for="item in tabsxian" class="tabsContent-item" @click="gotoProductsSort(item)">
				<view class="tabsContent-item-image">
					<image :src="imageIp + '/' + item.phone_url" mode=""></image>
				</view>
				<view class="tabsContent-item-title">{{item.title}}</view>
			</view>
		</view>

		<!--推荐配件-->
		<view class="recommend-parts">
			<view class="recommend-parts-left">推荐店铺</view>
			<view class="recommend-parts-right">更多<u-icon name="arrow-right"></u-icon>
			</view>
		</view>

		<!--间隔槽-->
		<u-gap height="20" bg-color="#eeeeee"></u-gap>

		<!--更多商品-->
		<view class="more-product">
			<view class="more-product-items" v-for="item in moreProducts">
				<view class="product-items-image">
					<image :src="imageIp + item.goods_photo" mode=""></image>
				</view>
				<view class="product-items-text">
					<view class="text-title">
						{{item.goods_name}}
					</view>
					<view class="text-annotation">
						材质：丝绸
					</view>

					<!--包邮-->
					<!-- <view class="text-exemption">
						<view class="exemption-item" v-for="items in item.exemption">
							{{items}}
						</view>
					</view> -->
					<view class="text-price">
						<view>
							￥<text class="text-price-left">{{item.price}}</text>
						</view>
						<view class="text-price-right">
							52人已购
						</view>
					</view>
				</view>
			</view>
		</view>

		<u-gap height="20" bg-color="#eeeeee"></u-gap>

		<button type="default" @click="clearToken">清除token</button>


		<!-- <view class="centerContent">
			<button type="primary">页面主操作 Normal</button>
		</view> -->


	</view>
</template>

<script>
	import Services from '../../services/app.js';
	import {
		_data,
		_methods,
		util
	} from '../../common/public.js'
	export default {
		data() {
			return {
				..._data,
				imageIp: this._config.host,
				searchWord: "", //搜索框值

				//轮播组件值
				imgLists: [
					'http://img0.imgtn.bdimg.com/it/u=3056216629,1469615337&fm=26&gp=0.jpg',
					'http://a4.att.hudong.com/72/82/19300000009075130804824786610.jpg',
					'http://c.hiphotos.baidu.com/zhidao/pic/item/d000baa1cd11728bcdde8185ccfcc3cec2fd2ca1.jpg',
				],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,

				//tabs切换
				list: [{
						name: '轮胎',
						Id: '1'
					}, {
						name: '保养件',
						Id: '2'
					},
					{
						name: '车型件',
						Id: '3'
					}, {
						name: '4S滞销件',
						Id: '4'
					}

				],
				current: 0,
				tabsxian: [],
				//tabs选中的样式
				acstye: {
					"background-color": '#EC3333',
					"border-radius": "30px"
				},

				//更多商品
				moreProducts: [],
			}
		},
		onLoad() {
			this.getTypeList('1');
			this.getMoreProducts()
		},
		methods: {
			..._methods,

			//获取分类和数据
			getTypeList(id) {
				let postObj = {
					type: 1,
				};
				Services.homeTypeList(postObj).then(res => {
					if (res.Flag) {
						console.log('res', res.data)
						this.show_toast(res.Content)
						res.data.map(item => {
							if (id == item.Id) {
								this.tabsxian = item.items
							}
						})
						console.log('this.tabsxian', this.tabsxian)
					} else {
						this.show_toast(res.Content)
					}
				})
			},

			//获取推荐配件商品
			getMoreProducts() {
				Services.homeRecommend().then(res => {
					if (res.Flag) {
						console.log('res', res.data)
						this.moreProducts = res.data
					} else {
						this.show_toast(res.Content)
					}
				})
			},


			clearToken() {
				uni.setStorageSync('token', '');
				uni.navigateTo({
					url: '../login/login'
				});
			},

			//搜索事件 
			searchClick() {
				this.show_toast(this.searchWord)
			},

			//轮播swiper事件

			//tabs切换事件
			tabsChange(index) {
				this.current = index;
				let Id = this.list[index].Id
				this.getTypeList(Id)
			},

			//跳转到商品类别
			gotoProductsSort(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/product/productsSort'
				});

			}

		},
	}
</script>

<style lang="scss" scoped>
	.searchStyle {
		padding: 0 40rpx;
	}

	.container {
		font-size: 14px;
		line-height: 24px;

		/deep/ .uni-swiper-dots-horizontal {
			bottom: 0;
		}

		.uni-padding-wrap {
			margin-top: 20rpx;

			image {
				width: 100%;
				height: 300rpx;
			}
		}

		.centerContent {
			font-size: $wang-font-size-index;
			color: $wang-color-index;
			text-align: $wang-center-index;
		}
	}

	.tabsSwitch {
		// width: 620rpx;
		width: 670rpx;
		margin: 20rpx auto 0;

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
		margin: 20rpx auto 0;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;

		.tabsContent-item {
			width: 167.5rpx;
			padding: 20rpx 0;
			border: 1px solid #dddddd;
			border-top: 0;
			border-left: 0;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.tabsContent-item-image {
			image {
				width: 120rpx;
				height: 120rpx;
			}
		}

		.tabsContent-item-title {
			font-size: 24rpx;
			line-height: 1;
		}
	}

	.recommend-parts {
		width: 710rpx;
		margin: 20rpx auto;
		display: flex;
		justify-content: space-between;

		.recommend-parts-left {
			font-size: 14px;
			color: #444444;
			font-weight: bold;
		}

		.recommend-parts-right {
			font-size: 12px;
			color: #5A5A5A;
		}
	}

	.more-product {
		background-color: #ffffff;
		padding: 0 40rpx;

		.more-product-items {
			height: 310rpx;
			border-bottom: 1px solid rgba(167, 167, 167, 0.5);
			margin: 20rpx 0;
			display: flex;

			.product-items-image {
				width: 270rpx;
				height: 270rpx;
				margin-right: 20rpx;

				image {
					width: 270rpx;
					height: 270rpx;
					border-radius: 10rpx;
				}
			}
		}

		.more-product-items:last-child {
			border: none;
		}

	}



	.product-items-text {
		font-size: 12px;
		width: 100%;

		.text-title {
			font-size: 14px;
			line-height: 1.5;
		}

		.text-annotation {
			color: #5A5A5A;
		}

		.text-exemption {
			display: flex;
			flex-wrap: wrap;

			.exemption-item {
				background-color: #EF744D;
				color: #fff;
				height: 30rpx;
				line-height: 30rpx;
				padding: 0 6rpx;
				margin: 0 10rpx 4rpx 0;
				border-radius: 6rpx;
			}
		}

		.text-price {
			margin-top: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #EC3333;

			.text-price-left {
				font-size: 25px;
			}

			.text-price-right {
				color: #000;
			}
		}
	}

	.no-more {
		margin: 0 auto;
	}
</style>
