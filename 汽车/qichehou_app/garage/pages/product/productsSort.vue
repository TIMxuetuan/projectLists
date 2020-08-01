<template>
	<view class="products-container" :style="brandShow ? 'height: 100vh;overflow: hidden;' : ''">

		<!--搜索框-->
		<view class="searchStyle">
			<u-search placeholder="请输入商品名称或商品类别" border-color="#EF744D" bg-color="#fff" v-model="searchWord" shape="round"
			 :clearabled="true" :show-action="true" search-icon-color="#EF744D" action-text="搜索" :animation="true" @search="searchClick"
			 @custom="searchClick"></u-search>
		</view>

		<!--品牌分类-->
		<view class="brand-positioning">
			<view class="brand-positioning-item omit-item-text" v-for="(item,index) in brandLists" :key="index" @click="openBrand(item)">
				<view class="positioning-item-text omit-text">
					{{item.name}}
				</view>
				<view class="">
					<u-icon name="arrow-down" color="#EC3333" size="20"></u-icon>
				</view>
			</view>
			<view>
				<view class="brand-positioning-item notRight" v-if="priceSize == 0" @click="changePriceLargen(1)">
					<view class="positioning-item-text">
						价格由低到高
					</view>
					<view>
						<u-icon name="arrow-up" color="#EC3333" size="24"></u-icon>
					</view>
				</view>
				<view class="brand-positioning-item notRight" v-if="priceSize == 1" @click="changePriceLargen(0)">
					<view class="positioning-item-text">
						价格由高到低
					</view>
					<view>
						<u-icon name="arrow-down" color="#EC3333" size="24"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<!--灰条-->
		<view class="black-modul"></view>

		<!--商品-->
		<view class="more-product">
			<view class="more-product-items" v-for="(item,index) in moreProducts" :key='index' @click="gotoProductsDetails(item.Id)">
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
							{{item.sales}}人已购
						</view>
					</view>
				</view>
			</view>

		</view>

		<!--没有更多了-->
		<view class="no-morn">
			—— 没有更多了 ——
		</view>

		<!--品牌弹出层-->
		<u-popup v-model="brandShow" mode="right" border-radius="14" width="640rpx">
			<!-- <u-index-list :scrollTop="scrollTop" :index-list="indexList">
				<view v-for="(item, index) in list" :key="index" id="popp">
					<u-index-anchor :index="item.letter" />
					<view class="list-cell u-border-bottom" v-for="(item1, index) in item.data" :key="index">
						{{item1.name}}
					</view>
				</view>
			</u-index-list> -->
			<brandAnchor ref="brandAnchorList" :productsArray="productsArray" :typeBrand="typeBrand" @gotoProductsId="gotoProductsId"></brandAnchor>
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

	import indexList from "@/common/index.list.js";
	const letterArr = indexList.list.map(val => {
		return val.letter;
	})
	import brandAnchor from '../../components/customComponent/brandAnchor.vue'; //头部状态信息
	export default {
		components: {
			brandAnchor
		},
		data() {
			return {
				imageIp: this._config.host,
				searchWord: "", //搜索框值
				//品牌类别
				brandLists: [{
						name: '配件品牌',
						id: 1
					},
					{
						name: '配件分类',
						id: 2
					},
					{
						name: '汽车品牌',
						id: 3
					},
				],

				//商品
				page: 1, //页数
				moreProducts: [],
				brandShow: false, //控制品牌弹出层开关
				priceSize: 0, //价格排列顺序:不传或者传0按照由低到高，1由高到低
				classifyId:'',  //分类Id
				partsBrandId:'', //配件品牌Id
				carBrandId:'',  //汽车品牌Id

				scrollTop: 0,
				indexList: letterArr,
				list: indexList.list,

				productsArray: [], //品牌弹窗列表需要的值
				typeBrand: '', //区别id

			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;

			let info = uni.createSelectorQuery().select("popp");
			info.boundingClientRect(function(data) { //data - 各种参数  
				// console.log(data, 'data就是当前view的位置值')
			}).exec()
		},
		onLoad() {
			this.getProductsList()
		},
		methods: {
			..._methods,
			//获取商品列表
			getProductsList() {
				let postObj = {
					classify_id: this.classifyId,
					parts_brand_id: this.partsBrandId,
					car_brand_id: this.carBrandId,
					price_arrange: this.priceSize,
					page: this.page,
					// search: ''
				};
				productServices.classifyGoods(postObj).then(res => {
					if (res.Flag) {
						this.moreProducts = res.data
						console.log(this.moreProducts)
						this.show_toast(res.Content)
					} else {
						this.show_toast(res.Content)
					}
				})
			},

			//价格由低到高
			changePriceLargen(size) {
				this.priceSize = size
				if (this.searchWord != '') {
					this.searchGetList()
				} else {
					this.getProductsList()
				}
			},

			//打开品牌弹出层
			openBrand(item) {
				this.typeBrand = item.id
				if (item.id == 1) {
					this.getPartsBrandList()
				} else if (item.id == 2) {
					this.getClassifyList()
				} else if (item.id == 3) {
					this.getCarBrandList()
				}
			},

			//获取获取配件品牌列表事件
			getPartsBrandList() {
				this.brandShow = true
				productServices.classifyPartsBrandList().then(res => {
					if (res.Flag) {
						this.productsArray = res.data
						console.log(this.productsArray)
						this.show_toast(res.Content)
						this.$refs.brandAnchorList.updateLists()
					} else {
						this.show_toast(res.Content)
					}
				})
			},

			//获取获取配件分类列表事件
			getClassifyList() {
				this.brandShow = true
				productServices.classifyClassifyList().then(res => {
					if (res.Flag) {
						this.productsArray = res.data
						console.log(this.productsArray)
						this.show_toast(res.Content)
						this.$refs.brandAnchorList.updateLists()
					} else {
						this.show_toast(res.Content)
					}
				})
			},

			//获取汽车品牌列表事件
			getCarBrandList() {
				this.brandShow = true
				productServices.classifyCarBrandList().then(res => {
					if (res.Flag) {
						this.productsArray = res.data
						console.log(this.productsArray)
						this.show_toast(res.Content)
						this.$refs.brandAnchorList.updateLists()
					} else {
						this.show_toast(res.Content)
					}
				})
			},

			//搜索事件
			searchClick() {
				this.show_toast()
				if (this.searchWord != '') {
					this.searchGetList()
				} else {
					this.getProductsList()
				}

			},

			//搜索请求事件
			searchGetList() {
				let postObj = {
					classify_id: this.classifyId,
					parts_brand_id: this.partsBrandId,
					car_brand_id: this.carBrandId,
					price_arrange: this.priceSize,
					page: this.page,
					search: this.searchWord
				};
				productServices.classifyGoods(postObj).then(res => {
					if (res.Flag) {
						this.moreProducts = res.data
						console.log(this.moreProducts)
						this.show_toast(res.Content)
					} else {
						this.show_toast(res.Content)
					}
				})
			},
			
			//获取三种id，进行筛选
			gotoProductsId(item){
				console.log('typeBrand',this.typeBrand)
				console.log('item',item)
				if (this.typeBrand == 1) {
					this.partsBrandId = item.Id
					this.brandLists[0].name = item.parts_brand_name
				} else if (this.typeBrand == 2) {
					this.classifyId = item.Id
					this.brandLists[1].name = item.classify_name
				} else if (this.typeBrand == 3) {
					this.carBrandId = item.Id
					this.brandLists[2].name = item.car_brand_name
				}
				this.searchClick()
				this.clearThreeId()
			},
			
			//关闭三种筛选弹窗，并清空三种id
			clearThreeId(){
				this.brandShow = false
				// this.classifyId = '' //分类Id
				// this.partsBrandId = '' //配件品牌Id
				// this.carBrandId = '' //汽车品牌Id
			},

			//跳转商品详情页面
			gotoProductsDetails(Id) {
				console.log(Id)
				uni.navigateTo({
					url: '/pages/product/productsDetails?goodsId=' + Id
				})
			}
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

	.searchStyle {
		padding: 0 40rpx 40rpx;
		background-color: #fff;
	}

	//品牌分类
	.brand-positioning {
		padding: 20rpx 40rpx;
		display: flex;
		align-items: center;
		background-color: #fff;

		.brand-positioning-item {
			display: flex;
			align-items: center;
			justify-content: center;

			.positioning-item-text {
				font-size: 26rpx;
				margin-right: 4rpx;
				color: #000000;
				font-weight: 400;
			}
			
			.omit-text{
				// width: 104rpx;
				overflow:hidden; /*超出的部分隐藏起来。*/
				white-space:nowrap;/*不显示的地方用省略号...代替*/
				text-overflow:ellipsis;/* 支持 IE */
				text-align: right;
			}
		}
		
		.omit-item-text{
			text-align: center;
			width: 128rpx;
			margin-right: 35rpx;
		}

		.notRight {
			margin: 0;
		}
	}

	//灰条
	.black-modul {
		width: 100%;
		height: 12rpx;
		background-color: #F1F1F3;
	}

	//商品
	.more-product {
		background-color: #ffffff;
		padding: 0 40rpx;
		overflow: hidden;

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

	.no-morn {
		display: flex;
		justify-content: center;
		padding: 30rpx 0;
		background-color: #F1F1F1;
	}

	//索引列表
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>
