<template>
	<view class="shopping-content">
		<block v-if="productsLists != '' ">
			<!--单独一块商品-->
			<view class="company-product">

				<block v-for="(item,indexs) in productsLists" :key="indexs">
					<view class="company-product-item">
						<!--公司标题-->
						<view class="company-name">
							{{item.business_name}}
						</view>
						<!--商品内容-->
						<view class="product-content">
							<u-swipe-action :show="items.show" :data-listIndex="indexs" :index="items.Id" v-for="(items, index) in item.goods"
							 :key="items.Id" @click="swipeDelectClick" :options="options" class="product-items">
								<view class="item u-border-bottom">
									<view class="radio-style">
										<u-checkbox-group>
											<u-checkbox v-model="items.checked" active-color="#EF744D" shape="circle" @change="checkboxChange(items,index)"></u-checkbox>
										</u-checkbox-group>

										<!-- <checkbox-group class="block" @change="changeCheckbox">
											<checkbox v-model="items.id" :checked="items.checked" @change="checkboxChange"></checkbox>
										</checkbox-group> -->


									</view>
									<image mode="aspectFill" :src="imageIp + items.goods_photo" />
									<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
									<view class="title-wrap">
										<text class="title u-line-2">{{ items.goods_name }}</text>
										<view class="product-content-price">
											<view>
												￥<text class="priceCount-num">{{items.price}}</text>
											</view>
											<view class="">
												<u-number-box v-model="items.number" :data-items="items" :index="index" @change="numberValueChange" :positive-integer="true"></u-number-box>
											</view>
										</view>
									</view>
								</view>
							</u-swipe-action>
						</view>
					</view>
				</block>

			</view>

			<!--结算栏-->
			<view class="closing-cost">
				<view class="closing-cost-left">
					<u-checkbox v-model="allChecked" active-color="#EF744D" shape="circle" label-size='24' @change="checkboxAll">全选</u-checkbox>
				</view>
				<view class="closing-cost-right">
					<view class="cost-right-price">
						合计：<text style="color:#EC3333">￥{{countPrice}}</text>
					</view>
					<view class="cost-right-btn">
						<u-button type="success" shape="circle" :custom-style="closeAccount" hover-class="none" @click='gotoSubmitOrders'>结算</u-button>
					</view>
				</view>

				<!-- <view @click="delectProduct">
					删除
				</view> -->
			</view>
		</block>

		<!--为空时显示-->
		<block v-else>
			<view class="noneLists">
				<view class="noneLists-image">
					<image src="../../static/img/notCart.png" mode=""></image>
				</view>
				<view class="">
					购物车还是空的，快去购物吧
				</view>
			</view>
		</block>

		<!-- <view class="wrap">
			<u-back-top :scroll-top="scrollTop" bottom="150"></u-back-top>
		</view> -->

	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../common/public.js'
	import productServices from '../../services/productsApp.js';
	export default {
		data() {
			return {
				..._data,
				imageIp: this._config.host,
				productsLists: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#EC3333',
						borderRadius: '0px 5px 5px 0px'
					}
				}],

				/* 自定义数据格式，将复杂数据格式 提取并存到一个新的数组里， 方便后面的数据存储
				例子：customList：【
					｛
					id: 1,
					title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
					images: 'https://cdn.uviewui.com/uview/common/logo.png',
					show: false,
					number: 1,
					checked: false
					｝
				】
				*/
				customList: [],  

				//选中时存的数据、以及全选
				delectProductList: [],
				allChecked: false,
				checkedArr: [], //复选框选中的值

				closeAccount: {
					width: '160rpx',
					height: '70rpx',
					lineHeight: "70rpx",
					backgroundColor: "#FF450D"

				},

				countPrice: 0, //总价
				scrollTop: 0, //返回顶部需要的高度
				

			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			this.getProductsCar()
		},
		methods: {
			..._methods,
			//获取购物车列表信息
			getProductsCar(){
				productServices.getShopList().then(res => {
					console.log(res)
					if (res.Flag) {
						this.productsLists = res.data
						this.show_toast(res.Content);
						
						//自定义数据格式，将复杂数据格式 提取并存到一个新的数组里
						let list = res.data
						let pushList = []
						list.map(item => {
							for (var i = 0; i < item.goods.length; ++i) {
								pushList.push(item.goods[i])
							}
						})
						this.customList = pushList
						console.log(this.customList)
					} else {
						this.show_toast(res.Content)
					}
				})
			},
			
			//删除商品
			swipeDelectClick(id, index1) {
				console.log('删除', id, index1)
				var that = this
				let list = that.productsLists
				uni.showModal({
					title: '提示',
					content: '这是一个模态弹窗',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							list.map(item => {
								for (var i = 0; i < item.lists.length; i++) {
									if (id == item.lists[i].id) {
										console.log(item.lists[i])
										//这里调用购物车删除接口
									}
								}
							})

							// that.list.splice(index, 1);
							// that.$u.toast(`删除了第${index}个cell`);
							that.checkChangeAll()
							that.totalPricesCount()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				console.log(index)
				this.productsLists[index].show = true;
				this.productsLists.map((val, idx) => {
					if (index != idx) this.productsLists[idx].show = false;
				})
			},

			//计数器事件
			numberValueChange(changeNumber) {
				console.log('changeNumber', changeNumber)
				var value = changeNumber.value
				var index = changeNumber.index
				// this.list[index].number = value
				this.totalPricesCount()
			},


			//单个商品选择
			checkboxChange(item) {
				console.log(item);

				//选中时把数据放入  this.delectProductList,  取消时删除
				if (item.checked == true) {
					this.delectProductList.push(item)
				} else {
					for (var i = 0; i < this.delectProductList.length; i++) {
						if (this.delectProductList[i].checked == false) {
							this.delectProductList.splice(i, 1)
						}
					}
				}
				
				this.checkChangeAll()
				this.totalPricesCount()

			},

			//单选时 控制 全选复选框 选中、取消事件
			checkChangeAll() {
				var offCarArr = []
				this.customList.forEach(item => {
					offCarArr.push(item)
				})
				let allChecks = offCarArr.every(item => item.checked == true)
				allChecks ? this.allChecked = true : this.allChecked = false
			},

			//计算总价
			totalPricesCount() {
				var price = 0;
				var numb = 0;
				var list = this.customList
				for (var i = 0; i < list.length; i++) {
					if (list[i].checked) {
						price += list[i].number * list[i].price;
						numb += list[i].number;
					}
				}
				this.countPrice = price
			},



			//全选复选框点击事件
			checkboxAll(itemAll) {
				let checkboxAllItem = itemAll.value
				var list = this.customList
				list.map(item => {
					if (checkboxAllItem == true) {
						item.checked = true
						// this.delectProductList = this.customList
					} else {
						item.checked = false
						// this.delectProductList = []
					}
				})
				if (checkboxAllItem == true) {
					this.delectProductList = this.customList
				} else {
					this.delectProductList = []
				}
				this.totalPricesCount()
			},


			//删除商品按钮事件
			delectProduct() {
				console.log(this.delectProductList)
				this.productsLists.splice(index, 1);
			},

			//跳转商品提交订单页面，以后更改为商品详情页面
			gotoSubmitOrders() {
				console.log("this.delectProductList",this.delectProductList)
				console.log('跳转')
				return
				uni.navigateTo({
					url: '/pages/product/submitOrders/submitOrders'
				});
			}
		}


	}
</script>

<style>
	page {
		background: rgba(241, 241, 241, 1);
	}
</style>

<style lang="scss" scoped>
	.shopping-content {
		position: relative;
	}

	.company-product {
		margin: 20rpx 0 150rpx;

		.company-product-item {
			background-color: #fff;
			padding: 0 40rpx;
			margin-bottom: 20rpx;

			.company-name {
				height: 100rpx;
				line-height: 100rpx;
				font-size: 16px;
				// border-bottom: 1px solid #E1E1E1;
			}
		}
	}

	.product-content {
		overflow: hidden;
		padding: 20rpx 0 0;

		.product-items {
			width: 100%;
			height: 180rpx;
			margin-bottom: 20rpx;
			display: block;

			// display: flex;
			// flex: 1 1 auto;
			// justify-content: space-between;
			// align-items: center;
		}

		.radio-style {
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}

		.item {
			display: flex;
			align-items: center;
			padding: 0;

			.title-wrap {
				width: 100%;
				height: 180rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			image {
				width: 180rpx;
				flex: 0 0 180rpx;
				height: 180rpx;
				margin-right: 20rpx;
			}

			.title {
				text-align: left;
				font-size: 12px;
				color: #000;
			}
		}

		.u-border-bottom:after {
			border: none;
		}
	}

	.product-content-price {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: #EF744D;

		.priceCount-num {
			font-size: 16px;
		}
	}


	//结算兰
	.closing-cost {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx;

		.closing-cost-right {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.cost-right-price {
				margin-right: 30rpx;

				text {
					color: #FF450D;
				}
			}
		}

		/deep/ .u-checkbox__label {
			color: #5A5A5A;
		}
	}

	//数据为空
	.noneLists {
		margin: 80rpx auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #5A5A5A;
		font-size: 28rpx;

		.noneLists-image {
			margin-bottom: 30rpx;

			image {
				width: 200rpx;
				height: 200rpx;
			}
		}
	}
</style>
