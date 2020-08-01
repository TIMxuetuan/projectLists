<template>
	<view class="add_goods_warp">
		<view class="add_goods_info">
			<view class="goods_title">
				<text style="color: red;">*</text>
				商品标题
				<u-input v-model="goods.goods_name" type="textarea" :auto-height="trues" maxlength="200" height="200" placeholder="请输入商品标题,如商品品牌+名字等" />
				<view class="title-num">{{num}}/200</view>
			</view>

			<view class="goods_picture_head">
				<view style="color: red;">*</view>
				<view style="flex: 1;">商品图片</view>
			</view>
			<view class="goods_picture">
				<u-upload :action="uploadUrl" :header="uploadHeader" upload-text="" width="210" max-count="1" @on-success="doorhead"
				 :show-progress="show_progress"></u-upload>
			</view>
			<view class="goods_picture-wrap">
				<view class="goods_picture_head">
					<view style="flex: 1;">商品详情图</view>
					<view class="picture-num">{{details_num}}/9</view>
				</view>
				<view style="padding-bottom: 20rpx;">
					<u-upload :action="uploadUrl" :header="uploadHeader" upload-text="" width="210" :max-count="max_count" @on-success="goods_detail_photo"
					 :show-progress="show_progress"></u-upload>
				</view>
			</view>
			<view class="goods_info_txt" @click="parts_category_click">
				<view>
					<text style="color: red;">*</text>
					配件品类
				</view>
				<view class="info_txt-input">
					<u-input v-model="goods.parts_category.send_name" type="type" placeholder="请选择配件品类&gt;" disabled @click="parts_category_click"
					 input-align="right" />
				</view>
			</view>
			<view class="goods_info_txt" @click="partscBrand_click">
				<view>
					配件品牌
				</view>
				<view class="info_txt-input">
					<u-input v-model="goods.parts_brand_name.parts_brand_name" type="type" placeholder="请选择配件品牌&gt;" disabled @click="partscBrand_click"
					 input-align="right" />
				</view>
			</view>
			<view class="goods_info_txt" @click="automobileBrand_click" style="border-bottom: 0;">
				<view>
					汽车品牌
				</view>
				<view class="info_txt-input">
					<u-input v-model="goods.automobileBrand.name" type="type" placeholder="请选择可适配汽车品牌&gt;" disabled @click="automobileBrand_click"
					 input-align="right" />
				</view>
			</view>
		</view>

		<view class="good_id">
			<view class="good_id-txt">
				<text style="color: #EC3333;">*</text>
				商品编码
			</view>
			<view class="good_id-input">
				<u-input v-model="goods.goods_sn" type="type" placeholder="请填写商品编码" :border="border" />
			</view>
		</view>
		<view class="model-price">
			型号价格
		</view>
		<!-- 1111 -->
		<view class="goods_price_info" v-if="specifications_state==0">
			<view class="goods_price_block">
				<view class="block">
					<text style="color: red;">*</text>
					价 格
				</view>
				<u-input v-model="goods.specifications[0].price" type="type" placeholder="请填写商品售价" :border="border" />
				<view class="company">
					元
				</view>
			</view>
			<view class="goods_price_block">
				<view class="block">
					<text style="color: red;">*</text>
					成 本 价
				</view>
				<u-input v-model="goods.specifications[0].cost_price" type="type" placeholder="请填写商品成本价" :border="border" />
				<view class="company">
					元
				</view>
			</view>
			<view class="goods_price_block">
				<view class="block">
					<text style="color: red;">*</text>
					库 存
				</view>
				<u-input v-model="goods.specifications[0].repertory" type="type" placeholder="请填写商品库存" :border="border" />
				<view class="company">
					件
				</view>
			</view>
			<view class="goods_price_block">
				<view class="block">
					<text style="color: red;">*</text>
					重 量
				</view>
				<u-input v-model="goods.specifications[0].weight" type="type" placeholder="请填写商品重量" :border="border" />
				<view class="company">
					kg
				</view>
			</view>
		</view>
		<!-- 111 -->
		<view v-if="specifications_state==1" v-for="(item,index) in goods.specifications" :key="index">
			<view class="goods_price_info" style="position: relative;">
				<view style="width: 10px;height: 10px;position: absolute;top: 150px;right: 7px;" v-if="goods.specifications.length>1"
				 @click="delete_specifications(index)">
					<image src="../../../static/img/index/jianhao.png" style="width: 10px;height: 10px;"></image>
				</view>
				<view class="goods_price_block">
					<view class="block">
						<text style="color: red;">*</text>型 号
					</view>
					<u-input v-model="item.marque" type="type" placeholder="请填写商品型号规格名" :border="border" />
				</view>
				<view class="goods_price_block">
					<view class="block">
						<text style="color: red;">*</text>价 格
					</view>
					<u-input v-model="item.price" type="type" placeholder="请填写商品售价" :border="border" />
					<view class="company">元</view>
				</view>
				<view class="goods_price_block">
					<view class="block">
						<text style="color: red;">*</text>成 本 价
					</view>
					<u-input v-model="item.cost_price" type="type" placeholder="请填写商品成本价" :border="border" />
					<view class="company">元</view>
				</view>
				<view class="goods_price_block">
					<view class="block">
						<text style="color: red;">*</text>
						库 存
					</view>
					<u-input v-model="item.repertory" type="type" placeholder="请填写商品库存" :border="border" />
					<view class="company">件</view>
				</view>
				<view class="goods_price_block">
					<view class="block">
						<text style="color: red;">*</text>重 量
					</view>
					<u-input v-model="item.weight" type="type" placeholder="请填写商品重量" :border="border" />
					<view class="company">kg</view>
				</view>
				<view class="goods_price_block">
					<view class="block">
						<text style="display: inline-block;width: 14rpx;"></text>编 码
					</view>
					<u-input v-model="item.goods_sn" type="type" placeholder="选填，用于系统对接" :border="border" />
				</view>
				<view class="goods_price_block">
					<view class="block">
						<text style="display: inline-block;width: 14rpx;"></text>图 片
					</view>
					<!-- <u-upload :action="uploadUrl" :header="uploadHeader" upload-text="" width="100" :max-count="max_count" @on-success="goods_speci_photo(index)" :show-progress="show_progress"></u-upload> -->
				</view>
			</view>
		</view>
		<view class="add-specifications" @click="add_specifications">
			+添加商品规格
		</view>
		<view style="padding: 0 20rpx;background-color: #FFFFFF;" @click="cloudDistribution_click">
			<view class="goods_info_txt" style="display: flex;">
				<view style="line-height: 35px;">
					<text style="color: red;">*</text>
					运费设置
				</view>
				<view style="flex: 1;padding-top: 7rpx;">
					<u-input v-model="goods.freight.title" type="type" placeholder="默认运费模板&gt;" disabled @click="cloudDistribution_click"
					 input-align="right" />
				</view>
			</view>
		</view>
		<view style="height: 140rpx;"></view>
		<view class="addGoods_bottom">
			<view>
				<u-button style="width: 300rpx;" @click="aaa">放入仓库</u-button>
			</view>
			<view style="flex: 1;"></view>
			<view>
				<u-button style="width: 300rpx;" @click="addGoods">上架销售</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../../common/public.js'
	import Services from '../../../services/app.js';
	import Services_shop from '../../../services/shop.js';
	export default {
		components: {

		},
		data() {
			return {
				..._data,
				uploadUrl: this._config.uploadUrl,
				border: true,
				show_progress: false,
				goods: {
					goods_name: '',
					goodsPhoto: '',
					goods_sn: '',
					goods_detail_photo: [],
					specifications: [{
						marque: '',
						goods_sn: '',
						price: '',
						cost_price: '',
						repertory: '',
						weight: '',
						goods_speci_photo: ''
					}],
					parts_category: {
						send_name: '',
						send_data: ''
					},
					freight: {
						id: null,
						title: ''
					},
					parts_brand_name: {
						Id: '',
						parts_brand_name: ''
					},
					automobileBrand: {
						name: '',
						id: ''
					},
				},
				trues: true,
				max_count: 9,
				specifications_state: 0,
				nums: 0,
				goodsArr: [],
				goods_id: 0
			}
		},
		onLoad() {

		},
		onShow() {
			console.log("退回走缓存不")

			var _self = this;
			// 配件品牌
			uni.getStorage({
				key: 'parts_category',
				success: function(res) {
					_self.goods.parts_category = res.data
					console.log('这是获取key中的内容', res.data)

				}
			})
			// 配件品类
			uni.getStorage({
				key: 'selectBrand',
				success: function(res) {
					_self.goods.parts_brand_name = res.data
					console.log('这是获取key中的内容', res.data)

				}
			})
			// 汽车品牌
			uni.getStorage({
				key: 'automobileBrand',
				success: function(res) {
					_self.goods.automobileBrand = res.data
					console.log('这是获取key中的内容', res.data)

				}
			})
			// 运费
			uni.getStorage({
				key: 'freight',
				success: function(res) {
					_self.goods.freight = res.data
					console.log('这是获取key中的内容', res.data)

				}
			})
		},
		onHide() {


		},
		onUnload(){
			console.log("页面卸载")
			// 这里清除缓存
		},
		methods: {
			..._methods,
			// 上架销售
			addGoods() {
				// uni.removeStorageSync('add_goods');
				// uni.removeStorageSync('add_goods');
				// if(!this.goods.goods_name){
				// 	this.toast("标题不能为空")
				// 	return
				// }
				// if(!this.goods.goodsPhoto.length>0){
				// 	this.toast("商品图片不能为空")
				// 	return
				// }
				// if(!this.goods.parts_category.send_name){
				// 	this.toast("配件品类不能为空")
				// 	return
				// }
				// if(!this.goods.goods_sn){
				// 	this.toast("商品编码不能为空")
				// 	return
				// }
				// if(!this.goods.specifications[0].price){
				// 	this.toast("价格不能为空")
				// 	return
				// }
				// if(!this.goods.specifications[0].cost){
				// 	this.toast("成本价不能为空")
				// 	return
				// }
				// if(!this.goods.specifications[0].stock){
				// 	this.toast("库存不能为空")
				// 	return
				// }
				// if(!this.goods.specifications[0].weight){
				// 	this.toast("重量不能为空")
				// 	return
				// }
				// if(!this.goods.freight.title){
				// 	this.toast("运费设置不能为空")
				// 	return
				// }
				// console.log("打印")
				// console.log(this.goods)
				var data = {
					status: 2,
					goods_name: this.goods.goods_name,
					goods_photo: this.goods.goodsPhoto,
					goods_detail_photo: this.goods.goods_detail_photo.join('@'),
					classify_id: this.goods.parts_category.send_data,
					parts_brand_id: this.goods.parts_brand_name.Id,
					car_brand_id: this.goods.automobileBrand.id,
					goods_sn: this.goods.goods_sn,
					freight_id: this.goods.freight.id,
					goods_marque: JSON.stringify(this.goods.specifications)
				}
				console.log(data)
				Services.add_goods(data).then(res => {
					console.log(res)
					uni.removeStorageSync('parts_category');
					uni.removeStorageSync('selectBrand');
					uni.removeStorageSync('automobileBrand');
					uni.removeStorageSync('freight');
				})
			},
			// 配件品类
			parts_category_click() {

				this.$u.route({
					url: 'pages/index/shop/partsCategory',
				})
			},
			// 配件品牌
			partscBrand_click() {
				this.$u.route({
					url: 'pages/index/shop/partsBrand',
				})
			},
			// 汽车品牌
			automobileBrand_click() {
				this.$u.route({
					url: 'pages/index/shop/automobileBrand',
				})
			},
			// 运费设置 Cloud distribution
			cloudDistribution_click() {
				this.$u.route({
					url: 'pages/index/shop/cloudDistribution',
				})
			},
			// 商品图片
			doorhead(data, index, lists) {
				this.goods.goodsPhoto = data.result
				console.log(this.goods.goodsPhoto)
			},
			// 规格图片
			goods_speci_photo(data, index, lists, a) {
				console.log(a)
				// this.goods.specifications.goods_speci_photo.push(data.result)
				// console.log(this.goods.specifications.goods_speci_photo)
			},
			// 商品详情图
			goods_detail_photo(data) {
				this.goods.goods_detail_photo.push(data.result)
				console.log(this.goods.goods_detail_photo)
			},
			delete_specifications(index) {
				this.goods.specifications.splice(index, 1)
				this.nums--
			},
			// 添加规格
			add_specifications() {
				console.log(this.goods.specifications)
				this.specifications_state = 1
				this.nums++
				if (this.nums > 1) {
					console.log("####")
					this.goods.specifications.push({
						marque: '',
						goods_sn: '',
						price: '',
						cost_price: '',
						repertory: '',
						weight: '',
						goods_speci_photo: []
					})
				}
			},
		},
		computed: {
			num() {
				if (this.goods.goods_name != undefined) {
					return this.goods.goods_name.length;
				}
			},
			picture_num() {
				if (this.goods.goodsPhoto != undefined) {
					return this.goods.goodsPhoto.length;
				}
			},
			details_num() {
				if (this.goods.goods_detail_photo != undefined) {
					return this.goods.goods_detail_photo.length;
				}
			}

		},
		created() { //生命周期里接收参数
			if (this.$route.query.id != undefined) {
				this.goods_id = this.$route.query.id //接受参数关键代码
				console.log("编辑商品ID")
				console.log(parseInt(this.goods_id))
				this.goods_id = parseInt(this.goods_id)
				Services_shop.get_one_goods({
					id: this.goods_id
				}).then(res => {
					console.log("单个商品信息")
					console.log(res.Data)
					this.goods = {
						goods_name: res.Data.goods_name,
						goodsPhoto: res.Data.goods_photo,
						goods_sn: res.Data.goods_sn,
						goods_detail_photo: res.Data.goods_detail_photo.split("@"),
						specifications: res.Data.goods_marque,
						parts_category: {
							send_name: '',
							send_data: ''
						},
						freight: {
							id: null,
							title: ''
						},
						parts_brand_name: {
							Id: '',
							parts_brand_name: ''
						},
						automobileBrand: {
							name: '',
							id: ''
						},
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.add_goods_warp {
		background-color: #F1F1F1;
		font-family: Source Han Sans CN;
		font-weight: 400;

		.add_goods_info {
			padding: 0 38rpx;
			background-color: #FFFFFF;
			margin-bottom: 12rpx;

			.goods_title {
				font-size: 28rpx;
				line-height: 48rpx;
				color: rgba(0, 0, 0, 1);
				padding-top: 30rpx;
				border-bottom: 2rpx solid #F1F1F1;
				;

				.title-num {
					text-align: right;
					font-size: 24rpx;
					color: rgba(90, 90, 90, 0.55);
					line-height: 40rpx;
				}
			}

			.goods_picture {
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #F1F1F1;

				.picture-num {
					text-align: right;
					display: inline-block;
					color: rgba(68, 68, 68, 1);
					font-family: Arial;
					font-size: 24rpx;
				}
			}

			.goods_picture-wrap {
				border-bottom: 1rpx solid #F1F1F1;
			}

			.goods_picture_head {
				display: flex;
				padding-top: 30rpx;
				font-size: 28rpx;
				color: rgba(0, 0, 0, 1);
				padding-bottom: 14rpx;
			}

			.goods_info_txt {
				display: flex;
				height: 110rpx;
				font-size: 28rpx;
				color: rgba(0, 0, 0, 1);
				line-height: 110rpx;
				border-bottom: 1rpx solid #F1F1F1;

				.info_txt-input {
					padding-top: 17rpx;
					flex: 1;
				}
			}
		}

		.good_id {
			padding: 0 38rpx;
			height: 106rpx;
			background-color: #FFFFFF;
			display: flex;

			.good_id-txt {
				height: 28rpx;
				line-height: 106rpx;
				font-size: 28rpx;
				color: rgba(0, 0, 0, 1);
				width: 150rpx;
			}

			.good_id-input {
				flex: 1;
				padding-top: 16rpx;
			}
		}

		.model-price {
			color: #000000;
			padding: 20rpx 20rpx;
			font-size: 28rpx;
		}

		.goods_price_info {
			background-color: #FFFFFF;
			padding: 30rpx 38rpx;

			.goods_price_block {
				display: flex;
				line-height: 74rpx;
				position: relative;
				margin-bottom: 12rpx;

				.block {
					width: 140rpx;
					font-size: 28rpx;
				}

				.company {
					height: 72rpx;
					position: absolute;
					right: 40rpx;
				}
			}
		}

		.add-specifications {
			text-align: right;
			color: #1296DB;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			padding-right: 38rpx;
		}

		.addGoods_bottom {
			width: 100%;
			position: fixed;
			bottom: 0;
			display: flex;
			padding: 20rpx;
			background-color: #FFFFFF;
		}
	}
</style>
