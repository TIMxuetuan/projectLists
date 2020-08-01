<template>
	<view class="list_box">

		<view class="main">
			<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto"
			 scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
				<block v-for="(item,index) in mainArray" :key="index">
					<view class="item" :id="'item-'+index">
						<view class="title">
							<view>{{item.title}}</view>
						</view>
						<view class="goods-array">
							
							<!--ID == 1 时，代表是配件品牌列表-->
							<view v-if="typeBrand == 1" class="goods" v-for="(item2,index2) in item.data" :key="index2" @click="gotoProductsId(item2)">
								<image :src="imageIp + item2.parts_brand_photo" mode=""></image>
								<view style="font-size: 24rpx;margin-top: 10rpx;">{{item2.parts_brand_name}}</view>
							</view>
							
							<!--ID == 2 时，代表是配件分类列表-->
							<view v-if="typeBrand == 2" v-for="(item2,index2) in item.data" :key="index2" @click="gotoProductsId(item2)" style="width: 100%;">
								<!-- <image :src="imageIp + item2.parts_brand_photo" mode=""></image> -->
								<view style="font-size: 24rpx;margin-top: 40rpx;">{{item2.classify_name}}</view>
							</view>
							
							<!--ID == 3 时，代表是汽车品牌列表-->
							<view v-if="typeBrand == 3" class="goods" v-for="(item2,index2) in item.data" :key="index2" @click="gotoProductsId(item2)">
								<image :src="imageIp + item2.car_brand_photo" mode=""></image>
								<view style="font-size: 24rpx;margin-top: 10rpx;">{{item2.car_brand_name}}</view>
							</view>
						</view>

					</view>
				</block>

			</scroll-view>
		</view>

		<!-- 菜单左边 -->
		<view class="left">
			<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
				<view class="item" v-for="(item,index) in productsArray" :key="index" :class="{ 'active':index==leftIndex }"
				 :data-index="index" @tap="leftTap">{{item.title}}</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'brandAnchor',
		props: {
			productsArray: {
				type: Array
			},
			typeBrand:{
				type:Number
			}
		},

		watch: {
			productsArray(newVal) {
				console.log("11111")
				this.getListData();
			}
		},

		data() {
			return {
				imageIp: this._config.host,
				scrollHeight: '100vh',
				productsArrayTwo: [],
				mainArray: [],
				topArr: [],
				leftIndex: 0,
				isMainScroll: false,
				scrollInto: '',
				tipsTop: '0px',
				leftLists: [{
						id: 1,
						text: 'A',
					},
					{
						id: 2,
						text: 'B',
					},
					{
						id: 3,
						text: 'C',
					},
					{
						id: 4,
						text: 'D',
					},
					{
						id: 5,
						text: 'E',
					},
					{
						id: 6,
						text: 'F',
					},
					{
						id: 7,
						text: 'G',
					},
					{
						id: 8,
						text: 'H',
					},
					{
						id: 9,
						text: 'I',
					},
					{
						id: 10,
						text: 'J',
					},
					{
						id: 11,
						text: 'K',
					},
					{
						id: 12,
						text: 'L',
					},
					{
						id: 13,
						text: 'M',
					},
					{
						id: 14,
						text: 'N',
					},
					{
						id: 15,
						text: 'O',
					},
					{
						id: 16,
						text: 'P',
					},
					{
						id: 17,
						text: 'Q',
					},
					{
						id: 18,
						text: 'R',
					},
					{
						id: 19,
						text: 'S',
					},
					{
						id: 20,
						text: 'T',
					},
					{
						id: 21,
						text: 'U',
					},
					{
						id: 22,
						text: 'V',
					},
					{
						id: 23,
						text: 'W',
					},
					{
						id: 24,
						text: 'X',
					},
					{
						id: 25,
						text: 'Y',
					},
					{
						id: 26,
						text: 'Z',
					},
				]

			}
		},
		created() {
		},
		methods: {
			//获取三种iid，用来进行筛选
			gotoProductsId(item){
				this.$emit('gotoProductsId',item)
			},
			
			
			//更新数据
			updateLists(productsArray) {
				uni.getSystemInfo({
					success: (res) => {
						/* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
						this.scrollHeight = `${res.windowHeight}px`;
						console.log('gaodu', res.windowHeight)
					}
				});
			},

			/* 获取列表数据 */
			getListData() {
				this.mainArray = []
				var listsArray = this.productsArray
				console.log('updateLists',listsArray)
				listsArray.map(items => {
					this.mainArray.push(items)
				})

				console.log('this.mainArray',this.mainArray)
				this.$nextTick(() => {
					this.getElementTop();
				});
			},
			//获取距离顶部的高度
			getScrollTop(selector) {
				return new Promise((resolve, reject) => {
					let query = uni.createSelectorQuery().in(this);
					query.select(selector + '').boundingClientRect(data => {
						resolve(data.top)
					}).exec();
				})
			},
			/* 获取元素顶部信息 */
			async getElementTop() {
				/* Promise 对象数组 */

				let p_arr = [];

				/* 遍历数据，创建相应的 Promise 数组数据 */
				console.log(this.mainArray)
				for (let i = 0; i < this.mainArray.length; i++) {
					const resu = await this.getScrollTop(`#item-${i}`)
					p_arr.push(resu)
				}


				// console.log('p_arr', p_arr)

				/* 主区域滚动容器的顶部距离 */
				this.getScrollTop("#scroll-el").then((res) => {

					let top = res;
					// #ifdef H5
					top += 43; //因固定提示块的需求，H5的默认标题栏是44px
					// #endif

					/* 所有节点信息返回后调用该方法 */
					Promise.all(p_arr).then((data) => {
						console.log('滚动', data)
						this.tipsTop = `${data}px`;
						this.topArr = data;
					});
				})
			},

			/* 主区域滚动监听 */
			mainScroll(e) {
				if (!this.isMainScroll) {
					return;
				}
				let top = e.detail.scrollTop;
				let index = -1;

				if (top >= this.topArr[this.topArr.length - 1]) {
					index = this.topArr.length - 1;
				} else {
					index = this.topArr.findIndex((item, index) => {
						return this.topArr[index + 1] >= top;
					});
				}
				this.leftIndex = (index < 0 ? 0 : index);
			},
			/* 主区域触摸 */
			mainTouch() {
				this.isMainScroll = true;
			},
			/* 左侧导航点击 */
			leftTap(e) {
				let index = e.currentTarget.dataset.index;
				this.isMainScroll = false;
				this.leftIndex = Number(index);
				this.scrollInto = `item-${index}`;
			}
		}
	}
</script>

<style lang="scss">
	.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;

		.left {
			width: 30rpx;
			background-color: #f6f6f6;
			line-height: 40rpx;
			box-sizing: border-box;
			font-size: 24rpx;

			.item {
				position: relative;
				text-align: center;
				margin-bottom: 0;

				&:not(:first-child) {
					margin-top: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #d6d6d6 solid 1px;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active,
				&:active {
					color: #42b983;
					background-color: #fff;
				}
			}
		}

		.main {
			background-color: #fff;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;

			.tips {
				line-height: 64rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				height: 64rpx;
				position: fixed;
				top: 44px;
				right: 0;
				width: 530rpx;
				z-index: 10;
				background-color: #fff;
				padding-left: 10rpx;
			}

			.title {
				line-height: 64rpx;
				position: relative;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				height: 64rpx;
				background-color: #F1F1F1;
				padding-left: 20rpx;
			}

			.item {
				margin-bottom: 20rpx;
			}

			.goods-array {
				display: flex;
				flex-wrap: wrap;
				padding-left: 20rpx;
			}

			.goods {
				width: 190rpx;
				display: flex;
				flex-direction: column;
				flex-wrap: nowrap;
				justify-content: space-between;
				padding: 30rpx 0;
				align-items: center;

				&>image {
					width: 120rpx;
					height: 120rpx;
					margin-right: 16rpx;
				}

				.describe {
					font-size: 24rpx;
					color: #999;
				}

				.money {
					font-size: 24rpx;
					color: #efba21;
				}
			}


		}
	}
</style>
