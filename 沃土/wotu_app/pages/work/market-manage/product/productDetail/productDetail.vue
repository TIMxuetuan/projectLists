<template>
	<view class="container">
		<view class="header">
			<view class="top">
				<view class="title" @tap="toEdit">{{model.name}}</view>
				<view class="sub">{{model.price}}</view>
			</view>
			<view class="toptab">
				<view class="item">跟踪记录</view>
			</view>
		</view>
		<view class="content">
			<view class="record-item" v-for="(item, index) in recordList" :key='index'>
				<view class="tags" v-if="item.Tags.length > 0">
					<block v-for="(tag, i) in item.Tags" :key='i'>
						<uni-tag :text="tag.Name" type='primary' :circle="true" size="small"></uni-tag>
					</block>
				</view>
				<view class="text">
					<!-- 后台返回有html标签，通过富文本解析 -->
					<rich-text :nodes="item.Text"></rich-text>
				</view>
				<view class="info">
					<text class="user">{{item.CreatorName}}</text>
					<text class="time">{{item.Date}}</text>
				</view>
			</view>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import Service from '@/services/crm.js'
	import util from '@/common/util.js'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				productId: '',
				model: {},
				recordList: [],
				loadingStatus: 'loading',
				_editData: {}
			};
		},
		onLoad(options) {
			this.productId = options.productId;
			this.getData()
		},
		onShow() {
			this.getData()
			this.getRecordData();
		},
		methods: {
			// 获取跟踪记录数据
			getRecordData() {
				if (this.recordList.length === 0) {
					this.loadingStatus = 'loading';
				}

				// 一次性获取全部数据
				let _sendData = {
					relid: this.productId,
					kw: '',
					page: 1,
					size: 10000,
				}
				Service.record(_sendData).then(res => {
					if (res.Flag) {
						// 处理返回的html标签
						this.recordList = res.Content.List;
						this.recordList.forEach((item) => {
							item.Text = item.Text.replace(/<th/g, "<td");
							let _time = (new Date(item.Date)).getTime();
							item.Date = util.formatTime(_time, 'Y-M-D h:s:m');
						})
					} else {
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						})
					}
					this.loadingStatus = 'noMore'
					console.log(this.loadingStatus)
				})
			},
			getData() {
				Service.productDetail(this.productId).then(res => {
					if (res.Flag) {
						const _data = res.Content;
						let _unit, _unitId;
						if (_data.Tags && _data.Tags.length > 0) {
							_unit = _data.Tags[0].ItemValue;
							_unitId = _data.Tags[0].ItemId;
						}
						this.model = {
							name: _data.Name,
							price: _data.Price + '/' + _unit,
						}

						this._editData = {
							name: _data.Name,
							price: _data.Price,
							desc: _data.Desc,
							unit: {
								label: _unit,
								value: _unitId
							}
						}
					} else {
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						})
					}
				})
			},
			toEdit() {
				let that = this;
				uni.setStorageSync('product_data', JSON.stringify(that._editData))
				uni.navigateTo({
					url: '../editProduct/editProduct?productId=' + that.productId
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color-grey;
	}

	.container {
		.header {
			position: fixed;
			top: 0;
			left: 20upx;
			right: 20upx;
			background: $uni-bg-color-grey;
			border-radius: 10upx;
			.top {
				height: 150upx;
				padding: 0 20upx;
				margin-top: 10upx;
				background: #fff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-bottom: 1px solid #eee;

				.title {
					// color: #fff;
					font-size: $uni-font-size-lg;
					line-height: 2em;
				}

				.sub {
					font-size: $uni-font-size-base;
					line-height: 2em;
					// color: #eee;
				}
			}

			.toptab {
				width: 100%;
				height: 80upx;
				background: #fff;
				border-bottom: 1px solid #eee;
				margin-top: 20upx;

				.item {
					color: $uni-text-color-blue;
					font-size: $uni-font-size-lg;
					padding: 15upx;
				}
			}
		}

		.content {
			padding: 20upx;

			&::before {
				content: '';
				display: block;
				height: 260upx;
			}

			.record-item {
				padding: 10upx 20upx;
				background: #FFFFFF;
				border-radius: 10upx;
				margin-bottom: 20upx;

				.tags {
					height: 50upx;
					@include custom-flex(flex-start, center)
				}

				.text {
					color: $uni-text-color;
					font-size: $uni-font-size-base;
					padding: 20upx 0;
				}

				.info {
					color: $uni-text-color-grey;
					font-size: $uni-font-size-sm;

					.user {
						margin-right: 30upx;
					}
				}
			}
		}
	}
</style>
