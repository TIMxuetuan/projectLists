<template>
	<view class="cloud_distribution_wrap" :style="{'min-height':height+ 'px'}">
		<view class="cloud_distribution_block" v-for="(item,i) in list" :key="i">
			<view class="block">
				<view class="block-img">
					<image src="../../../static/img/index/weixuanzhongs.png" v-if="item.is_default_freight==1"></image>
					<image src="../../../static/img/index/xuanzhongs.png" v-if="item.is_default_freight==2"></image>
				</view>
				<view class="block-title" @click="xuanze(item)">
					{{item.title}}
				</view>
				<view style="edit" @click="go_Template(3,item.Id)">
					<image src="../../../static/img/index/bianji.png" style="width: 28rpx;height: 28rpx;"></image>
				</view>
			</view>
			<view class="content" v-if="item.type==1">
				默认运费:{{item.number}}件内{{item.freight}}元，每增加{{item.additional}}件，增加运费{{item.additional_freight}}元
			</view>
			<view class="content" v-if="item.type==2">
				默认运费:{{item.number}}Kg内{{item.freight}}元，每增加{{item.additional}}Kg，增加运费{{item.additional_freight}}元
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="add_cloud_distribution" @click="popup_show">
			<view style="margin: 0 auto;">
				<image src="../../../static/img/index/add.png" style="width: 14px;height: 14px;"></image>
				<text class="add-txt">新增运费模板</text>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom">
			<view class="bottom">
				<view class="piece" @click="go_Template(1)">
					按件数计算
				</view>
				<view class="weight" @click="go_Template(2)">
					按重量计算
				</view>
				<view class="cancel" @click="cancel_click">
					取消
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Services from '../../../services/app.js';
	export default {
		components: {

		},
		data() {
			return {
				height: 0,
				show: false,
				list: []
			}
		},
		methods: {
			// 显示模态框
			popup_show() {
				this.show = true
			},
			// 隐藏模态框
			cancel_click() {
				this.show = false
			},
			// 去模板
			go_Template(data,id) {
				console.log(id)
				if(id!=undefined){
					this.$u.route({
						url: 'pages/index/shop/addFreightTemplate',
						params: {
							state: data,
							id:id
						}
					})
				}else{
					this.$u.route({
						url: 'pages/index/shop/addFreightTemplate',
						params: {
							state: data
						}
					})
				}
				
			},
			xuanze(data) {
				console.log(data)
				uni.setStorageSync('freight', {
					id: data.Id,
					title: data.title
				});
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.height = windowHeight
			Services.post_freight_index().then(res => {
				console.log("运费模板列表")
				console.log(res)
				this.list = res.Data
			})
		},
	}
</script>

<style lang="scss" scoped>
	.cloud_distribution_wrap {
		background-color: #E5E5E5;
		padding: 4rpx 0 20rpx 0;

		.cloud_distribution_block {
			background-color: #FFFFFF;
			padding: 30rpx 39rpx;

			.block {
				background-color: #FFFFFF;
				display: flex;

				.block-img {
					width: 48rpx;

					image {
						height: 28rpx;
						width: 28rpx;
					}
				}

				.block-title {
					font-size: 28rpx;
					color: rgba(0, 0, 0, 1);
					flex: 1;
				}
			}

			.edit {
				width: 28rpx;
			}
		}

		.add_cloud_distribution {
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;
			width: 100%;
			height: 110rpx;
			line-height: 110rpx;
			text-align: center;

			.add-txt {
				display: inline-block;
				padding-left: 12rpx;
				color: #4779F2;
				font-size: 28rpx;
			}
		}

		.content {
			font-size: 24rpx;
			height: 24rpx;
			line-height: 54rpx;
			color: rgba(90, 90, 90, 0.55);
			padding-left: 48rpx;
		}

		.bottom {
			background-color: #F1F1F1;
			color: #4779F2;
			font-size: 32rpx;

			.piece {
				height: 106rpx;
				line-height: 104rpx;
				text-align: center;
				border-bottom: 2rpx solid #A7A7A7;
				background-color: #FFFFFF;
			}

			.weight {
				height: 104rpx;
				line-height: 104rpx;
				text-align: center;
				background-color: #FFFFFF;
			}

			.cancel {
				height: 106rpx;
				line-height: 106rpx;
				text-align: center;
			}
		}
	}
</style>
