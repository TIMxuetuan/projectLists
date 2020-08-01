<template>
	<view class="products-container" :style="parameterShow ? 'height: 100vh;overflow: hidden;' : ''">
		<!--轮播图和详情-->
		<view class="swiper-details">
			<view class="swipers-image">
				<u-swiper height="660" name="image" :list="list" duration="3000" :circular="true" mode="number" indicator-pos="bottomRight"
				 :autoplay="false"></u-swiper>
			</view>
			<view class="details-text">
				<view class="details-text-price">
					<view>
						<text style="color: #EC3333;font-size: 28rpx">￥</text>
						<text style="color: #EC3333;font-size: 50rpx;">{{productsDetailsMarque.cost_price}}</text>
						<text style="margin-left: 30rpx;text-decoration:line-through">￥{{productsDetailsMarque.price}}</text>
					</view>
					<view class="">
						{{productsDetailsMarque.sales}}人已买
					</view>
				</view>
				<view class="details-text-content">
					{{productsDetails.goods_name}}
				</view>
			</view>
		</view>

		<!--规格和运费-->
		<view class="specification-freight">
			<view class="specification-freight-item" @click="specificationClick(0)">
				<view class="specification-item">
					<text style="margin-right: 40rpx; font-weight: bold;">规格</text>
					<text>请选择商品规格</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view class="specification-freight-item">
				<view class="specification-item">
					<text style="margin-right: 40rpx; font-weight: bold;">运费</text>
					<text>按件收费，起步价200</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>

		<!--商品详情-->
		<view class="">
			<u-divider bg-color="#F1F1F1" half-width='60'>商品详情</u-divider>
		</view>

		<!--图文详情内容-->
		<view class="graphic-details">
			<text class="graphic-details-title">图文详情内容</text>
			<view class="graphic-details-image">
				<block v-for="(item,index) in goods_detail_photo" :key="index">
					<image :src="item.image" mode=""></image>
				</block>
			</view>
			<!--商品详情-->
			<!-- <u-divider half-width='15'>郑州公牛汽配商</u-divider> -->
		</view>

		<!--按钮-->
		<view class="products-btn">
			<u-button shape="circle" :custom-style="customStyleLeft" @click="specificationClick(1)">加入购物车</u-button>
			<u-button shape="circle" type="error" :custom-style="customStyleRight" @click="specificationClick(2)">立即购买</u-button>
		</view>

		<!--规格弹窗-->
		<u-popup v-model="parameterShow" mode="bottom" border-radius="14" height="1060" :closeable="true">
			<view class="parameter-content">
				<!--头部图文展示-->
				<view class="parameter-content-head">
					<image :src=" imageIp + productsDetailsMarque.goods_speci_photo" mode=""></image>
					<view class="content-head-text">
						<view class="head-text-price">
							<text>￥</text>
							<text>{{productsDetailsMarque.price}}</text>
						</view>
						<view>
							请选择型号
						</view>
					</view>
				</view>

				<!--花纹种类-->
				<view class="kind">
					<view class="kind-title">花纹种类</view>
					<view class="kind-selects">
						<view class="kind-selects-items" :class="selectedNum==index?'pitchStyle':''" v-for="(item,index) in selectsLists"
						 :key="item.id" @click="pitchClick(item,index)">{{item.text}}</view>
					</view>
				</view>

				<!--数量-->
				<view class="number">
					<text>数量</text>
					<u-number-box v-model="numberValue" @change="valChange"></u-number-box>
				</view>

				<!--确定按钮-->
				<view class="confirm-btn">
					<u-button shape="circle" type="error" :custom-style="confirmBtnStyle" @click="submitProduct">确定</u-button>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import productServices from '../../services/productsApp.js';
	import {
		_data,
		_methods,
		util
	} from '../../common/public.js'
	export default {
		data() {
			return {
				imageIp: this._config.host,
				goodsId: '', //商品id
				productsDetails: {}, //商品总信息
				productsDetailsMarque: [], //商品规格信息

				//加入购物车按钮
				customStyleLeft: {
					width: '320rpx',
					height: '80rpx',
					border: '1px soli #EF744D',
					color: "#EF744D"
				},
				//立即购买按钮
				customStyleRight: {
					width: '320rpx',
					height: '80rpx',
				},
				list: [], //轮播图
				goods_detail_photo: [], //图文详情照片
				parameterShow: false, //参数弹窗开关
				//规格选择
				selectsLists: [{
						text: '花纹228V1',
						id: 1
					},
					{
						text: '花纹900',
						id: 2
					},
					{
						text: '花纹F22',
						id: 3
					},
					{
						text: '花纹000',
						id: 4
					},
				],
				selectedNum: -1,
				selectedNumLists: [],
				numberValue: 0,
				//弹窗确定按钮样式
				confirmBtnStyle: {
					width: '680rpx',
					height: '80rpx',
				},

				threeSubmitType: "", //0:选择规格并确定， 1：添加购物车确定， 2：立即购买确定

			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.goodsId); //打印出上个页面传递的参数。
			this.goodsId = option.goodsId
			this.getProductsDetails();
		},
		methods: {
			..._methods,

			//获取
			getProductsDetails() {
				let postObj = {
					goods_id: this.goodsId,
				};
				productServices.classifyGoodsDetail(postObj).then(res => {
					console.log(res)
					let imageUrl = {}
					if (res.Flag) {
						this.productsDetails = res.goods[0];
						this.productsDetailsMarque = res.goods[0].goods_marque[0];
						this.list = this.imageFormatting(res.goods[0].goods_photo);
						console.log('list', this.list);

						this.goods_detail_photo = this.imageFormatting(res.goods[0].goods_detail_photo);
						this.show_toast(res.Content);
					} else {
						this.show_toast(res.Content)
					}
				})
			},

			//图片格式化处理
			imageFormatting(imageList) {
				console.log(imageList)
				let textImage = []
				imageList = imageList.split("@");
				imageList.map(item => {
					textImage.push({
						image: this.imageIp + item
					})
				})
				console.log('textImage', textImage)
				return textImage

			},

			//打开参数弹窗
			specificationClick(type) {
				this.parameterShow = true
				this.threeSubmitType = type
			},

			//单选规格
			pitchClick(item, index) {
				console.log('index', item, index)
				if (this.selectedNum === index) {
					this.selectedNum = -1; //取消选中
					this.selectedNumLists == []
				} else {
					this.selectedNum = index;
					this.selectedNumLists.push(item)
				}
				console.log('item', this.selectedNumLists)
			},

			//数量
			valChange(e) {
				this.numberValue = e.value
			},
			
			/*确定提交事件 -- 包含三种情况
				0：当threeSubmitType = 0时，代表选择规格参数事件
				1：当threeSubmitType = 1时，代表添加购物车事件
				2：当threeSubmitType = 2时，代表立即购买事件
			*/
			submitProduct() {
			   console.log("this.threeSubmitType",this.threeSubmitType)
			   if(this.threeSubmitType == 0){
				   
			   }else if(this.threeSubmitType == 1){
				   this.addProductsCar()
			   }else if(this.threeSubmitType == 2){
				   
			   }
			},
			
			//添加购物车请求事件
			addProductsCar(){
				let postObj = {
					shop_id:this.productsDetails.shop_id,
					goods_id: this.productsDetails.Id,
					goods_marque_id:this.productsDetailsMarque.Id,
					number:this.numberValue
				};
				productServices.shopAdd(postObj).then(res => {
					console.log(res)
					if (res.Flag) {
						this.show_toast(res.Content);
						this.parameterShow = false
					} else {
						this.show_toast(res.Content)
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: rgba(241, 241, 241, 1);
	}
</style>

<style lang="scss" scoped>
	.products-container {
		position: relative;
	}

	//轮播图和详情介绍
	.swiper-details {
		width: 100%;
		background-color: #fff;

		.details-text {
			padding: 30rpx 40rpx 40rpx;

			.details-text-price {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #5A5A5A;
				font-size: 24rpx;

				.price-style {}
			}

			.details-text-content {
				font-size: 32rpx;
				color: #000;
				font-weight: bold;
				margin-top: 30rpx;
			}
		}
	}

	//规格和运费
	.specification-freight {
		margin: 20rpx 0;
		padding: 30rpx 40rpx;
		background-color: #fff;

		.specification-freight-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.specification-freight-item:not(:last-child) {
			margin-bottom: 30rpx;
		}

		.specification-item {
			font-size: 28rpx;
			color: #000;
		}
	}

	//图文详情
	.graphic-details {
		margin: 26rpx 0 150rpx;
		padding: 40rpx 40rpx 20rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #444444;

		.graphic-details-image {
			margin-top: 20rpx;

			image {
				width: 100%;
				display: block;
				margin-bottom: 30rpx;
			}
		}
	}

	//按钮
	.products-btn {
		width: 100%;
		position: fixed;
		z-index: 2;
		bottom: 0;
		background-color: #fff;
		height: 110rpx;
		padding: 16rpx 40rpx 14rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	//规格弹窗
	.parameter-content {
		padding: 0 40rpx;
		position: relative;
		overflow: hidden;

		.parameter-content-head {
			position: fixed;
			top: 0;
			display: flex;
			align-items: flex-end;
			padding-top: 40rpx;
			width: 100%;
			background-color: #fff;

			image {
				width: 210rpx;
				height: 210rpx;
				margin-right: 10rpx;
			}

			.content-head-text {
				font-size: 24rpx;
				color: #5A5A5A;
			}

			.head-text-price {
				color: #EC3333;
				font-size: 28rpx;

				text:last-child {
					font-size: 40rpx;
				}
			}
		}

		//种类
		.kind {
			margin: 310rpx 0 50rpx;

			.kind-title {
				font-size: 28rpx;
				color: #000;
				font-weight: bold;
				margin-bottom: 40rpx;
			}

			.kind-selects {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}

			.kind-selects-items {
				margin-bottom: 20rpx;
				background-color: #F1F1F1;
				padding: 16rpx 30rpx;
				font-size: 28rpx;
				color: #000000;
				border: 1px solid transparent;
			}
		}
	}

	.pitchStyle {
		color: #EC3333 !important;
		border: 1px solid #EC3333 !important;
		background-color: #FFF4F1 !important;
	}

	//数量
	.number {
		display: flex;
		justify-content: space-between;
		align-items: center;

		text {
			font-size: 28rpx;
			color: #000;
			font-weight: 400;
		}
	}

	.confirm-btn {
		position: fixed;
		bottom: 20rpx;

	}
</style>
