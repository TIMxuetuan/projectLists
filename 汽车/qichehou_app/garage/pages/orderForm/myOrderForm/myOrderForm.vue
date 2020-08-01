<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#EC3333" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750" :bold='false'></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="item in list">
					<scroll-view scroll-y style="height: 100%;width: 100%;">

						<!--没有数据时 为空展示-->
						<view class="page-box" v-if="orderList == ''">
							<view class="page-box-title">
								——— 还没有订单哦 ———
							</view>
						</view>

						<!--有数据展示-->
						<view class="myorer-products" v-else>
							<myOrderFormProducts :productLists="orderList" :productListsIndex="productListsIndex" @gotoOrderDetails='gotoOrderDetails'></myOrderFormProducts>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	import myOrderFormProducts from '../../../components/customComponent/myOrderFormProducts.vue'
	export default {
		components: {
			// "myOrderFormProducts": () => import("../../../components/customComponent/myOrderFormProducts.vue")
			myOrderFormProducts
		},
		data() {
			return {
				orderList: [
					[],
					[],
					[],
					[],
					[]
				],
				productListsIndex: 0,
				//选项的数据
				productLists: [{
						id: 1,
						name: '郑州金牛汽修厂',
						type: 0,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: [{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							},
							{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							}
						]

					},
					{
						id: 1,
						name: '郑州金牛汽修厂',
						type: 1,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: [{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							},
						]

					},
					{
						id: 1,
						name: '郑州金牛汽修厂',
						type: 2,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: [{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							},
						]

					},
					{
						id: 1,
						name: '郑州金牛汽修厂',
						type: 3,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: [{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							},
						]

					},
					{
						id: 1,
						name: '郑州金牛汽修厂',
						type: 4,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: [{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							},
						]

					},
					{
						id: 1,
						name: '郑州金牛汽修厂',
						type: 5,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: [{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							},
						]

					},
					{
						id: 1,
						name: '郑州金牛汽修厂',
						type: 6,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: [{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							},
						]

					},
					{
						id: 2,
						name: '郑州金牛汽修厂',
						type: 7,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: [{
								url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
							},
						]

					}
				],
				list: [{
						name: '全部'
					}, {
						name: '待付款'
					},
					{
						name: '待发货'
					},
					{
						name: '待收货'
					},
					{
						name: '退款/售后'
					}
				],
				current: 0, //指定tab为激活状态
				swiperCurrent: 0, //当前所在滑块swiper的 index
				// dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],

			};
		},
		onLoad() {
			// this.getProducts(0);
			// this.getProducts(1);
			// this.getProducts(2);
			// this.getProducts(3);
			// this.getProducts(4);
			this.orderList = this.productLists
		},
		computed: {

		},
		methods: {
			//滚动到底部/右边，会触发 scrolltolower 事件
			reachBottom() {
				// 此tab为空数据
				console.log('手势滑动切换')
			},

			//数据切换 -- 根据不同的tab展示相应的数据
			getProducts(index) {
				// this.productListsIndex = index
				// console.log(this.productListsIndex)
				// 	for (let i = 0; i < this.productLists.length; i++) {
				// 		// let index = this.$u.random(0, this.productLists.length - 1);
				// 		let data = JSON.parse(JSON.stringify(this.productLists[i]));
				// 		if(this.productListsIndex == data.id){
				// 			this.orderList[this.productListsIndex].push(data);
				// 		}
				// 		// console.log('data',data)
				// 	}
				// 	console.log('orderList',this.orderList)
				// 	this.loadStatus.splice(this.current, 1, "loadmore")

				/*
					根据下标来控制 tabs的内容展示
					0：全部
					1：待付款
					2：待发货
					3：待收货
					4：退款/售后
					
				*/
				// return
				if (index == 0) {
					this.orderList = [{
							name: '郑州金牛汽修厂',
							type: 0,
							text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
							count: 2,
							price: 500,
							image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
						},
						{
							name: '郑州金牛汽修厂',
							type: 1,
							text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
							count: 2,
							price: 500,
							image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595245474242&di=d84235eb932caf0f534d4e5e5eb7085f&imgtype=0&src=http%3A%2F%2Fadmin3.cnad.cn%2Fueditor%2Fnet%2Fupload%2F2017-12-12%2Ffceac977-a8c2-42cc-b3a9-6b5bee166f4f.jpg'
						}
					]
				} else if (index == 1) {
					this.orderList = [{
						name: '郑州金牛汽修厂',
						type: 0,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165949179,1763346127&fm=26&gp=0.jpg'
					}]
				} else if (index == 2) {
					this.orderList = [{
						name: '郑州金牛汽修厂',
						type: 1,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595245474242&di=d84235eb932caf0f534d4e5e5eb7085f&imgtype=0&src=http%3A%2F%2Fadmin3.cnad.cn%2Fueditor%2Fnet%2Fupload%2F2017-12-12%2Ffceac977-a8c2-42cc-b3a9-6b5bee166f4f.jpg'
					}]
				} else if (index == 3) {
					this.orderList = [{
						name: '郑州金牛汽修厂',
						type: 3,
						text: 'SD卡坚实的空间不可洒背带裤八度空间巴萨的空间把打卡表',
						count: 2,
						price: 500,
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595245499564&di=b85e915a3c6336df332fc8780abf3ff5&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180920%2Fcb767c7ce4304d398992c3b75a50bb9f.jpeg'
					}]
				} else if (index == 4) {
					this.orderList = []
				}
			},


			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getProducts(index)
			},



			//swiper-item 的位置发生改变时会触发 transition 事件，
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			//动画结束时会触发 animationfinish 事件
			animationfinish({
				detail: {
					current
				}
			}) {
				console.log('current', current)
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.getProducts(current)
			},

			//点击商品跳转 商品详情
			gotoOrderDetails(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/orderForm/orderDetails/orderDetails?productsItem=' + encodeURIComponent(JSON.stringify(item))
				});
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.page-box-title {
		margin: 60rpx auto 0;
		font-size: 28rpx;
		color: #5A5A5A;
		text-align: center;
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
